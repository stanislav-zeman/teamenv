import { BaseModel } from './BaseModel'
import { Role } from './Role'

export interface Member extends BaseModel {
  username: string
  role: Role
  avatarUrl: string
}
