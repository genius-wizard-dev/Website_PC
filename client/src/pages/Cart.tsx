import { ShipCOD, VNPay } from "@/assets/Cart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ENDPOINTS } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { RootState } from "@/redux/store";
import { deleteCartItem, getCartCount } from "@/redux/thunks/cart";
import { viewOrder } from "@/redux/thunks/order";
import { get, post } from "@/services/api.service";
import {
  Loader2,
  MapPin,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Cart() {
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { info: user } = useSelector((state: RootState) => state.user);
  const { token } = useSelector((state: RootState) => state.auth);
  const [loadingItems, setLoadingItems] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [address, setAddress] = useState(
    localStorage.getItem("addressShipping") || ""
  );

  const [quantities, setQuantities] = useState<{ [key: string]: number }>(
    () => {
      const initialQuantities: { [key: string]: number } = {};
      items?.forEach((item) => {
        initialQuantities[item.product.id as string] = item.quantity;
      });
      return initialQuantities;
    }
  );
  const [isOrdering, setIsOrdering] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("ship");

  const totalPrice = useMemo(() => {
    return (
      items?.reduce((total, item) => {
        if (!item?.product?.priceAfterDiscount) return total;
        const quantity = quantities[item.product.id as string] || item.quantity;
        return total + item.product.priceAfterDiscount * quantity;
      }, 0) || 0
    );
  }, [items, quantities]);

  const handleDeleteCartItem = async (productId: string) => {
    try {
      const result = await dispatch(
        deleteCartItem({
          userId: user?.id as string,
          productId,
          token: token as string,
        }) as any
      );
      if (result.payload.code === 1000) {
        toast({
          title: "Xóa sản phẩm thành công",
        });
        dispatch(
          getCartCount({
            userId: user?.id as string,
            token: token as string,
          }) as any
        );
      } else {
        toast({
          title: "Xóa sản phẩm thất bại",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Đã có lỗi xảy ra",
        variant: "destructive",
      });
    }
  };

  const handleDecreaseQuantity = async (productId: string) => {
    const currentQuantity = quantities[productId];
    if (currentQuantity <= 1) return;

    setLoadingItems((prev) => ({ ...prev, [productId]: true }));
    setQuantities((prev) => ({ ...prev, [productId]: prev[productId] - 1 }));

    try {
      const result = await post<any>(
        `${ENDPOINTS.DECREASE_QUANTITY}?customerId=${user?.id}&productId=${productId}`,
        {},
        token as string
      );
      if (result.data.code !== 1000) {
        setQuantities((prev) => ({
          ...prev,
          [productId]: prev[productId] + 1,
        }));
        toast({
          title: "Giảm số lượng thất bại",
          variant: "destructive",
        });
      }
    } catch (error) {
      setQuantities((prev) => ({ ...prev, [productId]: prev[productId] + 1 }));
      toast({
        title: "Đã có lỗi xảy ra",
        variant: "destructive",
      });
    } finally {
      setLoadingItems((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const handleIncreaseQuantity = async (productId: string) => {
    setLoadingItems((prev) => ({ ...prev, [productId]: true }));
    setQuantities((prev) => ({ ...prev, [productId]: prev[productId] + 1 }));

    try {
      const result = await post<any>(
        `${ENDPOINTS.INCREASE_QUANTITY}?customerId=${user?.id}&productId=${productId}`,
        {},
        token as string
      );
      if (result.data.code !== 1000) {
        setQuantities((prev) => ({
          ...prev,
          [productId]: prev[productId] - 1,
        }));
        if (result.data.code === 6001) {
          toast({
            title: "Sản phẩm không đủ số lượng trong kho",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Tăng số lượng thất bại",
            variant: "destructive",
          });
        }
      }
    } catch (error: any) {
      setQuantities((prev) => ({ ...prev, [productId]: prev[productId] - 1 }));
      if (error.response && error.response.data.code === 6001) {
        toast({
          title: "Sản phẩm không đủ số lượng trong kho",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Đã có lỗi xảy ra",
          variant: "destructive",
        });
      }
    } finally {
      setLoadingItems((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const handleOrder = async () => {
    if (!address) {
      toast({
        title: "Vui lòng nhập địa chỉ giao hàng",
        variant: "destructive",
      });
      setShowAddressModal(true);
      return;
    }
    if (paymentMethod === "ship") {
      setIsOrdering(true);
      try {
        const result = await post<any>(
          ENDPOINTS.ORDER,
          {
            customerId: user?.id,
            shipAddress: address,
            items,
            totalPrice,
            orderStatus: "DELIVERING",
            isPaid: "false",
          },
          token as string
        );
        if (result.data.code === 1000) {
          toast({
            title: "Đặt hàng thành công",
          });
          dispatch(
            getCartCount({
              userId: user?.id as string,
              token: token as string,
            }) as any
          );
          dispatch(
            viewOrder({
              userId: user?.id as string,
              token: token as string,
            }) as any
          );
        } else {
          throw new Error("Failed to order");
        }
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          toast({
            title: "Hết phiên đăng nhập",
            description: "Vui lòng đăng nhập lại",
            variant: "destructive",
          });
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
        } else {
          toast({
            title: "Đặt hàng thất bại",
            description: error.message || "Đã xảy ra lỗi không xác định",
            variant: "destructive",
          });
        }
      } finally {
        setIsOrdering(false);
      }
    } else if (paymentMethod === "vnpay") {
      setIsOrdering(true);
      try {
        const response = await get<any>(
          `${ENDPOINTS.VNPAY}?amount=${totalPrice}`,
          token as string
        );
        if (response.data.code === 1000) {
          const orderInfo = {
            customerId: user?.id,
            shipAddress: address,
            items,
            totalPrice,
            orderStatus: "",
          };
          document.cookie = `orderInfo=${JSON.stringify(
            orderInfo
          )}; path=/; max-age=3600`;
          window.location.href = response.data.result.url;
        } else {
          toast({
            title: "Đặt hàng thất bại vui lòng thử lại",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Hết phiên đăng nhập vuiý đăng nhập lại",
          variant: "destructive",
        });
        window.location.href = "/login";
      } finally {
        setIsOrdering(false);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 pb-8 relative">
      <div className="flex items-center gap-2 mb-6 text-muted-foreground">
        <Link to="/" className="hover:text-orange-500 transition-colors">
          Trang chủ
        </Link>
        <span>/</span>
        <span className="text-orange-500">Giỏ hàng</span>
      </div>
      <h1 className="text-3xl font-bold mb-8">Giỏ hàng của bạn</h1>

      {!items?.length ? (
        <div className="text-center py-16">
          <ShoppingCart className="w-20 h-20 mx-auto text-orange-500 mb-4" />
          <p className="text-muted-foreground text-lg mb-4">
            Không có sản phẩm trong giỏ hàng
          </p>
          <Button
            asChild
            variant="outline"
            className="hover:text-orange-500 hover:border-orange-500"
          >
            <Link to="/product">Tiếp tục mua sắm</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {items?.map((item) => (
              <Card key={item.product.id}>
                <CardContent className="p-4 flex items-center gap-4">
                  <img
                    src={item.product.img}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base line-clamp-2">
                      {item.product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Nhà cung cấp: {item.product.supplier.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-medium text-orange-500">
                        {item.product.priceAfterDiscount.toLocaleString(
                          "vi-VN"
                        )}
                        đ
                      </span>
                      <span className="text-muted-foreground line-through text-sm">
                        {item.product.originalPrice.toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          handleDecreaseQuantity(item.product.id as string)
                        }
                        disabled={
                          quantities[item.product.id as string] <= 1 ||
                          loadingItems[item.product.id as string]
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">
                        {quantities[item.product.id as string]}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          handleIncreaseQuantity(item.product.id as string)
                        }
                        disabled={loadingItems[item.product.id as string]}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 ml-auto text-muted-foreground hover:text-red-500"
                        onClick={() =>
                          handleDeleteCartItem(item.product.id as string)
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center gap-3">
                  <MapPin className="text-orange-500" size={20} />
                  <div className="flex-1 min-w-0">
                    <span className="font-medium block mb-1">
                      Địa chỉ giao hàng
                    </span>
                    {address ? (
                      <p className="text-muted-foreground text-sm truncate">
                        {address}
                      </p>
                    ) : (
                      <Badge
                        variant="outline"
                        className="text-orange-500 border-orange-500"
                      >
                        Chưa có địa chỉ
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                    onClick={() => setShowAddressModal(true)}
                  >
                    {address ? "Sửa" : "Thêm"}
                  </Button>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Phương thức thanh toán</h3>
                  <RadioGroup
                    defaultValue="ship"
                    className="grid grid-cols-2 gap-3"
                    onValueChange={setPaymentMethod}
                  >
                    <div className="col-span-1">
                      <Label
                        htmlFor="ship"
                        className="flex flex-col items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-orange-50 hover:border-orange-500 [&:has([data-state=checked])]:border-orange-500 [&:has([data-state=checked])]:bg-orange-50"
                      >
                        <img src={ShipCOD} alt="COD" className="w-8 h-8" />
                        <RadioGroupItem
                          value="ship"
                          id="ship"
                          className="sr-only"
                        />
                        <span className="text-sm text-center">
                          Thanh toán khi nhận hàng
                        </span>
                      </Label>
                    </div>
                    <div className="col-span-1">
                      <Label
                        htmlFor="vnpay"
                        className="flex flex-col items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-orange-50 hover:border-orange-500 [&:has([data-state=checked])]:border-orange-500 [&:has([data-state=checked])]:bg-orange-50"
                      >
                        <img src={VNPay} alt="VNPay" className="w-8 h-8" />
                        <RadioGroupItem
                          value="vnpay"
                          id="vnpay"
                          className="sr-only"
                        />
                        <span className="text-sm text-center">
                          Thanh toán bằng VNPay
                        </span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tạm tính:</span>
                    <span>{totalPrice.toLocaleString("vi-VN")}đ</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Phí vận chuyển:</span>
                    <span>0đ</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center font-medium text-lg">
                    <span>Tổng tiền:</span>
                    <span className="text-orange-500">
                      {totalPrice.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600"
                  size="lg"
                  onClick={handleOrder}
                  disabled={isOrdering || !items?.length}
                >
                  {isOrdering ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {paymentMethod === "ship" ? "Đặt hàng" : "Thanh toán"}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      <Dialog open={showAddressModal} onOpenChange={setShowAddressModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Địa chỉ giao hàng</DialogTitle>
          </DialogHeader>
          <Textarea
            className="min-h-[100px] resize-none"
            placeholder="Nhập địa chỉ giao hàng của bạn"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              localStorage.setItem("addressShipping", e.target.value);
            }}
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddressModal(false)}
            >
              Hủy
            </Button>
            <Button
              className="bg-orange-500 hover:bg-orange-600"
              onClick={() => {
                if (address.trim()) {
                  setShowAddressModal(false);
                } else {
                  toast({
                    title: "Vui lòng nhập địa chỉ giao hàng",
                    variant: "destructive",
                  });
                }
              }}
            >
              Xác nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Cart;
