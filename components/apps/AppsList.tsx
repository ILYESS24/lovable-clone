'use client';

import { useEffect, useState } from 'react';
import { AppCard } from './AppCard';
import { apiClient } from '@/lib/api-client';

interface App {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export function AppsList() {
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const data = await apiClient.getApps();
        setApps(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Erreur: {error}</div>;
  }

  if (apps.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">Aucune application trouvée</p>
        <p className="text-sm text-gray-400">Créez votre première application pour commencer</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {apps.map((app) => (
        <AppCard key={app.id} app={app} />
      ))}
    </div>
  );
}