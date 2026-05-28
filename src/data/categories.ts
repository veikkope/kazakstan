import type { Activity, Category, LocalizedString, Region } from '@/lib/types';

/**
 * Category metadata. Labels and descriptions are inline-localized objects
 * so consumers can read them through `localised()` from `i18n-helpers.ts`
 * — the same helper that resolves `Sight.name` etc. One pattern data-wide.
 */
export const categoryMeta: Record<
  Category,
  {
    label: LocalizedString;
    description: LocalizedString;
    color: string;
    emoji: string;
  }
> = {
  nature: {
    label: { fi: 'Luonto', en: 'Nature', ru: 'Природа', kk: 'Табиғат' },
    description: {
      fi: 'Vuoret, järvet, kanjonit, aavikot',
      en: 'Mountains, lakes, canyons, deserts',
      ru: 'Горы, озёра, каньоны, пустыни',
      kk: 'Таулар, көлдер, каньондар, шөлдер',
    },
    color: '#16a34a',
    emoji: '🏔️',
  },
  culture: {
    label: { fi: 'Kulttuuri', en: 'Culture', ru: 'Культура', kk: 'Мәдениет' },
    description: {
      fi: 'Mausoleumit, moskeijat, museot, arkkitehtuuri',
      en: 'Mausoleums, mosques, museums, architecture',
      ru: 'Мавзолеи, мечети, музеи, архитектура',
      kk: 'Кесенелер, мешіттер, мұражайлар, сәулет',
    },
    color: '#7c3aed',
    emoji: '🕌',
  },
  food: {
    label: { fi: 'Ruoka', en: 'Food', ru: 'Еда', kk: 'Тағам' },
    description: {
      fi: 'Basaarit, paikallisruoka, ravintolat',
      en: 'Bazaars, local food, restaurants',
      ru: 'Базары, местная кухня, рестораны',
      kk: 'Базарлар, жергілікті тағамдар, мейрамханалар',
    },
    color: '#ea580c',
    emoji: '🍲',
  },
  nightlife: {
    label: { fi: 'Yöelämä', en: 'Nightlife', ru: 'Ночная жизнь', kk: 'Түнгі өмір' },
    description: {
      fi: 'Baarit, kävelykadut, ilta-aktiviteetit',
      en: 'Bars, pedestrian streets, evening activities',
      ru: 'Бары, пешеходные улицы, вечерние мероприятия',
      kk: 'Барлар, жаяу жүргіншілер көшелері, кешкі іс-шаралар',
    },
    color: '#db2777',
    emoji: '🎶',
  },
};

export const allCategories: Category[] = ['nature', 'culture', 'food', 'nightlife'];

/** Render order for the activity chip row. Extend as new activities ship. */
export const allActivities: Activity[] = ['hike'];

/**
 * Activity metadata — a cross-cutting tag (orthogonal to `category`) for the
 * outdoor destinations we researched as hikes/summits. Drives the distinct
 * map marker (emoji-in-pin) and the list/detail badge. Same inline-localized
 * pattern as `categoryMeta`, so labels resolve through `localised()`.
 */
export const activityMeta: Record<
  Activity,
  { label: LocalizedString; emoji: string; color: string }
> = {
  hike: {
    label: { fi: 'Vaellus', en: 'Hike', ru: 'Поход', kk: 'Жорық' },
    emoji: '🏔️',
    // Teal — distinct from the four category colours so hike sights pop.
    color: '#0d9488',
  },
};

/**
 * Region metadata. Same inline-localized pattern as `categoryMeta`.
 */
export const regionMeta: Record<
  Region,
  { label: LocalizedString; subtitle?: LocalizedString }
> = {
  almaty: {
    label: { fi: 'Almaty', en: 'Almaty', ru: 'Алматы', kk: 'Алматы' },
    subtitle: {
      fi: 'Maan suurin kaupunki',
      en: "The country's largest city",
      ru: 'Крупнейший город страны',
      kk: 'Елдің ең үлкен қаласы',
    },
  },
  'almaty-region': {
    label: {
      fi: 'Almatyn alue',
      en: 'Almaty region',
      ru: 'Алматинская область',
      kk: 'Алматы облысы',
    },
    subtitle: {
      fi: 'Luontokohteet kaupungin ympärillä',
      en: 'Nature sites around the city',
      ru: 'Природные достопримечательности вокруг города',
      kk: 'Қала маңындағы табиғат орындары',
    },
  },
  astana: {
    label: { fi: 'Astana', en: 'Astana', ru: 'Астана', kk: 'Астана' },
    subtitle: {
      fi: 'Pääkaupunki, moderni arkkitehtuuri',
      en: 'The capital, modern architecture',
      ru: 'Столица, современная архитектура',
      kk: 'Елорда, заманауи сәулет',
    },
  },
  turkistan: {
    label: { fi: 'Turkistan', en: 'Turkistan', ru: 'Туркестан', kk: 'Түркістан' },
    subtitle: {
      fi: 'UNESCO-kohde, silkkitie',
      en: 'UNESCO site, Silk Road',
      ru: 'Объект ЮНЕСКО, Шёлковый путь',
      kk: 'ЮНЕСКО нысаны, Жібек жолы',
    },
  },
  shymkent: {
    label: { fi: 'Shymkent', en: 'Shymkent', ru: 'Шымкент', kk: 'Шымкент' },
    subtitle: {
      fi: 'Etelä-Kazakstan',
      en: 'Southern Kazakhstan',
      ru: 'Южный Казахстан',
      kk: 'Оңтүстік Қазақстан',
    },
  },
  aktau: {
    label: { fi: 'Aktau', en: 'Aktau', ru: 'Актау', kk: 'Ақтау' },
    subtitle: {
      fi: 'Kaspianmeri ja Mangystaun aavikon kohteet',
      en: 'Caspian Sea and Mangystau desert sites',
      ru: 'Каспийское море и достопримечательности пустыни Мангистау',
      kk: 'Каспий теңізі және Маңғыстау шөлінің орындары',
    },
  },
  other: {
    label: { fi: 'Muu', en: 'Other', ru: 'Другие', kk: 'Басқа' },
  },
};
