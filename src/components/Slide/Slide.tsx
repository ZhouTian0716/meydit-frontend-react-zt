import React from "react";
// import required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import SlideCard from "../SlideCard/SlideCard";
// Import Swiper React Related
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { IAccount } from "../../api/resTypes";

interface IProps {
  topAccounts?: IAccount[];
}

function Slide({ topAccounts }: IProps) {
  return (
    <>
      <Swiper
        grabCursor
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          el: ".swiper-users-pagination",
          clickable: true,
        }}
        navigation
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 40,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {topAccounts?.map((e: IAccount) => (
          <SwiperSlide key={e.id}>
            <SlideCard account={e} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-users-pagination" />
    </>
  );
}

export default Slide;

Slide.defaultProps = {
  topAccounts: [],
};
