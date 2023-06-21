import { closeDialog } from "@/signals/dialogSignal";
import { Dialog, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { FC } from "react";

interface ProjectInfoDialogProps {
    description?: string;
}
 
const ProjectInfoDialog: FC<ProjectInfoDialogProps> = ({description}) => {
    return (  
        <Dialog maxWidth="md" fullWidth open onClose={closeDialog}>
            <DialogContent>
                <DialogTitle>
                    Description:
                </DialogTitle>
                <DialogContentText>{description}</DialogContentText>
            </DialogContent>
        </Dialog>
    );
}
 
export default ProjectInfoDialog;