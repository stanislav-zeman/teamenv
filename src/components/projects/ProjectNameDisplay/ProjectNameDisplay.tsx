
import { FC } from 'react'
import { ReadonlyProjectNameDisplay } from './ReadonlyProjectNameDisplay'
import { EditableProjectNameDisplay } from './EditableProjectNameDisplay'
import { Role } from '@/models/Role'

interface IProjectNameDisplay {
  projectName: string
  projectId: string
  myRole: Role
}

export const ProjectNameDisplay: FC<IProjectNameDisplay> = ({
  projectId,
  projectName,
  myRole,
}) => {
  if (myRole < Role.MAINTAINER) {
    return <ReadonlyProjectNameDisplay projectName={projectName} />
  }

  return (
    <EditableProjectNameDisplay
      projectName={projectName}
      projectId={projectId}
    />
  )
}
