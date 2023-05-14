import styles from "./Slide.module.scss";
import SlideCard from "../SlideCard/SlideCard";
// Import Swiper React Related
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { IAccount } from "../../api/resTypes";

interface ISlideProps {
  topAccounts?: IAccount[];
}

const Slide = (props: ISlideProps) => {
  const { topAccounts } = props;

  return (
    <>
      <h2 className={styles.slideTitle}>Top Users</h2>
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
        {topAccounts?.map((e: IAccount) => (
          <SwiperSlide key={e.id}>
            <SlideCard account={e} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Slide;

Slide.defaultProps = {
  topUsers: [],
};
