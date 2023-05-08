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
  path: "/",
};

export const profile: ILink = {
  label: "Profile",
  path: "/profile",
};

export const settings: ILink = {
  label: "Settings",
  path: "/settings",
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
  settings,
};

interface IAuthorizedLinks {
  projects: ILink;
  profile: ILink;
  settings: ILink;
}
