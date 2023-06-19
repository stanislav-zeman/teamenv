import { Dialog, DialogContent } from '@mui/material'
import { useForm } from 'react-hook-form'

export const CreateProjectDialog = () => {
  const {} = useForm()

  return (
    <Dialog open={false}>
      <DialogContent>
        <div className="flex h-auto w-auto flex-col"></div>
      </DialogContent>
    </Dialog>
  )
}
