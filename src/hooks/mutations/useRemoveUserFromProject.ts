import { MemberParams } from "@/app/api/types";
import { queryClient } from "@/app/providers/ReactQueryProvider";
import environment from "@/utils/envMetadata";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { getMembersKey, invalidateMembers } from "../queries/useProjectMembers";

export const useRemoveUserFromProject = ({
  projectId,
  memberId,
}: MemberParams) => {
  return useMutation(
    async () =>
      await axios
        .delete(
          `${environment.HOST}/api/projects/${projectId}/members/${memberId}`
        )
        .then((res) => res.data),
    { onSuccess: () => invalidateMembers(projectId) }
  );
};
