"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { createBlog, updateBlog } from "@/app/actions/blogs";
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

type BlogModalProps = {
  isOpen: boolean;
  onClose: () => void;
  blog?: any;
};

export default function BlogModal({ isOpen, onClose, blog }: BlogModalProps) {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(blog?.content || "");

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!blog) {
      const slugInput = document.getElementById('slug') as HTMLInputElement;
      if (slugInput) {
        slugInput.value = e.target.value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');
      }
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.set("content", content); // Add quill content
    
    try {
      if (blog) {
        await updateBlog(blog._id, formData);
      } else {
        await createBlog(formData);
      }
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to save blog.");
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
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border border-border-subtle rounded-lg shadow-2xl p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-display font-bold uppercase">{blog ? 'Edit Blog' : 'Add New Blog'}</h2>
              <button onClick={onClose} className="text-foreground/50 hover:text-foreground">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest font-mono text-foreground/50">Title</label>
                  <input name="title" defaultValue={blog?.title} onChange={handleTitleChange} required className="bg-background border border-border-subtle p-2 rounded text-sm" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest font-mono text-foreground/50">Slug</label>
                  <input name="slug" id="slug" defaultValue={blog?.slug} required className="bg-background border border-border-subtle p-2 rounded text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest font-mono text-foreground/50">Author</label>
                  <input name="author" defaultValue={blog?.author || "Manoj Panta"} required className="bg-background border border-border-subtle p-2 rounded text-sm" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest font-mono text-foreground/50">Image Upload</label>
                  <input type="hidden" name="image" value={blog?.image || ""} />
                  <input type="file" name="imageFile" accept="image/*" className="bg-background border border-border-subtle p-2 rounded text-sm" />
                  {blog?.image && <img src={blog.image} alt="Preview" className="h-10 object-cover mt-1 rounded" />}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest font-mono text-foreground/50">Date</label>
                  <input type="date" name="date" defaultValue={blog?.date} required className="bg-background border border-border-subtle p-2 rounded text-sm" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest font-mono text-foreground/50">Short Description</label>
                <textarea name="description" defaultValue={blog?.description} required rows={2} className="bg-background border border-border-subtle p-2 rounded text-sm" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest font-mono text-foreground/50">Full Content</label>
                <div className="bg-white text-black rounded overflow-hidden">
                  <ReactQuill theme="snow" value={content} onChange={setContent} className="h-64 mb-12" />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <input type="checkbox" name="isFeatured" defaultChecked={blog?.isFeatured} id="isFeatured" className="w-4 h-4" />
                <label htmlFor="isFeatured" className="text-sm font-bold">Featured Blog</label>
              </div>

              <div className="flex justify-end gap-4 mt-6 pt-6 border-t border-border-subtle">
                <button type="button" onClick={onClose} className="px-4 py-2 rounded text-foreground/70 hover:text-foreground">Cancel</button>
                <button type="submit" disabled={loading} className="bg-accent text-black px-6 py-2 rounded font-bold uppercase tracking-widest disabled:opacity-50">
                  {loading ? 'Saving...' : 'Save Blog'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
