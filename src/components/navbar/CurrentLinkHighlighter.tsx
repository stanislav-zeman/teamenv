'use client'

import {Divider, keyframes} from '@chakra-ui/react'
import {motion} from 'framer-motion'
import {usePathname} from 'next/navigation'
import {FC} from 'react'

interface ICurrentLinkHighlighter {
  pathname: string
}

const animationKeyframes = keyframes`
  0% { transform: scale(0.5); }
  50% { transform: scale(0.75); }
  100% { transform: scale(1); }
`

const animation = `${animationKeyframes} 0.75s ease-in-out`

export const CurrentLinkHighlighter: FC<ICurrentLinkHighlighter> = ({
  pathname,
}) => {
  const path = usePathname()

  if (!path.includes(pathname)) {
    return null
  }

  return (
    <Divider
      as={motion.div}
      animation={animation}
      width="90%"
      colorScheme="whiteAlpha"
      borderWidth="1px"
      borderRadius="2rem"
    />
  )
}
