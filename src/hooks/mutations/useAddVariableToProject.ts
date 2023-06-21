import { VariableCreateData } from "@/app/api/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import environment from "@/utils/envMetadata";
import { queryClient } from "@/app/providers/ReactQueryProvider";
import { getMyProjectKey } from "../useProject";

export const useAddVariableToProject = (projectId: string) => {
  return useMutation(
    async (data: VariableCreateData) =>
      await axios
        .post(`${environment.HOST}/api/projects/${projectId}/variables`, {
          ...data,
        })
        .then((res) => res.data),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(getMyProjectKey(projectId)),
    }
  );
};
