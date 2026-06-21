import { motion, type Variants } from 'framer-motion';
import './image-tiles.css';

interface ImageRevealProps {
  leftImage: string;
  middleImage: string;
  rightImage: string;
}

export default function ImageReveal({ leftImage, middleImage, rightImage }: ImageRevealProps) {
  const containerVariants: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { delay: 0.2, staggerChildren: 0.2 },
    },
  };

  const leftImageVariants: Variants = {
    initial: { rotate: 0, x: 0, y: 0 },
    animate: { rotate: -8, x: -150, y: 10, transition: { type: 'spring', stiffness: 120, damping: 12 } },
    hover: { rotate: 1, x: -160, y: 0, transition: { type: 'spring', stiffness: 200, damping: 15 } },
  };

  const middleImageVariants: Variants = {
    initial: { rotate: 0, x: 0, y: 0 },
    animate: { rotate: 6, x: 0, y: 0, transition: { type: 'spring', stiffness: 120, damping: 12 } },
    hover: { rotate: 0, x: 0, y: -10, transition: { type: 'spring', stiffness: 200, damping: 15 } },
  };

  const rightImageVariants: Variants = {
    initial: { rotate: 0, x: 0, y: 0 },
    animate: { rotate: -6, x: 200, y: 20, transition: { type: 'spring', stiffness: 120, damping: 12 } },
    hover: { rotate: 3, x: 200, y: 10, transition: { type: 'spring', stiffness: 200, damping: 15 } },
  };

  return (
    <motion.div
      className="it-wrap"
      variants={containerVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-80px' }}
    >
      {/* Left image — lowest z-index */}
      <motion.div
        className="it-card it-origin-br"
        variants={leftImageVariants}
        whileHover="hover"
        style={{ zIndex: 30 }}
      >
        <img src={leftImage} alt="Mehndi design" loading="lazy" />
      </motion.div>

      {/* Middle image — middle z-index */}
      <motion.div
        className="it-card it-origin-bl"
        variants={middleImageVariants}
        whileHover="hover"
        style={{ zIndex: 20 }}
      >
        <img src={middleImage} alt="Mehndi design" loading="lazy" />
      </motion.div>

      {/* Right image — highest z-index */}
      <motion.div
        className="it-card it-origin-br"
        variants={rightImageVariants}
        whileHover="hover"
        style={{ zIndex: 10 }}
      >
        <img src={rightImage} alt="Mehndi design" loading="lazy" />
      </motion.div>
    </motion.div>
  );
}
