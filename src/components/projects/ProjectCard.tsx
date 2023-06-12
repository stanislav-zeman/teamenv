import { MyProject } from '@/models/Project'
import { FC } from 'react'
import { Text, Grid, GridItem, IconButton } from '@chakra-ui/react'
import { InfoOutlineIcon } from '@chakra-ui/icons'

import { OwnerRow } from './OwnerRow'
import { Role } from '@/models/Role'
import { MoreButtonWithPopover } from './MoreButtonWithPopover'

interface IProjectCard {
  project: MyProject
}

export const ProjectCard: FC<IProjectCard> = ({ project }) => {
  return (
    <GridItem
      colSpan={2}
      className="w-12/12 h-9/12 flex flex-col bg-emerald-900 rounded-md p-4 items-center"
    >
      <div className="w-full px-6 flex items-center justify-between gap-1">
        <Text
          className="underline"
          width="90%"
          fontSize="1.65rem"
          color="white"
          textAlign="center"
          isTruncated
        >
          {project.name}
        </Text>
        <div className="w-2/12 flex justify-center items-center gap-1">
          <IconButton
            variant="ghost"
            colorScheme="whiteAlpha"
            aria-label="project info"
            icon={<InfoOutlineIcon fontSize="1.5rem" />}
          />
          {project.myRole > Role.DEVELOPER && (
            <MoreButtonWithPopover project={project} />
          )}
        </div>
      </div>
      <div className="h-2/3">
        <Text
          className="mt-3"
          fontSize="1rem"
          color="white"
          noOfLines={5}
          textAlign="center"
        >
          {project.description}
        </Text>
      </div>
      <div className="w-10/12 bg-slate-400 h-0.5 my-3" />
      <OwnerRow owner={project.owner} createdAt={project.createdAt} />
    </GridItem>
  )
}
