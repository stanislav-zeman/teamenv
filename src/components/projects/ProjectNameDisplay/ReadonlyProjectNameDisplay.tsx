import {FC} from 'react'
import {Text} from '@chakra-ui/react'

export interface IProjectReadDisplay {
  projectName: string
}

export const ReadonlyProjectNameDisplay: FC<IProjectReadDisplay> = ({
  projectName,
}) => {
  return (
    <Text fontSize="2xl" className="min-w-md">
      {projectName}
    </Text>
  )
}
