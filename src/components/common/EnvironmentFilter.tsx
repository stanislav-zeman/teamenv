'use client'
import useFilters from '@/app/hooks/useFilters'
import {envToIndex} from '@/utils/environmentUtils'
import {Text} from '@chakra-ui/react'
import {Environment} from '@prisma/client'

export const getEnvStringFromValue = (env: number) => {
    return Object.entries(Environment).filter((k, v) => v === env)[0][0]
  }
  
  export const getEnvValueFromString = (str: string) => {
    return Object.entries(Environment).filter(([k, v]) => k === str)[0][1]
  }

export const EnvironmentFilter = () => {
    const { filters, pushFilters } = useFilters()
  return (
    <div className="flex items-center h-full gap-2">
      <Text>Environment:</Text>
      <select
        className="h-[2.5rem] rounded-md"
        value={getEnvStringFromValue(envToIndex(filters.environment))}
        onChange={(e) =>
          pushFilters(
            'environment',
            getEnvValueFromString(e.target.value).toString()
          )
        }
      >
        {Object.keys(Environment).map((env) => (
          <option value={env} key={env}>
            {env}
          </option>
        ))}
      </select>
    </div>
  )
}
