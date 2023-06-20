import { Member } from "@/models/Member";
import { FC } from "react";
import GenericCard from "../common/GenericCard";
import { Avatar, IconButton, Text } from "@chakra-ui/react";
import MemberRole from "./MemberRole";
import { Role } from "@/models/Role";
import { DeleteIcon, HamburgerIcon } from "@chakra-ui/icons";
import { openDialog } from "@/signals/dialogSignal";
import RemoveMemberDialog from "@/dialogs/RemoveMemberDialog";

interface MemberItemProps {
  member: Member;
  color: string;
  projectId: string;
}

const MemberItem: FC<MemberItemProps> = ({ member, color, projectId }) => {
  const iconsContainer =
    member.role == Role.OWNER
      ? "hidden"
      : "flex justify-end gap-3 items-center";
  return (
    <GenericCard>
      <Avatar
        color={color}
        src={member.avatarUrl}
        backgroundColor="white"
        name={member.username}
        size="lg"
        fontWeight="600"
      />
      <Text fontSize="xl">{member.username}</Text>
      <MemberRole role={member.role} />
      <div className={iconsContainer}>
        <HamburgerIcon boxSize="15%" />
        <IconButton
          aria-label="delete-member"
          icon={<DeleteIcon color="white" boxSize="80%" />}
          variant="ghost"
          colorScheme="whiteAlpha"
          onClick={() =>
            openDialog(
              <RemoveMemberDialog
                memberId={member.id}
                username={member.username}
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
