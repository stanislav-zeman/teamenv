'use client'
import {ChakraProvider} from '@chakra-ui/react'
import {FC, ReactNode} from 'react'

export const ClientChakraProvider: FC<{ children?: ReactNode }> = ({
  children,
}) => {
  return <ChakraProvider>{children}</ChakraProvider>
}