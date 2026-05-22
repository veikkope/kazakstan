import type { Category, Region } from '@/lib/types';

export const categoryMeta: Record<
  Category,
  { fi: string; color: string; emoji: string; description: string }
> = {
  nature: {
    fi: 'Luonto',
    color: '#16a34a',
    emoji: '🏔️',
    description: 'Vuoret, järvet, kanjonit, aavikot',
  },
  culture: {
    fi: 'Kulttuuri',
    color: '#7c3aed',
    emoji: '🕌',
    description: 'Mausoleumit, moskeijat, museot, arkkitehtuuri',
  },
  food: {
    fi: 'Ruoka',
    color: '#ea580c',
    emoji: '🍲',
    description: 'Basaarit, paikallisruoka, ravintolat',
  },
  nightlife: {
    fi: 'Yöelämä',
    color: '#db2777',
    emoji: '🎶',
    description: 'Baarit, kävelykadut, ilta-aktiviteetit',
  },
};

export const allCategories: Category[] = ['nature', 'culture', 'food', 'nightlife'];

export const regionMeta: Record<Region, { fi: string; subtitle?: string }> = {
  'almaty': { fi: 'Almaty', subtitle: 'Maan suurin kaupunki' },
  'almaty-region': { fi: 'Almatyn alue', subtitle: 'Luontokohteet kaupungin ympärillä' },
  'astana': { fi: 'Astana', subtitle: 'Pääkaupunki, moderni arkkitehtuuri' },
  'turkistan': { fi: 'Turkistan', subtitle: 'UNESCO-kohde, silkkitie' },
  'shymkent': { fi: 'Shymkent', subtitle: 'Etelä-Kazakstan' },
  'aktau': { fi: 'Aktau', subtitle: 'Kaspianmeri ja Mangystaun aavikon kohteet' },
  'other': { fi: 'Muu', subtitle: '' },
};
