"use client";
import MemberList from "@/components/members/MemberList";
import ProjectHeader from "@/components/members/ProjectHeader";
import VariableList from "@/components/variables/VariableList";
import { useProject } from "@/hooks/useProject";
import { transformProjectData } from "@/utils/transformData";

interface IProjectContainerProps {
  projectId: string;
  members: boolean;
}

const ProjectContainer = ({ projectId, members }: IProjectContainerProps) => {
  const { data, isError, isLoading } = useProject(projectId);

  if (isLoading) return <h1>Loading..</h1>;

  if (!data || isError) return <h1>Not found..</h1>;

  const project = transformProjectData(data);

  console.log(project);
  return (
    <div className="px-28 pt-7">
      <ProjectHeader project={project} members={members} />
      {members ? (
        <MemberList projectId={projectId} myRole={project.myRole} />
      ) : (
        <VariableList projectId={projectId} />
      )}
    </div>
  );
};

export default ProjectContainer;
