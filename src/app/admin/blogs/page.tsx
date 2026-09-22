import { getBlogs } from "@/app/actions/blogs";
import BlogClient from "./BlogClient";

export default async function AdminBlogsPage() {
  const blogs = await getBlogs();

  return <BlogClient initialBlogs={blogs} />;
}
