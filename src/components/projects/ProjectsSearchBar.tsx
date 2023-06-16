import React from 'react'
import GenericLolInput from '@/components/common/GenericLolInput'
import { OrderFilteringButtons } from '../common/OrderFilteringButtons'
import { AtLeastRoleFilter } from '../common/AtLeastRoleFilter'

const ProjectsSearchBar = () => {
  return (
    <div className="w-10/12 h-24 flex items-center justify-between border-b pl-4 pr-4">
      <p className="text-lg">Projects</p>
      <div className="flex justify-end w-6/12 gap-6">
        <AtLeastRoleFilter />
        <OrderFilteringButtons />
        <GenericLolInput />
      </div>
    </div>
  )
}

export default ProjectsSearchBar
