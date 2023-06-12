'use client'
import { ChakraBaseProvider, ChakraProvider } from '@chakra-ui/react'
import { CacheProvider } from '@emotion/react'
import { FC, ReactNode } from 'react'

export const ClientChakraProvider: FC<{ children?: ReactNode }> = ({
  children,
}) => {
  return <ChakraProvider>{children}</ChakraProvider>
}