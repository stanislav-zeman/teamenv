import {useRemoveUserFromProject} from "@/hooks/mutations/useRemoveUserFromProject";
import {invalidateMembers} from "@/hooks/queries/useProjectMembers";
import {closeDialog} from "@/signals/dialogSignal";
import {Button, Dialog, DialogContent, DialogContentText, DialogTitle,} from "@mui/material";
import {FC} from "react";

interface RemoveMemberProps {
  memberId: string;
  username: string;
  projectId: string;
}

const RemoveMemberDialog: FC<RemoveMemberProps> = ({
  memberId,
  username,
  projectId,
}) => {
  const { mutate: remove } = useRemoveUserFromProject({ memberId, projectId });

  const handleContinue = () => {
    remove(undefined, {
      onSuccess: () => {
        closeDialog();
        invalidateMembers(projectId);
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
      <DialogTitle>Remove Member:</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You are about to remove <strong>{username}</strong> from this project. <br />
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

export default RemoveMemberDialog;
