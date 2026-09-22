import { getProjects } from "@/app/actions/projects";
import { getExperiences } from "@/app/actions/experience";

export default async function AdminDashboard() {
  const projects = await getProjects();
  const experiences = await getExperiences();

  return (
    <div>
      <h1 className="font-display text-4xl font-bold uppercase tracking-tight mb-8">
        Overview
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <h3 className="text-white/50 font-mono text-xs uppercase tracking-widest mb-2">Total Projects</h3>
          <p className="text-4xl font-display font-bold text-accent">{projects.length}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <h3 className="text-white/50 font-mono text-xs uppercase tracking-widest mb-2">Experience Items</h3>
          <p className="text-4xl font-display font-bold text-accent">{experiences.length}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <h3 className="text-white/50 font-mono text-xs uppercase tracking-widest mb-2">System Status</h3>
          <p className="text-4xl font-display font-bold text-green-400">Online</p>
        </div>
      </div>
    </div>
  )
}
