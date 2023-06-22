'use client'
import {Grid} from '@chakra-ui/react'
import {ProjectCard} from './ProjectCard'
import {FC} from 'react'
import {ProjectSummary} from '@/repositories/project/types/data'

interface IProjectList {
  projects: ProjectSummary[]
}

export const ProjectsList: FC<IProjectList> = ({ projects }) => {
  return (
    <Grid
      className="w-10/12 flex p-1 py-4 gap-4"
      templateColumns="repeat(6, 1fr)"
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </Grid>
  )
}
