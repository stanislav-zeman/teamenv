'use client'
import { MyProject } from '@/models/Project'
import { FC, useState } from 'react'
import {
  Text,
  Grid,
  GridItem,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@chakra-ui/react'
import { HamburgerIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { PopoverRow } from './PopoverRow'

interface IMoreButtonWithPopover {
  project: MyProject
}

export const MoreButtonWithPopover: FC<IMoreButtonWithPopover> = ({
  project,
}) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Popover isOpen={open} onClose={() => setOpen(false)}>
        <PopoverTrigger>
          <IconButton
            onClick={() => setOpen(true)}
            variant="ghost"
            colorScheme="whiteAlpha"
            aria-label="project info"
            icon={<HamburgerIcon fontSize="1.5rem" />}
          />
        </PopoverTrigger>
        <PopoverContent className="p-2 flex flex-col">
          <PopoverRow
            label="Edit"
            onClick={() => alert('lol')}
            icon={<EditIcon />}
          />
          <PopoverRow
            label="Delete"
            onClick={() => alert('lol')}
            icon={<DeleteIcon />}
          />
        </PopoverContent>
      </Popover>
    </>
  )
}
