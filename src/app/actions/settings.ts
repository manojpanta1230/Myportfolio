"use server";

import connectDB from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";
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

export async function getSettings() {
  await connectDB();
  const settings = await SiteSettings.findOne();
  return settings ? JSON.parse(JSON.stringify(settings)) : null;
}

export async function updateSettings(formData: FormData) {
  await checkAuth();
  await connectDB();
  
  let heroImage = formData.get("heroImage") as string;
  const heroFile = formData.get("heroImageFile") as File;
  if (heroFile && heroFile.size > 0) heroImage = await uploadImage(heroFile);

  let aboutImage = formData.get("aboutImage") as string;
  const aboutFile = formData.get("aboutImageFile") as File;
  if (aboutFile && aboutFile.size > 0) aboutImage = await uploadImage(aboutFile);

  let resume = formData.get("resume") as string;
  const resumeFile = formData.get("resumeFile") as File;
  if (resumeFile && resumeFile.size > 0) resume = await uploadImage(resumeFile);

  const id = formData.get("id") as string;
  
  const updateData = {
    heroTitle: formData.get("heroTitle"),
    heroSubtitle: formData.get("heroSubtitle"),
    heroIntro: formData.get("heroIntro"),
    heroImage,
    aboutImage,
    resume,
    contactMail: formData.get("contactMail"),
    github: formData.get("github") || "",
    linkedin: formData.get("linkedin") || "",
    twitter: formData.get("twitter") || "",
    instagram: formData.get("instagram") || "",
    facebook: formData.get("facebook") || "",
    whatsapp: formData.get("whatsapp") || "",
  };

  if (id) {
    await SiteSettings.findByIdAndUpdate(id, updateData);
  } else {
    await new SiteSettings(updateData).save();
  }

  revalidatePath("/");
  revalidatePath("/admin/settings");
  return { success: true };
}
