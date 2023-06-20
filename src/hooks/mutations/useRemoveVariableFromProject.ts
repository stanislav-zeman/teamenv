import { VariableParams } from "@/app/api/types";
import environment from "@/utils/envMetadata";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useRemoveVariableFromProject = ({
  projectId,
  variableId,
}: VariableParams) => {
  return useMutation(
    async () =>
      await axios
        .delete(
          `${environment.HOST}/api/projects/${projectId}/variables/${variableId}`
        )
        .then((res) => res.data)
  );
};
