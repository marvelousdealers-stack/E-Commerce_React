// Entrance animations for framer-motion. Each one fades in while sliding 30px:
// SlideUp from below, SlideLeft from the right, SlideRight from the left.
// "delay" (in seconds) lets items appear one after another.
const easing = [0.22, 1, 0.36, 1];

export const SlideUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: easing } },
});

export const SlideLeft = (delay = 0) => ({
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay, ease: easing } },
});

export const SlideRight = (delay = 0) => ({
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay, ease: easing } },
});
