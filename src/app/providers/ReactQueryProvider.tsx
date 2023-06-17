'use client'

import React from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5000 } },
})

function ReactQueryProvider({ children }: React.PropsWithChildren) {
  const [client] = React.useState(queryClient)

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

export default ReactQueryProvider
