import {Button, Dialog, DialogContent} from "@mui/material";
import {FC} from "react";
import {Text} from "@chakra-ui/react";
import {closeDialog} from "@/signals/dialogSignal";
import {useDeleteProject} from "@/hooks/mutations/useDeleteProject";

interface IProjectDeleteDialog {
  projectId: string;
  projectName: string;
}

export const ProjectDeleteDialog: FC<IProjectDeleteDialog> = ({
  projectId,
  projectName,
}) => {
  const { mutate: perfromDelete } = useDeleteProject();

  const handleConfirmDelete = () => {
    perfromDelete(projectId);
    closeDialog();
  };

  return (
    <Dialog open={true} onClose={closeDialog}>
      <DialogContent
        sx={{
          borderTop: 8,
          borderColor: (theme) => theme.palette.primary.main,
        }}
      >
        <div className="p-6 flex flex-col gap-4">
          <Text fontSize="1.5rem" as="b">
            Do you want to delete project:{"\n"} {projectName}?
          </Text>

          <div className="gap-4 flex justify-center">
            <Button
              onClick={handleConfirmDelete}
              variant="contained"
              color="primary"
            >
              Yes
            </Button>
            <Button
              onClick={() => closeDialog()}
              variant="contained"
              color="secondary"
            >
              No
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
