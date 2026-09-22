"use client";

import { experience, education } from "@/data/experience";
import { motion } from "framer-motion";

export default function ExperienceTimeline() {
  return (
    <section className="py-32 bg-background text-foreground" id="experience">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          
          {/* Experience */}
          <div>
            <h2 className="font-display text-4xl font-bold uppercase tracking-tighter mb-16">
              Experience
            </h2>
            
            <div className="relative border-l border-border-subtle ml-4 pl-8 space-y-12">
              {experience.map((exp, i) => (
                <motion.div 
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full border-2 border-background bg-accent" />
                  <p className="text-accent font-mono text-xs tracking-widest uppercase mb-2">{exp.period}</p>
                  <h3 className="font-display text-2xl font-bold uppercase mb-1">{exp.role}</h3>
                  <div className="flex items-center gap-3">
                    {exp.logo && (
                      <div className="h-8 md:h-10 w-auto min-w-[2.5rem] max-w-[120px] relative bg-foreground/5 rounded overflow-hidden p-1 flex items-center justify-start">
                        <img src={exp.logo} alt={exp.company} className="object-contain h-full w-full" />
                      </div>
                    )}
                    <p className="text-foreground/60">{exp.company}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="font-display text-4xl font-bold uppercase tracking-tighter mb-16">
              Education
            </h2>
            
            <div className="relative border-l border-border-subtle ml-4 pl-8 space-y-12">
              {education.map((edu, i) => (
                <motion.div 
                  key={edu.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full border-2 border-background bg-accent" />
                  <p className="text-accent font-mono text-xs tracking-widest uppercase mb-2">{edu.period}</p>
                  <h3 className="font-display text-2xl font-bold uppercase mb-1">{edu.degree}</h3>
                  <p className="text-foreground/60">{edu.institution}</p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
