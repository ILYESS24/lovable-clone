import { AppDetail } from '@/components/apps/AppDetail'
import { notFound } from 'next/navigation'

interface AppPageProps {
  params: {
    id: string
  }
}

export default function AppPage({ params }: AppPageProps) {
  const appId = parseInt(params.id)
  
  if (isNaN(appId)) {
    notFound()
  }

  return <AppDetail appId={appId} />
}
