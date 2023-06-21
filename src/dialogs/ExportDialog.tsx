"use client";
import { closeDialog } from "@/signals/dialogSignal";
import { Button, Dialog, DialogContent, Input } from "@mui/material";
import { FC, useState } from "react";
import { Text } from "@chakra-ui/react";
import { ProjectVariableView, Variable } from "@/models/Variable";
import { generateEnvFile } from "@/utils/generateFileUtils";

interface IExportDialog {
  variables: ProjectVariableView[] | Variable[];
}

export const ExportDialog: FC<IExportDialog> = ({ variables }) => {
  const [fileName, setFileName] = useState(".env");

  const handleExport = () => {
    generateEnvFile(variables, fileName);
    closeDialog();
  };

  return (
    <Dialog maxWidth="md" open onClose={closeDialog}>
      <DialogContent
        sx={{
          borderTop: 8,
          borderColor: (theme) => theme.palette.primary.main,
        }}
      >
        <div className="p-6 flex flex-col gap-4">
          <Text fontSize="1.5rem" as="b">
            Project name:
          </Text>
          <Input
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
          <div className="gap-4 flex">
            <Button onClick={handleExport} variant="contained" color="primary">
              Export
            </Button>
            <Button
              onClick={() => closeDialog()}
              variant="contained"
              color="secondary"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
