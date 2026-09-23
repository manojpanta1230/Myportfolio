"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { motion, Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ParticleSystem(props: any) {
  const ref = useRef<any>(null);
  // Generate random points in a sphere
  const sphere = random.inSphere(new Float32Array(3000), { radius: 1.5 });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#ccff00"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function Hero({ settings }: { settings?: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("preloader_shown") === "true") {
      setIsReady(true);
    }
    const handleReady = () => setIsReady(true);
    window.addEventListener("preloaderComplete", handleReady);
    return () => window.removeEventListener("preloaderComplete", handleReady);
  }, []);

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  const scrollItem: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  useEffect(() => {
    // Parallax effect on scroll (removed opacity fade out)
    if (textRef.current && containerRef.current) {
      gsap.to(textRef.current, {
        yPercent: -30,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-background text-foreground py-20 md:py-0" id="hero">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ParticleSystem />
        </Canvas>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 pointer-events-none flex flex-col-reverse md:flex-row items-center justify-between h-auto md:h-full pt-16 md:pt-0 gap-12 md:gap-0">
        
        {/* Left Side: Text */}
        <motion.div 
          ref={textRef} 
          variants={container}
          initial="hidden"
          animate={isReady ? "show" : "hidden"}
          className="flex flex-col items-start gap-4 w-full md:w-[60%] lg:w-[55%] relative pointer-events-auto mt-4 md:mt-0"
        >
          
          <motion.h1
            variants={item}
            className="font-display text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase leading-[0.9] tracking-tighter relative"
          >
            <span className="absolute -left-6 md:-left-12 top-6 w-3 h-3 rounded-full bg-accent hidden md:block" />
            {(() => {
              if (settings?.heroTitle) {
                // If it contains HTML, render it directly
                if (settings.heroTitle.includes('<')) {
                  return <span dangerouslySetInnerHTML={{ __html: settings.heroTitle }} />;
                }
                
                // Otherwise split in half and color the second half accent
                const words = settings.heroTitle.split(" ");
                const halfIndex = Math.ceil(words.length / 2);
                const firstHalf = words.slice(0, halfIndex).join(" ");
                const secondHalf = words.slice(halfIndex).join(" ");

                return (
                  <>
                    {firstHalf} <span className="text-accent">{secondHalf}</span>
                  </>
                );
              }
              
              return (
                <>
                  I'm a developer <br />
                  who loves turning <br />
                  <span className="text-accent">ideas into<br />products.</span>
                </>
              );
            })()}
          </motion.h1>
          
          <motion.div
            variants={item}
            className="mt-6 md:mt-8 pointer-events-auto max-w-lg"
          >
            <motion.p 
              variants={item}
              className="text-foreground/70 text-xs sm:text-sm md:text-base leading-relaxed mb-6 md:mb-8"
            >
              {settings?.heroIntro || "I am Manoj Panta, a Full Stack Developer, Managing Director & Founder at Birvex Tech Pvt Ltd based in Kathmandu, Nepal. I specialize in frontend and full stack web development using modern technologies to build fast, responsive, and SEO-friendly digital solutions worldwide."}
            </motion.p>
            
            <button className="bg-accent text-black hover:bg-white transition-colors px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase flex items-center gap-2 group w-max">
              Explore Work 
              <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Right Side: Photo */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="w-full md:w-[40%] lg:w-[45%] flex justify-center lg:justify-end pointer-events-auto relative z-10 mb-4 md:mb-0"
        >
          <motion.div 
            animate={{ y: [-15, 15, -15] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="relative w-[85%] max-w-[320px] sm:max-w-[380px] md:max-w-none md:w-[350px] lg:w-[450px] xl:w-[550px] flex justify-center items-center" 
            data-cursor="EXPLORE"
          >
            <img 
              src="/gemini.png" 
              alt="Manoj Panta" 
              className="object-contain w-full h-auto drop-shadow-2xl" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/my.jpg';
              }}
            />
          </motion.div>
        </motion.div>
        
      </div>

    </section>
  );
}
