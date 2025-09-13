import { AppDetail } from '@/components/apps/AppDetail';

interface AppPageProps {
  params: {
    id: string;
  };
}

export default function AppPage({ params }: AppPageProps) {
  return <AppDetail appId={params.id} />;
}