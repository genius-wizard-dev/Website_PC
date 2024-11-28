import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { login } from "@/redux/thunks/auth";
import {
  LoginCredentials,
  loginCredentialsSchema,
  LoginResponse,
} from "@/types";
import { Loader2, X } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

function Login() {
  const { toast } = useToast();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    userName: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      loginCredentialsSchema.parse(credentials);
      const result = await dispatch(login(credentials) as LoginResponse | any);

      if (login.fulfilled.match(result)) {
        toast({
          title: "Đăng nhập thành công",
          description: "Chào mừng bạn đã quay trở lại!",
          variant: "default",
        });
        navigate("/");
      } else {
        toast({
          title: "Đăng nhập thất bại",
          description: "Tên đăng nhập hoặc mật khẩu không chính xác",
          variant: "destructive",
        });
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errorMessage = err.errors[0].message;
        toast({
          variant: "destructive",
          description: errorMessage,
        });
      } else {
        toast({
          variant: "destructive",
          description: "Đã xảy ra lỗi không xác định",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-200 relative">
        <Link
          to="/"
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100/50 group transition-colors"
        >
          <X className="h-6 w-6 text-gray-500 group-hover:rotate-90 transition-transform" />
        </Link>
        <div className="flex flex-col items-center gap-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
              Đăng nhập
            </h1>
            <p className="text-gray-600">
              Nhập thông tin đăng nhập của bạn để tiếp tục
            </p>
          </div>

          <form onSubmit={handleLogin} className="w-full space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700">
                Tên đăng nhập
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Nhập tên đăng nhập"
                value={credentials.userName}
                onChange={(e) =>
                  setCredentials({ ...credentials, userName: e.target.value })
                }
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Mật khẩu
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Nhập mật khẩu"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
              />
            </div>

            <Button
              disabled={isLoading}
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang đăng nhập...
                </>
              ) : (
                "Đăng nhập"
              )}
            </Button>
            <p className="text-center text-sm text-gray-600">
              Chưa có tài khoản?{" "}
              <Link
                to="/register"
                className="font-medium text-orange-500 hover:text-orange-600 transition-colors"
              >
                Đăng ký ngay
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
