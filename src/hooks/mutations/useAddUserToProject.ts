import { ProjectMemberData } from "@/app/api/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import environment from "@/utils/envMetadata";
import { invalidateMembers } from "../queries/useProjectMembers";

export const useAddUserToProject = (projectId: string) => {
  return useMutation(
    async (data: ProjectMemberData) =>
      await axios
        .post(`${environment.HOST}/api/projects/${projectId}/members`, {
          ...data,
        })
        .then((res) => res.data),
    {
      onSuccess: () => invalidateMembers(projectId),
    }
  );
};
