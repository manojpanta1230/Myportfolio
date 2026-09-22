"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="py-32 bg-background text-foreground" id="about">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h2 className="font-display text-5xl md:text-8xl font-bold uppercase tracking-tighter mb-8 leading-[0.9]">
            I'M A DEVELOPER <br />
            WHO LOVES TURNING <br />
            <span className="text-accent">IDEAS INTO PRODUCTS.</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 text-foreground/70">
            <p className="text-lg">
              I am Manoj Panta, a Full Stack Developer, Managing Director & Founder at Birvex Tech Pvt Ltd based in Kathmandu, Nepal.
            </p>
            <p className="text-lg">
              I specialize in frontend and full stack web development using React, JavaScript, Node.js, and modern web technologies. I build fast, responsive, and SEO-friendly websites and digital solutions for businesses, startups, and individuals worldwide.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
