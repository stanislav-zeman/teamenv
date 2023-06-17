import { FC, useState } from 'react'
import { ReadonlyProjectNameDisplay } from './ReadonlyProjectNameDisplay'
import { IconButton } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import useFilters from '@/app/hooks/useFilters'

interface IEditableProjectName {
  projectName: string
  projectId: string
}

export const EditableProjectNameDisplay: FC<IEditableProjectName> = ({
  projectId,
  projectName,
}) => {
  const [editMode, setEditMode] = useState(false)
  const [inputProjectName, setInputProjectName] = useState(projectName)

  // TODO add mutate
  const handleInputChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      setEditMode(false)
    }
  }

  return (
    <div className="flex">
      {editMode ? (
        <></>
      ) : (
        <ReadonlyProjectNameDisplay projectName={projectName} />
      )}
      <IconButton
        aria-label="toggle edit"
        icon={<EditIcon />}
        isActive={editMode}
        onClick={() => setEditMode(!editMode)}
      />
    </div>
  )
}
