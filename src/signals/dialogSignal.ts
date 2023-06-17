import { signal } from '@preact/signals-react'
import { ReactNode } from 'react'

export const dialogSignal = signal<ReactNode | null>(null)

export const openDialog = (dialog: ReactNode) => {
  dialogSignal.value = dialog
}

export const closeDialog = () => {
  dialogSignal.value = null
}
