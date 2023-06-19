'use client'
import MemberList from '@/components/members/MemberList'
import ProjectHeader from '@/components/members/ProjectHeader'
import VariableList from '@/components/variables/VariableList'
import { useProject } from '@/hooks/useProject'
import { mockedMyProjects } from '@/mocks/myProjectsMock'
import { MyProject } from '@/models/Project'
import { useQuery } from '@tanstack/react-query'

interface IProjectContainerProps {
  id: string
  members: boolean
}

const ProjectContainer = ({ id, members }: IProjectContainerProps) => {
  const { data: project, isError, isLoading } = useProject(id)

  if (isLoading) return <h1>Loading..</h1>

  if (!project || isError) return <h1>Not found..</h1>

  return (
    <div className="px-28 pt-7">
      <ProjectHeader
        project={project}
        name={project.name}
        members={members}
        myRole={project.myRole}
      />
      {members ? (
        <MemberList members={project.members} />
      ) : (
        <VariableList variables={project.variables} />
      )}
    </div>
  )
}

export default ProjectContainer
