
export type EnsureUserData = {
  id: string;
  username: string;
  email: string;
};

export type ModifyMemberData = {
  userId: string;
  projectId: string;
  memberId: string;
};
