"use client";
import { AddIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Link,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import GenericLolInput from "../common/GenericLolInput";
import { useRouter } from "next/navigation";
import { OrderFilteringButtons } from "../common/OrderFilteringButtons";
import { AtLeastRoleFilter } from "../common/AtLeastRoleFilter";
import { DisplayFilterSwitch } from "../common/DisplayFilterSwitch";
import { ProjectNameDisplay } from "../projects/ProjectNameDisplay/ProjectNameDisplay";
import { Role } from "@/models/Role";
import { openDialog } from "@/signals/dialogSignal";
import { ProjectAddUserDialog } from "@/dialogs/ProjectAddUserDialog";
import { MyProject } from "@/models/Project";
import { generateEnvFile } from "@/utils/generateFileUtils";
import { ExportDialog } from "@/dialogs/ExportDialog";
import { ProjectAddVariableDialog } from "@/dialogs/ProjectAddVariableDialog";

interface ProjectHeaderProps {
  project: MyProject;
  members: boolean;
}

type LinkStyles = {
  textColor: string;
  fontWeight: string;
  textDecoration: string;
};

const getLinkStyles = (active: boolean): LinkStyles => {
  if (active) {
    return {
      textColor: "black",
      fontWeight: "bold",
      textDecoration: "underline",
    };
  }
  return {
    textColor: "darkgray",
    fontWeight: "normal",
    textDecoration: "none",
  };
};

const ProjectHeader: FC<ProjectHeaderProps> = ({ project, members }) => {
  const router = useRouter();
  return (
    <Stack divider={<StackDivider borderColor="gray.700" />}>
      <ProjectNameDisplay
        projectName={project.name}
        projectId={project.id}
        myRole={project.myRole}
      />
      <div className="flex justify-between">
        <div>
          <Button
            variant="link"
            {...getLinkStyles(members)}
            onClick={() => router.push(`/projects/${project.id}/members`)}
          >
            Members
          </Button>
          <Button
            variant="link"
            {...getLinkStyles(!members)}
            paddingLeft="2rem"
            onClick={() => router.push(`/projects/${project.id}/variables`)}
          >
            Variables
          </Button>
        </div>
        <div className="flex items-center gap-7 justify-self-end pr-11">
          {members ? (
            <AtLeastRoleFilter />
          ) : (
            <div className="flex items-center justify-center gap-7">
              <Button
                onClick={() =>
                  openDialog(<ExportDialog variables={project.variables} />)
                }
              >
                Export
              </Button>
              <DisplayFilterSwitch />
            </div>
          )}
          <OrderFilteringButtons />
          <GenericLolInput />
          {project.myRole > Role.DEVELOPER && (
            <IconButton
              onClick={() => {
                if (members) {
                  openDialog(<ProjectAddUserDialog project={project} />);
                  return;
                }
                openDialog(<ProjectAddVariableDialog projectId={project.id} />)
              }}
              icon={<AddIcon />}
              aria-label="perform add action"
            />
          )}
        </div>
      </div>
    </Stack>
  );
};

export default ProjectHeader;
