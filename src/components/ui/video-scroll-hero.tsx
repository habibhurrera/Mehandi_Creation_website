import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import "./video-scroll-hero.css";

interface VideoScrollHeroProps {
  videoSrc?: string;
  enableAnimations?: boolean;
  className?: string;
  startScale?: number;
  title?: React.ReactNode;
  subtitle?: string;
}

export function VideoScrollHero({
  videoSrc = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  enableAnimations = true,
  className = "",
  startScale = 0.25,
  title = (
    <>
      Crafting Timeless <span className="vsh-accent">Henna</span>
    </>
  ),
  subtitle = "Watch the artistry unfold as you scroll",
}: VideoScrollHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
  const [scrollScale, setScrollScale] = useState(startScale);
  // On phones a 0.25 start is too tiny — begin a bit larger, but small enough
  // that the grow-on-scroll is clearly visible.
  const [minScale, setMinScale] = useState(startScale);
  // Whether the user has started scrolling (hides the "Scroll down" hint).
  const [started, setStarted] = useState(false);

  // Reliable reduced-motion check via matchMedia (kept in sync).
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setShouldReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Raise the starting scale a little on small screens (but keep the growth obvious).
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setMinScale(mq.matches ? Math.max(startScale, 0.42) : startScale);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [startScale]);

  // Hide the "Scroll down" hint as soon as the user scrolls (works regardless of
  // reduced-motion, so the cue always disappears).
  useEffect(() => {
    const onScroll = () => setStarted(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!enableAnimations || shouldReduceMotion) {
      setScrollScale(1);
      return;
    }

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      // Progress (0 → 1) of the container scrolling past the viewport
      const scrolled = Math.max(0, -rect.top);
      const maxScroll = containerHeight - windowHeight;
      const progress = maxScroll > 0 ? Math.min(scrolled / maxScroll, 1) : 0;

      // Scale from the (responsive) start scale up to 1
      setScrollScale(minScale + progress * (1 - minScale));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll(); // initial

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [enableAnimations, shouldReduceMotion, minScale]);

  const shouldAnimate = enableAnimations && !shouldReduceMotion;

  return (
    <div className={`vsh-root ${className}`}>
      <div ref={containerRef} className="vsh-track">
        <div className="vsh-sticky">
          {/* Scroll hint — fades out once the user starts scrolling */}
          <motion.div
            className="vsh-hint"
            animate={{ opacity: started ? 0 : 1, y: started ? -10 : 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            aria-hidden="true"
          >
            <span>Scroll down</span>
            <ChevronDown className="vsh-hint-chevron" size={20} />
          </motion.div>

          <div
            className="vsh-scaler"
            style={{
              transform: shouldAnimate ? `scale(${scrollScale})` : "scale(1)",
              transformOrigin: "center center",
            }}
          >
            <video autoPlay loop muted playsInline className="vsh-video">
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Overlay content */}
            <motion.div
              className="vsh-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="vsh-overlay-inner">
                <motion.h1
                  className="vsh-title"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8, type: "spring", stiffness: 200, damping: 25 }}
                >
                  {title}
                </motion.h1>
                <motion.p
                  className="vsh-sub"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.8, type: "spring", stiffness: 200, damping: 25 }}
                >
                  {subtitle}
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
