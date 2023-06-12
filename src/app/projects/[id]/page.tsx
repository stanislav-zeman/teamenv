import { PageProps } from '../../../../.next/types/app/layout'
 
export default function Page({ params }: PageProps) {
  return <p>Project: {params.id}</p>
}