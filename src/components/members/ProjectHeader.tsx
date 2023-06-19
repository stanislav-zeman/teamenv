'use client'
import { AddIcon, ViewIcon } from '@chakra-ui/icons'
import {
  Button,
  IconButton,
  Link,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react'
import { FC } from 'react'
import GenericLolInput from '../common/GenericLolInput'
import { useRouter } from 'next/navigation'
import { OrderFilteringButtons } from '../common/OrderFilteringButtons'
import { AtLeastRoleFilter } from '../common/AtLeastRoleFilter'
import { DisplayFilterSwitch } from '../common/DisplayFilterSwitch'
import { ProjectNameDisplay } from '../projects/ProjectNameDisplay/ProjectNameDisplay'
import { Role } from '@/models/Role'
import { openDialog } from '@/signals/dialogSignal'
import { ProjectAddUserDialog } from '@/dialogs/ProjectAddUserDialog'
import { MyProject } from '@/models/Project'

interface ProjectHeaderProps {
  project: MyProject
  name: string
  members: boolean
  myRole: Role
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
      <ProjectNameDisplay
        projectName={props.name}
        projectId={props.project.id}
        myRole={props.myRole}
      />
      <div className="flex justify-between">
        <div>
          <Button
            variant="link"
            {...getLinkStyles(props.members)}
            onClick={() => router.push(`/projects/${props.project.id}/members`)}
          >
            Members
          </Button>
          <Button
            variant="link"
            {...getLinkStyles(!props.members)}
            paddingLeft="2rem"
            onClick={() =>
              router.push(`/projects/${props.project.id}/variables`)
            }
          >
            Variables
          </Button>
        </div>
        <div className="flex items-center gap-7 justify-self-end pr-11">
          {props.members ? <AtLeastRoleFilter /> : <DisplayFilterSwitch />}
          <OrderFilteringButtons />
          <GenericLolInput />
          {props.myRole > Role.DEVELOPER && (
            <IconButton
              onClick={() => {
                if (props.members) {
                  openDialog(<ProjectAddUserDialog project={props.project} />)
                  return
                }
              }}
              icon={<AddIcon />}
              aria-label="perform add action"
            />
          )}
        </div>
      </div>
    </Stack>
  )
}

export default ProjectHeader
