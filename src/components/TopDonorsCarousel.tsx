'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Donor {
  rank: number;
  name: string;
  donations: { amount: number };
  profileImage?: string;
}

interface TopDonorsCarouselProps {
  topDonors: Donor[];
}

export default function TopDonorsCarousel({ topDonors }: TopDonorsCarouselProps) {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView="auto"
      pagination={{ clickable: true }}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    >
      {topDonors.map((donor) => (
        <SwiperSlide key={donor.rank} className="w-[80%] sm:w-[60%] md:w-[40%]">
          <div className="p-4 bg-white rounded-lg shadow-lg m-4 shadow hover:shadow-md sm:hover:shadow-lg transition-all duration-300 sm:hover:scale-105 active:scale-95">
            <img
              src={donor.profileImage || '/default-avatar.png'}
              alt={donor.name}
              className="w-16 h-16 rounded-full mx-auto mb-4"
            />
            <h3 className="text-lg font-medium text-center">{donor.name}</h3>
            <p className="text-sm text-gray-500 text-center">${donor.donations.amount.toLocaleString()}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
