"use client";
import MemberList from "@/components/members/MemberList";
import ProjectHeader from "@/components/members/ProjectHeader";
import VariableList from "@/components/variables/VariableList";
import { useProject } from "@/hooks/useProject";
import { mockedMyProjects } from "@/mocks/myProjectsMock";
import { MyProject } from "@/models/Project";
import { useQuery } from "@tanstack/react-query";

interface IProjectContainerProps {
  id: string;
  members: boolean;
}

const ProjectContainer = ({ id, members }: IProjectContainerProps) => {
  const project = useProject(id);

  if (!project.data) return <h1>Not found..</h1>;
  
  return (
    <div className="px-28 pt-7">
      <ProjectHeader id={id} name={project.data.name} members={members} />
      {members ? (
        <MemberList members={project.data.members} />
      ) : project.data.variables.length ? (
        <VariableList variables={project.data.variables} />
      ) : (
        <h1>No variables found..</h1>
      )}
    </div>
  );
};

export default ProjectContainer;
