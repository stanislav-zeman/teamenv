import {FC} from "react";
import {ReadonlyProjectNameDisplay} from "./ReadonlyProjectNameDisplay";
import {EditableProjectNameDisplay} from "./EditableProjectNameDisplay";
import {Role} from "@/models/Role";
import {MyProject} from "@/models/Project";

interface IProjectNameDisplay {
  project: MyProject;
}

export const ProjectNameDisplay: FC<IProjectNameDisplay> = ({ project }) => {
  if (project.myRole < Role.MAINTAINER) {
    return <ReadonlyProjectNameDisplay projectName={project.name} />;
  }

  return <EditableProjectNameDisplay project={project} />;
};
