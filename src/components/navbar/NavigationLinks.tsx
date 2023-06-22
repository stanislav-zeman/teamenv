import {profile, projects} from "@/app/links";
import Link from "next/link";
import {CurrentLinkHighlighter} from "./CurrentLinkHighlighter";

export const NavigationLinks = () => {
  return (
    <div className="flex items-center justify-around h-full w-1/2 text-white">
      <div className="flex flex-col">
        <Link className="text-white" href={projects.path}>
          {projects.label}
        </Link>
        <CurrentLinkHighlighter pathname={projects.path} />{" "}
      </div>
      <div className="w-[1px] h-3/6 border "></div>
      <div>
        <Link className="text-white" href={profile.path}>
          {profile.label}
        </Link>
        <CurrentLinkHighlighter pathname={profile.path} />{" "}
      </div>
      <div className="w-[1px] h-3/6 border "></div>
    </div>
  );
};
