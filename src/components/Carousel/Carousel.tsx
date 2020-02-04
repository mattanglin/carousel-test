import React from 'react';

export interface CarouselProps {
  /**
   * Array of remote image src urls for carousel
   */
  images?: string[];

};

export const Carousel = ({
  images = [],
}: CarouselProps) => {
  console.log({ images });

  return (
    <div>Carousel Component</div>
  );
};

export default Carousel;