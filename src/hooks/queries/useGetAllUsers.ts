'use client'
import { queryClient } from '@/app/providers/ReactQueryProvider'
import { UserInfo } from '@/models/User'
import { getFilters } from '@/signals/filteringSignal'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import environment from "@/utils/envMetadata";

const filterAlreadyAssigned = (
  ignoreUsers: UserInfo[],
  fetchedUsers: UserInfo[]
) => fetchedUsers.filter((user) => !ignoreUsers.includes(user))

const allUsersKey = 'allUsers'

export const getAllUsersKey = (search: string) => [allUsersKey, search]

export const invalidateAllGetAllUsersKeys = () =>
  queryClient.invalidateQueries({
    queryKey: [allUsersKey],
    exact: false,
  })

export const useGetAllUsers = (
  search: string,
  ignoreUsers: UserInfo[] = []
) => {
  return useQuery<UserInfo[]>(
    getAllUsersKey(search),
    async () =>
      await axios
        .get(`${environment.HOST}/api/users?search=${search}`)
        .then((response) =>
          filterAlreadyAssigned(ignoreUsers, response.data as UserInfo[])
        )
  )
}
