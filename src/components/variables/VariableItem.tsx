"use client";
import {Variable, VariableUpdateSchema} from "@/models/Variable";
import {FC} from "react";
import GenericCard from "../common/GenericCard";
import {Alert, AlertIcon, AlertTitle, Input, Select, Switch,} from "@chakra-ui/react";
import {SubmitHandler, useForm} from "react-hook-form";
import {VariableUpdateData} from "@/app/api/types";
import {yupResolver} from "@hookform/resolvers/yup";
import {useUpdateVariable} from "@/hooks/mutations/useUpdateVariable";
import {Environment} from "@prisma/client";
import {DeleteVariableButton} from "./DeleteVariableButton";
import {UpdateButtons} from "./UpdateButtons";
import {openDialog} from "@/signals/dialogSignal";
import RemoveVariableDialog from "@/dialogs/RemoveVariableDialog";

interface VariableItemProps {
  variable: Variable;
  projectId: string;
}
const VariableItem: FC<VariableItemProps> = ({ variable, projectId }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<VariableUpdateData>({
    defaultValues: {
      name: variable.name,
      value: variable.value,
      hidden: !variable.hiddenVariable[0].hidden,
      environment: variable.environment,
    },
    resolver: yupResolver<VariableUpdateData>(VariableUpdateSchema),
    mode: "onChange"
  });

  const { mutate: update } = useUpdateVariable({
    projectId,
    variableId: variable.id,
  });

  const changed =
    watch("hidden") !== !variable.hiddenVariable[0].hidden ||
    watch("environment") !== variable.environment ||
    watch("name") !== variable.name ||
    watch("value") !== variable.value;

  const onSubmit: SubmitHandler<VariableUpdateData> = (data) => {
    update({ ...data, hidden: !data.hidden });
  };

  const handleDialog = () =>
    openDialog(
      <RemoveVariableDialog
        variableId={variable.id}
        name={variable.name}
        projectId={projectId}
      />
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <GenericCard columns="2% 15% 25% 25% 20%">
        <Switch size="lg" {...register("hidden")} colorScheme="orange" />
        <Select variant="flushed" {...register("environment")}>
          {Object.keys(Environment).map((env) => (
            <option className="text-black" key={env} value={env}>
              {env}
            </option>
          ))}
        </Select>
        <div className=" border-r border-white">
          <Input
            backgroundColor="white"
            color="green.700"
            width="80%"
            {...register("name")}
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
          marginLeft="2em"
          backgroundColor="white"
          color="green.700"
          {...register("value")}
        />
        <div className="flex justify-end gap-3 items-center">
          <UpdateButtons changed={+changed} reset={reset} />
          <DeleteVariableButton action={handleDialog} />
        </div>
      </GenericCard>
    </form>
  );
};

export default VariableItem;
