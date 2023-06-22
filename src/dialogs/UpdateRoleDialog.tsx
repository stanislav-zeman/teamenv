'use client'
import {closeDialog} from '@/signals/dialogSignal'
import {FC, useState} from 'react'
import {Button, Dialog, DialogContent, Slider, Typography,} from '@mui/material'
import {Role} from '@/models/Role'
import MuiThemeProvider from '@/app/providers/MuiThemeProvider'
import {getRoleFromIndex, roleToIndex} from '@/utils/roleUtils'
import {useUpdateUser} from '@/hooks/mutations/useUpdateUser'
import {Member} from '@/models/Member'
import {invalidateMembers} from '@/hooks/queries/useProjectMembers'

interface IUpdateRoleDialog {
  selectedUser: Member;
  projectId: string;
  myRole: Role;
}

export const UpdateRoleDialog: FC<IUpdateRoleDialog> = ({
  selectedUser,
  projectId,
  myRole
}) => {
  const [selectedRole, setSelectedRole] = useState(0)
  const { mutate: update } = useUpdateUser({projectId, memberId: selectedUser.id})

  const roles = Object.entries(Role).filter(
    (_, index) => index < roleToIndex(myRole)
  )

  const getValueLabel = (value: number) => {
    const role = roles.find((r) => roleToIndex(r[1]) === value)
    return role ? role[0] : Role.GUEST
  }

  const handleApply = () => {
    update(
      getRoleFromIndex(selectedRole),
      {
        onSuccess: () => {
          closeDialog()
          invalidateMembers(projectId)
        },
      }
    )
  }

  return (
    <MuiThemeProvider>
      <Dialog fullWidth open onClose={closeDialog}>
        <DialogContent sx={{ maxHeight: '80vh' }}>
          <div className="flex flex-col p-3 items-center justify-center gap-3">
            <Slider
              value={selectedRole}
              max={roles.length - 1}
              step={1}
              onChange={(_, v) => setSelectedRole(v as number)}
            />
            <Typography>
              Selected role: {getValueLabel(selectedRole)}
            </Typography>
            <div className="flex gap-4">
              <Button
                color="primary"
                variant="contained"
                disabled={!selectedUser}
                onClick={handleApply}
              >
                Apply
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={closeDialog}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </MuiThemeProvider>
  )
}
