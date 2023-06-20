import { BaseModel } from './BaseModel'
import { Role } from './Role'

export interface Member extends BaseModel {
  memberId: string
  username: string
  role: Role
  avatarUrl: string
}
