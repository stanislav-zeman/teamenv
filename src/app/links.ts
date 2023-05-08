export const signIn = {
  label: "Sign In",
  path: "/signin",
};

export const signUp = {
  label: "Sign Up",
  path: "/signup",
};

export const UnathorizedLinks = {
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
