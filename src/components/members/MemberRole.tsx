"use client";
import { Badge } from "@chakra-ui/react";
import { Role } from "@prisma/client";
import { FC } from "react";

interface IMemberRoleProps {
  role: Role;
}

type RoleStyles = {
  label: string;
  color: string;
};

const getRoleStyles = (role: Role): RoleStyles => {
  switch (role) {
    case Role.GUEST:
      return { label: "Guest", color: "gray.200" };
    case Role.DEVELOPER:
      return { label: "Developer", color: "cyan.500" };
    case Role.MAINTAINER:
      return { label: "Maintainer", color: "red.700" };
    case Role.OWNER:
      return { label: "Owner", color: "darkkhaki" };
  }
};

const MemberRole: FC<IMemberRoleProps> = (props) => {
  const { label, color } = getRoleStyles(props.role);
  return (
    <Badge
      backgroundColor={color}
      color="gray.700"
      display="flex"
      justifySelf="flex-end"
      alignItems="center"
      justifyContent="center"
      height="10"
      width="36"
      borderRadius="lg"
      fontSize="lg"
    >
      {label}
    </Badge>
  );
};

export default MemberRole;
