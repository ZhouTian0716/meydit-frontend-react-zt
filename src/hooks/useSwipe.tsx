import React, { TouchEvent, useState } from "react";

interface SwipeInput {
  onSwipedLeft: (e: React.TouchEvent<Element>) => void;
  onSwipedRight: () => void;
}

interface SwipeOutput {
  onTouchStart: (e: TouchEvent) => void;
  onTouchMove: (e: TouchEvent) => void;
  onTouchEnd: (e: TouchEvent) => void;
}

export default (input: SwipeInput): SwipeOutput => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const minSwipeDistance = 50;

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(0); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
    // return target;
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (e: TouchEvent) => {
    const event = e;
    // console.log("touch end", target);
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      input.onSwipedLeft(event);
    }
    if (isRightSwipe) {
      input.onSwipedRight();
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
};

// in the component

// import useSwipe from "whatever-path/useSwipe";
// const swipeHandlers = useSwipe({ onSwipedLeft: () => console.log('left'), onSwipedRight: () => console.log('right') });
// <div {...swipeHandlers}>some swipeable div (or whatever html tag)</div>
