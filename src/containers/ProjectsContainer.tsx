import React from "react";
import GenericLolInput from "@/components/common/GenericLolInput";
import ProjectsSearchBar from "@/components/projects/ProjectsSearchBar";

const ProjectsContainer = () => {
  // TODO hook for fetching projects

  return (
    <div className="w-full h-full flex flex-col items-center align-middle">
      <ProjectsSearchBar />
    </div>
  );
};

export default ProjectsContainer;
