"use client";

import { useState } from "react";
import BlogModal from "@/components/admin/BlogModal";
import { deleteBlog } from "@/app/actions/blogs";

export default function BlogClient({ initialBlogs }: { initialBlogs: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);

  const handleEdit = (blog: any) => {
    setEditingBlog(blog);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingBlog(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      await deleteBlog(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-4xl font-bold uppercase tracking-tight">Blog CMS</h1>
        <button 
          onClick={handleAddNew}
          className="bg-accent text-black px-6 py-2 rounded font-bold uppercase tracking-widest hover:bg-white transition-colors"
        >
          + Add Blog
        </button>
      </div>

      <div className="bg-card border border-border-subtle rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-foreground/5 text-xs uppercase tracking-widest font-mono text-foreground/50 border-b border-border-subtle">
              <th className="p-4">Title</th>
              <th className="p-4 hidden md:table-cell">Slug</th>
              <th className="p-4 hidden md:table-cell">Author</th>
              <th className="p-4 hidden md:table-cell">Featured</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {initialBlogs.map((blog) => (
              <tr key={blog._id} className="border-b border-border-subtle hover:bg-foreground/5 transition-colors">
                <td className="p-4 font-bold">{blog.title}</td>
                <td className="p-4 hidden md:table-cell text-sm text-foreground/70">{blog.slug}</td>
                <td className="p-4 hidden md:table-cell text-sm text-foreground/70">{blog.author || "Manoj Panta"}</td>
                <td className="p-4 hidden md:table-cell">
                  {blog.isFeatured ? (
                    <span className="bg-accent/20 text-accent px-2 py-1 rounded text-xs uppercase tracking-widest font-bold">Featured</span>
                  ) : (
                    <span className="text-foreground/30 text-xs">Standard</span>
                  )}
                </td>
                <td className="p-4 text-right flex justify-end gap-4">
                  <button onClick={() => handleEdit(blog)} className="text-sm text-foreground/70 hover:text-accent uppercase tracking-widest font-bold">Edit</button>
                  <button onClick={() => handleDelete(blog._id)} className="text-sm text-red-500 hover:text-red-400 uppercase tracking-widest font-bold">Delete</button>
                </td>
              </tr>
            ))}
            {initialBlogs.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-foreground/50 font-mono text-sm">No blogs found. Create one!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <BlogModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        blog={editingBlog} 
      />
    </div>
  );
}
