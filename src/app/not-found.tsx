"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { motion } from "framer-motion";
import Link from "next/link";

function Starfield(props: any) {
  const ref = useRef<any>(null);
  
  // Generate random points in a larger sphere for a vast space feeling
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 3 }));

  useFrame((state, delta) => {
    if (ref.current) {
      // Rotate slowly for a floating space effect
      ref.current.rotation.x -= delta / 20;
      ref.current.rotation.y -= delta / 30;
      
      // We can also slowly move them forward on Z axis to simulate traveling
      // But simple rotation is usually very effective and smooth.
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.008}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function NotFound() {
  return (
    <main className="relative min-h-[100svh] w-full flex flex-col justify-center items-center overflow-hidden bg-black text-white">
      {/* 3D Space Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Starfield />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: -50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="font-display text-8xl md:text-[12rem] font-bold tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="mt-4 md:mt-8 flex flex-col items-center gap-6"
        >
          <h2 className="text-2xl md:text-4xl font-mono uppercase tracking-[0.2em] text-accent">
            Lost in Space
          </h2>
          
          <p className="text-white/60 max-w-md mx-auto text-sm md:text-base font-light">
            The page you are looking for has drifted off into the cosmos. It might have been deleted, moved, or perhaps it never existed in this dimension.
          </p>
          
          <Link href="/">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 bg-accent text-black hover:bg-white transition-all px-8 py-4 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase flex items-center gap-3 group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Return to Earth
            </motion.button>
          </Link>
        </motion.div>
      </div>
      
      {/* Overlay Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-0" />
    </main>
  );
}
