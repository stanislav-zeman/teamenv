"use client";
import { FC } from "react";
import GenericList from "../common/GenericList";
import { Variable } from "@/models/Variable";
import VariableItem from "./VariableItem";

interface VariableListProps {
  variables: Variable[];
  projectId: string;
}

const VariableList: FC<VariableListProps> = ({ variables, projectId }) => {
  const rows = variables.map((variable) => (
    <VariableItem
      key={variable.id}
      variable={variable}
      projectId={projectId}
    />
  ));
  return <GenericList>{rows}</GenericList>;
};

export default VariableList;
