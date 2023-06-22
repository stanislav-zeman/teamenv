"use client";
import React from "react";
import ProjectsSearchBar from "@/components/projects/ProjectsSearchBar";
import {useMyProjects} from "@/hooks/useMyProjects";
import {ProjectsList} from "@/components/projects/ProjectsList";
import {PaginationComponent} from "@/components/common/PaginationComponent";
import {filteringSignal} from "@/signals/filteringSignal";

const ProjectsContainer = () => {
  const {
    data: pageable,
    isLoading,
    isError,
  } = useMyProjects(JSON.stringify(filteringSignal.value));

  if (isLoading) return <h3>Loading...</h3>;
  if (isError || !pageable) return <h3>Error during fetching projects</h3>;
  return (
    <div className="w-full h-full flex flex-col justify-between items-center align-middle">
      <div className="flex w-full flex-col items-center">
        <ProjectsSearchBar />
        <ProjectsList projects={pageable.docs} />
      </div>
      <PaginationComponent pageable={pageable} />
    </div>
  );
};

export default ProjectsContainer;
