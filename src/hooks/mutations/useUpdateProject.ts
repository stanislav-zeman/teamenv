import { ProjectCreateData } from "@/app/api/types";
import { queryClient } from "@/app/providers/ReactQueryProvider";
import environment from "@/utils/envMetadata";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { getMyProjectKey } from "../useProject";

export const useUpdateProject = (projectId: string) => {
  return useMutation(
    async (data: ProjectCreateData) =>
      await axios
        .put(`${environment.HOST}/api/projects/${projectId}`, { ...data })
        .then((res) => res.data),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(getMyProjectKey(projectId)),
    }
  );
};
