"use client";
import {FC} from "react";
import {Skeleton} from "@chakra-ui/react";
import GenericList from "../common/GenericList";
import VariableItem from "./VariableItem";
import {NewVariableItem} from "./NewVariableItem";
import {useProjectVariables} from "@/hooks/queries/useProjectVariables";
import {filteringSignal} from "@/signals/filteringSignal";
import {VariableColumns} from "./VariableColumns";

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
      <VariableColumns />
      {variables.map((variable) => (
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
