import { ProjectData } from "@/repositories/project/types/data";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import environment from "@/utils/envMetadata";
import { MyProject } from "@/models/Project";


export const getMyProjectKey = (projectId: string) => [projectId, "myProject"];

export const useProject = (projectId: string) =>
  useQuery<MyProject>({
    queryKey: getMyProjectKey(projectId),
    queryFn: async () =>
      (await axios.get(`${environment.HOST}/api/projects/${projectId}/`)).data
  });
