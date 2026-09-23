import { logout } from "@/app/actions/auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-black/50 p-6 flex flex-col gap-8">
        <div>
          <h2 className="font-display font-bold tracking-widest text-accent text-xl">PORTFOLIO CMS</h2>
          <p className="text-white/50 text-xs font-mono mt-2">Admin Dashboard</p>
        </div>
        
        <nav className="flex flex-col gap-2">
          <a href="/admin" className="px-4 py-2 rounded hover:bg-white/5 hover:text-accent transition-colors font-mono text-sm">Dashboard</a>
          <a href="/admin/projects" className="px-4 py-2 rounded hover:bg-white/5 hover:text-accent transition-colors font-mono text-sm">Projects</a>
          <a href="/admin/blogs" className="px-4 py-2 rounded hover:bg-white/5 hover:text-accent transition-colors font-mono text-sm">Blogs</a>
          <a href="/admin/experience" className="px-4 py-2 rounded hover:bg-white/5 hover:text-accent transition-colors font-mono text-sm">Experience</a>
          <a href="/admin/settings" className="px-4 py-2 rounded hover:bg-white/5 hover:text-accent transition-colors font-mono text-sm">Settings</a>
        </nav>
        
        <div className="mt-auto">
          <form action={logout}>
            <button type="submit" className="text-red-400 font-mono text-sm hover:text-red-300 transition-colors px-4 py-2">
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
