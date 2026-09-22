import Intro from "@/components/Intro";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Services from "@/components/Services";

export const metadata = {
  title: "About | Manoj Panta",
  description: "Learn more about Manoj Panta's experience, skills, and services.",
};

export default function AboutPage() {
  return (
    <main className="bg-background pt-24 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <h1 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-8">
          About Me
        </h1>
      </div>
      <Intro />
      <ExperienceTimeline />
      <Services />
    </main>
  );
}
