"use client";
import { FC, useMemo } from "react";
import { Member } from "@/models/Member";
import GenericCard from "../common/GenericCard";
import { Avatar, Skeleton, Text } from "@chakra-ui/react";
import MemberRole from "./MemberRole";
import { DeleteIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Role } from "@/models/Role";
import GenericList from "../common/GenericList";
import { getRandomColors } from "@/utils/randomColor";
import MemberItem from "./MemberItem";
import { ProjectUser } from "@prisma/client";
import { useProjectMembers } from "@/hooks/queries/useProjectMembers";
import { filteringSignal, getFilters } from "@/signals/filteringSignal";

interface MemberListProps {
  projectId: string;
}

const MemberList: FC<MemberListProps> = ({ projectId }) => {
  const {
    data: members,
    isLoading,
    isError,
  } = useProjectMembers(projectId, filteringSignal.value);

  if (isLoading) return <Skeleton />;

  if (!members || isError) return <h3>Error during data fetch</h3>;

  const colors = getRandomColors(members.length);
  const rows = members.map((member, index) => (
    <MemberItem
      key={member.id}
      member={member}
      color={colors[index]}
      projectId={projectId}
    />
  ));
  return <GenericList>{rows}</GenericList>;
};

export default MemberList;
