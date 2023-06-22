import {Role} from "./Role";
import {BaseModel} from "./BaseModel";
import {Member} from "./Member";
import {UserInfo} from "./User";
import {Variable} from "./Variable";

export interface MyProject extends BaseModel {
  name: string;
  description?: string;
  owner: UserInfo;
  myRole: Role;
  createdAt: Date;
  users?: Member[];
  variables: Variable[];
}
