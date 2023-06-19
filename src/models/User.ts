import { BaseModel } from './BaseModel'

export interface UserInfo extends BaseModel {
  username: string
  fullname: string
}
