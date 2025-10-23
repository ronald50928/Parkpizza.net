/**
 * Reusable Framer Motion animation variants
 * Inspired by industry-leading animation patterns
 */

import { Variants } from 'framer-motion'

// Fade animations
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } // Custom easing
  }
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
}

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
}

// Scale animations
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
}

export const scaleOnHover: Variants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  tap: { scale: 0.95 }
}

// Stagger animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

// Slide animations
export const slideInFromRight: Variants = {
  hidden: { x: '100%', opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeIn' }
  }
}

export const slideInFromLeft: Variants = {
  hidden: { x: '-100%', opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  },
  exit: {
    x: '-100%',
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeIn' }
  }
}

// Number counter animation
export const numberCounter = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3 }
}

// Button animations
export const buttonHover: Variants = {
  rest: { scale: 1, y: 0 },
  hover: { 
    scale: 1.03, 
    y: -2,
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  tap: { scale: 0.97, y: 0 }
}

export const buttonPulse: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      repeatType: 'loop'
    }
  }
}

// Badge/Achievement animations
export const badgeUnlock: Variants = {
  hidden: { scale: 0, rotate: -180, opacity: 0 },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
      duration: 0.6
    }
  }
}

export const badgeFloat: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut'
    }
  }
}

// Progress bar animations
export const progressBar: Variants = {
  initial: { scaleX: 0, originX: 0 },
  animate: (progress: number) => ({
    scaleX: progress / 100,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  })
}

// Modal/Dialog animations
export const modalOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.2 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, delay: 0.1 }
  }
}

export const modalContent: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      duration: 0.3, 
      ease: [0.22, 1, 0.36, 1],
      delay: 0.1 
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: { duration: 0.2 }
  }
}

// Toast notification animations
export const toastSlideIn: Variants = {
  initial: { x: 400, opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: { 
      type: 'spring',
      stiffness: 300,
      damping: 25
    }
  },
  exit: {
    x: 400,
    opacity: 0,
    transition: { duration: 0.2 }
  }
}

// Ripple effect (for buttons)
export const ripple = {
  initial: { scale: 0, opacity: 0.5 },
  animate: {
    scale: 2.5,
    opacity: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

// Shake animation (for errors)
export const shake: Variants = {
  animate: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 }
  }
}

// Bounce animation
export const bounce: Variants = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
}

// Rotate animation
export const rotate360: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      ease: 'linear',
      repeat: Infinity
    }
  }
}

// Gradient shift (for text)
export const gradientShift: Variants = {
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: {
      duration: 3,
      ease: 'linear',
      repeat: Infinity
    }
  }
}

// Page transition
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: 'easeIn' }
  }
}

// Parallax scroll effect
export const parallaxY = (offset: number) => ({
  initial: { y: 0 },
  animate: { y: offset },
  transition: { duration: 0, ease: 'linear' }
})

// Viewport animation config (for useInView)
export const viewportConfig = {
  once: true, // Animate only once when in view
  amount: 0.3, // Trigger when 30% visible
  margin: '0px 0px -100px 0px' // Start animation 100px before element enters viewport
}

export const viewportConfigRepeat = {
  once: false, // Animate every time
  amount: 0.3,
  margin: '0px 0px -50px 0px'
}

