import { queryClient } from "@/app/providers/ReactQueryProvider";
import { useRemoveVariableFromProject } from "@/hooks/mutations/useRemoveVariableFromProject";
import { getMyProjectKey } from "@/hooks/useProject";
import { closeDialog } from "@/signals/dialogSignal";
import { Button, Dialog } from "@mui/material";
import { FC } from "react";

interface RemoveMemberProps {
  variableId: string;
  name: string;
  projectId: string;
}

const RemoveVariableDialog: FC<RemoveMemberProps> = ({
  variableId,
  name,
  projectId,
}) => {
  const { mutate: remove } = useRemoveVariableFromProject({
    variableId,
    projectId,
  });

  const handleContinue = () => {
    remove(undefined, {
      onSuccess: () => {
        closeDialog();
      },
    });
  };
  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open
      onClose={closeDialog}
      className="text-center"
    >
      <h2 className="mt-4">
        You are about to remove {name} variable from this project.
      </h2>
      <h2>Do you wish to continue?</h2>
      <div className="flex gap-4 my-4 justify-center">
        <Button color="primary" variant="contained" onClick={handleContinue}>
          CONTINUE
        </Button>
        <Button color="secondary" variant="contained" onClick={closeDialog}>
          CANCEL
        </Button>
      </div>
    </Dialog>
  );
};

export default RemoveVariableDialog;
