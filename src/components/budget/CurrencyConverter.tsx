'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { STATIC_KZT_PER_EUR } from '@/data/budget';
import { eurToKzt, kztToEur, formatEUR, formatKZT } from '@/lib/currency';

type Direction = 'kzt-to-eur' | 'eur-to-kzt';

export default function CurrencyConverter() {
  const [direction, setDirection] = useState<Direction>('kzt-to-eur');
  const [input, setInput] = useState('10000');

  const numeric = Number(input.replace(/\s/g, '').replace(',', '.')) || 0;
  const result =
    direction === 'kzt-to-eur'
      ? formatEUR(kztToEur(numeric))
      : formatKZT(eurToKzt(numeric));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Valuuttamuunnin</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-3 text-xs text-(--color-muted)">
          Staattinen kurssi: 1 € ≈ {STATIC_KZT_PER_EUR.toLocaleString('fi-FI')} ₸. Tarkista
          päiväkurssi ennen reissua.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Select
            value={direction}
            onValueChange={(v) => setDirection(v as Direction)}
          >
            <SelectTrigger
              size="default"
              className="min-h-11"
              aria-label="Muunnoksen suunta"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kzt-to-eur">KZT → EUR</SelectItem>
              <SelectItem value="eur-to-kzt">EUR → KZT</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="text"
            inputMode="decimal"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-40 min-h-11"
            aria-label={
              direction === 'kzt-to-eur' ? 'Summa tengeinä' : 'Summa euroina'
            }
          />
          <span className="text-sm">
            = <strong className="text-(--color-fg)">{result}</strong>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
