import { BaseModel } from './BaseModel'
import { Role } from './Role';

export interface Member extends BaseModel {
  userName: string;
  fullName: string;
  role: Role;
}