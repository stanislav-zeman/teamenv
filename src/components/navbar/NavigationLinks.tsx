import { profile, projects, settings } from "@/app/links";
import { MyProject } from "@/models/Project";
import Link from "next/link";
import { CurrentLinkHighlighter } from "./CurrentLinkHighlighter";

export const NavigationLinks = () => {
  return (
    <div className="flex items-stretch justify-around w-1/2 text-white">
      <div className="flex flex-col">
        <Link className="text-white" href={projects.path}>
          {projects.label}
        </Link>
        <CurrentLinkHighlighter pathname={projects.path} />{" "}
      </div>
      |
      <div>
        <Link className="text-white" href={profile.path}>
          {profile.label}
        </Link>
        <CurrentLinkHighlighter pathname={profile.path} />{" "}
      </div>
      |
      <Link className="text-white" href={settings.path}>
        {settings.label}
      </Link>{" "}
      |
    </div>
  );
};
