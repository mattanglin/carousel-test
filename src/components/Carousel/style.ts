import { Transition } from './types';

const transitionTime = 1000;
const bounceEase = 'cubic-bezier(0.68, -0.55, 0.265, 1.55)';

/**
 * Styles for carousel container wrapping element
 * @param aspectRatio
 */
export const containerStyle = (aspectRatio: number) => {
  return {
    position: 'relative' as 'relative',
    width: '100%',
    paddingTop: `${aspectRatio! * 100}%`,
    overflow: 'hidden',
  };
};

/**
 * Styles for slide elements
 *
 * @param aspectRatio
 * @param isCurrent
 * @param isOld
 * @param transition
 */
export const slideStyle = (
  aspectRatio: number,
  isCurrent: boolean,
  isOld?: boolean,
  transition?: Transition
) => {

  return {
    paddingTop: `${aspectRatio! * 100}%`,
    width: '100%',
    position: 'absolute' as 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
    transition: `${transitionTime}ms transform ${bounceEase}, ${transitionTime}ms opacity ease-out`,
    // Set transition base states according to transition type
    ...(transition === 'next' ? { transform: 'translate(100%, 0)' } : {}),
    ...(transition === 'previous' ? { transform: 'translate(-100%, 0)' } : {}),
    ...(transition === 'jump' ? { opacity: 0 } : {}),


    // Current Slide Style
    ...(isCurrent ? {
      opacity: 1,
      ...(transition === 'jump' ? { opacity: 1, } : { transform: 'translate(0%, 0)' })
    } : {}),

    // Old Slide Style
    ...(isOld ? {
      ...(transition === 'next' ? {
        transform: 'translate(-100%, 0)',
        transition: `${transitionTime}ms transform ${bounceEase}, 1ms opacity ${transitionTime}ms`,
      } : {}),
      ...(transition === 'previous' ? {
        transform: 'translate(100%, 0)',
        transition: `${transitionTime}ms transform ${bounceEase}, 1ms opacity ${transitionTime}ms`,
      } : {}),
      ...(transition === 'jump' ? {
        opacity: 0,
        transform: `${transitionTime}ms opacity ease-out`
      } : {}),

    }: {}),

  };
}

export const previousSlideStyle = {
  position: 'absolute' as 'absolute',
  width: '30%',
  height: '100%',
  top: 0,
  left: 0,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center'
};
export const nextSlideStyle = {
  position: 'absolute' as 'absolute',
  width: '70%',
  height: '100%',
  top: 0,
  right: 0,
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center'
};
export const slideNavigatorStyle = {
  position: 'absolute' as 'absolute',
  width: '100%',
  left: 0,
  bottom: 0,
  display: 'flex',
  justifyContent: 'center',
  pointerEvents: 'none' as 'none',
}
export const slideNavigatorDotStyle = (isCurrent: boolean) => ({
  width: 8,
  height: 8,
  backgroundColor: 'rgba(255,255,255,0.5)',
  borderRadius: '50%',
  margin: 4,
  marginBottom: 16,
  transition: `300ms transform ${bounceEase}`,
  transform: 'scale(1,1)',
  ...(isCurrent ? { transform: 'scale(1.4, 1.4)'} : {})
});
