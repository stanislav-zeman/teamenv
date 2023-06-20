"use client";
import { FC, useMemo, useState } from "react";
import GenericCard from "../common/GenericCard";
import { Input, Switch, Text } from "@chakra-ui/react";
import { DeleteIcon, HamburgerIcon } from "@chakra-ui/icons";
import GenericList from "../common/GenericList";
import { Variable } from "@/models/Variable";
import VariableItem from "./VariableItem";
import { getRandomSchemes } from "@/utils/randomScheme";

interface VariableListProps {
  variables: Variable[];
}

const VariableList: FC<VariableListProps> = ({ variables }) => {
  const schemes = useMemo(
    () => getRandomSchemes(variables.length),
    [variables]
  );
  const rows = variables.map((variable, index) => (
    <VariableItem
      key={variable.id}
      variable={variable}
      scheme={schemes[index]}
    />
  ));
  return <GenericList>{rows}</GenericList>;
};

export default VariableList;
