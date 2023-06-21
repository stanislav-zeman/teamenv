import { VariableParams, VariableUpdateData } from "@/app/api/types";
import { queryClient } from "@/app/providers/ReactQueryProvider";
import environment from "@/utils/envMetadata";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { getMyProjectKey } from "../useProject";

export const useUpdateVariable = ({
  projectId,
  variableId,
}: VariableParams) => {
  return useMutation(
    async (data: VariableUpdateData) =>
      await axios
        .put(
          `${environment.HOST}/api/projects/${projectId}/variables/${variableId}`,
          { ...data }
        )
        .then((res) => res.data),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(getMyProjectKey(projectId)),
    }
  );
};
