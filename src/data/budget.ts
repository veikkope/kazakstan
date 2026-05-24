import type { BudgetByRegion } from '@/lib/types';

// Staattinen valuuttakurssi — tarkista ennen reissua. Live-fetch voidaan lisätä myöhemmin.
// Päivitetty 2026-05-21 (~547 KZT/EUR vahvistettu, pyöristys ylöspäin budjetin turvavaraksi).
export const STATIC_KZT_PER_EUR = 550;

export const budgetByRegion: BudgetByRegion[] = [
  {
    region: 'general',
    label: {
      fi: 'Yleinen (lennot, perusarvio)',
      en: 'General (flights, baseline)',
      ru: 'Общее (перелёты, базовая оценка)',
      kk: 'Жалпы (рейстер, негізгі бағалау)',
    },
    perDayEUR: { low: 50, mid: 80, high: 130 },
    items: [
      {
        category: 'flights',
        label: {
          fi: 'Edestakaiset lennot Helsinki–Almaty',
          en: 'Return flights Helsinki–Almaty',
          ru: 'Перелёт туда-обратно Хельсинки–Алматы',
          kk: 'Хельсинки–Алматы екі жақты рейсі',
        },
        estimateEUR: 600,
        note: {
          fi: 'Yleensä vaihdolla Istanbulin tai Dubain kautta. Hintahaitari 500–900 €.',
          en: 'Usually with a connection via Istanbul or Dubai. Price range 500–900 €.',
          ru: 'Обычно со стыковкой в Стамбуле или Дубае. Диапазон цен 500–900 €.',
          kk: 'Әдетте Стамбұл немесе Дубай арқылы ауысып ұшады. Баға аралығы 500–900 €.',
        },
      },
      {
        category: 'misc',
        label: {
          fi: 'Matkavakuutus 2 viikolle',
          en: 'Travel insurance for 2 weeks',
          ru: 'Туристическая страховка на 2 недели',
          kk: 'Сапарға арналған сақтандыру (2 апта)',
        },
        estimateEUR: 40,
      },
      {
        category: 'misc',
        label: {
          fi: 'eSIM (2 viikkoa, 5–10 GB)',
          en: 'eSIM (2 weeks, 5–10 GB)',
          ru: 'eSIM (2 недели, 5–10 ГБ)',
          kk: 'eSIM (2 апта, 5–10 ГБ)',
        },
        estimateEUR: 15,
      },
    ],
  },
  {
    region: 'almaty',
    label: {
      fi: 'Almaty (kaupunki)',
      en: 'Almaty (city)',
      ru: 'Алматы (город)',
      kk: 'Алматы (қала)',
    },
    perDayEUR: { low: 35, mid: 65, high: 110 },
    items: [
      {
        category: 'lodging',
        label: {
          fi: 'Hostelli / budjettihotelli per yö',
          en: 'Hostel / budget hotel per night',
          ru: 'Хостел / бюджетный отель за ночь',
          kk: 'Хостел / бюджеттік қонақ үй (бір түн)',
        },
        estimateEUR: 20,
      },
      {
        category: 'lodging',
        label: {
          fi: 'Keskitason hotelli per yö',
          en: 'Mid-range hotel per night',
          ru: 'Отель среднего класса за ночь',
          kk: 'Орта деңгейдегі қонақ үй (бір түн)',
        },
        estimateEUR: 50,
      },
      {
        category: 'food',
        label: {
          fi: 'Lounas paikallisessa kahvilassa',
          en: 'Lunch at a local café',
          ru: 'Обед в местном кафе',
          kk: 'Жергілікті кафеде түскі ас',
        },
        estimateEUR: 5,
      },
      {
        category: 'food',
        label: {
          fi: 'Illallinen ravintolassa',
          en: 'Dinner at a restaurant',
          ru: 'Ужин в ресторане',
          kk: 'Мейрамханада кешкі ас',
        },
        estimateEUR: 12,
      },
      {
        category: 'transport',
        label: {
          fi: 'Yandex Go -taksi keskustassa',
          en: 'Yandex Go taxi in the city centre',
          ru: 'Такси Yandex Go в центре города',
          kk: 'Қала орталығында Yandex Go таксиі',
        },
        estimateEUR: 3,
      },
      {
        category: 'activities',
        label: {
          fi: 'Kök-Töben köysirata',
          en: 'Kök-Töbe cable car',
          ru: 'Канатная дорога Кок-Тобе',
          kk: 'Көк-Төбе аспалы жолы',
        },
        estimateEUR: 5,
      },
    ],
  },
  {
    region: 'almaty-region',
    label: {
      fi: 'Almatyn alue (luontoretket)',
      en: 'Almaty region (nature trips)',
      ru: 'Алматинская область (поездки на природу)',
      kk: 'Алматы облысы (табиғат сапарлары)',
    },
    perDayEUR: { low: 60, mid: 100, high: 160 },
    items: [
      {
        category: 'transport',
        label: {
          fi: 'Kuljettaja Charyniin / Kolsaihin (1 päivä)',
          en: 'Driver to Charyn / Kolsai (1 day)',
          ru: 'Водитель до Чарына / Колсая (1 день)',
          kk: 'Шарын / Көлсайға жүргізуші (1 күн)',
        },
        estimateEUR: 80,
        note: {
          fi: 'Jaettuna kahdelle = 40 € / hlö.',
          en: 'Split between two = 40 € per person.',
          ru: 'Разделить на двоих = 40 € с человека.',
          kk: 'Екіге бөлгенде = адам басына 40 €.',
        },
      },
      {
        category: 'activities',
        label: {
          fi: 'Altyn-Emelin sisäänpääsy + opas',
          en: 'Altyn-Emel entry + guide',
          ru: 'Вход в Алтын-Эмель + гид',
          kk: 'Алтын-Емелге кіру + гид',
        },
        estimateEUR: 50,
      },
      {
        category: 'lodging',
        label: {
          fi: 'Guesthouse Satyssa per yö',
          en: 'Guesthouse in Saty per night',
          ru: 'Гостевой дом в Саты за ночь',
          kk: 'Саты ауылындағы қонақ үй (бір түн)',
        },
        estimateEUR: 25,
      },
    ],
  },
  {
    region: 'astana',
    label: {
      fi: 'Astana',
      en: 'Astana',
      ru: 'Астана',
      kk: 'Астана',
    },
    perDayEUR: { low: 45, mid: 75, high: 130 },
    items: [
      {
        category: 'lodging',
        label: {
          fi: 'Hotelli per yö (Astana on hintavampi)',
          en: 'Hotel per night (Astana is pricier)',
          ru: 'Отель за ночь (в Астане дороже)',
          kk: 'Қонақ үй (бір түн, Астанада қымбатырақ)',
        },
        estimateEUR: 55,
      },
      {
        category: 'food',
        label: {
          fi: 'Illallinen ravintolassa',
          en: 'Dinner at a restaurant',
          ru: 'Ужин в ресторане',
          kk: 'Мейрамханада кешкі ас',
        },
        estimateEUR: 14,
      },
      {
        category: 'activities',
        label: {
          fi: 'Baiterek-tornin pääsy',
          en: 'Baiterek tower entry',
          ru: 'Вход на башню Байтерек',
          kk: 'Бәйтерек мұнарасына кіру',
        },
        estimateEUR: 5,
      },
    ],
  },
  {
    region: 'turkistan',
    label: {
      fi: 'Turkistan',
      en: 'Turkistan',
      ru: 'Туркестан',
      kk: 'Түркістан',
    },
    perDayEUR: { low: 30, mid: 55, high: 95 },
    items: [
      {
        category: 'lodging',
        label: {
          fi: 'Guesthouse per yö',
          en: 'Guesthouse per night',
          ru: 'Гостевой дом за ночь',
          kk: 'Қонақ үй (бір түн)',
        },
        estimateEUR: 25,
      },
      {
        category: 'food',
        label: {
          fi: 'Ruoka per päivä',
          en: 'Food per day',
          ru: 'Еда за день',
          kk: 'Күндік тамақ',
        },
        estimateEUR: 10,
      },
      {
        category: 'activities',
        label: {
          fi: 'Mausoleumin pääsy',
          en: 'Mausoleum entry',
          ru: 'Вход в мавзолей',
          kk: 'Кесенеге кіру',
        },
        estimateEUR: 2,
      },
    ],
  },
  {
    region: 'aktau',
    label: {
      fi: 'Aktau / Mangystau (4WD-kierros)',
      en: 'Aktau / Mangystau (4WD tour)',
      ru: 'Актау / Мангистау (тур на 4WD)',
      kk: 'Ақтау / Маңғыстау (4WD сапары)',
    },
    perDayEUR: { low: 120, mid: 180, high: 280 },
    items: [
      {
        category: 'transport',
        label: {
          fi: '4WD + kuljettaja per päivä (jaettu autoon)',
          en: '4WD + driver per day (shared in the vehicle)',
          ru: '4WD + водитель за день (на машину)',
          kk: '4WD + жүргізуші (күніне, көлікке бөлінген)',
        },
        estimateEUR: 100,
        note: {
          fi: '2–4 hlö autossa, hinta per hlö laskee jaettuna.',
          en: '2–4 people per vehicle; the per-person price drops when shared.',
          ru: '2–4 человека в машине, цена за человека снижается при разделе.',
          kk: 'Көлікте 2–4 адам, бөліскенде адам басына шығын азаяды.',
        },
      },
      {
        category: 'lodging',
        label: {
          fi: 'Yöpyminen jurtassa / kuljettajan järjestämä',
          en: 'Overnight in a yurt / arranged by the driver',
          ru: 'Ночёвка в юрте / организует водитель',
          kk: 'Киіз үйде түнеу / жүргізуші ұйымдастырады',
        },
        estimateEUR: 30,
      },
      {
        category: 'activities',
        label: {
          fi: 'Mangystau-kierros (3–4 päivää) — pakettihinta',
          en: 'Mangystau tour (3–4 days) — package price',
          ru: 'Тур по Мангистау (3–4 дня) — стоимость пакета',
          kk: 'Маңғыстау сапары (3–4 күн) — пакет бағасы',
        },
        estimateEUR: 400,
      },
    ],
  },
];
