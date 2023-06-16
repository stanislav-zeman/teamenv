'use client'
import { FC } from 'react'
import { Member } from '@/models/Member'
import GenericCard from '../common/GenericCard'
import { Avatar, Text } from '@chakra-ui/react'
import MemberRole from './MemberRole'
import { getRandomColor } from '@/hooks/getRandomColor'
import { DeleteIcon, HamburgerIcon } from '@chakra-ui/icons'
import { Role } from '@/models/Role'
import GenericList from '../common/GenericList'

interface MemberListProps {
  members: Member[]
}

const icons = (role: Role) =>
  role !== Role.OWNER
    ? [<HamburgerIcon boxSize="15%" />, <DeleteIcon boxSize="15%" />]
    : []

const MemberList: FC<MemberListProps> = (props) => {
  return (
    <GenericList
      children={
        <>
          {props.members.map((member) => (
            <></>
          ))}
        </>
      }
    />
  )
}

export default MemberList
