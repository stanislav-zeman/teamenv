import { signal } from '@preact/signals-react'
import { Environment } from '@prisma/client'

export const environmentSignal = signal<Environment | undefined>(undefined)

export const setEnvironment = (environment: Environment) => {
  environmentSignal.value = environment
}

export const getEnvironment = () => {
  return environmentSignal.value
}
