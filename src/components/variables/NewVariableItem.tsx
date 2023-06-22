import { VariableCreateData } from "@/app/api/types";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  IconButton,
  Input,
  Select,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { boolean, lazy, mixed, object, string } from "yup";
import GenericCard from "../common/GenericCard";
import { AddIcon, CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import { FC, useState } from "react";
import { useAddVariableToProject } from "@/hooks/mutations/useAddVariableToProject";
import { Environment } from "@prisma/client";

interface INewVariableItem {
  projectId: string;
}

const schema = object()
  .shape({
    name: string()
      .required()
      .min(3, "Name must be atleast three characters long!"),
    value: string().required(),
    environment: mixed<Environment>().oneOf(Object.values(Environment)).required(),
  })
  .required();

export const NewVariableItem: FC<INewVariableItem> = ({ projectId }) => {
  const [displayNew, setDisplayNew] = useState(false);

  const { mutate: create } = useAddVariableToProject(projectId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<VariableCreateData>({
    resolver: yupResolver<VariableCreateData>(schema),
    mode: "onChange",
  });

  if (!displayNew)
    return (
      <IconButton
        aria-label={"add variable"}
        icon={<AddIcon />}
        onClick={() => setDisplayNew(true)}
      />
    );

  const handleClose = () => {
    setDisplayNew(false);
    reset();
  };

  const onSubmit = (data: VariableCreateData) => {
    create(data);
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <GenericCard columns="2% 15% 25% 25% 20%">
        <div>
          <IconButton
            type="submit"
            variant="ghost"
            color="white"
            colorScheme="whiteAlpha"
            aria-label={"add variable"}
            icon={<CheckIcon />}
          />
        </div>
        <Select variant="flushed"
          {...register("environment")}>
          <option className="text-black" value={Environment.DEVELOPMENT}>{Environment.DEVELOPMENT}</option>
          <option className="text-black" value={Environment.PREVIEW}>{Environment.PREVIEW}</option>
          <option className="text-black" value={Environment.PRODUCTION}>{Environment.PRODUCTION}</option>
          <option className="text-black" value={Environment.STAGING}>{Environment.STAGING}</option>
        </Select>
        <div className=" border-r border-white w-full">
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
        <div>
          <Input
            backgroundColor="white"
            color="green.700"
            {...register("value")}
          />
          {errors.value && (
            <Alert
              status="error"
              width="80%"
              marginTop="0.5em"
              borderRadius="md"
            >
              <AlertIcon />
              <AlertTitle color="red.500" fontSize="sm">
                {errors.value.message}
              </AlertTitle>
            </Alert>
          )}
        </div>
        <div className="flex justify-end gap-3 items-center">
          <IconButton
            type="button"
            aria-label="delete-variable"
            icon={<DeleteIcon color="white" boxSize="80%" />}
            variant="ghost"
            colorScheme="whiteAlpha"
            onClick={handleClose}
          />
        </div>
      </GenericCard>
    </form>
  );
};
