'use client'
import React, { FC, ReactNode, useEffect } from 'react'
import { useClerk } from '@clerk/nextjs'
import { useEnsureUser } from '@/hooks/mutations/useEnsureUser'
import { setUserId } from '@/signals/userIdSignal'

const AuthProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const { user } = useClerk()
  const { mutate } = useEnsureUser()

  useEffect(() => {
    console.log(user?.id)
    if (user) {
      mutate()
      setUserId(user.id)
    }
  }, [user])

  return <>{children}</>
}

export default AuthProvider
