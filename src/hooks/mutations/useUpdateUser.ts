import {MemberParams} from "@/app/api/types";
import environment from "@/utils/envMetadata";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {Role} from "@prisma/client";

export const useUpdateUser = ({
  projectId,
  memberId,
}: MemberParams) => {
  return useMutation(
    async (role: Role) =>
      await axios
        .put(
          `${environment.HOST}/api/projects/${projectId}/members/${memberId}`,
          { role }
        )
        .then((res) => res.data),
  );
};
