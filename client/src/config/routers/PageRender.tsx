import { RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const pages: any = import.meta.glob([
  "../../pages/**/*.tsx",
  "../../pages/*.tsx",
  "../../pages/Admin/*.tsx",
  "../../pages/Vnpay/*.tsx",
  "!../../pages/common/**/*.tsx",
  "!../../pages/index.ts",
]);

const PUBLIC_PAGES = ["Login", "Register", "Home", "Product", "About", "Vnpay"];
const USER_PAGES = [...PUBLIC_PAGES, "Cart", "Order", "Profile", "OrderDetail"];
const ADMIN_PAGES = [...USER_PAGES, "Admin"];

const PageRender: React.FC = () => {
  const { page, id } = useParams<{ page: string; id: string }>();
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);
  const { isLogin } = useSelector((state: RootState) => state.auth);
  const { info: user } = useSelector((state: RootState) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    const loadComponent = async () => {
      if (!page) {
        setNotFound(true);
        setComponent(null);
        return;
      }

      try {
        const formatPage = page.charAt(0).toUpperCase() + page.slice(1);
        let pagePath = `../../pages/${formatPage}.tsx`;
        console.log("Attempting to load page:", formatPage, pagePath);

        if (id && formatPage !== "Admin") {
          pagePath = `../../pages/${formatPage}/[id].tsx`;
        } else if (formatPage === "Vnpay") {
          if (searchParams.get("vnp_ResponseCode")) {
            pagePath = "../../pages/Vnpay/index.tsx";
          }
        } else if (formatPage === "Admin") {
          const subPage = id
            ? id.charAt(0).toUpperCase() + id.slice(1)
            : "Index";
          pagePath = `../../pages/Admin/${subPage}.tsx`;
        }

        console.log("Final path:", pagePath);
        if (!pages[pagePath]) {
          console.error("Page not found:", pagePath);
          console.log("Available pages:", Object.keys(pages));
          setNotFound(true);
          setComponent(null);
          return;
        }
        const userRole = user?.roles || [{ name: "GUEST" }];

        const allowedPages = userRole.some((role) => role.name === "ADMIN")
          ? ADMIN_PAGES
          : userRole.some((role) => role.name === "USER")
          ? USER_PAGES
          : PUBLIC_PAGES;

        if (
          !PUBLIC_PAGES.includes(formatPage) &&
          !allowedPages.includes(formatPage)
        ) {
          if (!isLogin) {
            navigate("/login", {
              replace: true,
              state: { from: location.pathname + location.search },
            });
            return;
          }
          navigate("/", { replace: true });
          return;
        }

        const module = await pages[pagePath]();
        setComponent(() => module.default);
        setNotFound(false);
      } catch (error) {
        console.error("Error loading page:", error);
        setNotFound(true);
        setComponent(null);
      }
    };

    loadComponent();
  }, [page, id, isLogin, user, location.pathname, location.search, navigate]);

  return (
    <div className="container mx-auto">
      {notFound ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-gray-600 mb-4">Page not found</p>
            <button
              onClick={() => navigate("/")}
              className="text-blue-500 hover:underline"
            >
              Go back home
            </button>
          </div>
        </div>
      ) : (
        Component && <Component />
      )}
    </div>
  );
};

export default PageRender;
