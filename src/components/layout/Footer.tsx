import { getTranslations } from 'next-intl/server';
import { Separator } from '@/components/ui/separator';

export default async function Footer() {
  const t = await getTranslations();
  return (
    <footer className="mt-12 border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-muted-foreground">
        <p>
          {t('components.footer.intro')}{' '}
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noreferrer"
          >
            OpenStreetMap
          </a>
          .
        </p>
        <Separator className="my-3" />
        <p>{t('components.footer.disclaimer')}</p>
      </div>
    </footer>
  );
}
