"use client";
import { FC, useMemo } from "react";
import { Member } from "@/models/Member";
import GenericCard from "../common/GenericCard";
import { Avatar, Text } from "@chakra-ui/react";
import MemberRole from "./MemberRole";
import { DeleteIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Role } from "@/models/Role";
import GenericList from "../common/GenericList";
import { getRandomColors } from "@/utils/randomColor";
import MemberItem from "./MemberItem";
import { ProjectUser } from "@prisma/client";

interface MemberListProps {
  members: Member[];
  projectId: string;
}

const MemberList: FC<MemberListProps> = ({ members, projectId }) => {
  const colors = useMemo(() => getRandomColors(members.length), [members]);
  const rows = members.map((member, index) => (
    <MemberItem key={member.id} member={member} color={colors[index]} projectId={projectId} />
  ));
  return <GenericList>{rows}</GenericList>;
};

export default MemberList;
