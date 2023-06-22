import {Pageable} from "@/models/Pageable";
import {filteringSignalToSearchParams} from "@/signals/filteringSignal";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import environment from "@/utils/envMetadata";
import {ProjectSummary} from "@/repositories/project/types/data";
import {queryClient} from "@/app/providers/ReactQueryProvider";

export const getMyProjectsKey = (filterString: string) => [
  "myProjects",
  filterString,
];

export const invalidateProjects = () => {
  queryClient.invalidateQueries({ queryKey: ["myProjects"], exact: false });
};

export const useMyProjects = (filteringString: string) => {
  const filters = filteringSignalToSearchParams();
  return useQuery<Pageable<ProjectSummary>>(
    getMyProjectsKey(filteringString),
    async () =>
      axios
        .get(`${environment.HOST}/api/projects?${filters}`)
        .then((res) => res.data)
  );
};
