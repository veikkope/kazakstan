import { getTranslations } from 'next-intl/server';
import TodayDashboard from '@/components/today/TodayDashboard.client';
import OfflineManager from '@/components/offline/OfflineManager';
import ScrollMemory from '@/components/layout/ScrollMemory';

export async function generateMetadata() {
  const t = await getTranslations();
  return {
    title: t('pages.today.metaTitle'),
    description: t('pages.today.metaDescription'),
  };
}

export default async function TanaanPage() {
  const t = await getTranslations();
  return (
    <div className="space-y-6">
      {/* Server-component page → mount the client wrapper to opt into
          per-pathname scroll save/restore. Users navigate from a day's
          plan into a sight detail and expect to return to the same
          scroll offset on this long page. */}
      <ScrollMemory />
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">{t('pages.today.title')}</h1>
        <p className="text-sm text-muted-foreground">
          {t('pages.today.intro')}
        </p>
      </div>

      <TodayDashboard />
      <OfflineManager />
    </div>
  );
}
