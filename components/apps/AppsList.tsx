'use client'

import { useQuery } from '@tanstack/react-query'
import { ApiClient } from '@/lib/api-client'
import { AppCard } from './AppCard'
import { Loader2 } from 'lucide-react'

export function AppsList() {
  const apiClient = ApiClient.getInstance()
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['apps'],
    queryFn: () => apiClient.listApps(),
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Chargement des applications...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500">Erreur lors du chargement des applications</p>
      </div>
    )
  }

  if (!data?.apps || data.apps.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">Aucune application trouvée</p>
        <p className="text-sm text-gray-400 mt-2">
          Créez votre première application pour commencer
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.apps.map((app: any) => (
        <AppCard key={app.id} app={app} />
      ))}
    </div>
  )
}
