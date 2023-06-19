'use client'
import { UserInfo } from '@/models/User'
import { closeDialog } from '@/signals/dialogSignal'
import { FC, useState } from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  MenuItem,
  Select,
  Slider,
  Typography,
} from '@mui/material'
import { Role } from '@/models/Role'
import { MyProject } from '@/models/Project'
import MuiThemeProvider from '@/app/providers/MuiThemeProvider'

interface ISelectRoleDialog {
  selectedUser: UserInfo | null
  project: MyProject
}

export const SelectRoleDialog: FC<ISelectRoleDialog> = ({
  selectedUser,
  project,
}) => {
  const [selectedRole, setSelectedRole] = useState(0)

  const roles = Object.entries(Role).filter(
    (_, index) => index < project.myRole
  )

  const getValueLabel = (value: number) => {
    const role = roles.find((r) => r[1] === value)
    return role ? role[0] : 'lol'
  }

  const handleApply = () => {
    console.log('kokot')
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
                Storno
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </MuiThemeProvider>
  )
}
