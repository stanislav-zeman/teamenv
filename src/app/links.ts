///// Unauthorized Links /////
export const signIn = {
  label: "Sign In",
  path: "/signin",
};

export const signUp = {
  label: "Sign Up",
  path: "/signup",
};

///// Authorized Links /////

export const projects: ILink = {
  label: "Projects",
  path: "/projects",
};

export const profile: ILink = {
  label: "Profile",
  path: "/profile",
};

///// Exported Links /////

export const UnathorizedLinks: IUnathorizedLinks = {
  signUp,
  signIn,
};

interface ILink {
  label: string;
  path: string;
}

interface IUnathorizedLinks {
  signIn: ILink;
  signUp: ILink;
}

export const AuthorizedLinks: IAuthorizedLinks = {
  projects,
  profile,
};

interface IAuthorizedLinks {
  projects: ILink;
  profile: ILink;
}

export const getProjectDefaultUrl = (projectId: string) =>
  `/projects/${projectId}/members`;
