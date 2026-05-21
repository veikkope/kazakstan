// Hätäkortti reissun aikaista käyttöä varten. Pitää olla offline-saatavissa.
// Tarkista lastVerified-päivä ennen lähtöä.

export interface EmergencyContact {
  label: string;
  value: string;
  /** Tarkennus, esim aukioloajat tai milloin soittaa */
  note?: string;
  /** Ulkoinen linkki lisätietoihin */
  url?: string;
}

export interface EmergencyPhrase {
  fi: string;
  /** Venäjä — käytännössä KZ:ssä laajimmin ymmärretty */
  ru?: string;
  /** Kazakki — virallinen kieli, kunnioitettu valinta */
  kk?: string;
}

export interface AppRecommendation {
  name: string;
  /** Mitä varten — yksi lause */
  use: string;
  /** Vinkki tai varoitus */
  note?: string;
  /** Ehdoton suositus (lihavoidaan UI:ssa) */
  essential?: boolean;
}

/** Hätänumerot — Kazakstanissa yhteinen 112, mutta vanhat 10x-numerot toimivat. */
export const emergencyNumbers: EmergencyContact[] = [
  { label: 'Yleinen hätänumero', value: '112', note: 'Toimii kaikkialla, englanninkielinen palvelu mahdollinen' },
  { label: 'Poliisi', value: '102' },
  { label: 'Ambulanssi', value: '103' },
  { label: 'Palokunta', value: '101' },
];

/** Suomen edustusto Kazakstanissa. Vahvista ennen lähtöä — yhteystiedot voivat muuttua. */
export const embassies: EmergencyContact[] = [
  {
    label: 'Suomen suurlähetystö, Astana',
    value: '+7 7172 24 60 00',
    note: 'Konsulipäivystys virka-ajan ulkopuolella UM:n päivystäjän kautta',
    url: 'https://finlandabroad.fi/web/kaz/etusivu',
  },
  {
    label: 'UM hätäpäivystys (Helsinki)',
    value: '+358 9 1605 5555',
    note: 'Päivystää ympäri vuorokauden — vakavat hätätilanteet',
    url: 'https://um.fi/hatatapaukset-ulkomailla',
  },
];

/** Hätäfraasit. Venäjä on käytännössä riittävä KZ:ssä, mutta kazakki on kohteliaisuus. */
export const emergencyPhrases: EmergencyPhrase[] = [
  { fi: 'Apua!', ru: 'Помогите!', kk: 'Көмектесіңіз!' },
  { fi: 'Soita ambulanssi', ru: 'Вызовите скорую', kk: 'Жедел жәрдем шақырыңыз' },
  { fi: 'Soita poliisi', ru: 'Вызовите полицию', kk: 'Полицияны шақырыңыз' },
  { fi: 'En voi hyvin', ru: 'Мне плохо', kk: 'Мен өзімді жаман сезінемін' },
  { fi: 'Olen eksynyt', ru: 'Я заблудился', kk: 'Мен адасып қалдым' },
  { fi: 'Missä on sairaala?', ru: 'Где больница?', kk: 'Аурухана қайда?' },
  { fi: 'Olen suomalainen', ru: 'Я финн', kk: 'Мен финмін' },
];

/** Hyödylliset arkifraasit. */
export const dailyPhrases: EmergencyPhrase[] = [
  { fi: 'Hei / Päivää', ru: 'Здравствуйте', kk: 'Сәлеметсіз бе' },
  { fi: 'Kiitos', ru: 'Спасибо', kk: 'Рахмет' },
  { fi: 'Anteeksi', ru: 'Извините', kk: 'Кешіріңіз' },
  { fi: 'Kyllä / Ei', ru: 'Да / Нет', kk: 'Иә / Жоқ' },
  { fi: 'Paljonko maksaa?', ru: 'Сколько стоит?', kk: 'Қанша тұрады?' },
  { fi: 'Liian kallis', ru: 'Слишком дорого', kk: 'Тым қымбат' },
  { fi: 'Voinko maksaa kortilla?', ru: 'Можно оплатить картой?', kk: 'Картамен төлеуге бола ма?' },
  { fi: 'Vesi (ilman hiilihappoa)', ru: 'Вода без газа', kk: 'Газсыз су' },
  { fi: 'En syö lihaa', ru: 'Я не ем мясо', kk: 'Мен ет жемеймін' },
  { fi: 'En puhu venäjää', ru: 'Я не говорю по-русски', kk: 'Мен орысша білмеймін' },
];

/** Sovellussuositukset KZ-matkalle. */
export const recommendedApps: AppRecommendation[] = [
  {
    name: 'Yandex Go',
    use: 'Taksi — toimii kaikissa kaupungeissa, hinta näkyy etukäteen',
    note: 'Kortin tallennus etukäteen — paikalliset kuljettajat eivät usein osaa englantia',
    essential: true,
  },
  {
    name: 'inDriver',
    use: 'Taksi — voi tarjota oman hinnan kuljettajalle',
    note: 'Toimii Yandexin rinnalla, joskus halvempi',
  },
  {
    name: '2GIS',
    use: 'Offline-kartta — CIS-maissa selvästi parempi kuin Google Maps',
    note: 'Lataa kaupunki etukäteen — toimii ilman dataa, sisältää bisnekset ja aikataulut',
    essential: true,
  },
  {
    name: 'Organic Maps',
    use: 'Offline-kartta Mangystaun erämaihin — sisältää OSM-polut',
    note: 'Lataa Mangystau- ja Almaty-region offline-paketit ennen lähtöä',
    essential: true,
  },
  {
    name: 'Airalo / Holafly',
    use: 'eSIM Kazakstanille — datayhteys heti laskeutumisen jälkeen',
    note: 'Aktivoi ennen lentoa, ostetaan etukäteen — paikallinen SIM vaatii passirekisteröinnin',
    essential: true,
  },
  {
    name: 'Kaspi',
    use: 'Paikallinen maksusovellus, QR-maksu kaupoissa',
    note: 'Vaatii KZ-puhelinnumeron — useimmiten turisteille ei käytännöllinen',
  },
  {
    name: 'Bilet (railways.kz)',
    use: 'Junalippujen osto — Talgo Almaty↔Astana',
    note: 'Verkkokauppa toimii myös kansainvälisillä korteilla',
  },
  {
    name: 'WhatsApp / Telegram',
    use: 'Yhteydenpito kuljettajiin ja oppaisiin',
    note: 'Mangystaun kuljettajat tavoitettavissa Telegramilla / WhatsAppilla',
    essential: true,
  },
];

/** Milloin tämä tieto on viimeksi tarkistettu. Päivitä ennen lähtöä. */
export const emergencyLastVerified = '2026-05-21';
