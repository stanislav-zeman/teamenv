"use client";
import { IFilter } from "@/models/Filters";
import { Member } from "@/models/Member";
import { getFilters } from "@/signals/filteringSignal";
import environment from "@/utils/envMetadata";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const membersKey = "members";

export const getMembersKey = (projectId: string, filterString: string) => {
  return [projectId, filterString, membersKey];
};

export const useProjectMembers = (projectId: string, filters: IFilter) => {
  return useQuery<Member[]>(
    getMembersKey(projectId, JSON.stringify(filters)),
    async () =>
      await axios
        .get(`${environment.HOST}/api/projects/${projectId}/members`)
        .then((res) => res.data)
  );
};
