import Projects from "@/components/Projects";
import { getProjects } from "@/app/actions/projects";

export const metadata = {
  title: "Projects | Manoj Panta",
  description: "A collection of my recent web development projects and case studies.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="bg-background pt-24 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <h1 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-4">
          All Projects
        </h1>
        <p className="text-foreground/70 max-w-2xl text-lg">
          Explore my complete portfolio of work, featuring web applications, full-stack platforms, and creative digital solutions.
        </p>
      </div>
      <Projects projects={projects} />
    </main>
  );
}
