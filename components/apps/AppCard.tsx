'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MoreHorizontal, Play, Trash2, Edit } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiClient } from '@/lib/api-client'
import { showSuccess, showError } from '@/lib/toast'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'

interface AppCardProps {
  app: {
    id: number
    name: string
    path: string
    templateId: string
    createdAt: string
    updatedAt: string
  }
}

export function AppCard({ app }: AppCardProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const apiClient = ApiClient.getInstance()

  const deleteAppMutation = useMutation({
    mutationFn: (appId: number) => apiClient.deleteApp(appId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apps'] })
      showSuccess('Application supprimée avec succès')
    },
    onError: (error) => {
      showError(error as Error)
    },
  })

  const handleDelete = () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette application ?')) {
      deleteAppMutation.mutate(app.id)
    }
  }

  const handleOpen = () => {
    router.push(`/apps/${app.id}`)
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{app.name}</CardTitle>
            <CardDescription>
              Créé {formatDistanceToNow(new Date(app.createdAt), { 
                addSuffix: true, 
                locale: fr 
              })}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleOpen}>
                <Edit className="h-4 w-4 mr-2" />
                Ouvrir
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{app.templateId}</Badge>
          <Button onClick={handleOpen} size="sm">
            <Play className="h-4 w-4 mr-2" />
            Ouvrir
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
