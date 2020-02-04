import React, { useCallback, useEffect, useRef, useState } from 'react';

const containerStyle = (aspectRatio: number) => {
  return {
    position: 'relative' as 'relative',
    width: '100%',
    paddingTop: `${aspectRatio! * 100}%`,
  };
}

// Basic slide Style
type Transition = 'next' | 'previous' | 'jump';
const slideStyle = (aspectRatio: number, isCurrent: boolean, isOld?: boolean, transition?: Transition) => {

  return {
    background: 'magenta',
    paddingTop: `${aspectRatio! * 100}%`,
    width: '100%',
    position: 'absolute' as 'absolute',
    top: 0,
    left: 0,
    opacity: 0,

    // Current Slide Style
    ...(isCurrent ? {
      border: '2px solid magenta',
      opacity: 1,
    } : {}),

    // Old Slide Style
    // TODO

  };
}

export interface SlideImage {
  src: string;
  alt?: string
}

export interface CarouselProps {
  /**
   * Array of SlideImage objects { src: string; alt?: string; } for carousel
   */
  slides: SlideImage[];

  /**
   * Time between slide display in seconds
   */
  timeout?: number;


  /**
   * Aspect Ratio for slides as a fraction. Defaults to 16:9 (9 / 16 as a fraction)
   */
  aspectRatio?: number;
};

/**
 * The image carousel takes an array of image urls (ideally with alt text)
 * and will loop through them at the specified interval.
 *
 * MVP:
 * - [ ] Basic Slide Transition
 * - [ ] Auto-advance every 10 sec
 * - [ ] Pause advance on hover
 * - [ ] Loop after last
 * - [ ] Prev/Next Controls
 * - [ ] Paging dots
 * - [ ] responsive to 480px
 * - [ ] Meets Accessibility Standards
 *
 * nth:
 * - [ ] Timeout bar
 * - [ ] custom page components
 */
export const Carousel = ({
  slides = [],
  timeout = 10,
  aspectRatio = 9 / 16,
}: CarouselProps) => {
  // current slide state
  const [currentSlide, setCurrentSlide] = useState(0);
  // State for handling slide transitions
  const [oldSlide, setOldSlide] = useState(-1);
  const [transition, setTransition] = useState('next');
  // Track timeout and remaining pause time as refs to avoid unnecessary renders
  const timerRef = useRef<(ReturnType<typeof setTimeout>)>();
  const pauseTimeRef = useRef<number | null>(null);

  // slide navigation callbacks
  const goToSlide = useCallback((idx: number, transition: Transition = 'jump') => {
    if (idx < slides.length) {
      setOldSlide(currentSlide);
      setCurrentSlide(idx);
      setTransition(transition);
    }
  }, [setCurrentSlide]);
  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length, 'next');
  }, [slides, currentSlide, setCurrentSlide]);
  const previousSlide = useCallback(() => {
    goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1, 'previous');
  }, [slides, currentSlide, setCurrentSlide]);


  // Slide Timer function
  const advanceSlideTimeout = useCallback((timer: number = timeout) => {
     timerRef.current = setTimeout(() => {
      nextSlide();
    }, timer * 1000);
  }, [nextSlide]);

  // Pause functionality for hover




  useEffect(() => {
    // Set timer to auto advance slides
    advanceSlideTimeout();

    return () => {
      // Clear any set timeouts
      clearTimeout(timerRef.current!)
    }
  })

  // We don't like empty carousels!
  if (!slides || !slides.length) {
    return null;
  }

  return (
    <div className="carousel" style={{ position: 'relative' }}>
      <div className="slide-container" style={containerStyle(aspectRatio)}>
        {slides.map((slide, idx) => {
          const isCurrent = idx === currentSlide;
          const isOld = idx === oldSlide;

          return (
            <div key={`slide-${idx}-${slide.src}`} style={{ ...slideStyle(aspectRatio, isCurrent, isOld) }}>
              <div style={{ position: 'absolute' as 'absolute', top: 0, right: 0, bottom: 0, left: 0, overflow: 'hidden' }}>
                <img style={{ objectFit: 'cover', width: '100%', height: '100%', objectPosition: 'center' }} src={slide.src} alt={slide.alt} />
              </div>
            </div>
          )
        })}
      </div>
      <div className="controls" style={{ position: 'absolute', zIndex: 10, top: 0, right: 0, bottom: 0, left: 0 }}>
        <div onClick={previousSlide}>
          Previous
        </div>
        <div onClick={nextSlide}>
          Next
        </div>
        <div className="dots">
          {slides.map((slide, idx) => {
            const isCurrent = idx === currentSlide;

            return (
              <div
                key={`goto-slide-${idx}-${slide.src}`}
                className="dot"
                onClick={() => goToSlide(idx)}
                style={{ color: isCurrent ? 'magenta' : 'black'}}
              >
                {idx}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Carousel;