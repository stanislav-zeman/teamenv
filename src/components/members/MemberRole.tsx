"use client";
import { Role } from "@/models/Role";
import { Badge } from "@chakra-ui/react";
import { FC } from "react";

interface IMemberRoleProps {
  role: Role;
}

const getRoleStyles = (role: Role): string[] => {
  switch (role) {
    case Role.GUEST:
      return ["Guest", "gray.200"];
    case Role.DEVELOPER:
      return ["Developer", "cyan.500"];
    case Role.MAINTAINER:
      return ["Maintainer", "red.700"];
    case Role.OWNER:
      return ["Owner", "darkkhaki"];
  }
};

const MemberRole: FC<IMemberRoleProps> = (props) => {
  const [label, color] = getRoleStyles(props.role);
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
