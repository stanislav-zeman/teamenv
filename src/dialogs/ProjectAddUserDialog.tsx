'use client'
import {DynamicUserAutocomplete} from '@/components/common/DynamicUserAutocomplete'
import {Text} from '@chakra-ui/react'
import {MyProject} from '@/models/Project'
import {UserInfo} from '@/models/User'
import {closeDialog, openDialog} from '@/signals/dialogSignal'

import {Button, Dialog, DialogContent} from '@mui/material'
import {FC, useState} from 'react'
import {SelectRoleDialog} from './SelectRoleDialog'

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
      <DialogContent sx={{ minHeight: '33vh' }}>
        <div className="flex flex-col p-3 items-center justify-between gap-5 h-auto">
          <Text as="b" size="2xl">
            Assign new member to project:
          </Text>
          <DynamicUserAutocomplete
            onSelectItem={handleSelectUser}
            project={project}
          />
          <div className="flex mt-12 gap-4">
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
