'use client'

import React, { FC, ReactNode } from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { redirect, useRouter } from 'next/navigation'
import { ClientClerkProvider } from '@clerk/nextjs/dist/app-router/client/ClerkProvider'

const StylableClerkProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <ClientClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      {children}
    </ClientClerkProvider>
  )
}

export default StylableClerkProvider
