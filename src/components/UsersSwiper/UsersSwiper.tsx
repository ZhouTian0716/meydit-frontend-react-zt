// This is under review for future implementation

import React from "react";
import { register } from "swiper/element/bundle";

register();

function UsersSwiper() {
  return (
    <swiper-container navigation pagination>
      <swiper-slide className="blue-slide">Slide ddd</swiper-slide>
      <swiper-slide className="yellowSlide">Slide 2</swiper-slide>
      <swiper-slide className="green-slide">Slide 3</swiper-slide>
    </swiper-container>
  );
}

export default UsersSwiper;
