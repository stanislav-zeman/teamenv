"use client";
import { FC, useMemo, useState } from "react";
import GenericCard from "../common/GenericCard";
import { Input, Skeleton, Switch, Text } from "@chakra-ui/react";
import { DeleteIcon, HamburgerIcon } from "@chakra-ui/icons";
import GenericList from "../common/GenericList";
import { Variable } from "@/models/Variable";
import VariableItem from "./VariableItem";
import { NewVariableItem } from "./NewVariableItem";
import { useProjectVariables } from "@/hooks/queries/useProjectVariables";
import { filteringSignal } from "@/signals/filteringSignal";

interface VariableListProps {
  projectId: string;
}

const VariableList: FC<VariableListProps> = ({ projectId }) => {
  const {
    data: variables,
    isLoading,
    isError,
  } = useProjectVariables(projectId, filteringSignal.value);

  if (isLoading) return <Skeleton />;

  if (!variables || isError) return <h3>Error during data fetch</h3>;

  return (
    <GenericList>
      {variables.map((variable, index) => (
        <VariableItem
          key={variable.id}
          variable={variable}
          projectId={projectId}
        />
      ))}
      <NewVariableItem projectId={projectId} />
    </GenericList>
  );
};

export default VariableList;
