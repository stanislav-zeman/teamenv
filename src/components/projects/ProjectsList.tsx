'use client'
import { useMyProjects } from '@/hooks/useMyProjects'
import { useUser } from '@clerk/nextjs'
import { Button, Grid, filter } from '@chakra-ui/react'
import { ProjectCard } from './ProjectCard'
import useFilters from '@/app/hooks/useFilters'
import { BaseFilters } from '@/models/Filters'
import { usePathname, useRouter } from 'next/navigation'
import { PaginationComponent } from '../common/PaginationComponent'
import { MyProject } from '@/models/Project'
import { FC } from 'react'
import { ProjectSummary } from '@/repositories/project/types/data'

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
