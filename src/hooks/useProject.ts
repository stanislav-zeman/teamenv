import { ProjectData } from "@/repositories/project/types/data";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import environment from "@/utils/envMetadata";


export const getMyProjectKey = (projectId: string) => [projectId, "myProject"];

export const useProject = (projectId: string) =>
  useQuery<ProjectData>({
    queryKey: getMyProjectKey(projectId),
    queryFn: async () =>
      (await axios.get(`${environment.HOST}/api/projects/${projectId}/`)).data
  });
