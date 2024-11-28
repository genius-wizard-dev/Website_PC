import useWindowSize from "@/hooks/useWindowsSize";
import { Footer, Header } from "@/pages/common";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const { isMobile } = useWindowSize();

  return (
    <div className="flex flex-col min-h-screen relative justify-center items-center ">
      <Header />
      <main
        className={`flex-grow py-16  px-4 w-full md:py-8 md:px-10 mt-[5.25rem] ${
          isMobile ? "mt-[140px]" : ""
        }`}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
