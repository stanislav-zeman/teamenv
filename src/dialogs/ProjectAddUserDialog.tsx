'use client'
import { DynamicUserAutocomplete } from '@/components/common/DynamicUserAutocomplete'
import {
  invalidateAllGetAllUsersKeys,
  useGetAllUsers,
} from '@/hooks/queries/useGetAllUsers'
import { Text } from '@chakra-ui/react'
import { MyProject } from '@/models/Project'
import { UserInfo } from '@/models/User'
import { closeDialog, openDialog } from '@/signals/dialogSignal'

import { Button, Dialog, DialogContent, Select } from '@mui/material'
import { FC, useState } from 'react'
import { Role } from '@/models/Role'
import { SelectRoleDialog } from './SelectRoleDialog'

interface IProjectAddUserDialog {
  project: MyProject
}

export const ProjectAddUserDialog: FC<IProjectAddUserDialog> = ({
  project,
}) => {
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null)

  // TODO add mutate

  const handleSelectUser = (user: UserInfo | null) => {
    setSelectedUser(user)
  }

  const handleApply = () => {
    // TODO mutate
    if (selectedUser) {
      openDialog(
        <SelectRoleDialog selectedUser={selectedUser} project={project} />
      )
    }
  }

  return (
    <Dialog maxWidth="md" fullWidth open onClose={closeDialog}>
      <DialogContent sx={{ maxHeight: '80vh' }}>
        <div className="flex flex-col p-3 items-center justify-center gap-3">
          <Text size="2xl">Assign new member to project:</Text>
          <DynamicUserAutocomplete
            onSelectItem={handleSelectUser}
            project={project}
          />
          <div className="flex gap-4">
            <Button
              color="primary"
              variant="contained"
              disabled={!selectedUser}
              onClick={handleApply}
            >
              Next {'>'}
            </Button>
            <Button color="secondary" variant="contained" onClick={closeDialog}>
              Storno
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
