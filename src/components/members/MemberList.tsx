"use client";
import { FC } from "react";
import { Skeleton } from "@chakra-ui/react";
import GenericList from "../common/GenericList";
import { getRandomColors } from "@/utils/randomColor";
import MemberItem from "./MemberItem";
import { useProjectMembers } from "@/hooks/queries/useProjectMembers";
import { Role } from "@prisma/client";

interface MemberListProps {
  myRole: Role;
  projectId: string;
}

const MemberList: FC<MemberListProps> = ({ myRole, projectId }) => {
  const { data: members, isLoading, isError } = useProjectMembers(projectId);

  if (isLoading) return <Skeleton />;

  if (!members || isError) return <h3>Error during data fetch</h3>;

  const colors = getRandomColors(members.length);
  const rows = members.map((member, index) => (
    <MemberItem
      key={member.id}
      member={member}
      color={colors[index]}
      projectId={projectId}
      myRole={myRole}
    />
  ));
  return <GenericList>{rows}</GenericList>;
};

export default MemberList;
