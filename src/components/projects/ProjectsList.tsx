'use client'
import { useMyProjects } from '@/hooks/useMyProjects'
import { useUser } from '@clerk/nextjs'
import { Button, Grid, filter } from '@chakra-ui/react'
import { ProjectCard } from './ProjectCard'
import useFilters from '@/app/hooks/useFilters'
import { BaseFilters } from '@/models/Filters'
import { usePathname, useRouter } from 'next/navigation'

export const ProjectsList = () => {
  const { user } = useUser()
  const pathName = usePathname()
  const router = useRouter()
  const filters = useFilters<BaseFilters>()
  const { data: projects, isLoading, isError } = useMyProjects(user?.id || '-1', filters)

  if (isLoading) return <h3>Loading...</h3>
  if (isError || !projects) return <h3>Error during fetching projects</h3>

  return (
    <Grid
      className="w-10/12 flex p-1 py-4 gap-4"
      templateColumns="repeat(6, 1fr)"
    >
      {projects.docs.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </Grid>
  )
}
