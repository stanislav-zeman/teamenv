'use client'
import {
  ChangeEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Input } from '@mui/material'
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react'

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

const mockData = ['test', 'trest', 'rest', 'pest']

export const DynamicAutocomplete = () => {
  const [search, setSearch] = useState('')
  const [forceOpen, setForceOpen] = useState(false)
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

  return (
    <div ref={wrapperRef}>
      <Popover
        autoFocus={false}
        isOpen={forceOpen}
        onClose={() => setForceOpen(false)}
      >
        <PopoverTrigger>
          <Input
            sx={{ height: '50%' }}
            value={search}
            onChange={handleTypedKey}
            onKeyDown={handleInputChange}
          />
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col">
            {mockData
              .filter((d) => search === '' || d.includes(search))
              .map((d) => (
                <Button
                  onClick={() => {
                    setSearch(d)
                    setForceOpen(false)
                  }}
                  key={d}
                >
                  {d}
                </Button>
              ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
