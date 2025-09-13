'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';

interface App {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

interface AppDetailProps {
  appId: string;
}

export function AppDetail({ appId }: AppDetailProps) {
  const [app, setApp] = useState<App | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchApp = async () => {
      try {
        const data = await apiClient.getApp(appId);
        setApp(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
      } finally {
        setLoading(false);
      }
    };

    fetchApp();
  }, [appId]);

  if (loading) {
    return <div className="container mx-auto p-6">Chargement...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">Erreur: {error}</p>
          <Button onClick={() => router.push('/apps')}>
            Retour aux applications
          </Button>
        </div>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Application non trouvée</p>
          <Button onClick={() => router.push('/apps')}>
            Retour aux applications
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">{app.name}</h1>
          {app.description && (
            <p className="text-gray-600 mt-2">{app.description}</p>
          )}
        </div>
        <Badge variant="secondary">Active</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="font-medium">ID:</span> {app.id}
            </div>
            <div>
              <span className="font-medium">Créé:</span> {new Date(app.createdAt).toLocaleString()}
            </div>
            <div>
              <span className="font-medium">Modifié:</span> {new Date(app.updatedAt).toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full">
              Ouvrir l'éditeur
            </Button>
            <Button variant="outline" className="w-full">
              Paramètres
            </Button>
            <Button variant="outline" className="w-full">
              Historique
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}