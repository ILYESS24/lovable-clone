'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import { showError, showSuccess } from '@/lib/toast';

interface App {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

interface AppCardProps {
  app: App;
}

export function AppCard({ app }: AppCardProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette application ?')) {
      return;
    }

    try {
      await apiClient.deleteApp(app.id);
      showSuccess('Application supprimée avec succès');
      router.refresh();
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Erreur lors de la suppression');
    }
  };

  const handleOpen = () => {
    router.push(`/apps/${app.id}`);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {app.name}
          <Badge variant="secondary">Active</Badge>
        </CardTitle>
        {app.description && (
          <CardDescription>{app.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-gray-500">
          <p>Créé: {new Date(app.createdAt).toLocaleDateString()}</p>
          <p>Modifié: {new Date(app.updatedAt).toLocaleDateString()}</p>
        </div>
        <div className="flex gap-2 mt-4">
          <Button onClick={handleOpen} className="flex-1">
            Ouvrir
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Supprimer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}