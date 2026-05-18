import { visaInfo } from '@/data/practical';

export default function VisaCard() {
  return (
    <section className="rounded-lg border-2 border-(--color-steppe) bg-(--color-card) p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-(--color-muted)">Viisumi</p>
          <h2 className="mt-1 text-2xl font-semibold">
            🇫🇮 → 🇰🇿 viisumivapaa {visaInfo.visaFreeDays} päivää
          </h2>
        </div>
        <span className="rounded-full bg-(--color-accent) px-3 py-1 text-xs uppercase tracking-wide text-white">
          OK
        </span>
      </div>
      <p className="mt-3 text-(--color-fg)">{visaInfo.notes}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
        <span className="text-(--color-muted)">
          Viimeksi tarkistettu: <strong>{visaInfo.lastVerified}</strong>
        </span>
        {visaInfo.sourceUrl && (
          <a
            href={visaInfo.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="text-(--color-steppe)"
          >
            Tarkista uusin tilanne ↗
          </a>
        )}
      </div>
    </section>
  );
}
