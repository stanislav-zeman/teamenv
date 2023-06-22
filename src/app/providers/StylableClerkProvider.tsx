'use client'

import React, {FC, ReactNode} from 'react'
import {ClientClerkProvider} from '@clerk/nextjs/dist/app-router/client/ClerkProvider'

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
