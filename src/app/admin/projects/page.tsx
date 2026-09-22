import { getProjects } from "@/app/actions/projects";
import ProjectsClient from "./ProjectsClient";

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return <ProjectsClient initialProjects={projects} />;
}
