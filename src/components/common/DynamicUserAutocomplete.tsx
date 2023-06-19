'use client'
import {
  ChangeEvent,
  FC,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Input } from '@mui/material'
import {
  Button,
  ChakraProvider,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
  Text,
} from '@chakra-ui/react'
import { getFilters } from '@/signals/filteringSignal'
import { MyProject } from '@/models/Project'
import { useGetAllUsers } from '@/hooks/queries/useGetAllUsers'
import { UserInfo } from '@/models/User'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
function useOutsideAlerter(
  ref: MutableRefObject<any>,
  outsideCallback: () => void
) {
  useEffect(() => {
    // @ts-ignore
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        outsideCallback()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}

interface IDynamicUserAutocomplete {
  onSelectItem: (obj: UserInfo | null) => void
  project: MyProject
}

const PopoverSelect: FC<{
  search: string
  project: MyProject
  handleSelect: (user: UserInfo | null) => void
}> = ({ search, project, handleSelect }) => {
  const {
    data: users,
    isLoading,
    isError,
  } = useGetAllUsers(search, project.users)

  if (isLoading) return <Skeleton />

  if (isError || !users) return <h3>Could not fetch data</h3>

  return (
    <div className="flex flex-col">
      {users.length === 0 ? (
        <Text>Nothing found</Text>
      ) : (
        users.map((user) => (
          <Button onClick={() => handleSelect(user)} key={user.id}>
            {user.username}
          </Button>
        ))
      )}
    </div>
  )
}

export const DynamicUserAutocomplete: FC<IDynamicUserAutocomplete> = ({
  onSelectItem,
  project,
}) => {
  const [forceOpen, setForceOpen] = useState(false)
  const [search, setSearch] = useState('')

  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef, () => setForceOpen(false))

  const handleTypedKey = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearch(e.target.value)
    setForceOpen(true)
  }

  const handleInputChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      setForceOpen(false)
    }
  }

  const handleSelect = (obj: UserInfo | null) => {
    setSearch(obj?.username ?? '')
    setForceOpen(false)
    onSelectItem(obj)
  }

  return (
    <ChakraProvider>
      <div ref={wrapperRef}>
        <Popover
          autoFocus={false}
          isOpen={forceOpen}
          onClose={() => setForceOpen(false)}
        >
          <PopoverTrigger>
            <div>
              <Input
                sx={{ height: '50%' }}
                value={search}
                onChange={handleTypedKey}
                onKeyDown={handleInputChange}
              />
              <IconButton
                aria-label="toggle options"
                variant="ghost"
                onClick={() => setForceOpen(!forceOpen)}
                icon={forceOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
              />
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverSelect
              search={search}
              project={project}
              handleSelect={handleSelect}
            />
          </PopoverContent>
        </Popover>
      </div>
    </ChakraProvider>
  )
}
