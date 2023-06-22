"use client";
import RemoveVariableDialog from "@/dialogs/RemoveVariableDialog";
import { Variable } from "@/models/Variable";
import { openDialog } from "@/signals/dialogSignal";
import { DeleteIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import type { FC, MouseEventHandler } from "react";

export type DeleteVariableButtonProps = {
  action: MouseEventHandler<HTMLButtonElement>;
};

export const DeleteVariableButton: FC<DeleteVariableButtonProps> = ({
  action,
}) => {
  return (
    <IconButton
      type="button"
      aria-label="delete-variable"
      icon={<DeleteIcon color="white" boxSize="80%" />}
      variant="ghost"
      colorScheme="whiteAlpha"
      onClick={action}
    />
  );
};
