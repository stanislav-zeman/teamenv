import { Member } from "@/models/Member";
import { FC } from "react";
import GenericCard from "../common/GenericCard";
import { Avatar, IconButton, Text } from "@chakra-ui/react";
import MemberRole from "./MemberRole";
import { Role } from "@/models/Role";
import { DeleteIcon } from "@chakra-ui/icons";
import { openDialog } from "@/signals/dialogSignal";
import RemoveMemberDialog from "@/dialogs/RemoveMemberDialog";
import MemberRoleUpdate from "./MemberRoleUpdate";
import { roleToIndex } from "@/utils/roleUtils";
import { LeaveIcon } from "@/icons/LeaveIcon";
import LeaveProjectDialog from "@/dialogs/LeaveProjectDialog";
import { useUser } from "@clerk/nextjs";

interface MemberItemProps {
  member: Member;
  color: string;
  projectId: string;
  myRole: Role;
}

const MemberItem: FC<MemberItemProps> = ({
  member,
  color,
  projectId,
  myRole,
}) => {
  const { user } = useUser()

  const showDeleteButton =
    roleToIndex(myRole) < roleToIndex(Role.MAINTAINER) ||
    roleToIndex(myRole) <= roleToIndex(member.role)
      ? "hidden"
      : "flex justify-end items-center";

  const showUpdateButton = roleToIndex(myRole) > roleToIndex(member.role);

  const showLeaveButton =
    member.user.id === user?.id && myRole !== Role.OWNER
      ? "flex justify-end items-center"
      : "hidden";

  return (
    <GenericCard columns="2% 30% 30% 20%">
      <Avatar
        color={color}
        src={member.user.avatarUrl}
        backgroundColor="white"
        name={member.user.username}
        size="lg"
        fontWeight="600"
      />
      <Text fontSize="xl">{member.user.username}</Text>
      {showUpdateButton ? (
        <MemberRoleUpdate
          myRole={myRole}
          member={member}
          projectId={projectId}
        />
      ) : (
        <MemberRole role={member.role} />
      )}
      <div className={showDeleteButton}>
        <IconButton
          aria-label="delete-member"
          icon={<DeleteIcon color="white" boxSize="80%" />}
          variant="ghost"
          colorScheme="whiteAlpha"
          onClick={() =>
            openDialog(
              <RemoveMemberDialog
              memberId={member.user.id}
              username={member.user.username}
              projectId={projectId}
            />
            )
          }
        />
      </div>
      <div className={showLeaveButton}>
        <IconButton
          aria-label="leave-project"
          icon={<LeaveIcon />}
          variant="ghost"
          colorScheme="whiteAlpha"
          onClick={() =>
            openDialog(
              <LeaveProjectDialog
                memberId={member.user.id}
                projectId={projectId}
              />
            )
          }
        />
      </div>
    </GenericCard>
  );
};

export default MemberItem;
