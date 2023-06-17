'use client'
import { AddIcon, ViewIcon } from '@chakra-ui/icons'
import { Button, Link, Stack, StackDivider, Text } from '@chakra-ui/react'
import { FC } from 'react'
import GenericLolInput from '../common/GenericLolInput'
import { useRouter } from 'next/navigation'
import { OrderFilteringButtons } from '../common/OrderFilteringButtons'
import { AtLeastRoleFilter } from '../common/AtLeastRoleFilter'
import { DisplayFilterSwitch } from '../common/DisplayFilterSwitch'

interface ProjectHeaderProps {
  id: string
  name: string
  members: boolean
}

type LinkStyles = {
  textColor: string
  fontWeight: string
  textDecoration: string
}

const getLinkStyles = (active: boolean): LinkStyles => {
  if (active) {
    return {
      textColor: 'black',
      fontWeight: 'bold',
      textDecoration: 'underline',
    }
  }
  return {
    textColor: 'darkgray',
    fontWeight: 'normal',
    textDecoration: 'none',
  }
}

const ProjectHeader: FC<ProjectHeaderProps> = (props) => {
  const router = useRouter()
  return (
    <Stack divider={<StackDivider borderColor="gray.700" />}>
      <Text fontSize="2xl">{props.name}</Text>
      <div className="flex justify-between">
        <div>
          <Button
            variant="link"
            {...getLinkStyles(props.members)}
            onClick={() => router.push(`/projects/${props.id}/members`)}
          >
            Members
          </Button>
          <Button
            variant="link"
            {...getLinkStyles(!props.members)}
            paddingLeft="2rem"
            onClick={() => router.push(`/projects/${props.id}/variables`)}
          >
            Variables
          </Button>
        </div>
        <div className="flex items-center gap-7 justify-self-end pr-11">
          {props.members ? <AtLeastRoleFilter /> : <DisplayFilterSwitch />}
          <OrderFilteringButtons />
          <GenericLolInput />
          <AddIcon />
        </div>
      </div>
    </Stack>
  )
}

export default ProjectHeader
