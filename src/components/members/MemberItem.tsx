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
  const iconsContainer =
    member.role == Role.OWNER
      ? "hidden"
      : "flex justify-end gap-3 items-center";

  return (
    <GenericCard>
      <Avatar
        color={color}
        src={member.user.avatarUrl}
        backgroundColor="white"
        name={member.user.username}
        size="lg"
        fontWeight="600"
      />
      <Text fontSize="xl">{member.user.username}</Text>
      {roleToIndex(myRole) > roleToIndex(member.role) ? (
        <MemberRoleUpdate
          myRole={myRole}
          member={member}
          projectId={projectId}
        />
      ) : (
        <MemberRole role={member.role} />
      )}
      {myRole >= Role.MAINTAINER && myRole > member.role && (
        <div className={iconsContainer}>
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
      )}
    </GenericCard>
  );
};

export default MemberItem;
