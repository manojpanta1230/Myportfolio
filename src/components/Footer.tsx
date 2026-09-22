"use client";

import { motion } from "framer-motion";
import { FaInstagram, FaFacebook, FaLinkedin, FaWhatsapp } from "react-icons/fa";

export default function Footer({ settings }: { settings?: any }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background text-foreground pt-32 pb-10 border-t border-border-subtle overflow-hidden relative" id="contact">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-32">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-accent font-mono text-sm tracking-widest uppercase mb-6"
          >
            What's Next?
          </motion.p>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-8xl lg:text-[9rem] font-bold uppercase tracking-tighter leading-none mb-12 hover:text-accent transition-colors duration-500 cursor-pointer"
          >
            Let's Talk
          </motion.h2>
          
          <motion.a 
            href={`mailto:${settings?.contactMail || 'hello@mpanta.com.np'}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl border-b border-white/30 hover:border-accent hover:text-accent transition-colors pb-2 mb-8"
          >
            {settings?.contactMail || 'hello@mpanta.com.np'}
          </motion.a>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.4 }}
            className="flex gap-6 mt-4"
          >
            <a href={settings?.instagram || "#"} target="_blank" rel="noreferrer" className="text-3xl text-foreground/50 hover:text-accent transition-colors" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href={settings?.facebook || "#"} target="_blank" rel="noreferrer" className="text-3xl text-foreground/50 hover:text-accent transition-colors" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href={settings?.linkedin || "#"} target="_blank" rel="noreferrer" className="text-3xl text-foreground/50 hover:text-accent transition-colors" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href={settings?.whatsapp || "#"} target="_blank" rel="noreferrer" className="text-3xl text-foreground/50 hover:text-accent transition-colors" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border-subtle text-foreground/50 text-sm font-mono uppercase tracking-widest gap-6 md:gap-0">
          <p>© {currentYear} Manoj Panta. All rights reserved.</p>
          
          <div className="flex gap-8">
            {settings?.linkedin && <a href={settings.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">LinkedIn</a>}
            {settings?.github && <a href={settings.github} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">GitHub</a>}
            {settings?.twitter && <a href={settings.twitter} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">Twitter</a>}
            {settings?.instagram && <a href={settings.instagram} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">Instagram</a>}
          </div>
        </div>
      </div>
      
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
    </footer>
  );
}
