"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Projects({ projects }: { projects: any[] }) {
  let featuredProjects = projects.filter(p => p.isFeatured);
  if (featuredProjects.length === 0) {
    featuredProjects = projects.slice(0, 5);
  }
  
  const otherProjects = projects.filter(p => !featuredProjects.some(fp => fp._id === p._id));

  return (
    <section className="py-32 bg-secondary text-foreground border-t border-border-subtle" id="work">
      <div className="container mx-auto px-6">
        <div className="mb-20">
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-4">01 / SELECTED WORK</p>
          <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter">
            FEATURED <br />
            PROJECTS
          </h2>
        </div>

        <div className="flex flex-col gap-20 mb-32 max-w-5xl mx-auto">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} />
          ))}
        </div>

        {otherProjects.length > 0 && (
          <div>
            <div className="mb-12 border-t border-border-subtle pt-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tighter">
                Other Projects
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherProjects.map((project) => (
                <SmallProjectCard key={project._id} project={project} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function SmallProjectCard({ project }: { project: any }) {
  return (
    <motion.a 
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      className="group flex flex-col bg-card border border-border-subtle rounded-lg overflow-hidden hover:border-accent transition-colors"
    >
      <div className="aspect-video w-full overflow-hidden relative">
        <img 
          src={project.image} 
          alt={project.title} 
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <p className="text-accent font-mono text-[10px] tracking-widest uppercase mb-2">
          {project.category}
        </p>
        <h3 className="font-display text-xl font-bold uppercase tracking-tight mb-2 group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="text-foreground/60 text-xs mb-4 line-clamp-2 flex-1">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1 mt-auto">
          {((typeof project.technologies === 'string' ? project.technologies.split(',') : project.technologies) || []).slice(0, 3).map((tech: string) => (
            <span key={tech} className="px-2 py-0.5 border border-border-subtle text-[10px] text-foreground/50">
              {tech.trim()}
            </span>
          ))}
          {((typeof project.technologies === 'string' ? project.technologies.split(',') : project.technologies) || []).length > 3 && (
            <span className="px-2 py-0.5 border border-border-subtle text-[10px] text-foreground/50">
              +{((typeof project.technologies === 'string' ? project.technologies.split(',') : project.technologies) || []).length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.a>
  );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
  return (
    <div 
      className="group relative flex flex-col md:flex-row gap-8 items-center"
      data-cursor="VIEW"
    >
      <motion.div 
        initial={{ opacity: 0, x: index % 2 === 0 ? -200 : 200 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`w-full md:w-1/2 overflow-hidden rounded-lg bg-card border border-border-subtle ${index % 2 !== 0 ? 'md:order-2' : ''}`}
      >
        <a 
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="relative aspect-video overflow-hidden block"
        >
          <img 
            src={project.image} 
            alt={project.title} 
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500" />
        </a>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, x: index % 2 === 0 ? 200 : -200 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        className={`w-full md:w-1/2 flex flex-col ${index % 2 !== 0 ? 'md:items-end md:text-right' : ''}`}
      >
        <p className="text-accent font-mono text-[10px] tracking-widest uppercase mb-2">
          {project.category}
        </p>
        <h3 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight mb-4 group-hover:translate-x-2 transition-transform duration-300">
          {project.title}
        </h3>
        <p className="text-foreground/70 mb-6 text-sm">
          {project.description}
        </p>
        
        <div className={`flex flex-wrap gap-2 mb-8 ${index % 2 !== 0 ? 'justify-end' : ''}`}>
          {((typeof project.technologies === 'string' ? project.technologies.split(',') : project.technologies) || []).map((tech: string) => (
            <span key={tech} className="px-3 py-1 border border-border-subtle text-xs text-foreground/50">
              {tech.trim()}
            </span>
          ))}
        </div>
        
        <a 
          href={project.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest hover:text-accent transition-colors font-bold"
        >
          View Live Project <span className="text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
        </a>
      </motion.div>
    </div>
  );
}
