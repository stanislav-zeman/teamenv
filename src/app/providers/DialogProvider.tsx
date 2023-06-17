'use client'

import { dialogSignal } from '@/signals/dialogSignal'
import { FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'

export const DialogProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const dialog = dialogSignal

  return (
    <>
      {children}
      {!!dialog && createPortal(dialog, document.body)}
    </>
  )
}
