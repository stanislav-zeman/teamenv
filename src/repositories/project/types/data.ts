<<<<<<< HEAD
import type {Project, Role, Variable} from "@prisma/client"
=======
import type {Project, ProjectUser, Role, Variable} from "@prisma/client"
>>>>>>> origin/#9

export type ProjectCreateData = {
  name: string;
  description: string;
};

export type ProjectUpdateData = {
  id: string;
  name?: string;
  description?: string;
};

<<<<<<< HEAD
export type ProjectUserData = {
  role: Role;
  user: {
    id: string;
    username: string;
    email: string;
    avatarUrl: string;
    createdAt: Date;
  }
}

export type ProjectData = Project & { variables: Variable[], users: ProjectUserData[]};
=======
export type ProjectData = Project & { myRole: Role, variables: Variable[], users: ProjectUser[]};
>>>>>>> origin/#9
