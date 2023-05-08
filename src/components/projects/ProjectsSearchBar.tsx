import React from "react";
import GenericLolInput from "@/components/common/GenericLolInput";

const ProjectsSearchBar = () => {
  return (
    <div className="w-10/12 h-24 flex items-center justify-between border-b pl-4 pr-4">
      <p className="text-lg">Projects</p>
      <GenericLolInput />
    </div>
  );
};

export default ProjectsSearchBar;
