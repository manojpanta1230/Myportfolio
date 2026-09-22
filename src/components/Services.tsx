"use client";

import { services } from "@/data/services";
import { motion } from "framer-motion";

export default function Services() {
  return (
    <section className="py-32 bg-background text-foreground border-t border-border-subtle" id="services">
      <div className="container mx-auto px-6">
        <div className="mb-20">
          <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter">
            WHAT I CAN <br />
            BUILD FOR YOU
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group bg-card border border-border-subtle p-8 md:p-12 hover:border-accent transition-colors duration-500 flex flex-col justify-between h-full min-h-[300px]"
              data-cursor="LET'S TALK"
            >
              <div>
                <span className="font-display text-5xl md:text-7xl text-foreground/10 group-hover:text-accent/20 transition-colors duration-500 font-bold block mb-8">
                  {service.id}
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight mb-4 group-hover:text-accent transition-colors duration-500">
                  {service.title}
                </h3>
              </div>
              
              <div className="overflow-hidden">
                <p className="text-foreground/60 transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-500">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
