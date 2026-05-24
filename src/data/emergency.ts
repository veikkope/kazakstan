// Hätäkortti reissun aikaista käyttöä varten. Pitää olla offline-saatavissa.
// Tarkista lastVerified-päivä ennen lähtöä.

import type { LocalizedString, TranslatableString } from '@/lib/types';

export interface EmergencyContact {
  label: TranslatableString;
  value: string;
  /** Tarkennus, esim aukioloajat tai milloin soittaa */
  note?: TranslatableString;
  /** Ulkoinen linkki lisätietoihin */
  url?: string;
}

/**
 * Hätäfraasi tai arkifraasi — sama lokalisoitu sisältö kuin muilla
 * sisältötyypeillä. `fi` on lähdekieli, `ru` ja `kk` ovat käytännön
 * käännöksiä reissua varten (ru on KZ:ssä laajimmin ymmärretty,
 * kk virallinen kieli). `en` täydentää lokalisaation.
 */
export type EmergencyPhrase = LocalizedString;

export interface AppRecommendation {
  name: TranslatableString;
  /** Mitä varten — yksi lause */
  use: TranslatableString;
  /** Vinkki tai varoitus */
  note?: TranslatableString;
  /** Ehdoton suositus (lihavoidaan UI:ssa) */
  essential?: boolean;
}

/** Hätänumerot — Kazakstanissa yhteinen 112, mutta vanhat 10x-numerot toimivat. */
export const emergencyNumbers: EmergencyContact[] = [
  {
    label: {
      fi: 'Yleinen hätänumero',
      en: 'General emergency number',
      ru: 'Общий номер экстренных служб',
      kk: 'Жалпы төтенше нөмір',
    },
    value: '112',
    note: {
      fi: 'Toimii kaikkialla, englanninkielinen palvelu mahdollinen',
      en: 'Works everywhere, English-language service may be available',
      ru: 'Работает повсеместно, возможно обслуживание на английском',
      kk: 'Барлық жерде жұмыс істейді, ағылшын тілінде қызмет көрсетілуі мүмкін',
    },
  },
  {
    label: {
      fi: 'Poliisi',
      en: 'Police',
      ru: 'Полиция',
      kk: 'Полиция',
    },
    value: '102',
  },
  {
    label: {
      fi: 'Ambulanssi',
      en: 'Ambulance',
      ru: 'Скорая помощь',
      kk: 'Жедел жәрдем',
    },
    value: '103',
  },
  {
    label: {
      fi: 'Palokunta',
      en: 'Fire department',
      ru: 'Пожарная служба',
      kk: 'Өрт сөндіру қызметі',
    },
    value: '101',
  },
];

/** Suomen edustusto Kazakstanissa. Vahvista ennen lähtöä — yhteystiedot voivat muuttua. */
export const embassies: EmergencyContact[] = [
  {
    label: {
      fi: 'Suomen suurlähetystö, Astana',
      en: 'Embassy of Finland, Astana',
      ru: 'Посольство Финляндии, Астана',
      kk: 'Финляндияның Астанадағы елшілігі',
    },
    value: '+7 7172 24 60 00',
    note: {
      fi: 'Konsulipäivystys virka-ajan ulkopuolella UM:n päivystäjän kautta',
      en: 'After-hours consular duty via the Finnish MFA emergency line',
      ru: 'Консульская служба в нерабочее время через дежурного МИД Финляндии',
      kk: 'Жұмыс уақытынан тыс консулдық кезекшілік Финляндия СІМ кезекшісі арқылы',
    },
    url: 'https://finlandabroad.fi/web/kaz/etusivu',
  },
  {
    label: {
      fi: 'UM hätäpäivystys (Helsinki)',
      en: 'Finnish MFA emergency line (Helsinki)',
      ru: 'Экстренная линия МИД Финляндии (Хельсинки)',
      kk: 'Финляндия СІМ төтенше желісі (Хельсинки)',
    },
    value: '+358 9 1605 5555',
    note: {
      fi: 'Päivystää ympäri vuorokauden — vakavat hätätilanteet',
      en: 'Available 24/7 — for serious emergencies',
      ru: 'Работает круглосуточно — для серьёзных чрезвычайных ситуаций',
      kk: 'Тәулік бойы жұмыс істейді — ауыр төтенше жағдайлар үшін',
    },
    url: 'https://um.fi/hatatapaukset-ulkomailla',
  },
];

/** Hätäfraasit. Venäjä on käytännössä riittävä KZ:ssä, mutta kazakki on kohteliaisuus. */
export const emergencyPhrases: EmergencyPhrase[] = [
  { fi: 'Apua!', en: 'Help!', ru: 'Помогите!', kk: 'Көмектесіңіз!' },
  {
    fi: 'Soita ambulanssi',
    en: 'Call an ambulance',
    ru: 'Вызовите скорую',
    kk: 'Жедел жәрдем шақырыңыз',
  },
  {
    fi: 'Soita poliisi',
    en: 'Call the police',
    ru: 'Вызовите полицию',
    kk: 'Полицияны шақырыңыз',
  },
  {
    fi: 'En voi hyvin',
    en: 'I don’t feel well',
    ru: 'Мне плохо',
    kk: 'Өзімді нашар сезініп тұрмын',
  },
  {
    fi: 'Olen eksynyt',
    en: 'I am lost',
    ru: 'Я заблудился',
    kk: 'Мен адасып қалдым',
  },
  {
    fi: 'Missä on sairaala?',
    en: 'Where is the hospital?',
    ru: 'Где больница?',
    kk: 'Аурухана қайда?',
  },
  {
    fi: 'Olen suomalainen',
    en: 'I am Finnish',
    ru: 'Я финн',
    kk: 'Мен финмін',
  },
];

/** Hyödylliset arkifraasit. */
export const dailyPhrases: EmergencyPhrase[] = [
  {
    fi: 'Hei / Päivää',
    en: 'Hi / Hello',
    ru: 'Здравствуйте',
    kk: 'Сәлеметсіз бе',
  },
  { fi: 'Kiitos', en: 'Thank you', ru: 'Спасибо', kk: 'Рахмет' },
  { fi: 'Anteeksi', en: 'Excuse me / Sorry', ru: 'Извините', kk: 'Кешіріңіз' },
  { fi: 'Kyllä / Ei', en: 'Yes / No', ru: 'Да / Нет', kk: 'Иә / Жоқ' },
  {
    fi: 'Paljonko maksaa?',
    en: 'How much does it cost?',
    ru: 'Сколько стоит?',
    kk: 'Қанша тұрады?',
  },
  {
    fi: 'Liian kallis',
    en: 'Too expensive',
    ru: 'Слишком дорого',
    kk: 'Тым қымбат',
  },
  {
    fi: 'Voinko maksaa kortilla?',
    en: 'Can I pay by card?',
    ru: 'Можно оплатить картой?',
    kk: 'Картамен төлеуге бола ма?',
  },
  {
    fi: 'Vesi (ilman hiilihappoa)',
    en: 'Water (still, no gas)',
    ru: 'Вода без газа',
    kk: 'Газсыз су',
  },
  {
    fi: 'En syö lihaa',
    en: 'I don’t eat meat',
    ru: 'Я не ем мясо',
    kk: 'Мен ет жемеймін',
  },
  {
    fi: 'En puhu venäjää',
    en: 'I don’t speak Russian',
    ru: 'Я не говорю по-русски',
    kk: 'Мен орысша білмеймін',
  },
];

/** Sovellussuositukset KZ-matkalle. */
export const recommendedApps: AppRecommendation[] = [
  {
    name: { fi: 'Yandex Go', en: 'Yandex Go', ru: 'Yandex Go', kk: 'Yandex Go' },
    use: {
      fi: 'Taksi — toimii kaikissa kaupungeissa, hinta näkyy etukäteen',
      en: 'Taxi — works in every city, fare shown upfront',
      ru: 'Такси — работает во всех городах, цена видна заранее',
      kk: 'Такси — барлық қалаларда жұмыс істейді, бағасы алдын ала көрінеді',
    },
    note: {
      fi: 'Kortin tallennus etukäteen — paikalliset kuljettajat eivät usein osaa englantia',
      en: 'Save your card in advance — local drivers rarely speak English',
      ru: 'Сохраните карту заранее — местные водители часто не говорят по-английски',
      kk: 'Картаны алдын ала сақтаңыз — жергілікті жүргізушілер көбіне ағылшынша білмейді',
    },
    essential: true,
  },
  {
    name: { fi: 'inDriver', en: 'inDriver', ru: 'inDriver', kk: 'inDriver' },
    use: {
      fi: 'Taksi — voi tarjota oman hinnan kuljettajalle',
      en: 'Taxi — you can offer your own price to the driver',
      ru: 'Такси — можно предложить свою цену водителю',
      kk: 'Такси — жүргізушіге өз бағаңызды ұсынуға болады',
    },
    note: {
      fi: 'Toimii Yandexin rinnalla, joskus halvempi',
      en: 'Works alongside Yandex, sometimes cheaper',
      ru: 'Работает наряду с Яндексом, иногда дешевле',
      kk: 'Yandex-пен қатар жұмыс істейді, кейде арзанырақ',
    },
  },
  {
    name: { fi: '2GIS', en: '2GIS', ru: '2GIS', kk: '2GIS' },
    use: {
      fi: 'Offline-kartta — CIS-maissa selvästi parempi kuin Google Maps',
      en: 'Offline map — clearly better than Google Maps in CIS countries',
      ru: 'Офлайн-карта — в странах СНГ заметно лучше Google Maps',
      kk: 'Офлайн карта — ТМД елдерінде Google Maps-тан айтарлықтай жақсы',
    },
    note: {
      fi: 'Lataa kaupunki etukäteen — toimii ilman dataa, sisältää bisnekset ja aikataulut',
      en: 'Download the city in advance — works offline, includes businesses and timetables',
      ru: 'Загрузите город заранее — работает без интернета, включает заведения и расписания',
      kk: 'Қаланы алдын ала жүктеп алыңыз — интернетсіз жұмыс істейді, мекемелер мен кестелер бар',
    },
    essential: true,
  },
  {
    name: {
      fi: 'Organic Maps',
      en: 'Organic Maps',
      ru: 'Organic Maps',
      kk: 'Organic Maps',
    },
    use: {
      fi: 'Offline-kartta Mangystaun erämaihin — sisältää OSM-polut',
      en: 'Offline map for the Mangystau wilderness — includes OSM trails',
      ru: 'Офлайн-карта для пустынь Мангыстау — включает тропы OSM',
      kk: 'Маңғыстау шөлдеріне арналған офлайн карта — OSM соқпақтары бар',
    },
    note: {
      fi: 'Lataa Mangystau- ja Almaty-region offline-paketit ennen lähtöä',
      en: 'Download the Mangystau and Almaty region offline packs before leaving',
      ru: 'Скачайте офлайн-пакеты Мангыстау и Алматинской области перед поездкой',
      kk: 'Жол жүрер алдында Маңғыстау мен Алматы облысының офлайн пакеттерін жүктеп алыңыз',
    },
    essential: true,
  },
  {
    name: {
      fi: 'Airalo / Holafly',
      en: 'Airalo / Holafly',
      ru: 'Airalo / Holafly',
      kk: 'Airalo / Holafly',
    },
    use: {
      fi: 'eSIM Kazakstanille — datayhteys heti laskeutumisen jälkeen',
      en: 'eSIM for Kazakhstan — data connection right after landing',
      ru: 'eSIM для Казахстана — мобильный интернет сразу после прилёта',
      kk: 'Қазақстанға арналған eSIM — қонғаннан кейін бірден интернет',
    },
    note: {
      fi: 'Aktivoi ennen lentoa, ostetaan etukäteen — paikallinen SIM vaatii passirekisteröinnin',
      en: 'Activate before the flight and buy in advance — a local SIM requires passport registration',
      ru: 'Активируйте до вылета и покупайте заранее — местная SIM требует регистрации паспорта',
      kk: 'Ұшу алдында белсендіріп, алдын ала сатып алыңыз — жергілікті SIM паспортты тіркеуді қажет етеді',
    },
    essential: true,
  },
  {
    name: { fi: 'Kaspi', en: 'Kaspi', ru: 'Kaspi', kk: 'Kaspi' },
    use: {
      fi: 'Paikallinen maksusovellus, QR-maksu kaupoissa',
      en: 'Local payment app, QR payments in shops',
      ru: 'Местное платёжное приложение, QR-оплата в магазинах',
      kk: 'Жергілікті төлем қосымшасы, дүкендерде QR арқылы төлем',
    },
    note: {
      fi: 'Vaatii KZ-puhelinnumeron — useimmiten turisteille ei käytännöllinen',
      en: 'Requires a KZ phone number — usually not practical for tourists',
      ru: 'Требует казахстанский номер телефона — обычно непрактично для туристов',
      kk: 'Қазақстандық телефон нөмірін қажет етеді — туристерге әдетте қолайсыз',
    },
  },
  {
    name: {
      fi: 'Bilet (railways.kz)',
      en: 'Bilet (railways.kz)',
      ru: 'Bilet (railways.kz)',
      kk: 'Bilet (railways.kz)',
    },
    use: {
      fi: 'Junalippujen osto — Talgo Almaty↔Astana',
      en: 'Train tickets — Talgo Almaty↔Astana',
      ru: 'Покупка билетов на поезд — Talgo Алматы↔Астана',
      kk: 'Пойыз билеттерін сатып алу — Talgo Алматы↔Астана',
    },
    note: {
      fi: 'Verkkokauppa toimii myös kansainvälisillä korteilla',
      en: 'The web store accepts international cards too',
      ru: 'Онлайн-магазин принимает и международные карты',
      kk: 'Онлайн-дүкен халықаралық карталарды да қабылдайды',
    },
  },
  {
    name: {
      fi: 'WhatsApp / Telegram',
      en: 'WhatsApp / Telegram',
      ru: 'WhatsApp / Telegram',
      kk: 'WhatsApp / Telegram',
    },
    use: {
      fi: 'Yhteydenpito kuljettajiin ja oppaisiin',
      en: 'Communication with drivers and guides',
      ru: 'Связь с водителями и гидами',
      kk: 'Жүргізушілер мен гидтермен байланыс',
    },
    note: {
      fi: 'Mangystaun kuljettajat tavoitettavissa Telegramilla / WhatsAppilla',
      en: 'Mangystau drivers can be reached via Telegram / WhatsApp',
      ru: 'Водителей в Мангыстау можно найти через Telegram / WhatsApp',
      kk: 'Маңғыстаудағы жүргізушілермен Telegram / WhatsApp арқылы хабарласуға болады',
    },
    essential: true,
  },
];

/** Milloin tämä tieto on viimeksi tarkistettu. Päivitä ennen lähtöä. */
export const emergencyLastVerified = '2026-05-21';
