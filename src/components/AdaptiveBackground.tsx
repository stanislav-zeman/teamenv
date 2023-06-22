'use client'

import React, {FC, ReactNode} from 'react'

const AdaptiveBackground: FC<{ children?: ReactNode }> = ({ children }) => {
  const bgString = 'bg-neutral-100'
  const textString = 'text-black'

  return <div className={`${bgString} h-full overflow-hidden ${textString}`}>{children}</div>
}

export default AdaptiveBackground
