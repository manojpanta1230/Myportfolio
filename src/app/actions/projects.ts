"use server";

import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
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

export async function getProjects() {
  await connectDB();
  const projects = await Project.find().sort({ order: 1, createdAt: -1 });
  return JSON.parse(JSON.stringify(projects));
}

export async function createProject(formData: FormData) {
  await checkAuth();
  await connectDB();
  
  let imagePath = formData.get("image") as string;
  const file = formData.get("imageFile") as File;
  if (file && file.size > 0) {
    imagePath = await uploadImage(file);
  }

  const newProject = new Project({
    title: formData.get("title"),
    category: formData.get("category"),
    image: imagePath,
    link: formData.get("link"),
    description: formData.get("description"),
    technologies: formData.get("technologies"),
    role: formData.get("role"),
    challenge: formData.get("challenge"),
    solution: formData.get("solution"),
    result: formData.get("result"),
    isFeatured: formData.get("isFeatured") === "on",
    order: parseInt(formData.get("order") as string) || 0,
  });

  await newProject.save();
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  return { success: true };
}

export async function updateProject(id: string, formData: FormData) {
  await checkAuth();
  await connectDB();
  
  let imagePath = formData.get("image") as string;
  const file = formData.get("imageFile") as File;
  if (file && file.size > 0) {
    imagePath = await uploadImage(file);
  }

  await Project.findByIdAndUpdate(id, {
    title: formData.get("title"),
    category: formData.get("category"),
    image: imagePath,
    link: formData.get("link"),
    description: formData.get("description"),
    technologies: formData.get("technologies"),
    role: formData.get("role"),
    challenge: formData.get("challenge"),
    solution: formData.get("solution"),
    result: formData.get("result"),
    isFeatured: formData.get("isFeatured") === "on",
    order: parseInt(formData.get("order") as string) || 0,
  });

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  return { success: true };
}

export async function deleteProject(id: string) {
  await checkAuth();
  await connectDB();
  await Project.findByIdAndDelete(id);
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  return { success: true };
}
