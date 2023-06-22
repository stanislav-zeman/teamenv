"use client";
import {signal} from "@preact/signals-react";
import {getDefaultFilters, IFilter} from "@/models/Filters";

export const filteringSignalToSearchParams = (): URLSearchParams => {
  const params = new URLSearchParams();
  params.set("order", filteringSignal.value.order);
  params.set("search", filteringSignal.value.search);
  params.set("dateFrom", filteringSignal.value.dateFrom?.toISOString() ?? "");
  params.set("dateTo", filteringSignal.value.dateTo?.toISOString() ?? "");
  params.set(
    "atLeastRole",
    filteringSignal.value.atLeastRole.valueOf().toString()
  );
  params.set("page", filteringSignal.value.page.toString());
  params.set("display", filteringSignal.value.display);
  params.set("environment", filteringSignal.value.environment.valueOf().toString())

  return params;
};

export const filteringSignal = signal<IFilter>(getDefaultFilters());

export const getFilters = () => filteringSignal.value;

export const setFilters = (newFilters: IFilter) =>
  (filteringSignal.value = newFilters);
