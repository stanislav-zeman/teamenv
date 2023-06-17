'use client'
import React from 'react'
import ProjectsSearchBar from '@/components/projects/ProjectsSearchBar'
import { auth, useUser } from '@clerk/nextjs'
import { useMyProjects } from '@/hooks/useMyProjects'
import { Skeleton } from '@chakra-ui/react'
import { ProjectsList } from '@/components/projects/ProjectsList'
import { PaginationComponent } from '@/components/common/PaginationComponent'

const ProjectsContainer = () => {
  const { user } = useUser()
  const {
    data: pageable,
    isLoading,
    isError,
  } = useMyProjects(user?.id || '-1', {})

  if (isLoading) return <h3>Loading...</h3>
  if (isError || !pageable) return <h3>Error during fetching projects</h3>

  return (
    <div className="w-full h-full flex flex-col justify-between items-center align-middle">
      <div className="flex flex-col items-center">
        <ProjectsSearchBar />
        <ProjectsList projects={pageable.docs} />
      </div>
      <PaginationComponent pageable={pageable} />
    </div>
  )
}

export default ProjectsContainer
