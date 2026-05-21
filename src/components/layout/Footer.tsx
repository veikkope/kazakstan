import { Separator } from '@/components/ui/separator';

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-muted-foreground">
        <p>
          Henkilökohtainen reissusuunnitelma. Karttapohja:{' '}
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
        <p>
          Tarkista käytännön info aina ennen lähtöä — viisumit, kurssit ja yhteydet voivat
          muuttua.
        </p>
      </div>
    </footer>
  );
}
