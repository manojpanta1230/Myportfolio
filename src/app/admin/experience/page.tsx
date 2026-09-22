import { getExperiences } from "@/app/actions/experience";
import ExperienceClient from "./ExperienceClient";

export default async function AdminExperiencePage() {
  const experiences = await getExperiences();

  return <ExperienceClient initialExperiences={experiences} />;
}
