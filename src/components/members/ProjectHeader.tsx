"use client";
import { AddIcon } from "@chakra-ui/icons";
import { Button, IconButton, Stack, StackDivider } from "@chakra-ui/react";
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
import { ExportDialog } from "@/dialogs/ExportDialog";
import { EnvironmentFilter } from "../common/EnvironmentFilter";
import { getLinkStyles } from "@/utils/styleUtils";

interface ProjectHeaderProps {
  project: MyProject;
  members: boolean;
}

const ProjectHeader: FC<ProjectHeaderProps> = ({ project, members }) => {
  const router = useRouter();
  const showAddButton = members && project.myRole >= Role.MAINTAINER;
  return (
    <Stack divider={<StackDivider borderColor="gray.700" />}>
      <ProjectNameDisplay project={project} />
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
              <EnvironmentFilter />
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
          {showAddButton && (
            <IconButton
              onClick={() => {
                openDialog(<ProjectAddUserDialog project={project} />);
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
