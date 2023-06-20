import { queryClient } from "@/app/providers/ReactQueryProvider";
import { ProjectCreateData } from "@/repositories/project/types/data";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { getMyProjectsKey } from "../useMyProjects";

export const useCreateProject = () =>
  useMutation(
    async (data: ProjectCreateData) =>
      await axios
        .post("http://localhost:3000/api/projects", data)
        .then((res) => res.data),
    { onSuccess: () => queryClient.invalidateQueries(getMyProjectsKey()) }
  );
