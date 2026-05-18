'use client';

import { useState } from 'react';
import { STATIC_KZT_PER_EUR } from '@/data/budget';
import { eurToKzt, kztToEur, formatEUR, formatKZT } from '@/lib/currency';

export default function CurrencyConverter() {
  const [direction, setDirection] = useState<'kzt-to-eur' | 'eur-to-kzt'>('kzt-to-eur');
  const [input, setInput] = useState('10000');

  const numeric = Number(input.replace(/\s/g, '').replace(',', '.')) || 0;
  const result =
    direction === 'kzt-to-eur'
      ? formatEUR(kztToEur(numeric))
      : formatKZT(eurToKzt(numeric));

  return (
    <section className="rounded-lg border border-(--color-border) bg-(--color-card) p-5">
      <h2 className="mb-3 font-semibold">Valuuttamuunnin</h2>
      <p className="mb-3 text-xs text-(--color-muted)">
        Staattinen kurssi: 1 € ≈ {STATIC_KZT_PER_EUR.toLocaleString('fi-FI')} ₸. Tarkista
        päiväkurssi ennen reissua.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={direction}
          onChange={(e) => setDirection(e.target.value as 'kzt-to-eur' | 'eur-to-kzt')}
          className="rounded-md border border-(--color-border) bg-(--color-bg) px-3 py-2 text-sm"
        >
          <option value="kzt-to-eur">KZT → EUR</option>
          <option value="eur-to-kzt">EUR → KZT</option>
        </select>
        <input
          type="text"
          inputMode="decimal"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-40 rounded-md border border-(--color-border) bg-(--color-bg) px-3 py-2 text-sm"
        />
        <span className="text-sm">
          ={' '}
          <strong className="text-(--color-fg)">{result}</strong>
        </span>
      </div>
    </section>
  );
}
