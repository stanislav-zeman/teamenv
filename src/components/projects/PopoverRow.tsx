import { FC, ReactNode } from 'react'
import { Icon, IconButton, Text } from '@chakra-ui/react'

interface IPopoverRow {
  label: string
  icon: ReactNode
  onClick: () => void
}

export const PopoverRow: FC<IPopoverRow> = ({ label, icon, onClick }) => {
  return (
    <IconButton
      variant="ghost"
      aria-label={`${label} row`}
      onClick={onClick}
      icon={
        <div className="w-full flex items-center justify-start gap-2">
          <Icon fontSize="1.25rem">{icon}</Icon>
          <Text fontSize="1.25rem">{label}</Text>
        </div>
      }
    />
  )
}
