"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Blog({ blogs = [] }: { blogs?: any[] }) {
  if (!blogs || blogs.length === 0) return null;

  return (
    <section className="py-32 bg-background text-foreground border-t border-border-subtle" id="blogs">
      <div className="container mx-auto px-6">
        <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-16">
          Latest Articles
        </h2>
        
        <div className="flex flex-wrap gap-8 justify-start">
          {blogs.map((blog, i) => (
            <Link href={`/blog/${blog.slug}`} key={blog._id} className="group flex flex-col max-w-sm w-full">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex flex-col bg-card border border-border-subtle hover:border-accent transition-colors overflow-hidden h-full"
              >
                <div className="w-full h-48 overflow-hidden">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                </div>
                
                <div className="p-6 flex flex-col relative h-full">
                  <div className="absolute top-6 right-6 w-8 h-8 rounded-full border border-border-subtle flex items-center justify-center group-hover:bg-accent group-hover:text-black group-hover:border-accent transition-colors">
                    ↗
                  </div>
                  
                  <p className="text-accent font-mono text-xs tracking-widest uppercase mb-3">{blog.date}</p>
                  <h3 className="font-display text-xl font-bold uppercase mb-3 pr-8 group-hover:text-accent transition-colors">{blog.title}</h3>
                  <p className="text-foreground/60 text-sm leading-relaxed mb-6 flex-grow">{blog.description}</p>
                  
                  <span className="text-xs uppercase tracking-widest font-bold flex items-center gap-2 group-hover:text-accent transition-colors mt-auto pt-4 border-t border-border-subtle">
                    Read Article
                    <span className="w-8 h-[1px] bg-foreground/30 group-hover:bg-accent transition-colors"></span>
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
