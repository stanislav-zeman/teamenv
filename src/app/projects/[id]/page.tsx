'use client'
import { useRouter } from 'next/navigation'
import { PageProps } from '../../../../.next/types/app/layout'
import { getProjectDefaultUrl } from '@/app/links'

export default function Page({ params }: PageProps) {
  const router = useRouter()

  router.push(getProjectDefaultUrl(params.id))

  return <p>Loading...</p>
}
