"use client";
import {queryClient} from "@/app/providers/ReactQueryProvider";
import {IFilter} from "@/models/Filters";
import {Member} from "@/models/Member";
import {filteringSignalToSearchParams,} from "@/signals/filteringSignal";
import environment from "@/utils/envMetadata";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const membersKey = "members";

export const invalidateMembers = (projectId: string) => {
  queryClient.invalidateQueries({
    queryKey: [projectId, membersKey],
    exact: false,
  });
};

export const getMembersKey = (projectId: string, filterString: string) => {
  return [projectId, membersKey, filterString];
};

export const useProjectMembers = (projectId: string, filters: IFilter) => {
  return useQuery<Member[]>(
    getMembersKey(projectId, JSON.stringify(filters)),
    async () =>
      await axios
        .get(
          `${
            environment.HOST
          }/api/projects/${projectId}/members?${filteringSignalToSearchParams()}`
        )
        .then((res) => res.data)
  );
};
