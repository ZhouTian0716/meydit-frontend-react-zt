import styles from "./Slide.module.scss";
import { ITopMaker } from "../../types";
import SlideCard from "../SlideCard/SlideCard";
// Import Swiper React Related
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

interface ISlideProps {
  topMakers?: ITopMaker[] | null;
}

const Slide = (props: ISlideProps) => {
  const { topMakers } = props;

  return (
    <>
      <h2 className={styles.slideTitle}>Top Makers</h2>
      <Swiper
        grabCursor={true}
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        navigation={true}
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
        {topMakers?.map((e: ITopMaker) => (
          <SwiperSlide key={e.id}>
            <SlideCard item={e} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Slide;

Slide.defaultProps = {
  topMakers: null,
};
