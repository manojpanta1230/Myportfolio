import Blog from "@/components/Blog";
import { getBlogs } from "@/app/actions/blogs";

export const metadata = {
  title: "Blog | Manoj Panta",
  description: "Read my latest articles about web development, engineering, and tech.",
};

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <main className="bg-background pt-24 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <h1 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-4">
          All Articles
        </h1>
        <p className="text-foreground/70 max-w-2xl text-lg">
          Insights, thoughts, and technical deep dives into web development and software engineering.
        </p>
      </div>
      <Blog blogs={blogs} />
    </main>
  );
}
