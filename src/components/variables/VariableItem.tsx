"use client";
import { Variable } from "@/models/Variable";
import { FC, useState } from "react";
import GenericCard from "../common/GenericCard";
import { Input, Switch, Text } from "@chakra-ui/react";
import { DeleteIcon, HamburgerIcon } from "@chakra-ui/icons";
import { getRandomScheme } from "@/utils/randomScheme";

interface VariableItemProps {
  variable: Variable;
  scheme: string;
}

const VariableItem: FC<VariableItemProps> = ({ variable, scheme }) => {
  const [checked, setChecked] = useState(false);
  return (
    <GenericCard>
      <Switch
        size="lg"
        isChecked={checked}
        onChange={() => setChecked(!checked)}
        colorScheme={scheme} />
      <Text fontSize="xl" borderRight="1px">
        {variable.name}
      </Text>
      <Input
        backgroundColor="white"
        defaultValue={variable.value}
        color="green.700"
      />
      <div className="flex justify-end gap-3 items-center">
        <HamburgerIcon boxSize="15%" />
        <DeleteIcon boxSize="15%" />
      </div>
    </GenericCard>
  );
};

export default VariableItem;
