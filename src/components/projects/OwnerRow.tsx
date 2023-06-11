import { UserInfo } from '@/models/User'
import { FC } from 'react'
import { Avatar, AvatarBadge } from '@chakra-ui/react'

interface IOwnerRow {
  owner: UserInfo
}

export const OwnerRow: FC<IOwnerRow> = ({ owner }) => {
  return (
    <div className="w-12/12 h-6/12 flex item-center gap-6">
      <Avatar name={owner.fullName} bg="teal.500" />
      {owner.fullName}
    </div>
  )
}
