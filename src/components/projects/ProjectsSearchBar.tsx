import React from 'react'
import GenericLolInput from '@/components/common/GenericLolInput'
import { OrderFilteringButtons } from '../common/OrderFilteringButtons'
import { AtLeastRoleFilter } from '../common/AtLeastRoleFilter'
import { DynamicAutocomplete } from '../common/DynamicAutocomplete'

const ProjectsSearchBar = () => {
  return (
    <div className="w-10/12 h-24 flex items-center justify-between border-b pl-4 pr-4">
      <p className="text-lg">Projects</p>
      <div className="flex justify-end w-9/12 gap-6">
        <DynamicAutocomplete />
        <AtLeastRoleFilter />
        <OrderFilteringButtons />
        <GenericLolInput />
      </div>
    </div>
  )
}

export default ProjectsSearchBar
