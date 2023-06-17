import { Role } from '@/models/Role'
import { FC } from 'react'
import { ReadonlyProjectNameDisplay } from './ReadonlyProjectNameDisplay'

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

    
  )
}
