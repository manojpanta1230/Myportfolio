"use server";

import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { uploadImage } from "@/lib/uploadImage";

async function checkAuth() {
  const cookieStore = await cookies();
  const auth = cookieStore.get("admin_auth");
  if (!auth || auth.value !== "authenticated") {
    throw new Error("Unauthorized");
  }
}

export async function getBlogs() {
  await connectDB();
  const blogs = await Blog.find().sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(blogs));
}

export async function getBlogBySlug(slug: string) {
  await connectDB();
  const blog = await Blog.findOne({ slug });
  if (!blog) return null;
  return JSON.parse(JSON.stringify(blog));
}

export async function createBlog(formData: FormData) {
  await checkAuth();
  await connectDB();
  
  let imagePath = formData.get("image") as string;
  const file = formData.get("imageFile") as File;
  if (file && file.size > 0) {
    imagePath = await uploadImage(file);
  }

  const newBlog = new Blog({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    content: formData.get("content"),
    author: formData.get("author") || "Manoj Panta",
    image: imagePath,
    date: formData.get("date"),
    isFeatured: formData.get("isFeatured") === "on",
  });

  await newBlog.save();
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin/blogs");
  return { success: true };
}

export async function updateBlog(id: string, formData: FormData) {
  await checkAuth();
  await connectDB();
  
  let imagePath = formData.get("image") as string;
  const file = formData.get("imageFile") as File;
  if (file && file.size > 0) {
    imagePath = await uploadImage(file);
  }

  await Blog.findByIdAndUpdate(id, {
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    content: formData.get("content"),
    author: formData.get("author") || "Manoj Panta",
    image: imagePath,
    date: formData.get("date"),
    isFeatured: formData.get("isFeatured") === "on",
  });

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin/blogs");
  return { success: true };
}

export async function deleteBlog(id: string) {
  await checkAuth();
  await connectDB();
  await Blog.findByIdAndDelete(id);
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin/blogs");
  return { success: true };
}
