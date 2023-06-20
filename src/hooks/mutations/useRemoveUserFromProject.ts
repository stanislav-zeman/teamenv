import { MemberParams, ProjectMemberData } from "@/app/api/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useRemoveUserFromProject = ({
  projectId,
  memberId,
}: MemberParams) => {
  return useMutation(
    async () =>
      await axios
        .delete(
          `http://localhost:3000/api/projects/${projectId}/members/${memberId}`
        )
        .then((res) => res.data)
  );
};
