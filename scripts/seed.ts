import { projects } from "../src/data/projects";
import { experience } from "../src/data/experience";
import Project from "../src/models/Project";
import Experience from "../src/models/Experience";
import SiteSettings from "../src/models/SiteSettings";
import Blog from "../src/models/Blog";
import connectToDatabase from "../src/lib/mongodb";
import mongoose from "mongoose";

async function main() {
  await connectToDatabase();
  console.log("Connected to MongoDB");

  // Clear existing
  await Project.deleteMany({});
  await Experience.deleteMany({});
  await SiteSettings.deleteMany({});
  await Blog.deleteMany({});

  // Seed Projects
  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    await Project.create({
      title: p.title,
      category: p.category,
      image: p.image,
      link: p.link,
      description: p.description,
      technologies: p.technologies.join(","),
      role: p.details.role,
      challenge: p.details.challenge,
      solution: p.details.solution,
      result: p.details.result,
      isFeatured: i < 5,
      order: i,
    });
  }

  // Seed Experience
  for (let i = 0; i < experience.length; i++) {
    const e = experience[i];
    await Experience.create({
      role: e.role,
      company: e.company,
      period: e.period,
      logo: e.logo || null,
      order: i,
    });
  }

  // Seed Settings
  await SiteSettings.create({
    heroTitle: "I'm a developer who loves turning ideas into products.",
    heroIntro:
      "I am Manoj Panta, a Full Stack Developer, Managing Director & Founder at Birvex Tech Pvt Ltd based in Kathmandu, Nepal. I specialize in frontend and full stack web development using modern technologies to build fast, responsive, and SEO-friendly digital solutions worldwide.",
    contactMail: "hello@mpanta.com.np",
  });

  // Seed Blog
  await Blog.create({
    title: "My TBC Journey - The British College",
    slug: "my-tbc-journey-the-british-college",
    description: "Read about my student journey experience at The British College, Kathmandu.",
    content: "Read about my student journey experience at The British College, Kathmandu. This is the full content of the blog post...",
    image: "/askmenepal.png",
    date: "2024",
    isFeatured: true,
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
