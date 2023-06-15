"use client";
import { FC } from "react";
import { Member } from "@/models/Member";
import GenericCard from "../common/GenericCard";
import { Avatar, Text } from "@chakra-ui/react";
import MemberRole from "./MemberRole";
import { useRandomColor } from "@/hooks/useRandomColor";
import { DeleteIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Role } from "@/models/Role";
import GenericList from "../common/GenericList";

interface MemberListProps {
  members: Member[];
}

const icons = (role: Role) =>
  role !== Role.OWNER
    ? [<HamburgerIcon boxSize="15%" />, <DeleteIcon boxSize="15%" />]
    : [];

const MemberList: FC<MemberListProps> = (props) => {
  const members = props.members.map((member) => (
    <GenericCard
      key={member.id}
      children={[
        <Avatar
          color={useRandomColor()}
          backgroundColor="white"
          name={member.fullName}
          size="lg"
          fontWeight="600"
        ></Avatar>,
        <Text fontSize="xl">{member.fullName}</Text>,
        <MemberRole role={member.role} />,
        <div className="flex justify-end gap-3 items-center">
          {icons(member.role)}
        </div>,
      ]}
    />
  ));
  return <GenericList children={members} />;
};

export default MemberList;
