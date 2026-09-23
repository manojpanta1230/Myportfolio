"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    setIsVisible(true);

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Look for data-cursor attributes
      const cursorTarget = target.closest("[data-cursor]");
      if (cursorTarget) {
        setIsHovering(true);
        setHoverText(cursorTarget.getAttribute("data-cursor") || "");
        return;
      }

      // Default link hover
      if (target.closest("a") || target.closest("button")) {
        setIsHovering(true);
        setHoverText("");
        return;
      }

      setIsHovering(false);
      setHoverText("");
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner dot / Hover expanding circle */}
      <motion.div
        className="fixed top-0 left-0 z-[100] pointer-events-none flex items-center justify-center rounded-full bg-white text-black font-bold tracking-widest text-[10px] mix-blend-difference"
        animate={{
          x: position.x - (isHovering ? (hoverText ? 32 : 20) : 3),
          y: position.y - (isHovering ? (hoverText ? 32 : 20) : 3),
          width: isHovering ? (hoverText ? 64 : 40) : 6,
          height: isHovering ? (hoverText ? 64 : 40) : 6,
          opacity: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
          mass: 0.2,
        }}
      >
        {isHovering && hoverText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="mix-blend-normal"
          >
            {hoverText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
