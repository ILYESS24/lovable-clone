import { AppsList } from '@/components/apps/AppsList'
import { CreateAppButton } from '@/components/apps/CreateAppButton'

export default function AppsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mes Applications</h1>
        <CreateAppButton />
      </div>
      <AppsList />
    </div>
  )
}
