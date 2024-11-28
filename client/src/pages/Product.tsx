import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ENDPOINTS } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { RootState } from "@/redux/store";
import { addToCart, getCartCount } from "@/redux/thunks/cart";
import { get } from "@/services/api.service";
import { Product, ProductResponse } from "@/types";
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Package,
  Search,
  ShoppingBag,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function ProductPage() {
  const [search, setSearch] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortType, setSortType] = useState<"asc" | "desc" | "all" | "">("");
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);
  const { isLogin, token } = useSelector((state: RootState) => state.auth);
  const { info: user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [page, sortType]);

  const fetchProducts = async () => {
    let url = `${ENDPOINTS.LIST_PRODUCT}?page=${page}`;
    if (sortType) {
      url = `${ENDPOINTS.LIST_PRODUCT}/${sortType}?page=${page}`;
    }
    const response = await get<{ result: ProductResponse }>(url);
    setProducts(response.data.result.content);
    setTotalPages(response.data.result.totalPages);
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handleSort = (type: "asc" | "desc" | "all") => {
    if (type == "all") {
      fetchProducts();
      setSortType(type);
      return;
    }
    setSortType(type);
    setPage(0);
  };

  const handleAddCart = async (product: Product) => {
    if (!isLogin) {
      navigate("/login");
      toast({
        title: "Vui lòng đăng nhập để thêm vào giỏ hàng",
      });
      return;
    }
    const getQuantity: number | undefined = items.find(
      (item) => item.product.id === product.id
    )?.quantity;
    console.log(getQuantity);
    if (getQuantity && product.inStock - getQuantity <= 0) {
      toast({
        title: "Sản phẩm không còn đủ số lượng trong kho",
      });
      return;
    }
    try {
      await dispatch(
        addToCart({
          userId: user?.id as string,
          productId: product.id as string,
          token: token as string,
        }) as any
      );

      toast({
        title: "Thêm vào giỏ hàng thành công",
      });
      dispatch(
        getCartCount({
          userId: user?.id as string,
          token: token as string,
        }) as any
      );
    } catch (error) {
      toast({
        title: "Thêm vào giỏ hàng thất bại",
      });
    }
  };

  const handleSearch = async () => {
    setSortType("");
    if (search.trim() == "") fetchProducts();
    else {
      setPage(0);
      const response = await get<{ result: ProductResponse }>(
        `${ENDPOINTS.LIST_PRODUCT}/${search}?page=${page}`
      );
      setProducts(response.data.result.content);
      setTotalPages(response.data.result.totalPages);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center gap-2 mb-6 text-gray-600">
        <Link to="/" className="hover:text-orange-500">
          Trang chủ
        </Link>
        <span>/</span>
        <span className="text-orange-500">Danh sách sản phẩm</span>
      </div>
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Nhập nội dung cần tìm kiếm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-[0.58rem] border border-orange-300 rounded-lg bg-white shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-200"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Search size={20} />
          </button>
        </div>
        <select
          className="px-4 py-2 border rounded-lg bg-white shadow-sm"
          onChange={(e) => handleSort(e.target.value as "asc" | "desc" | "all")}
          value={sortType}
        >
          <option value="">Sắp xếp theo giá</option>
          <option value="asc">Giá tăng dần</option>
          <option value="desc">Giá giảm dần</option>
          <option value="all">Tất cả</option>
        </select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        {products.map((product: Product) => (
          <div
            key={product.id}
            className={`group bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${
              product.updateDetail
                ? "hover:shadow-xl hover:-translate-y-2"
                : "opacity-80 cursor-not-allowed"
            }`}
          >
            { product.updateDetail ? (
              <Link to={`/product/${product.id}`} className="block">
                <div className="relative">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                    -{product.discountPercent.toFixed(1)}%
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </h3>

                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-2xl font-bold text-red-600">
                      {product.priceAfterDiscount.toLocaleString()}đ
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      {product.originalPrice.toLocaleString()}đ
                    </span>
                  </div>

                  <div className="text-sm text-gray-600 space-y-2 border-t pt-3">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-orange-500" />
                      <span>{product.supplier.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-orange-500" />
                      <span className="line-clamp-1">
                        {product.supplier.address}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-orange-500" />
                      <span>Còn lại: {product.inStock}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="relative p-5">
                <div className="relative h-64 rounded-xl overflow-hidden mb-4">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover filter grayscale"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-full font-semibold text-lg shadow-lg"
                    >
                      <Clock className="w-5 h-5" />
                      <span>Sắp về hàng</span>
                    </Badge>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2 line-clamp-2 text-gray-700">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 italic mb-4">
                  Sản phẩm sẽ sớm được cập nhật
                </p>

                <div className="absolute bottom-5 right-5">
                  <div className="bg-yellow-100 p-3 rounded-full shadow-lg">
                    <AlertTriangle className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </div>
            )}
            {product.updateDetail && (
              <div className="px-5 pb-5">
                <Button
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                  onClick={() => handleAddCart(product)}
                  disabled={product.inStock === 0}
                >
                  {product.inStock === 0 ? "Hết hàng" : "Thêm vào giỏ hàng"}
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mt-8 gap-2">
        <button
          onClick={handlePrevPage}
          disabled={page === 0}
          className={`p-2 rounded-full flex items-center justify-center ${
            page === 0
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-orange-50 text-orange-600 hover:bg-orange-100"
          }`}
        >
          <ChevronLeft size={20} />
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setPage(index)}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              page === index
                ? "bg-orange-600 text-white"
                : "bg-orange-50 text-orange-600 hover:bg-orange-100"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={handleNextPage}
          disabled={page === totalPages - 1}
          className={`p-2 rounded-full flex items-center justify-center ${
            page === totalPages - 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-orange-50 text-orange-600 hover:bg-orange-100"
          }`}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

export default ProductPage;
