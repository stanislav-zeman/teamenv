import { PageProps } from "../../../../../.next/types/app/layout";
import ProjectContainer from "@/containers/ProjectContainer";

 
export default function Page({ params }: PageProps) {
  return <ProjectContainer id={params.id} members />;
}
