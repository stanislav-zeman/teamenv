"use client";
import MemberList from "@/components/members/MemberList";
import ProjectHeader from "@/components/members/ProjectHeader";
import VariableList from "@/components/variables/VariableList";
import { useProject, useProjectMocked } from "@/hooks/useProject";
import { Member } from "@/models/Member";
import { MyProject } from "@/models/Project";
import { Role } from "@/models/Role";
import { Variable } from "@/models/Variable";
import { transformProjectData } from "@/utils/transformData";

interface IProjectContainerProps {
  projectId: string;
  members: boolean;
}

const ProjectContainer = ({ projectId, members }: IProjectContainerProps) => {
  const { data, isError, isLoading } = useProject(projectId);

  if (isLoading) return <h1>Loading..</h1>;

  if (!data || isError) return <h1>Not found..</h1>;

  const project = transformProjectData(data)

  console.log(project)
  return (
    <div className="px-28 pt-7">
      <ProjectHeader
        project={project}
        members={members}
      />
      {members ? (
        <MemberList members={project.users} projectId={projectId} />
      ) : (
        <VariableList variables={project.variables} />
      )}
    </div>
  );
};

export default ProjectContainer;
