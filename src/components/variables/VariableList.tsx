"use client";
import { FC } from "react";
import GenericList from "../common/GenericList";
import { Variable } from "@/models/Variable";
import VariableItem from "./VariableItem";
import { NewVariableItem } from "./NewVariableItem";

interface VariableListProps {
  variables: Variable[];
  projectId: string;
}

const VariableList: FC<VariableListProps> = ({ variables, projectId }) => {
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
