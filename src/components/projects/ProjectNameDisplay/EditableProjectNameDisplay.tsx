import { FC, useState } from 'react'
import { ReadonlyProjectNameDisplay } from './ReadonlyProjectNameDisplay'
import { IconButton, Input } from '@chakra-ui/react'
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
    <div className="flex gap-3 items-center min-w-md max-w-md">
      {editMode ? (
        <Input
          className="min-w-md"
          value={inputProjectName}
          onChange={(e) => setInputProjectName(e.target.value)}
          onKeyDown={handleInputChange}
        />
      ) : (
        <ReadonlyProjectNameDisplay projectName={projectName} />
      )}
      <IconButton
        variant="ghost"
        aria-label="toggle edit"
        icon={<EditIcon />}
        onClick={() => setEditMode(!editMode)}
      />
    </div>
  )
}
