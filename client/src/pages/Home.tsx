import { Home_People, Home_Video } from "@/assets/Home";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Settings, Shield, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="flex-1 overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden rounded-t-[2rem]">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover brightness-50 "
        >
          <source src={Home_Video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-6xl md:text-[5.5rem] font-bold mb-8">
            Nâng Tầm{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-600 text-transparent bg-clip-text">
              Trải Nghiệm Gaming
            </span>
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-12 text-gray-200">
            Khám phá hiệu năng vượt trội với những chiếc PC được tùy chỉnh riêng
            cho bạn
          </p>
          <div className="flex flex-col md:flex-row gap-6">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Khám Phá Ngay
              <ArrowRight className="ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-6 rounded-full text-lg hover:bg-white/20 shadow-lg hover:shadow-xl transition-all hover:text-white"
            >
              Xem Video Giới Thiệu
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900 px-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src={Home_People}
                alt="PC Gaming Setup"
                className="rounded-[2rem] scale-[.9] shadow-2xl transform hover:scale-[.93] transition duration-500"
              />
              <div className="absolute -bottom-4 -right-10 bg-gradient-to-r from-orange-500 to-red-600 p-8 rounded-[2rem] hidden md:block shadow-xl">
                <p className="text-4xl font-bold text-white">10+</p>
                <p className="text-white/80">Năm Kinh Nghiệm</p>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
                Về Chúng Tôi
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Chúng tôi tự hào mang đến những giải pháp công nghệ tối ưu nhất,
                được thiết kế riêng cho từng nhu cầu của khách hàng.
              </p>

              <div className="grid grid-cols-2 gap-8">
                <div className="p-6 bg-gray-800/50 rounded-2xl hover:shadow-xl transition-all">
                  <p className="text-4xl font-bold text-orange-500 mb-2">
                    5000+
                  </p>
                  <p className="text-gray-400">PC Đã Lắp Đặt</p>
                </div>
                <div className="p-6 bg-gray-800/50 rounded-2xl hover:shadow-xl transition-all">
                  <p className="text-4xl font-bold text-orange-500 mb-2">
                    24/7
                  </p>
                  <p className="text-gray-400">Hỗ Trợ Kỹ Thuật</p>
                </div>
                <div className="p-6 bg-gray-800/50 rounded-2xl hover:shadow-xl transition-all">
                  <p className="text-4xl font-bold text-orange-500 mb-2">
                    100%
                  </p>
                  <p className="text-gray-400">Khách Hàng Hài Lòng</p>
                </div>
                <div className="p-6 bg-gray-800/50 rounded-2xl hover:shadow-xl transition-all">
                  <p className="text-4xl font-bold text-orange-500 mb-2">365</p>
                  <p className="text-gray-400">Ngày Bảo Hành</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="pb-32 pt-10 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden px-10">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
            Tại Sao Chọn Chúng Tôi?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group p-6 bg-gray-800/20 backdrop-blur-sm rounded-2xl hover:bg-gray-800/40 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 rounded-b-[2rem]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-white mb-8">
            Sẵn Sàng Xây Dựng PC Trong Mơ?
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12">
            Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ bạn tạo nên
            chiếc PC hoàn hảo phù hợp với nhu cầu và ngân sách của bạn.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
            >
              Bắt Đầu Ngay
              <ArrowRight className="ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-black hover:bg-white/10 px-8 py-6 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
            >
              Liên Hệ Tư Vấn
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    title: "Tùy Chỉnh Hoàn Toàn",
    description:
      "Tự do lựa chọn từng linh kiện theo nhu cầu và sở thích của bạn.",
    icon: Settings,
  },
  {
    title: "Hiệu Năng Cao Cấp",
    description:
      "Trải nghiệm tốc độ và sức mạnh vượt trội với các linh kiện hàng đầu.",
    icon: Star,
  },
  {
    title: "Bảo Hành Tận Tâm",
    description: "Chế độ bảo hành ưu việt cùng đội ngũ kỹ thuật chuyên nghiệp.",
    icon: Shield,
  },
  {
    title: "Hỗ Trợ 24/7",
    description: "Đội ngũ chuyên gia luôn sẵn sàng hỗ trợ bạn mọi lúc mọi nơi.",
    icon: Clock,
  },
];
