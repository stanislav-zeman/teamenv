"use client";
import { FC, useMemo, useState } from "react";
import GenericCard from "../common/GenericCard";
import { Input, Switch, Text } from "@chakra-ui/react";
import { DeleteIcon, HamburgerIcon } from "@chakra-ui/icons";
import GenericList from "../common/GenericList";
import { Variable } from "@/models/Variable";
import VariableItem from "./VariableItem";
import { getRandomSchemes } from "@/utils/randomScheme";
import { NewVariableItem } from "./NewVariableItem";

interface VariableListProps {
  variables: Variable[];
  projectId: string;
}

const VariableList: FC<VariableListProps> = ({ variables, projectId }) => {
  const schemes = useMemo(
    () => getRandomSchemes(variables.length),
    [variables]
  );
  return (
    <GenericList>
      {variables.map((variable, index) => (
        <VariableItem
          key={variable.id}
          variable={variable}
          scheme={schemes[index]}
          projectId={projectId}
        />
      ))}
      <NewVariableItem projectId={projectId} />
    </GenericList>
  );
};

export default VariableList;
