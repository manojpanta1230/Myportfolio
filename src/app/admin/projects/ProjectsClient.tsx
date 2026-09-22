"use client";

import { useState } from "react";
import ProjectModal from "@/components/admin/ProjectModal";
import { deleteProject } from "@/app/actions/projects";

export default function ProjectsClient({ initialProjects }: { initialProjects: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);

  const handleEdit = (project: any) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      await deleteProject(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-4xl font-bold uppercase tracking-tight">Projects CMS</h1>
        <button 
          onClick={handleAddNew}
          className="bg-accent text-black px-6 py-2 rounded font-bold uppercase tracking-widest hover:bg-white transition-colors"
        >
          + Add Project
        </button>
      </div>

      <div className="bg-card border border-border-subtle rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-foreground/5 text-xs uppercase tracking-widest font-mono text-foreground/50 border-b border-border-subtle">
              <th className="p-4">Title</th>
              <th className="p-4 hidden md:table-cell">Category</th>
              <th className="p-4 hidden md:table-cell">Featured</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {initialProjects.map((project) => (
              <tr key={project._id} className="border-b border-border-subtle hover:bg-foreground/5 transition-colors">
                <td className="p-4 font-bold">{project.title}</td>
                <td className="p-4 hidden md:table-cell text-sm text-foreground/70">{project.category}</td>
                <td className="p-4 hidden md:table-cell">
                  {project.isFeatured ? (
                    <span className="bg-accent/20 text-accent px-2 py-1 rounded text-xs uppercase tracking-widest font-bold">Featured</span>
                  ) : (
                    <span className="text-foreground/30 text-xs">Standard</span>
                  )}
                </td>
                <td className="p-4 text-right flex justify-end gap-4">
                  <button onClick={() => handleEdit(project)} className="text-sm text-foreground/70 hover:text-accent uppercase tracking-widest font-bold">Edit</button>
                  <button onClick={() => handleDelete(project._id)} className="text-sm text-red-500 hover:text-red-400 uppercase tracking-widest font-bold">Delete</button>
                </td>
              </tr>
            ))}
            {initialProjects.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-foreground/50 font-mono text-sm">No projects found. Create one!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        project={editingProject} 
      />
    </div>
  );
}
