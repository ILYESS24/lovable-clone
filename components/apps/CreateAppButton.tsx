'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiClient } from '@/lib/api-client'
import { showSuccess, showError } from '@/lib/toast'
import { useRouter } from 'next/navigation'

export function CreateAppButton() {
  const [open, setOpen] = useState(false)
  const [appName, setAppName] = useState('')
  const [templateId, setTemplateId] = useState('default')
  const router = useRouter()
  const queryClient = useQueryClient()
  const apiClient = ApiClient.getInstance()

  const createAppMutation = useMutation({
    mutationFn: (params: { name: string; templateId: string }) => 
      apiClient.createApp(params),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['apps'] })
      showSuccess('Application créée avec succès')
      setOpen(false)
      setAppName('')
      router.push(`/apps/${data.app.id}`)
    },
    onError: (error) => {
      showError(error as Error)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!appName.trim()) return
    
    createAppMutation.mutate({
      name: appName.trim(),
      templateId,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Application
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Créer une nouvelle application</DialogTitle>
            <DialogDescription>
              Donnez un nom à votre nouvelle application et choisissez un template.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nom de l'application</Label>
              <Input
                id="name"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                placeholder="Mon application"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="template">Template</Label>
              <select
                id="template"
                value={templateId}
                onChange={(e) => setTemplateId(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="default">Application par défaut</option>
                <option value="nextjs">Next.js</option>
                <option value="react">React</option>
                <option value="vue">Vue.js</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Annuler
            </Button>
            <Button 
              type="submit" 
              disabled={createAppMutation.isPending || !appName.trim()}
            >
              {createAppMutation.isPending ? 'Création...' : 'Créer'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
