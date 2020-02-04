import React from 'react';

export interface CarouselProps {
  /**
   * Array of remote image src urls for carousel
   */
  images?: string[];

};

const Carousel: React.FC<CarouselProps> = ({
  images = [],
}) => {
  console.log({ images });

  return (
    <div>Carousel Component</div>
  );
};

export default Carousel;