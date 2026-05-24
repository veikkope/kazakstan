import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, AtSign, ExternalLink, MapPin, MessageCircle, Phone } from 'lucide-react';
import { carRental } from '@/data/logistics';
import NavigateMenu from '@/components/navigation/NavigateMenu';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { asLocale, localised } from '@/lib/i18n-helpers';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const loc = asLocale(await getLocale());
  return {
    title: t('pages.carRental.metaTitle', { operator: localised(carRental.operator, loc) }),
    description: t('pages.carRental.metaDescription', {
      operator: localised(carRental.operator, loc),
      pickup: localised(carRental.pickup.name, loc),
      pickupDate: carRental.pickupDate,
      returnDate: carRental.returnDate,
    }),
  };
}

function formatDateFi(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${parseInt(d, 10)}.${parseInt(m, 10)}.${y}`;
}

function whatsappLink(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  return `https://wa.me/${digits}`;
}

function instagramLink(handle: string): string {
  const clean = handle.replace(/^@/, '');
  return `https://instagram.com/${clean}`;
}

export default async function VuokraAutoPage() {
  const t = await getTranslations();
  const loc = asLocale(await getLocale());
  const r = carRental;
  const { lat: pLat, lng: pLng } = r.pickup.coords;
  const pickupName = localised(r.pickup.name, loc);
  const pickupAddress = localised(r.pickup.address, loc);
  const operatorName = localised(r.operator, loc);
  const hours = r.hours ? localised(r.hours, loc) : undefined;
  const reputation = r.reputation ? localised(r.reputation, loc) : undefined;

  return (
    <article className="space-y-8 pb-20 lg:pb-0">
      <div>
        <Link
          href="/map"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden />
          {t('pages.carRental.backToMap')}
        </Link>
      </div>

      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className="border-sky-500 uppercase tracking-wide text-sky-600 dark:text-sky-400"
          >
            {t('pages.carRental.badge')}
          </Badge>
          {hours && <Badge variant="secondary">{hours}</Badge>}
        </div>
        <h1 className="text-balance text-3xl font-bold tracking-tight">
          {operatorName}
        </h1>
        {r.operatorLocal && (
          <p className="text-sm text-muted-foreground">{r.operatorLocal}</p>
        )}
        {reputation && (
          <p className="max-w-2xl text-base text-muted-foreground">{reputation}</p>
        )}
      </header>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <MapPin className="size-5 text-sky-600 dark:text-sky-400" aria-hidden />
            <CardTitle>{t('pages.carRental.pickupTitle')}</CardTitle>
          </div>
          <CardDescription>
            {t('pages.carRental.pickupDates', {
              pickup: formatDateFi(r.pickupDate),
              return: formatDateFi(r.returnDate),
            })}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <p className="font-medium">{pickupName}</p>
            <p className="text-sm text-muted-foreground">{pickupAddress}</p>
            {r.pickup.postalCode && (
              <p className="text-xs text-muted-foreground">
                {t('pages.carRental.postalCode')}: {r.pickup.postalCode}
              </p>
            )}
            <p className="font-mono text-xs text-muted-foreground">
              {pLat.toFixed(6)}, {pLng.toFixed(6)}
            </p>
          </div>

          <div>
            <NavigateMenu
              coords={r.pickup.coords}
              label={pickupName}
              region="aktau"
              triggerText={t('pages.carRental.openNavigator')}
              align="start"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              {t('pages.carRental.navigatorHint')}
            </p>
          </div>
        </CardContent>
      </Card>

      {(r.phone || r.whatsapp || r.instagram) && (
        <Card>
          <CardHeader>
            <CardTitle>{t('pages.carRental.contactsTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-border text-sm">
              {r.phone && (
                <li className="flex items-center justify-between gap-3 py-2.5">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="size-4" aria-hidden />
                    {t('pages.carRental.phone')}
                  </span>
                  <a
                    href={`tel:${r.phone.replace(/\s/g, '')}`}
                    className="font-mono font-medium text-foreground hover:underline"
                  >
                    {r.phone}
                  </a>
                </li>
              )}
              {r.whatsapp && (
                <li className="flex items-center justify-between gap-3 py-2.5">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <MessageCircle className="size-4" aria-hidden />
                    {t('pages.carRental.whatsapp')}
                  </span>
                  <a
                    href={whatsappLink(r.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-foreground hover:underline"
                  >
                    {t('pages.carRental.openChat')}
                  </a>
                </li>
              )}
              {r.instagram && (
                <li className="flex items-center justify-between gap-3 py-2.5">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <AtSign className="size-4" aria-hidden />
                    {t('pages.carRental.instagram')}
                  </span>
                  <a
                    href={instagramLink(r.instagram)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-foreground hover:underline"
                  >
                    {r.instagram}
                  </a>
                </li>
              )}
            </ul>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{t('pages.carRental.bookingTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {t('pages.carRental.pickupLabel')}
              </dt>
              <dd className="text-base">{formatDateFi(r.pickupDate)}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {t('pages.carRental.returnLabel')}
              </dt>
              <dd className="text-base">{formatDateFi(r.returnDate)}</dd>
            </div>
            {hours && (
              <div className="sm:col-span-2">
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {t('pages.carRental.hoursLabel')}
                </dt>
                <dd className="text-base">{hours}</dd>
              </div>
            )}
          </dl>
        </CardContent>
      </Card>

      {r.office && (
        <Card>
          <CardHeader>
            <CardTitle>{t('pages.carRental.officeTitle')}</CardTitle>
            <CardDescription>
              {t.rich('pages.carRental.officeDescription', {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1">
              <p className="font-medium">{localised(r.office.name, loc)}</p>
              <p className="text-sm text-muted-foreground">{localised(r.office.address, loc)}</p>
              <p className="font-mono text-xs text-muted-foreground">
                {r.office.coords.lat.toFixed(6)}, {r.office.coords.lng.toFixed(6)}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {r.notes && r.notes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{t('pages.carRental.notesTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {r.notes.map((n, i) => (
                <li key={i} className="flex gap-2">
                  <span aria-hidden className="select-none text-muted-foreground/60">
                    •
                  </span>
                  <span>{localised(n, loc)}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {r.externalLinks && r.externalLinks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{t('pages.carRental.externalLinksTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-border text-sm">
              {r.externalLinks.map((l) => (
                <li key={l.url} className="py-2.5">
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 text-foreground hover:underline"
                  >
                    <span>{localised(l.label, loc)}</span>
                    <ExternalLink className="size-4 text-muted-foreground" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <p className="text-xs text-muted-foreground">
        {t('pages.carRental.lastVerified', { date: formatDateFi(r.lastVerified) })}
      </p>
    </article>
  );
}
