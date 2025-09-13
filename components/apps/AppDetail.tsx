'use client'

import { useQuery } from '@tanstack/react-query'
import { ApiClient } from '@/lib/api-client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Play, Square, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'

interface AppDetailProps {
  appId: number
}

export function AppDetail({ appId }: AppDetailProps) {
  const router = useRouter()
  const apiClient = ApiClient.getInstance()
  
  const { data: app, isLoading, error } = useQuery({
    queryKey: ['app', appId],
    queryFn: () => apiClient.getApp(appId),
  })

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Chargement de l'application...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !app) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center p-8">
          <p className="text-red-500 mb-4">Erreur lors du chargement de l'application</p>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{app.name}</h1>
          <p className="text-muted-foreground">
            Créé {formatDistanceToNow(new Date(app.createdAt), { 
              addSuffix: true, 
              locale: fr 
            })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations</CardTitle>
              <CardDescription>
                Détails de l'application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Nom</label>
                  <p className="text-sm">{app.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Template</label>
                  <Badge variant="secondary">{app.templateId}</Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Chemin</label>
                  <p className="text-sm font-mono">{app.path}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Dernière modification</label>
                  <p className="text-sm">
                    {formatDistanceToNow(new Date(app.updatedAt), { 
                      addSuffix: true, 
                      locale: fr 
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Chats</CardTitle>
              <CardDescription>
                Historique des conversations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Les chats seront affichés ici une fois implémentés.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full">
                <Play className="h-4 w-4 mr-2" />
                Démarrer l'application
              </Button>
              <Button variant="outline" className="w-full">
                <Square className="h-4 w-4 mr-2" />
                Arrêter l'application
              </Button>
              <Button variant="outline" className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                Paramètres
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statut</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Prêt</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
