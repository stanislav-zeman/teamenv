"use client";
import { FC, useState } from "react";
import GenericCard from "../common/GenericCard";
import { Divider, Input, Switch, Text } from "@chakra-ui/react";
import { DeleteIcon, HamburgerIcon } from "@chakra-ui/icons";
import GenericList from "../common/GenericList";
import { Variable } from "@/models/Variable";

interface VariableListProps {
  variables: Variable[];
}

const VariableList: FC<VariableListProps> = (props) => {
  const variables = props.variables.map((variable) => (
    <GenericCard
      key={variable.id}
      children={[
        <Switch size="lg" isChecked={variable.checked}></Switch>,
        <Text fontSize="xl" borderRight="1px">
          {variable.name}
        </Text>,
        <Input
          backgroundColor="white"
          defaultValue={variable.value}
          color="green.700"
        />,
        <div className="flex justify-end gap-3 items-center">
          {[<HamburgerIcon boxSize="15%" />, <DeleteIcon boxSize="15%" />]}
        </div>,
      ]}
    />
  ));
  return <GenericList children={variables} />;
};

export default VariableList;
