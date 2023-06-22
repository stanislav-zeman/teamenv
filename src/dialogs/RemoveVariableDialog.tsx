import {useRemoveVariableFromProject} from "@/hooks/mutations/useRemoveVariableFromProject";
import {closeDialog} from "@/signals/dialogSignal";
import {Button, Dialog, DialogContent, DialogContentText, DialogTitle,} from "@mui/material";
import {FC} from "react";

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
      <DialogTitle>Remove Variable:</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You are about to remove <strong>{name}</strong> from this project.{" "}
          <br />
          Do you wish to continue?
        </DialogContentText>
        <div className="flex gap-4 my-4 justify-center">
          <Button color="primary" variant="contained" onClick={handleContinue}>
            CONTINUE
          </Button>
          <Button color="secondary" variant="contained" onClick={closeDialog}>
            CANCEL
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveVariableDialog;
