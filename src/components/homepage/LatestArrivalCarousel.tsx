"use client";

import type { CarWithImages } from "@/config/types";
import dynamic from "next/dynamic";
import "swiper/css";
import { Prisma } from "@prisma/client";
import { Navigation } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import CarCard from "../inventory/car-card";
import SwiperButton from "../shared/swiper-button";

interface LatestArrivalCarouselProps {
  cars: CarWithImages[];
  favourites: number[];
}
const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), {
  ssr: false,
  loading: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-8">
      {[1, 2, 3, 4].map((i) => (
        <div key={i}>
            Loading...
        </div>
      ))}
    </div>
  ),
});

export const LatestArrivalsCarousel = (props: LatestArrivalCarouselProps) => {
    const { cars, favourites } = props;

  return (
    <div className="mt-8 relative">
        <Swiper
				navigation={{
					prevEl: ".swiper-button-prev",
					nextEl: ".swiper-button-next",
				}}
				pagination={{ clickable: true }}
				modules={[Navigation]}
				spaceBetween={30}
				slidesPerView={1}
				breakpoints={{
					640: {
						slidesPerView: 2,
					},
					1024: {
						slidesPerView: 3,
					},
					1536: {
						slidesPerView: 4,
					},
				}}
			>
				{cars.map((car) => {
					return (
						<SwiperSlide key={car.id}>
							<CarCard car={car} favourites={favourites} />
						</SwiperSlide>
					);
				})}
			</Swiper>
			<SwiperButton
				prevClassName="-left-8 lg:-left-16 border border-2 border-border flex"
				nextClassName="-right-8 lg:-right-16 border border-2 border-border flex"
			/>
    </div>
  )
};
