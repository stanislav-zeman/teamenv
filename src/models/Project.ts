import { BaseModel } from './BaseModel'
import { Role } from './Role'
import { UserInfo } from './User'

export interface MyProject extends BaseModel {
  name: string
  description?: string
  owner: UserInfo
  myRole: Role
  createdAt: Date
}
