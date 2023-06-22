import {VariableUpdateData} from "@/app/api/types";
import {CheckIcon, CloseIcon} from "@chakra-ui/icons";
import {IconButton} from "@chakra-ui/react";
import type {FC} from "react";
import {UseFormReset} from "react-hook-form/dist/types";

export type UpdateButtonsProps = {
  changed: number;
  reset: UseFormReset<VariableUpdateData>;
};

export const UpdateButtons: FC<UpdateButtonsProps> = ({ changed, reset }) => {
  if (!changed) return <></>;
  return (
    <>
      <IconButton
        aria-label="submit-variable"
        icon={<CheckIcon color="white" boxSize="80%" />}
        variant="ghost"
        colorScheme="whiteAlpha"
        type="submit"
      />
      <IconButton
        aria-label="reset-variable"
        icon={<CloseIcon color="white" boxSize="65%" />}
        variant="ghost"
        colorScheme="whiteAlpha"
        onClick={() => {
          reset();
        }}
      />
    </>
  );
};
