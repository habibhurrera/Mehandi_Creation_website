import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
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

  // Reliable reduced-motion check via matchMedia (kept in sync).
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setShouldReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
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

      // Scale from startScale up to 1
      setScrollScale(startScale + progress * (1 - startScale));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll(); // initial

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [enableAnimations, shouldReduceMotion, startScale]);

  const shouldAnimate = enableAnimations && !shouldReduceMotion;

  return (
    <div className={`vsh-root ${className}`}>
      <div ref={containerRef} className="vsh-track">
        <div className="vsh-sticky">
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
