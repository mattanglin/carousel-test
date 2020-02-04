import React, {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import {
  containerStyle,
  slideStyle,
  slideNavigatorStyle,
  slideNavigatorDotStyle,
  previousSlideStyle,
  nextSlideStyle,
} from './style';
import {
  Transition,
  SlideImage,
} from './types';
import NextArrow from './NextArrow';
import PreviousArrow from './PreviousArrow';

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
 * - [x] Auto-advance every 10 sec
 * - [x] Pause advance on hover
 * - [x] Loop after last
 * - [x] Prev/Next Controls
 * - [x] Paging dots
 * - [x] responsive to 480px
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
  const [transition, setTransition] = useState<Transition>('next');

  // Track timeout state and remaining pause time as refs to avoid unnecessary renders
  const [carouselIsActive, setCarouselIsActive] = useState(true);

  const timeoutRef = useRef<(ReturnType<typeof setTimeout>)>();
  const lastSlideTimeoutRef = useRef<number>();
  const remainingTimeRef = useRef<number>();

  // slide navigation callbacks
  const goToSlide = useCallback((idx: number, transition: Transition = 'jump') => {
    // Only change if we're going to a new, valid slide
    if (idx !== currentSlide && idx < slides.length) {
      // Store time of slide change && Reset remaining time (in case of pause)
      lastSlideTimeoutRef.current = Date.now();
      remainingTimeRef.current = timeout * 1000;

      // Set current slide, old slide, and transition type
      setTransition(transition);
      setCurrentSlide(idx);
      setOldSlide(currentSlide);
    }
  }, [currentSlide, slides.length, timeout]);
  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length, 'next');
  }, [goToSlide, slides, currentSlide]);
  const previousSlide = useCallback(() => {
    goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1, 'previous');
  }, [goToSlide, slides, currentSlide]);

  // Slide timeout callback
  const advanceSlideTimeout = useCallback((timer: number = (timeout * 1000)) => {
     timeoutRef.current = setTimeout(() => nextSlide(), timer);
  }, [nextSlide, timeout]);

  // Pause/resume functionality for hover
  const pauseSlides = useCallback(() =>  setCarouselIsActive(false), []);
  const resumeSlides = useCallback(() =>  setCarouselIsActive(true), []);

  // Handle carousel pausing/unpausing
  useEffect(() => {
    if (carouselIsActive) {
      // Resume carousel with remeaining time when resuming active
      advanceSlideTimeout(remainingTimeRef.current!)
    } else {
      // Stop carousel auto-advance timeout and store remaining transition time
      clearTimeout(timeoutRef.current!);
      remainingTimeRef.current = Date.now() - lastSlideTimeoutRef.current!;
    }
  }, [carouselIsActive]);

  // Handle carousel auto-advance slide changes
  useEffect(() => {
    // Auto-advance slide if not paused
    if (carouselIsActive) {
      advanceSlideTimeout();
    }

    // Clear any auto-advance timeouts on unmount
    return () => {
      clearTimeout(timeoutRef.current!)
    }
  }, [currentSlide])

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
            <div key={`slide-${idx}-${slide.src}`} style={{ ...slideStyle(aspectRatio, isCurrent, isOld, transition) }}>
              <div style={{ position: 'absolute' as 'absolute', top: 0, right: 0, bottom: 0, left: 0, overflow: 'hidden' }}>
                <img style={{ objectFit: 'cover', width: '100%', height: '100%', objectPosition: 'center' }} src={slide.src} alt={slide.alt} />
              </div>
            </div>
          )
        })}
      </div>
      <div
        className="controls"
        style={{ position: 'absolute', zIndex: 10, top: 0, right: 0, bottom: 0, left: 0 }}
        onMouseEnter={pauseSlides}
        onMouseLeave={resumeSlides}
      >
        <div onClick={previousSlide} style={previousSlideStyle}>
          <PreviousArrow />
        </div>
        <div onClick={nextSlide} style={nextSlideStyle}>
          <NextArrow />
        </div>
        <div className="dots" style={slideNavigatorStyle}>
          {slides.map((slide, idx) => {
            const isCurrent = idx === currentSlide;

            return (
              <div
                key={`goto-slide-${idx}-${slide.src}`}
                className="dot"
                onClick={() => goToSlide(idx)}
                style={slideNavigatorDotStyle(isCurrent)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Carousel;