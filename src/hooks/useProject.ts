import { mockedMyProjects } from "@/mocks/myProjectsMock";
import { MyProject } from "@/models/Project";
import { ProjectData } from "@/repositories/project/types/data";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export const getMyProjectKey = (projectId: string) => [projectId, "myProject"];

export const useProjectMocked = (projectId: string) =>
  useQuery<MyProject | undefined>(getMyProjectKey(projectId), () =>
    mockedMyProjects.docs.find((project) => project.id === projectId)
  );

export const useProject = (projectId: string) =>
  useQuery<ProjectData>({
    queryKey: getMyProjectKey(projectId),
    queryFn: async () => 
      (await axios.get(`http://localhost:3000/api/projects/${projectId}/`)).data
  });
/*export const useProject = (projectId: string) =>
  useQuery<MyProject | undefined>(
    getMyProjectKey(projectId),
    async () =>
      await axios
        .get(`ttp://localhost:3000/api/projects/${projectId}`)
        .then((res) => res.data as MyProject)
  )*/
