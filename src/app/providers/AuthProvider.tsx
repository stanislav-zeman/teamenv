'use client'
import React, { FC, ReactNode, useEffect } from 'react'
import { useClerk } from '@clerk/nextjs'
import {useEnsureUser} from "@/hooks/mutations/useEnsureUser";

const AuthProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const { user } = useClerk()
  const {mutate} = useEnsureUser()

  useEffect(() => {
    console.log("mutate");
    if (user) {
      mutate();
    }
  }, [user])

  return <>{children}</>
}

export default AuthProvider
