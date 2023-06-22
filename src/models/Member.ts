import {BaseModel} from "./BaseModel";
import {Role} from "./Role";

export interface Member extends BaseModel {
  user: {
    avatarUrl: string;
    id: string;
    username: string;
  };
  role: Role;
  avatarUrl: string;
}
