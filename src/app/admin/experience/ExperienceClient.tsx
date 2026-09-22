"use client";

import { useState } from "react";
import ExperienceModal from "@/components/admin/ExperienceModal";
import { deleteExperience } from "@/app/actions/experience";

export default function ExperienceClient({ initialExperiences }: { initialExperiences: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<any>(null);

  const handleEdit = (experience: any) => {
    setEditingExperience(experience);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingExperience(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this experience?")) {
      await deleteExperience(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-4xl font-bold uppercase tracking-tight">Experience CMS</h1>
        <button 
          onClick={handleAddNew}
          className="bg-accent text-black px-6 py-2 rounded font-bold uppercase tracking-widest hover:bg-white transition-colors"
        >
          + Add Experience
        </button>
      </div>

      <div className="bg-card border border-border-subtle rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-foreground/5 text-xs uppercase tracking-widest font-mono text-foreground/50 border-b border-border-subtle">
              <th className="p-4">Role</th>
              <th className="p-4 hidden md:table-cell">Company</th>
              <th className="p-4 hidden md:table-cell">Period</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {initialExperiences.map((experience) => (
              <tr key={experience._id} className="border-b border-border-subtle hover:bg-foreground/5 transition-colors">
                <td className="p-4 font-bold">{experience.role}</td>
                <td className="p-4 hidden md:table-cell text-sm text-foreground/70">{experience.company}</td>
                <td className="p-4 hidden md:table-cell text-sm text-foreground/70">{experience.period}</td>
                <td className="p-4 text-right flex justify-end gap-4">
                  <button onClick={() => handleEdit(experience)} className="text-sm text-foreground/70 hover:text-accent uppercase tracking-widest font-bold">Edit</button>
                  <button onClick={() => handleDelete(experience._id)} className="text-sm text-red-500 hover:text-red-400 uppercase tracking-widest font-bold">Delete</button>
                </td>
              </tr>
            ))}
            {initialExperiences.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-foreground/50 font-mono text-sm">No experiences found. Add one!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ExperienceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        experience={editingExperience} 
      />
    </div>
  );
}
