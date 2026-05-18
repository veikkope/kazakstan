import { STATIC_KZT_PER_EUR } from '@/data/budget';

export function kztToEur(kzt: number, rate: number = STATIC_KZT_PER_EUR): number {
  return kzt / rate;
}

export function eurToKzt(eur: number, rate: number = STATIC_KZT_PER_EUR): number {
  return eur * rate;
}

export function formatKZT(amount: number): string {
  return `${Math.round(amount).toLocaleString('fi-FI')} ₸`;
}

export function formatEUR(amount: number): string {
  return amount.toLocaleString('fi-FI', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  });
}
