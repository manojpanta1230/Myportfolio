"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Intro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <section ref={containerRef} className="py-32 bg-background border-t border-border-subtle" id="intro">
      <div className="container mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.1 } }
          }}
          className="max-w-4xl"
        >
          <motion.h2 
            style={{ opacity, y }}
            className="font-display text-4xl md:text-7xl font-bold uppercase leading-[1.1] mb-12 tracking-tighter"
          >
            I BUILD DIGITAL <br />
            EXPERIENCES THAT <br />
            PEOPLE REMEMBER.
          </motion.h2>

          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 text-foreground/70 text-lg md:text-xl font-sans"
          >
            <p>
              I specialize in frontend and full stack web development using modern technologies. 
              My approach combines technical excellence with aesthetic sensitivity.
            </p>
            <p>
              Every project is an opportunity to create something memorable—a digital experience 
              that feels intuitive, performs flawlessly, and leaves a lasting impression.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
