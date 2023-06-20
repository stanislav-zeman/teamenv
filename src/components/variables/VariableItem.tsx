"use client";
import { Variable } from "@/models/Variable";
import { FC, useState } from "react";
import GenericCard from "../common/GenericCard";
import { IconButton, Input, Switch, Text } from "@chakra-ui/react";
import { DeleteIcon, HamburgerIcon } from "@chakra-ui/icons";
import { getRandomScheme } from "@/utils/randomScheme";
import { openDialog } from "@/signals/dialogSignal";
import RemoveVariableDialog from "@/dialogs/RemoveVariableDialog";

interface VariableItemProps {
  variable: Variable;
  scheme: string;
  projectId: string;
}

const VariableItem: FC<VariableItemProps> = ({ variable, scheme, projectId }) => {
  const [checked, setChecked] = useState(variable.hidden ?? false);
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
        <IconButton
          aria-label="delete-variable"
          icon={<DeleteIcon color="white" boxSize="80%" />}
          variant="ghost"
          colorScheme="whiteAlpha"
          onClick={() =>
            openDialog(
              <RemoveVariableDialog
                variableId={variable.id}
                name={variable.name}
                projectId={projectId}
              />
            )
          }
        />
      </div>
    </GenericCard>
  );
};

export default VariableItem;
