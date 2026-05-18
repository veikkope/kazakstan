export default function Footer() {
  return (
    <footer className="mt-12 border-t border-(--color-border) bg-(--color-card)">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-(--color-muted)">
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
        <p className="mt-1">
          Tarkista käytännön info aina ennen lähtöä — viisumit, kurssit ja yhteydet voivat
          muuttua.
        </p>
      </div>
    </footer>
  );
}
