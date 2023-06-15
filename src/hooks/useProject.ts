import { mockedMyProjects } from "@/mocks/myProjectsMock";
import { MyProject } from "@/models/Project";
import { useQuery } from "@tanstack/react-query";

export const getMyProjectsKey = () => ["myProject"];

export const useProject = (projectId: string) =>
  useQuery<MyProject | undefined>(getMyProjectsKey(), () =>
    mockedMyProjects.find((project) => project.id === projectId)
  );
