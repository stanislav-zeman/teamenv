import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {invalidateProjects} from "../useMyProjects";
import {ProjectCreateData} from "@/app/api/types";
import environment from "@/utils/envMetadata";

export const useCreateProject = () =>
  useMutation(
    async (data: ProjectCreateData) =>
      await axios
        .post(`${environment.HOST}/api/projects`, data)
        .then((res) => res.data),
    { onSuccess: () => invalidateProjects() }
  );
