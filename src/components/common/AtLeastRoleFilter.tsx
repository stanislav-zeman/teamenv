'use client'
import useFilters from '@/app/hooks/useFilters'
import { Role } from '@/models/Role'
import { Select, Text } from '@chakra-ui/react'

const getRoleStringFromValue = (role: Role) => {
  return Object.entries(Role).filter((k, v) => v === role)[0][0]
}

const getRoleValueFromString = (str: string) => {
  return Object.entries(Role).filter(([k, v]) => k === str)[0][1]
}

export const AtLeastRoleFilter = () => {
  const { filters, pushFilters } = useFilters()
  console.log(getRoleStringFromValue(filters.atLeastRole))

  console.log(Object.entries(Role))

  return (
    <div className="flex items-center h-full gap-2">
      <Text>At least role:</Text>
      <select
        className="h-[2.5rem]"
        value={getRoleStringFromValue(filters.atLeastRole)}
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
