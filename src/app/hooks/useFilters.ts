import {usePathname, useRouter} from "next/navigation";
import queryString from "query-string";
import {filteringSignalToSearchParams, getFilters,} from "@/signals/filteringSignal";

function parseFilters<T>(urlString: string): Partial<T> {
  return queryString.parse(urlString) as Partial<T>;
}

export const useFilters = () => {
  const filters = getFilters();
  const router = useRouter();
  const pathname = usePathname();

  const pushFilters = (fieldName: string, value: string) => {
    const params = new URLSearchParams(filteringSignalToSearchParams());
    params.set(fieldName, value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return { filters, pushFilters };
};

export default useFilters;
