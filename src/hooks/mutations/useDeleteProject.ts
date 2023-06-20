import { queryClient } from "@/app/providers/ReactQueryProvider";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { getMyProjectsKey } from "../useMyProjects";

export const useDeleteProject = () =>
  useMutation(
    async (projectId: string) =>
      await axios
        .delete(`http://localhost:3000/api/projects/${projectId}`)
        .then((res) => res.data),
    { onSuccess: () => queryClient.invalidateQueries(getMyProjectsKey()) }
  );
