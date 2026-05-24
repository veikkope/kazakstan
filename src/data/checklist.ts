import type { ChecklistItem } from '@/lib/types';

export const beforeTripChecklist: ChecklistItem[] = [
  // Dokumentit
  {
    id: 'passport-validity',
    category: 'documents',
    label: {
      fi: 'Passi voimassa vähintään 6 kk yli paluupäivän',
      en: 'Passport valid for at least 6 months beyond your return date',
      ru: 'Паспорт действителен не менее 6 месяцев после даты возвращения',
      kk: 'Паспорт қайту күнінен кейін кемінде 6 ай жарамды болуы керек',
    },
    daysBeforeTrip: 90,
  },
  {
    id: 'passport-copies',
    category: 'documents',
    label: {
      fi: 'Passin kopiot pilveen ja erilliseen taskuun',
      en: 'Save passport copies to the cloud and a separate pocket',
      ru: 'Копии паспорта в облако и в отдельный карман',
      kk: 'Паспорт көшірмелерін бұлтқа және бөлек қалтаға сақтаңыз',
    },
    daysBeforeTrip: 14,
  },
  {
    id: 'travel-insurance',
    category: 'documents',
    label: {
      fi: 'Matkavakuutus voimassa Kazakstaniin',
      en: 'Travel insurance valid for Kazakhstan',
      ru: 'Туристическая страховка действительна для Казахстана',
      kk: 'Қазақстанға жарамды саяхат сақтандыруы',
    },
    detail: {
      fi: 'Tarkista että kattaa vuoristoaktiviteetit ja Mangystaun off-roadin.',
      en: 'Make sure it covers mountain activities and off-roading in Mangystau.',
      ru: 'Убедитесь, что страховка покрывает горные активности и бездорожье Мангыстау.',
      kk: 'Тауда жасалатын әрекеттер мен Маңғыстаудағы жолсыз жүруді қамтитынын тексеріңіз.',
    },
    daysBeforeTrip: 30,
  },

  // Terveys
  {
    id: 'vaccines',
    category: 'health',
    label: {
      fi: 'Peruskattorokotukset kunnossa (jäykkäkouristus, hepatiitti A)',
      en: 'Basic vaccinations up to date (tetanus, hepatitis A)',
      ru: 'Базовые прививки в порядке (столбняк, гепатит A)',
      kk: 'Негізгі екпелер жасалған (сіреспе, А гепатиті)',
    },
    detail: {
      fi: 'Konsultoi matkailulääkäriä jos käytte Mangystaussa tai syrjäisillä alueilla.',
      en: 'Consult a travel medicine doctor if you plan to visit Mangystau or remote areas.',
      ru: 'Проконсультируйтесь с врачом по туристической медицине, если едете в Мангыстау или отдалённые районы.',
      kk: 'Маңғыстауға немесе шалғай аймақтарға барсаңыз, саяхат дәрігерімен кеңесіңіз.',
    },
    daysBeforeTrip: 60,
  },
  {
    id: 'meds',
    category: 'health',
    label: {
      fi: 'Peruslääkkeet (kipulääke, ripulilääke, antibakteerivoide)',
      en: 'Basic medicines (painkillers, anti-diarrhoea, antibacterial cream)',
      ru: 'Базовые лекарства (обезболивающее, средство от диареи, антибактериальная мазь)',
      kk: 'Негізгі дәрі-дәрмек (ауыруды басатын дәрі, диареяға қарсы дәрі, антибактериалды жақпа)',
    },
    daysBeforeTrip: 7,
  },
  {
    id: 'altitude',
    category: 'health',
    label: {
      fi: 'Korkeanpaikan tutorial — BAO ja Shymbulak ovat yli 2500 m',
      en: 'Brush up on altitude basics — BAO and Shymbulak are above 2500 m',
      ru: 'Подготовка к высоте — БАО и Шымбулак находятся выше 2500 м',
      kk: 'Биіктікке дайындық — БАО және Шымбұлақ 2500 м-ден жоғары',
    },
    daysBeforeTrip: 14,
  },

  // Raha
  {
    id: 'card-foreign-use',
    category: 'money',
    label: {
      fi: 'Pankkikortin ulkomaankäyttö aktivoitu',
      en: 'Activate your bank card for foreign use',
      ru: 'Активирована возможность использования карты за границей',
      kk: 'Банк картаңыздың шетелде қолданылуы іске қосылған',
    },
    detail: {
      fi: 'Tarkista että kortilla on riittävä päiväraja KZT-nostoihin.',
      en: 'Check that the card has a high enough daily limit for KZT withdrawals.',
      ru: 'Проверьте, что у карты достаточный дневной лимит для снятия тенге.',
      kk: 'Картаның теңгемен ақша алуға күндік лимиті жеткілікті екенін тексеріңіз.',
    },
    daysBeforeTrip: 14,
  },
  {
    id: 'backup-card',
    category: 'money',
    label: {
      fi: 'Varakortti (eri pankki) mukana',
      en: 'Bring a backup card (from a different bank)',
      ru: 'Запасная карта (другого банка) с собой',
      kk: 'Қосалқы карта (басқа банктен) өзіңізбен бірге',
    },
    daysBeforeTrip: 7,
  },
  {
    id: 'cash-kzt',
    category: 'money',
    label: {
      fi: 'Pieni KZT-käteismäärä lentokentältä saapuessa',
      en: 'Bring a small amount of KZT cash for when you land',
      ru: 'Небольшая сумма наличных тенге на прилёт',
      kk: 'Әуежайға жеткенде аздаған теңге қолма-қол ақша',
    },
    detail: {
      fi: 'Yandex-taksin alkulasku on usein noin 3000–5000 ₸.',
      en: 'A Yandex taxi from the airport typically costs around 3000–5000 ₸.',
      ru: 'Поездка на Яндекс-такси обычно стоит около 3000–5000 ₸.',
      kk: 'Әуежайдан Yandex таксиі әдетте 3000–5000 ₸ шамасында тұрады.',
    },
    daysBeforeTrip: 1,
  },

  // Tekniikka
  {
    id: 'esim',
    category: 'tech',
    label: {
      fi: 'eSIM Kazakstaniin (Airalo, Holafly tms.)',
      en: 'eSIM for Kazakhstan (Airalo, Holafly, etc.)',
      ru: 'eSIM для Казахстана (Airalo, Holafly и т.п.)',
      kk: 'Қазақстанға арналған eSIM (Airalo, Holafly және т.б.)',
    },
    detail: {
      fi: 'Halvempi ja helpompi kuin paikallisen SIMin osto lentokentällä.',
      en: 'Cheaper and easier than buying a local SIM at the airport.',
      ru: 'Дешевле и проще, чем покупка местной SIM-карты в аэропорту.',
      kk: 'Әуежайдан жергілікті SIM сатып алудан арзан әрі ыңғайлы.',
    },
    daysBeforeTrip: 7,
  },
  {
    id: 'yandex-go',
    category: 'tech',
    label: {
      fi: 'Yandex Go -sovellus asennettu ja maksutapa kytketty',
      en: 'Install Yandex Go and link a payment method',
      ru: 'Установлено приложение Yandex Go и привязан способ оплаты',
      kk: 'Yandex Go қолданбасы орнатылған және төлем әдісі қосылған',
    },
    daysBeforeTrip: 3,
  },
  {
    id: 'offline-maps',
    category: 'tech',
    label: {
      fi: 'Offline-kartat ladattu (Maps.me / Organic Maps)',
      en: 'Download offline maps (Maps.me / Organic Maps)',
      ru: 'Загружены офлайн-карты (Maps.me / Organic Maps)',
      kk: 'Офлайн карталар жүктелген (Maps.me / Organic Maps)',
    },
    detail: {
      fi: 'Tärkeää Mangystaussa ja vuoristossa.',
      en: 'Important in Mangystau and the mountains.',
      ru: 'Важно для Мангыстау и горных районов.',
      kk: 'Маңғыстауда және тауларда маңызды.',
    },
    daysBeforeTrip: 7,
  },
  {
    id: 'translate-offline',
    category: 'tech',
    label: {
      fi: 'Google Translate offline-paketit (kazakki, venäjä)',
      en: 'Download Google Translate offline packs (Kazakh, Russian)',
      ru: 'Офлайн-пакеты Google Translate (казахский, русский)',
      kk: 'Google Translate офлайн пакеттері (қазақ, орыс)',
    },
    daysBeforeTrip: 7,
  },
  {
    id: 'power-adapter',
    category: 'tech',
    label: {
      fi: 'Verkkoadapteri — Kazakstan käyttää C/F-tyypin pistorasioita',
      en: 'Power adapter — Kazakhstan uses Type C/F sockets',
      ru: 'Сетевой адаптер — в Казахстане розетки типа C/F',
      kk: 'Сым адаптері — Қазақстанда C/F түріндегі розеткалар қолданылады',
    },
    detail: {
      fi: 'Sama kuin Suomessa, mutta varmista varmuuden vuoksi.',
      en: 'Same as in Finland, but double-check just in case.',
      ru: 'Такие же, как в Финляндии, но на всякий случай проверьте.',
      kk: 'Финляндиямен бірдей, бірақ сақтық үшін тексеріңіз.',
    },
    daysBeforeTrip: 14,
  },

  // Pakkaus
  {
    id: 'layering',
    category: 'packing',
    label: {
      fi: 'Kerrosvaatetus — vuoristossa voi olla 20 °C kylmempää kuin kaupungissa',
      en: 'Pack layered clothing — the mountains can be 20 °C colder than the city',
      ru: 'Одежда слоями — в горах может быть на 20 °C холоднее, чем в городе',
      kk: 'Қабатты киім — тауларда қаладан 20 °C салқынырақ болуы мүмкін',
    },
    daysBeforeTrip: 14,
  },
  {
    id: 'sun-protection',
    category: 'packing',
    label: {
      fi: 'Aurinkosuoja, päähine ja huulirasva',
      en: 'Sunscreen, a hat and lip balm',
      ru: 'Солнцезащитный крем, головной убор и бальзам для губ',
      kk: 'Күннен қорғайтын крем, бас киім және ерін майы',
    },
    detail: {
      fi: 'UV on korkea aavikolla ja vuorilla.',
      en: 'UV levels are high in the desert and the mountains.',
      ru: 'УФ-индекс высок в пустыне и в горах.',
      kk: 'Шөл мен тауларда УК сәулесі жоғары.',
    },
    daysBeforeTrip: 7,
  },
  {
    id: 'sturdy-shoes',
    category: 'packing',
    label: {
      fi: 'Kunnon kävelykengät (vuoristoreitit ovat kivisiä)',
      en: 'Proper walking shoes (mountain trails are rocky)',
      ru: 'Хорошая обувь для ходьбы (горные тропы каменистые)',
      kk: 'Жақсы жүру аяқ киімі (таулы соқпақтар тасты)',
    },
    daysBeforeTrip: 7,
  },
  {
    id: 'modest-clothes',
    category: 'packing',
    label: {
      fi: 'Pyhäkköihin sopivat peittävät vaatteet',
      en: 'Modest, covering clothes for visiting shrines',
      ru: 'Закрытая одежда для посещения святынь',
      kk: 'Қасиетті орындарға баруға жарамды жабық киім',
    },
    detail: {
      fi: 'Naisilla huivi mausoleumikäynteihin.',
      en: 'Women should bring a headscarf for mausoleum visits.',
      ru: 'Женщинам нужен платок для посещения мавзолеев.',
      kk: 'Әйелдерге кесене аралауға орамал керек.',
    },
    daysBeforeTrip: 7,
  },

  // Logistiikka
  {
    id: 'flights-booked',
    category: 'logistics',
    label: {
      fi: 'Lennot varattu (Helsinki–Almaty edestakaisin)',
      en: 'Flights booked (Helsinki–Almaty return)',
      ru: 'Авиабилеты забронированы (Хельсинки–Алматы туда-обратно)',
      kk: 'Әуе билеттері брондалған (Хельсинки–Алматы екі жаққа)',
    },
    daysBeforeTrip: 90,
  },
  {
    id: 'first-night',
    category: 'logistics',
    label: {
      fi: 'Ensimmäisen yön majoitus varattu',
      en: 'First night accommodation booked',
      ru: 'Жильё на первую ночь забронировано',
      kk: 'Алғашқы түнге қонақ үй брондалған',
    },
    daysBeforeTrip: 30,
  },
  {
    id: 'mangystau-tour',
    category: 'logistics',
    label: {
      fi: 'Mangystau-kierroksen kuljettaja/opas varattu (jos reitillä)',
      en: 'Mangystau tour driver/guide booked (if on your route)',
      ru: 'Водитель/гид для тура по Мангыстау забронирован (если в маршруте)',
      kk: 'Маңғыстау турының жүргізушісі/гиді брондалған (бағытта болса)',
    },
    detail: {
      fi: 'Hyviä kuljettajia on rajallisesti — varaa hyvissä ajoin.',
      en: 'Good drivers are limited — book well in advance.',
      ru: 'Хороших водителей немного — бронируйте заранее.',
      kk: 'Жақсы жүргізушілер шектеулі — алдын ала брондаңыз.',
    },
    daysBeforeTrip: 60,
  },
  {
    id: 'border-permit',
    category: 'logistics',
    label: {
      fi: 'Varmista BAO-pääsy paikalliselta oppaalta (jos reitillä)',
      en: 'Confirm BAO access with a local guide (if on your route)',
      ru: 'Уточните доступ к БАО у местного гида (если в маршруте)',
      kk: 'Жергілікті гидпен БАО-ға кіруді нақтылаңыз (бағытта болса)',
    },
    detail: {
      fi: 'Virallista lupaa ei yleensä enää vaadita itse järvelle, mutta tiellä on sotilastarkastuspisteitä. Passi mukaan, kuljettaja tietää nykytilanteen.',
      en: 'An official permit is usually no longer required for the lake itself, but there are military checkpoints along the road. Bring your passport — the driver will know the current situation.',
      ru: 'Официальное разрешение на само озеро обычно больше не требуется, но на дороге есть военные блокпосты. Берите паспорт — водитель знает текущую ситуацию.',
      kk: 'Көлдің өзіне ресми рұқсат әдетте талап етілмейді, бірақ жолда әскери бақылау пункттері бар. Паспортыңызды алыңыз — жүргізуші ағымдағы жағдайды біледі.',
    },
    daysBeforeTrip: 7,
  },
];
