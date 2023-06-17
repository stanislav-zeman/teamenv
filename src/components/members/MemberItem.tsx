import { Member } from "@/models/Member";
import { FC } from "react";
import GenericCard from "../common/GenericCard";
import { Avatar, Text } from "@chakra-ui/react";
import MemberRole from "./MemberRole";
import { Role } from "@/models/Role";
import { DeleteIcon, HamburgerIcon } from "@chakra-ui/icons";

interface MemberItemProps {
  member: Member;
  color: string;
}

const MemberItem: FC<MemberItemProps> = ({ member, color }) => {
  const iconsContainer =
    member.role == Role.OWNER
      ? "hidden"
      : "flex justify-end gap-3 items-center";
  return (
    <GenericCard>
      <Avatar
        color={color}
        backgroundColor="white"
        name={member.fullName}
        size="lg"
        fontWeight="600"
      />
      <Text fontSize="xl">{member.fullName}</Text>
      <MemberRole role={member.role} />
      <div className={iconsContainer}>
        <HamburgerIcon boxSize="15%" />
        <DeleteIcon boxSize="15%" />
      </div>
    </GenericCard>
  );
};

export default MemberItem;
