"use client";
import {Badge, IconButton, Text} from "@chakra-ui/react";
import {Role} from "@prisma/client";
import {FC} from "react";
import {getRoleStyles} from "./MemberRole";
import {openDialog} from "@/signals/dialogSignal";
import {UpdateRoleDialog} from "@/dialogs/UpdateRoleDialog";
import {Member} from "@/models/Member";
import {ThreeDotsIcon} from "@/icons/ThreeDotsIcon";

interface IMemberRoleProps {
  member: Member;
  projectId: string;
  myRole: Role;
}

const MemberRole: FC<IMemberRoleProps> = ({ member, projectId, myRole }) => {
  const { label, color } = getRoleStyles(member.role);

  return (
    <Badge
      backgroundColor={color}
      color="gray.700"
      display="grid"
      gridTemplateColumns="80% 10%"
      justifySelf="center"
      alignItems="center"
      height="10"
      width="10em"
      borderRadius="lg"
      fontSize="lg"
    >
      <Text justifySelf="center">{label}</Text>
      <IconButton
        variant="ghost"
        colorScheme="black"
        aria-label="user-update"
        icon={<ThreeDotsIcon />}
        onClick={() =>
          openDialog(
            <UpdateRoleDialog
              projectId={projectId}
              myRole={myRole}
              selectedUser={member}
            />
          )
        }
      />
    </Badge>
  );
};

export default MemberRole;
