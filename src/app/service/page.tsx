import type { NextPage } from 'next';
import SubscriptionCard from '@/components/SubscriptionCard';
import Header from '@/components/Header';

const Service: NextPage = () => {
  return (
    <div className="container">
      <Header />
      <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base/7 font-semibold text-indigo-600">Pricing</h2>
        <p className="mt-2 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
          Choose the right plan for you
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-gray-600 sm:text-xl/8">
        Choose an affordable plan that’s packed with the best features for engaging your audience, creating customer
        loyalty, and driving sales.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-5 py-2 mt-16 ">
        {/* Gói Free */}
        <SubscriptionCard
          title="Miễn phí"
          price="$0 USD / tháng"
          features={[
            "Truy cập vào GPT-4.0 mini",
            "Chat bằng giọng thoại tiêu chuẩn",
            "Quyền truy cập hạn chế vào GPT-4.0",
            "Hạn chế quyền truy cập vào các tính năng tải tệp lên, phân tích dữ liệu nâng cao, duyệt web và tạo ảnh",
            "Sử dụng GPT tùy chỉnh"
          ]}
          currentPlan={true}
        />

        {/* Gói Premium */}
        <SubscriptionCard
          title="Premium"
          price="$19.99 USD / tháng"
          features={[
            "Truy cập đầy đủ vào GPT-4.0",
            "Chat bằng giọng nói nâng cao",
            "Tải tệp lên và phân tích dữ liệu nâng cao",
            "Duyệt web và tạo ảnh không giới hạn",
            "Ưu tiên hỗ trợ khách hàng"
          ]}
          currentPlan={false}
        />

        {/* Gói Enterprise */}
        <SubscriptionCard
          title="Enterprise"
          price="Liên hệ để biết giá"
          features={[
            "Tùy chỉnh theo nhu cầu của doanh nghiệp",
            "Hỗ trợ tích hợp API",
            "Đội ngũ hỗ trợ riêng",
            "Tính năng bảo mật và quyền riêng tư nâng cao",
            "Báo cáo và phân tích dữ liệu chuyên sâu"
          ]}
          currentPlan={false}
        />
      </div>
    </div>
    </div>
  );
};

export default Service;
