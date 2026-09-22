import { getBlogBySlug } from "@/app/actions/blogs";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const blog = await getBlogBySlug(params.slug);
  if (!blog) {
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  }

  return {
    title: `${blog.title} | Manoj Panta Blog`,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: [blog.image],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [blog.image],
    }
  };
}

export default async function SingleBlogPage({ params }: { params: { slug: string } }) {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="bg-background pt-32 pb-24 min-h-screen">
      <article className="container mx-auto px-6 max-w-3xl">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <p className="text-accent font-mono text-sm tracking-widest uppercase">{blog.date}</p>
            <span className="text-foreground/30">•</span>
            <p className="text-foreground/70 font-mono text-sm tracking-widest uppercase">By {blog.author}</p>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight leading-tight mb-8">
            {blog.title}
          </h1>
          <div className="w-full aspect-video overflow-hidden rounded-lg">
            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
          </div>
        </div>

        {/* Render Rich Text Content */}
        <div 
          className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:uppercase prose-a:text-accent hover:prose-a:text-white"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>
    </main>
  );
}
