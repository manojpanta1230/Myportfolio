import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Marquee from "@/components/Marquee";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import Skills from "@/components/Skills";

import { getProjects } from "@/app/actions/projects";
import { getBlogs } from "@/app/actions/blogs";

export default async function Home() {
  const projects = await getProjects();
  
  const blogs = await getBlogs();
  const featuredBlogs = blogs.filter((b: any) => b.isFeatured).slice(0, 3);

  return (
    <main className="bg-background">
      <Hero />
      <Intro />
      <Marquee />
      <Projects projects={projects} />
      <ExperienceTimeline />
      <Skills />
      <Blog blogs={featuredBlogs.length > 0 ? featuredBlogs : blogs.slice(0, 3)} />
    </main>
  );
}

