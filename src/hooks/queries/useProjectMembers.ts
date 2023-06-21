"use client";
import { IFilter } from "@/models/Filters";
import { Member } from "@/models/Member";
import { getFilters } from "@/signals/filteringSignal";
import environment from "@/utils/envMetadata";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const membersKey = "members";

export const getMembersKey = (projectId: string, filters: IFilter) => {
  const filterString = filters.toString();
  return [projectId, filterString, membersKey];
};

export const useProjectMembers = (projectId: string) => {
  const filters = getFilters();
  return useQuery<Member[]>(
    getMembersKey(projectId, filters),
    async () =>
      await axios
        .get(`${environment.HOST}/api/projects/${projectId}/members`)
        .then((res) => res.data)
  );
};
