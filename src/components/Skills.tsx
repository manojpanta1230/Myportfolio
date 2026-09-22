"use client";

import { skills } from "@/data/skills";
import { motion } from "framer-motion";
import { useState } from "react";
import { 
  SiHtml5, 
  SiCss, 
  SiJavascript, 
  SiTypescript, 
  SiReact, 
  SiNextdotjs, 
  SiNodedotjs, 
  SiExpress, 
  SiMongodb, 
  SiTailwindcss, 
  SiFigma, 
  SiCanvas, 
  SiGit, 
  SiGithub 
} from "react-icons/si";
import { IconType } from "react-icons";
import { VscVscode } from "react-icons/vsc";

const iconMap: Record<string, IconType> = {
  "HTML": SiHtml5,
  "CSS": SiCss,
  "JavaScript": SiJavascript,
  "TypeScript": SiTypescript,
  "React": SiReact,
  "Next.js": SiNextdotjs,
  "Node.js": SiNodedotjs,
  "Express": SiExpress,
  "MongoDB": SiMongodb,
  "Tailwind CSS": SiTailwindcss,
  "Figma": SiFigma,
  "Canva UI": SiCanvas,
  "Git": SiGit,
  "GitHub": SiGithub,
  "VS Code": VscVscode
};

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section className="py-32 bg-secondary text-foreground overflow-hidden relative" id="skills">
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-16 text-center">
          Technology & Tools
        </h2>
        
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes slide {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-slide {
            animation: slide 30s linear infinite;
          }
          .animate-slide:hover {
            animation-play-state: paused;
          }
        `}} />
        
        <div className="relative overflow-hidden flex w-full group">
          {/* We create a wrapper that is 200% wide and slides by -50% to loop perfectly */}
          <div className="flex w-max animate-slide items-center gap-4 md:gap-8 px-4">
            {/* First set */}
            {skills.map((skill, i) => {
              const Icon = iconMap[skill];
              return (
                <div
                  key={`first-${skill}`}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className={`
                    px-6 py-4 md:px-10 md:py-6 rounded-lg border border-border-subtle cursor-pointer
                    transition-all duration-500 font-mono text-sm md:text-lg tracking-wider shrink-0
                    ${hoveredSkill === skill ? 'bg-accent text-black border-accent scale-110' : 'bg-card hover:border-white/30'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    {Icon && <Icon className={`text-2xl ${hoveredSkill === skill ? 'text-black' : 'text-accent'}`} />}
                    <span>{skill}</span>
                  </div>
                </div>
              );
            })}
            
            {/* Duplicate set for seamless looping */}
            {skills.map((skill, i) => {
              const Icon = iconMap[skill];
              return (
                <div
                  key={`second-${skill}`}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className={`
                    px-6 py-4 md:px-10 md:py-6 rounded-lg border border-border-subtle cursor-pointer
                    transition-all duration-500 font-mono text-sm md:text-lg tracking-wider shrink-0
                    ${hoveredSkill === skill ? 'bg-accent text-black border-accent scale-110' : 'bg-card hover:border-white/30'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    {Icon && <Icon className={`text-2xl ${hoveredSkill === skill ? 'text-black' : 'text-accent'}`} />}
                    <span>{skill}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Background glow effect based on hover */}
      <div 
        className={`absolute inset-0 bg-accent/5 transition-opacity duration-1000 blur-3xl rounded-full pointer-events-none ${hoveredSkill ? 'opacity-100 scale-150' : 'opacity-0 scale-100'}`} 
        style={{ transformOrigin: 'center center' }}
      />
    </section>
  );
}

