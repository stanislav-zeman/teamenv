import { PageProps } from '@/app/projects/types'
import ProjectContainer from "@/containers/ProjectContainer";

 
export default function Page({ params }: PageProps) {
  return <ProjectContainer projectId={params.id} members />;
}
