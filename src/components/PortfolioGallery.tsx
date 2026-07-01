import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// The 18 mehndi photos live in /public/portfolio (filenames are sequential).
const IMAGES = Array.from({ length: 18 }, (_, i) => `/portfolio/${1000259655 + i}.jpg`);

const SUPPORTS_IO = typeof window !== 'undefined' && 'IntersectionObserver' in window;
const EASE = [0.25, 1, 0.5, 1] as const;

export function PortfolioGallery() {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(
    () => setOpen((i) => (i === null ? i : (i - 1 + IMAGES.length) % IMAGES.length)),
    [],
  );
  const next = useCallback(
    () => setOpen((i) => (i === null ? i : (i + 1) % IMAGES.length)),
    [],
  );

  // Keyboard control + scroll lock while the lightbox is open.
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, prev, next]);

  return (
    <>
      <div className="pf-masonry">
        {IMAGES.map((src, i) => (
          <motion.button
            type="button"
            key={src}
            className="pf-item"
            onClick={() => setOpen(i)}
            aria-label={`Open Mehndi design ${i + 1}`}
            initial={SUPPORTS_IO ? { opacity: 0, y: 26 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: EASE, delay: (i % 4) * 0.08 }}
          >
            <img src={src} alt={`Bridal mehndi design ${i + 1}`} loading="lazy" />
            <span className="pf-overlay" aria-hidden="true" />
          </motion.button>
        ))}
      </div>

      {createPortal(
        <AnimatePresence>
          {open !== null && (
            <motion.div
              className="pf-lightbox"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <button className="pf-lb-btn pf-lb-close" onClick={close} aria-label="Close">
                <X size={22} />
              </button>
              <button
                className="pf-lb-btn pf-lb-prev"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Previous"
              >
                <ChevronLeft size={26} />
              </button>
              <motion.img
                key={open}
                className="pf-lb-img"
                src={IMAGES[open]}
                alt={`Bridal mehndi design ${open + 1}`}
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.28, ease: EASE }}
              />
              <button
                className="pf-lb-btn pf-lb-next"
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Next"
              >
                <ChevronRight size={26} />
              </button>
              <div className="pf-lb-count">{open + 1} / {IMAGES.length}</div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
