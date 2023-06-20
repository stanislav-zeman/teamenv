import { Button, Dialog, DialogContent, Input, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { closeDialog } from "@/signals/dialogSignal";
import { useCreateProject } from "@/hooks/mutations/useCreateProject";
import { useAddVariableToProject } from "@/hooks/mutations/useAddVariableToProject";
import { FC } from "react";
import { queryClient } from "@/app/providers/ReactQueryProvider";
import { getMyProjectKey } from "@/hooks/useProject";

const schema = yup
  .object()
  .shape({
    name: yup.string().required().min(3).max(30),
    value: yup.string().optional().max(250),
  })
  .required();

interface IVariableCreateData {
  projectId: string;
}

export const ProjectAddVariableDialog: FC<IVariableCreateData> = ({
  projectId,
}) => {
  const { mutate: create } = useAddVariableToProject(projectId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <Dialog fullWidth maxWidth="md" open={true} onClose={closeDialog}>
      <DialogContent
        sx={{
          borderTop: 8,
          borderColor: (theme) => theme.palette.primary.main,
        }}
      >
        <form
          onSubmit={handleSubmit((data) => {
            create(
              { name: data.name, value: data.value ?? "" },
              {
                onSuccess: () => {
                  closeDialog();
                  queryClient.invalidateQueries(getMyProjectKey(projectId));
                },
              }
            );
          })}
        >
          <div className="p-6 flex flex-col gap-4 w-full h-full justify-center">
            <Text fontSize="1.5rem" as="b">
              Create Variable:
            </Text>
            <Input
              {...register("name")}
              placeholder="Variable name"
              error={!!errors.name}
            />
            <TextField
              multiline
              rows={2}
              {...register("value")}
              placeholder="Value"
              error={!!errors.value}
            />
            <div className="gap-4 flex justify-center">
              <Button variant="contained" type="submit" color="primary">
                Apply
              </Button>
              <Button
                variant="contained"
                onClick={closeDialog}
                color="secondary"
              >
                Close
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
