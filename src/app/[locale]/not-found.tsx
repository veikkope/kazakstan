import { getTranslations } from 'next-intl/server';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

export default async function NotFound() {
  const t = await getTranslations();
  return (
    <div className="py-12 flex justify-center">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            {t('errors.notFound.title')}
          </CardTitle>
          <CardDescription>
            {t('errors.notFound.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/map">{t('errors.notFound.linkMap')}</Link>
            </li>
            <li>
              <Link href="/sights">{t('errors.notFound.linkSights')}</Link>
            </li>
            <li>
              <Link href="/routes">{t('errors.notFound.linkRoutes')}</Link>
            </li>
          </ul>
          <Button asChild>
            <Link href="/">{t('errors.notFound.cta')}</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
