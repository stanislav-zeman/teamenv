"use client";
import { Variable } from "@/models/Variable";
import { FC, useEffect, useState } from "react";
import GenericCard from "../common/GenericCard";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  IconButton,
  Input,
  Switch,
} from "@chakra-ui/react";
import {
  CheckIcon,
  CloseIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import { openDialog } from "@/signals/dialogSignal";
import RemoveVariableDialog from "@/dialogs/RemoveVariableDialog";
import { boolean, lazy, object, string } from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { VariableUpdateData } from "@/app/api/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateVariable } from "@/hooks/mutations/useUpdateVariable";

interface VariableItemProps {
  variable: Variable;
  projectId: string;
}

const dataSchema = object().shape({
  hidden: boolean().optional(),
  name: lazy((value) => {
    if (value)
      return string()
        .required()
        .min(3, "Name must be atleast three characters long!");
    return string().optional();
  }),
  value: lazy((value) => {
    if (value) return string().required();
    return string().optional();
  }),
});

const VariableItem: FC<VariableItemProps> = ({
  variable,
  projectId,
}) => {
  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VariableUpdateData>({
    defaultValues: {
      name: variable.name,
      value: variable.value,
      hidden: variable.hidden,
    },
    resolver: yupResolver(dataSchema),
  });

  const {mutate: update} = useUpdateVariable({projectId, variableId: variable.id})
  const [changed, setChange] = useState(false);
  const { onChange: nameChange, ...name } = register("name");
  const { onChange: valueChange, ...value } = register("value");
  const { onChange: hiddenChange, ...hidden } = register("hidden");
  const onSubmit: SubmitHandler<VariableUpdateData> = (data) => {
    update(data);
    setChange(false);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <GenericCard>
        <Switch
          size="lg"
          onChange={(e) => {
            hiddenChange(e);
            setChange(getValues("hidden") !== variable.hidden);
          }}
          {...hidden}
          colorScheme="orange"
        />
        <div className=" border-r border-white">
          <Input
            backgroundColor="white"
            color="green.700"
            width="80%"
            onChange={(e) => {
              nameChange(e);
              setChange(e.target.value !== variable.name);
            }}
            {...name}
          />
          {errors.name && (
            <Alert
              status="error"
              width="80%"
              marginTop="0.5em"
              borderRadius="md"
            >
              <AlertIcon />
              <AlertTitle color="red.500" fontSize="sm">
                {errors.name.message}
              </AlertTitle>
            </Alert>
          )}
        </div>
        <Input
          backgroundColor="white"
          color="green.700"
          onChange={(e) => {
            valueChange(e);
            setChange(e.target.value !== variable.value);
          }}
          {...value}
        />
        <div className="flex justify-end gap-3 items-center">
          {changed && (
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
                  setChange(false);
                }}
              />
            </>
          )}
          <IconButton
            type="button"
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
    </form>
  );
};

export default VariableItem;
