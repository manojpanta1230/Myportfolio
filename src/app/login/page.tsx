"use client";

import { useState } from "react";
import { login } from "@/app/actions/auth";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError("");
    
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 text-white">
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8">
        <h1 className="font-display text-4xl font-bold uppercase tracking-tight mb-2 text-center">
          Admin <span className="text-accent">Login</span>
        </h1>
        <p className="text-white/50 text-center font-mono text-xs mb-8">
          Restricted Access Area
        </p>

        <form action={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block font-mono text-xs uppercase tracking-widest text-white/50 mb-2">
              Password
            </label>
            <input 
              type="password" 
              name="password"
              required
              className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-accent transition-colors"
              placeholder="Enter admin password..."
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs font-mono">{error}</p>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-accent text-black font-bold uppercase tracking-widest py-3 rounded hover:bg-white transition-colors disabled:opacity-50"
          >
            {isLoading ? "Authenticating..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
