"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { createExperience, updateExperience } from "@/app/actions/experience";

type ExperienceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  experience?: any;
};

export default function ExperienceModal({ isOpen, onClose, experience }: ExperienceModalProps) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      if (experience) {
        await updateExperience(experience._id, formData);
      } else {
        await createExperience(formData);
      }
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to save experience.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card border border-border-subtle rounded-lg shadow-2xl p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-display font-bold uppercase">{experience ? 'Edit Experience' : 'Add New Experience'}</h2>
              <button onClick={onClose} className="text-foreground/50 hover:text-foreground">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest font-mono text-foreground/50">Role</label>
                  <input name="role" defaultValue={experience?.role} required className="bg-background border border-border-subtle p-2 rounded text-sm" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest font-mono text-foreground/50">Company</label>
                  <input name="company" defaultValue={experience?.company} required className="bg-background border border-border-subtle p-2 rounded text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest font-mono text-foreground/50">Period</label>
                  <input name="period" defaultValue={experience?.period} required className="bg-background border border-border-subtle p-2 rounded text-sm" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest font-mono text-foreground/50">Logo Upload (optional)</label>
                  <input type="hidden" name="logo" value={experience?.logo || ""} />
                  <input type="file" name="logoFile" accept="image/*" className="bg-background border border-border-subtle p-2 rounded text-sm" />
                  {experience?.logo && <img src={experience.logo} alt="Preview" className="h-10 object-cover mt-1 rounded bg-white" />}
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest font-mono text-foreground/50">Order (lower comes first)</label>
                <input name="order" type="number" defaultValue={experience?.order || 0} className="bg-background border border-border-subtle p-2 rounded text-sm" />
              </div>

              <div className="flex justify-end gap-4 mt-6 pt-6 border-t border-border-subtle">
                <button type="button" onClick={onClose} className="px-4 py-2 rounded text-foreground/70 hover:text-foreground">Cancel</button>
                <button type="submit" disabled={loading} className="bg-accent text-black px-6 py-2 rounded font-bold uppercase tracking-widest disabled:opacity-50">
                  {loading ? 'Saving...' : 'Save Experience'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
