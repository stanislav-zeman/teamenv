'use client'
import React, { FC, ReactNode, useEffect } from 'react'
import { useClerk } from '@clerk/nextjs'

const AuthProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const { user } = useClerk()

  useEffect(() => {
    // TODO API-call
    if (user) {
      const userInfo = {
        id: user.id,
        userName: user.username,
        email: user.emailAddresses,
      }
    }
  }, [user])

  return <>{children}</>
}

export default AuthProvider
