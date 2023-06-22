import {FC} from 'react'
import {Avatar, Text} from '@chakra-ui/react'
import {OwnerInfo} from '@/repositories/project/types/data'

interface IOwnerRow {
  owner: OwnerInfo
  createdAt: Date
}

export const OwnerRow: FC<IOwnerRow> = ({ owner, createdAt }) => {
  return (
    <div className="w-12/12 h-6/12 flex items-center justify-center gap-6 mb-3">
      <Avatar name={owner.user.username} src={owner.user.avatarUrl} />
      <div className="flex items-start justify-center text-white flex-col">
        <Text textAlign="left" fontSize="1.5rem">
          {owner.user.username}
        </Text>
        <Text textAlign="left" fontSize="0.75rem">
          {new Date(createdAt).toDateString()}
        </Text>
      </div>
    </div>
  )
}
