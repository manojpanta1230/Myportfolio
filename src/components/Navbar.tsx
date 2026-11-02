"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-[100] w-full bg-slate-950/85 backdrop-blur-lg border-b border-white/10 text-white">
        <div className="container mx-auto px-3 sm:px-6 py-5 sm:py-6 flex min-w-0 justify-between items-center">
          <Link href="/" className="relative block h-14 w-36 shrink min-w-0 overflow-hidden sm:h-16 sm:w-60 sm:shrink-0" onClick={() => setIsOpen(false)}>
            <Image
              src="/mpanta-logo.svg"
              alt="MPanta - Full Stack Developer"
              fill
              sizes="(max-width: 640px) 176px, 240px"
              className="object-contain object-left"
              priority
            />
          </Link>
          
          <div className="flex gap-1 sm:gap-4 items-center font-sans text-[10px] sm:text-xs tracking-widest uppercase mt-1">
            <div className="hidden md:flex gap-4">
              <NavItem href="/projects" label="Work" hoverLabel="View Work ↗" />
              <NavItem href="/about" label="About" hoverLabel="Read Story ↗" />
              <NavItem href="/blog" label="Blog" hoverLabel="Read Articles ↗" />
            </div>
            <div className="hidden md:block">
              <NavItem href="/#contact" label="Contact" hoverLabel="Let's Talk ↗" />
            </div>
            <ThemeToggle />
            <button
              className="md:hidden min-h-11 px-2 font-bold"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            >
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
            className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col items-center justify-center gap-6 md:hidden"
          >
            <Link href="/projects" onClick={() => setIsOpen(false)} className="font-display text-3xl sm:text-4xl uppercase font-bold px-6 py-2 hover:text-accent transition-colors">Work</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="font-display text-3xl sm:text-4xl uppercase font-bold px-6 py-2 hover:text-accent transition-colors">About</Link>
            <Link href="/blog" onClick={() => setIsOpen(false)} className="font-display text-3xl sm:text-4xl uppercase font-bold px-6 py-2 hover:text-accent transition-colors">Blog</Link>
            <Link href="/#contact" onClick={() => setIsOpen(false)} className="font-display text-3xl sm:text-4xl uppercase font-bold px-6 py-2 hover:text-accent transition-colors">Contact</Link>
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
