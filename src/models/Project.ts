
import { BaseModel } from './BaseModel'
import { Member } from './Member'
import { Role } from './Role'
import { UserInfo } from './User'
import { Variable } from './Variable'

export interface MyProject extends BaseModel {
  name: string
  description?: string
  owner: UserInfo
  myRole: Role
  members: Member[]
  variables: Variable[]
}
