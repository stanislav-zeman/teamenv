import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {invalidateProjects} from "../useMyProjects";
import environment from "@/utils/envMetadata";

export const useDeleteProject = () =>
  useMutation(
    async (projectId: string) =>
      await axios
        .delete(`${environment.HOST}/api/projects/${projectId}`)
        .then((res) => res.data),
    { onSuccess: () => invalidateProjects() }
  );
