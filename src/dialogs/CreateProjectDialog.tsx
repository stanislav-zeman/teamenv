import { Button, Dialog, DialogContent, Input, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { closeDialog } from "@/signals/dialogSignal";
import { useCreateProject } from "@/hooks/mutations/useCreateProject";

const schema = yup
  .object()
  .shape({
    name: yup.string().required().min(3).max(30),
    description: yup.string().optional().max(250),
  })
  .required();

export const CreateProjectDialog = () => {
  const { mutate: create } = useCreateProject();

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
            create({ ...data, description: data.description ?? "" });
            closeDialog();
          })}
        >
          <div className="p-6 flex flex-col gap-4 w-full h-full justify-center">
            <Text fontSize="1.5rem" as="b">
              Create Project:
            </Text>
            <Input
              {...register("name")}
              placeholder="Project Name"
              error={!!errors.name}
            />
            <TextField
              multiline
              rows={4}
              {...register("description")}
              placeholder="Description"
              error={!!errors.description}
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
