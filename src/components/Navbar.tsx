"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] mix-blend-difference text-white">
        <div className="container mx-auto px-6 py-6 flex justify-between items-center">
          <Link href="/" className="font-display font-bold text-xl tracking-tighter" onClick={() => setIsOpen(false)}>
            MPANTA®
          </Link>
          
          <div className="flex gap-4 items-center font-sans text-xs tracking-widest uppercase mt-1">
            <div className="hidden md:flex gap-4">
              <NavItem href="/projects" label="Work" hoverLabel="View Work ↗" />
              <NavItem href="/about" label="About" hoverLabel="Read Story ↗" />
              <NavItem href="/blog" label="Blog" hoverLabel="Read Articles ↗" />
            </div>
            <div className="hidden md:block">
              <NavItem href="/#contact" label="Contact" hoverLabel="Let's Talk ↗" />
            </div>
            <ThemeToggle />
            <button className="md:hidden font-bold" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center gap-8 md:hidden text-foreground"
          >
            <Link href="/projects" onClick={() => setIsOpen(false)} className="font-display text-4xl uppercase font-bold hover:text-accent transition-colors">Work</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="font-display text-4xl uppercase font-bold hover:text-accent transition-colors">About</Link>
            <Link href="/blog" onClick={() => setIsOpen(false)} className="font-display text-4xl uppercase font-bold hover:text-accent transition-colors">Blog</Link>
            <Link href="/#contact" onClick={() => setIsOpen(false)} className="font-display text-4xl uppercase font-bold hover:text-accent transition-colors">Contact</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavItem({ href, label, hoverLabel }: { href: string, label: string, hoverLabel: string }) {
  return (
    <Link href={href} className="relative group overflow-hidden h-4 block">
      <motion.div
        className="flex flex-col"
        initial={{ y: 0 }}
        whileHover={{ y: "-50%" }}
        transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
      >
        <span className="h-4 flex items-center">{label}</span>
        <span className="h-4 flex items-center text-accent">{hoverLabel}</span>
      </motion.div>
    </Link>
  );
}
