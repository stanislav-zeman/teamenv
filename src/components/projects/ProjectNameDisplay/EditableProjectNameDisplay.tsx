import {FC} from "react";
import {ReadonlyProjectNameDisplay} from "./ReadonlyProjectNameDisplay";
import {IconButton} from "@chakra-ui/react";
import {EditIcon, InfoIcon} from "@chakra-ui/icons";
import {openDialog} from "@/signals/dialogSignal";
import {WriteProjectDialog} from "@/dialogs/WriteProjectDialog";
import {MyProject} from "@/models/Project";
import {useUpdateProject} from "@/hooks/mutations/useUpdateProject";
import ProjectInfoDialog from "@/dialogs/ProjectInfoDialog";

interface IEditableProjectName {
  project: MyProject;
}

export const EditableProjectNameDisplay: FC<IEditableProjectName> = ({
  project,
}) => {
  const { mutate } = useUpdateProject(project.id);

  return (
    <div className="flex gap-3 items-center min-w-md max-w-md">
      <ReadonlyProjectNameDisplay projectName={project.name} />
      <IconButton
        variant="ghost"
        aria-label="toggle edit"
        icon={<EditIcon />}
        onClick={() =>
          openDialog(
            <WriteProjectDialog
              initialData={{
                name: project.name,
                description: project.description,
              }}
              submit={(data) => mutate(data)}
            />
          )
        }
      />
      <IconButton
        variant="ghost"
        aria-label="project-info"
        icon={<InfoIcon />}
        onClick={() =>
          openDialog(
            <ProjectInfoDialog description={project.description ?? ""} />
          )
        }
      />
    </div>
  );
};
