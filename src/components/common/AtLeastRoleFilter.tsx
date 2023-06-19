'use client'
import useFilters from '@/app/hooks/useFilters'
import { Role } from '@/models/Role'
import { getRoleFromIndex, roleToIndex } from '@/utils/roleUtils'
import { Select, Text } from '@chakra-ui/react'

export const getRoleStringFromValue = (role: number) => {
  return Object.entries(Role).filter((k, v) => v === role)[0][0]
}

export const getRoleValueFromString = (str: string) => {
  return Object.entries(Role).filter(([k, v]) => k === str)[0][1]
}

export const AtLeastRoleFilter = () => {
  const { filters, pushFilters } = useFilters()

  return (
    <div className="flex items-center h-full gap-2">
      <Text>At least role:</Text>
      <select
        className="h-[2.5rem]"
        value={getRoleStringFromValue(roleToIndex(filters.atLeastRole))}
        onChange={(e) =>
          pushFilters(
            'atLeastRole',
            getRoleValueFromString(e.target.value).toString()
          )
        }
      >
        {Object.keys(Role).map((role) => (
          <option value={role} key={role}>
            {role}
          </option>
        ))}
      </select>
    </div>
  )
}
