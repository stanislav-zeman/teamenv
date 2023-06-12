import { BaseModel } from './BaseModel'

export interface UserInfo extends BaseModel {
  userName: string;
  fullName: string;
}
