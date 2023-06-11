'use client'
import { useMyProjects } from '@/hooks/useMyProjects'
import { useUser } from '@clerk/nextjs'
import { ProjectCard } from './ProjectCard'

export const ProjectsList = () => {
  const { user } = useUser()
  const { data: projects, isLoading, isError } = useMyProjects(user?.id || '-1')

  if (isLoading) return <h3>Loading...</h3>
  if (isError || !projects) return <h3>Error during fetching projects</h3>

  return (
    <div className="w-10/12 flex p-1 py-4 gap-4">
      {projects.map((project) => (
        <ProjectCard project={project} />
      ))}
    </div>
  )
}
