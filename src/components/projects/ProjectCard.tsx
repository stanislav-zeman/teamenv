import { MyProject } from '@/models/Project'
import { FC } from 'react'
import { Text } from '@chakra-ui/react'
import { OwnerRow } from './OwnerRow'

interface IProjectCard {
  project: MyProject
}

export const ProjectCard: FC<IProjectCard> = ({ project }) => {
  return (
    <div className="w-4/12 h-9/12 flex flex-col bg-emerald-900 rounded-md p-4 items-center">
      <Text
        className="underline"
        width="90%"
        fontSize={30}
        color="white"
        textAlign="center"
        isTruncated
      >
        {project.name}
      </Text>
      <Text className="mt-3" fontSize="2xl" color="white" noOfLines={5}>
        {project.description}
      </Text>
      <div className="w-10/12 bg-slate-400 h-0.5 my-3" />
      <OwnerRow owner={project.owner} />
    </div>
  )
}
