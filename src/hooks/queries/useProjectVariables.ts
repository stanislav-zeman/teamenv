"use client";
import {queryClient} from "@/app/providers/ReactQueryProvider";
import {IFilter} from "@/models/Filters";
import {filteringSignalToSearchParams,} from "@/signals/filteringSignal";
import environment from "@/utils/envMetadata";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {Variable} from "../../models/Variable";
import {getMyProjectKey} from "@/hooks/useProject";

const variablesKey = "variables";

export const invalidateVariables = (projectId: string) => {
  queryClient.invalidateQueries({
    queryKey: [projectId, variablesKey],
    exact: false,
  });
  queryClient.invalidateQueries(getMyProjectKey(projectId));
};

export const getVariablesKey = (projectId: string, filterString: string) => {
  return [projectId, variablesKey, filterString];
};

export const useProjectVariables = (projectId: string, filters: IFilter) => {
  return useQuery<Variable[]>(
    getVariablesKey(projectId, JSON.stringify(filters)),
    async () =>
      await axios
        .get(
          `${
            environment.HOST
          }/api/projects/${projectId}/variables?${filteringSignalToSearchParams()}`
        )
        .then((res) => res.data)
  );
};
