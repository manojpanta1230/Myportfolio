"use server";

import connectDB from "@/lib/mongodb";
import Experience from "@/models/Experience";
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

export async function getExperiences() {
  await connectDB();
  const experiences = await Experience.find().sort({ order: 1, createdAt: -1 });
  return JSON.parse(JSON.stringify(experiences));
}

export async function createExperience(formData: FormData) {
  await checkAuth();
  await connectDB();
  
  let logoPath = formData.get("logo") as string;
  const file = formData.get("logoFile") as File;
  if (file && file.size > 0) {
    logoPath = await uploadImage(file);
  }

  const newExperience = new Experience({
    role: formData.get("role"),
    company: formData.get("company"),
    period: formData.get("period"),
    logo: logoPath || undefined,
    order: parseInt(formData.get("order") as string) || 0,
  });

  await newExperience.save();
  revalidatePath("/");
  revalidatePath("/admin/experience");
  return { success: true };
}

export async function updateExperience(id: string, formData: FormData) {
  await checkAuth();
  await connectDB();
  
  let logoPath = formData.get("logo") as string;
  const file = formData.get("logoFile") as File;
  if (file && file.size > 0) {
    logoPath = await uploadImage(file);
  }

  await Experience.findByIdAndUpdate(id, {
    role: formData.get("role"),
    company: formData.get("company"),
    period: formData.get("period"),
    logo: logoPath || undefined,
    order: parseInt(formData.get("order") as string) || 0,
  });

  revalidatePath("/");
  revalidatePath("/admin/experience");
  return { success: true };
}

export async function deleteExperience(id: string) {
  await checkAuth();
  await connectDB();
  await Experience.findByIdAndDelete(id);
  revalidatePath("/");
  revalidatePath("/admin/experience");
  return { success: true };
}
