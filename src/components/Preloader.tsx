"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState("");
  const fullText = "WELCOME TO MY PORTFOLIO SITE";
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("preloader_shown") === "true") {
      setIsLoading(false);
      window.dispatchEvent(new Event("preloaderComplete"));
      return;
    }

    let currentIndex = 0;
    
    // Typewriter effect
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 80); // Typing speed

    // Hide preloader after exactly 5 seconds
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("preloader_shown", "true");
      window.dispatchEvent(new Event("preloaderComplete"));
    }, 5000);

    return () => {
      clearInterval(typingInterval);
      clearTimeout(timeoutId);
    };
  }, []);

  if (pathname !== "/") return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
          exit={{ y: "-100%", opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Background Video */}
          <div className="absolute inset-0 z-0 opacity-40">
            <video 
              src="/233175.mp4" 
              autoPlay 
              muted 
              loop 
              playsInline
              className="w-full h-full object-cover"
            />
            {/* Dark overlay to ensure text is readable */}
            <div className="absolute inset-0 bg-black/60" />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-6">
            <h1 className="font-mono text-xl md:text-3xl tracking-widest font-bold text-accent h-8 drop-shadow-lg">
              {text}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-3 h-[1em] bg-accent ml-1 align-middle"
              />
            </h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
