import { queryClient } from "@/app/providers/ReactQueryProvider";
import { useRemoveUserFromProject } from "@/hooks/mutations/useRemoveUserFromProject";
import { getMyProjectKey } from "@/hooks/useProject";
import { closeDialog } from "@/signals/dialogSignal";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { FC } from "react";

type LeaveProjectDialogProps = {
  memberId: string;
  projectId: string;
}

const LeaveProjectDialog: FC<LeaveProjectDialogProps> = ({
  memberId,
  projectId,
}) => {
  const { mutate: remove } = useRemoveUserFromProject({ memberId, projectId });

  const handleContinue = () => {
    remove(undefined, {
      onSuccess: () => {
        closeDialog();
        queryClient.invalidateQueries(getMyProjectKey(projectId));
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
      <DialogTitle>Leave Project:</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You are about to leave this project. <br />
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

export default LeaveProjectDialog;
