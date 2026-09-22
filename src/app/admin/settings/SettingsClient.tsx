"use client";

import { useState } from "react";
import { updateSettings } from "@/app/actions/settings";

export default function SettingsClient({ initialSettings }: { initialSettings: any }) {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    const formData = new FormData(e.currentTarget);
    
    try {
      if (initialSettings?._id) {
        formData.append("id", initialSettings._id);
      }
      await updateSettings(formData);
      setSuccessMsg("Settings updated successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (error) {
      console.error(error);
      alert("Failed to update settings.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold uppercase tracking-tight">Site Settings</h1>
        <p className="text-foreground/50 font-mono text-sm mt-2">Manage global content across your portfolio.</p>
      </div>

      {successMsg && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 text-green-400 rounded-lg text-sm font-bold tracking-widest uppercase">
          {successMsg}
        </div>
      )}

      <div className="bg-card border border-border-subtle rounded-lg p-6 md:p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest font-mono text-foreground/50">Hero Title</label>
            <input 
              name="heroTitle" 
              defaultValue={initialSettings?.heroTitle} 
              required 
              className="bg-background border border-border-subtle p-3 rounded text-sm w-full" 
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest font-mono text-foreground/50">Hero Introduction</label>
            <textarea 
              name="heroIntro" 
              defaultValue={initialSettings?.heroIntro} 
              required 
              rows={4}
              className="bg-background border border-border-subtle p-3 rounded text-sm w-full" 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest font-mono text-foreground/50">Contact Email</label>
            <input 
              name="contactMail" 
              type="email"
              defaultValue={initialSettings?.contactMail} 
              required 
              className="bg-background border border-border-subtle p-3 rounded text-sm w-full" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border-subtle">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest font-mono text-foreground/50">GitHub URL</label>
              <input 
                name="github" 
                type="url"
                defaultValue={initialSettings?.github} 
                className="bg-background border border-border-subtle p-3 rounded text-sm w-full" 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest font-mono text-foreground/50">LinkedIn URL</label>
              <input 
                name="linkedin" 
                type="url"
                defaultValue={initialSettings?.linkedin} 
                className="bg-background border border-border-subtle p-3 rounded text-sm w-full" 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest font-mono text-foreground/50">Twitter/X URL</label>
              <input 
                name="twitter" 
                type="url"
                defaultValue={initialSettings?.twitter} 
                className="bg-background border border-border-subtle p-3 rounded text-sm w-full" 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest font-mono text-foreground/50">Instagram URL</label>
              <input 
                name="instagram" 
                type="url"
                defaultValue={initialSettings?.instagram} 
                className="bg-background border border-border-subtle p-3 rounded text-sm w-full" 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest font-mono text-foreground/50">Facebook URL</label>
              <input 
                name="facebook" 
                type="url"
                defaultValue={initialSettings?.facebook} 
                className="bg-background border border-border-subtle p-3 rounded text-sm w-full" 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest font-mono text-foreground/50">WhatsApp URL</label>
              <input 
                name="whatsapp" 
                type="url"
                defaultValue={initialSettings?.whatsapp} 
                className="bg-background border border-border-subtle p-3 rounded text-sm w-full" 
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 mt-2 border-t border-border-subtle">
            <button 
              type="submit" 
              disabled={loading} 
              className="bg-accent text-black px-8 py-3 rounded font-bold uppercase tracking-widest disabled:opacity-50 hover:bg-white transition-colors"
            >
              {loading ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
