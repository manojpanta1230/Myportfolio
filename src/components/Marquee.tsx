"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;

    let direction = 1; // 1 = forward, -1 = backward
    
    const marqueeAnimation = gsap.to(textRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 15,
      repeat: -1,
    });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        if (self.direction !== direction) {
          direction = self.direction;
          gsap.to(marqueeAnimation, {
            timeScale: direction,
            overwrite: true
          });
        }
      }
    });

    return () => {
      marqueeAnimation.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="py-8 md:py-12 bg-accent text-black overflow-hidden relative rotate-2 scale-110">
      <div className="whitespace-nowrap flex" ref={textRef}>
        {/* Double the text to create a seamless loop */}
        <h2 className="font-display text-4xl md:text-7xl font-bold uppercase tracking-tighter px-4">
          DEVELOPMENT ✦ DESIGN ✦ EXPERIENCE ✦ TECHNOLOGY ✦ DEVELOPMENT ✦ DESIGN ✦ EXPERIENCE ✦ TECHNOLOGY ✦ 
        </h2>
      </div>
    </section>
  );
}
