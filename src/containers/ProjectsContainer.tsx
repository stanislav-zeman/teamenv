import React from 'react'
import ProjectsSearchBar from '@/components/projects/ProjectsSearchBar'
import { auth } from '@clerk/nextjs'
import { useMyProjects } from '@/hooks/useMyProjects'
import { Skeleton } from '@chakra-ui/react'
import { ProjectsList } from '@/components/projects/ProjectsList'

const ProjectsContainer = () => {
  return (
    <div className="w-full h-full flex flex-col items-center align-middle">
      <ProjectsSearchBar />
      <ProjectsList />
    </div>
  )
}

export default ProjectsContainer
