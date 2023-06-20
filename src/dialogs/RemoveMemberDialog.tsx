import { useRemoveUserFromProject } from "@/hooks/mutations/useRemoveUserFromProject";
import { closeDialog } from "@/signals/dialogSignal";
import { Button, Dialog } from "@mui/material";
import { FC } from "react";

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
  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open
      onClose={closeDialog}
      className="text-center"
    >
      <h2 className="mt-4">
        You are about to remove {username} from this project.
      </h2>
      <h2>Do you wish to continue?</h2>
      <div className="flex gap-4 my-4 justify-center">
        <Button color="primary" variant="contained" onClick={() => remove()}>
          CONTINUE
        </Button>
        <Button color="secondary" variant="contained" onClick={closeDialog}>
          CANCEL
        </Button>
      </div>
    </Dialog>
  );
};

export default RemoveMemberDialog;
