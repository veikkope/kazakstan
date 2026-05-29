import type { TranslatableString, VisaInfo } from '@/lib/types';

export const visaInfo: VisaInfo = {
  countryOfCitizen: {
    fi: 'Suomi',
    en: 'Finland',
    ru: 'Финляндия',
    kk: 'Финляндия',
  },
  visaFree: true,
  visaFreeDays: 30,
  notes: {
    fi: 'Suomen kansalaiset voivat matkustaa Kazakstaniin viisumivapaasti enintään 30 päiväksi. Passin tulee olla voimassa vähintään 6 kk yli paluupäivän. Tarkista aina tilanne ennen lähtöä — säännöt voivat muuttua.',
    en: 'Finnish citizens can travel to Kazakhstan visa-free for up to 30 days. Your passport must be valid for at least 6 months beyond your return date. Always check the current situation before departure — rules can change.',
    ru: 'Граждане Финляндии могут въезжать в Казахстан без визы на срок до 30 дней. Паспорт должен быть действителен не менее 6 месяцев после даты возвращения. Всегда проверяйте актуальную ситуацию перед поездкой — правила могут меняться.',
    kk: 'Финляндия азаматтары Қазақстанға визасыз 30 күнге дейін бара алады. Паспорт қайту күнінен кейін кемінде 6 ай жарамды болуы керек. Жолға шықпас бұрын ағымдағы жағдайды әрқашан тексеріңіз — ережелер өзгеруі мүмкін.',
  },
  lastVerified: '2026-05-21',
  sourceUrl: 'https://um.fi/matkustustiedotteet/-/c/KZ',
};

interface LanguagePhrase {
  fi: TranslatableString;
  kk: string;
  ru: string;
  audioUrls?: { kk?: string; ru?: string };
}

interface PhraseGroup {
  label: TranslatableString;
  phrases: LanguagePhrase[];
  playAll?: boolean;
}

interface LanguageBasics {
  groups: PhraseGroup[];
  notes: TranslatableString;
  alphabet: TranslatableString;
}

export const languageBasics: LanguageBasics = {
  groups: [
    {
      label: { fi: 'Perusteet', en: 'Basics', ru: 'Основное', kk: 'Негіздер' },
      phrases: [
        {
          fi: { fi: 'Hei', en: 'Hello', ru: 'Привет', kk: 'Сәлем' },
          kk: 'Сәлем (Sälem)',
          ru: 'Привет (Privet)',
          audioUrls: { kk: '/audio/phrases/kk-0.mp3', ru: '/audio/phrases/ru-0.mp3' },
        },
        {
          fi: { fi: 'Kiitos', en: 'Thank you', ru: 'Спасибо', kk: 'Рахмет' },
          kk: 'Рахмет (Rakhmet)',
          ru: 'Спасибо (Spasibo)',
          audioUrls: { kk: '/audio/phrases/kk-1.mp3', ru: '/audio/phrases/ru-1.mp3' },
        },
        {
          fi: { fi: 'Anteeksi', en: 'Excuse me', ru: 'Извините', kk: 'Кешіріңіз' },
          kk: 'Кешіріңіз (Keshiriñiz)',
          ru: 'Извините (Izvinite)',
          audioUrls: { kk: '/audio/phrases/kk-2.mp3', ru: '/audio/phrases/ru-2.mp3' },
        },
        {
          fi: { fi: 'Kyllä / Ei', en: 'Yes / No', ru: 'Да / Нет', kk: 'Иә / Жоқ' },
          kk: 'Иә / Жоқ (İä / Jok)',
          ru: 'Да / Нет (Da / Net)',
          audioUrls: { kk: '/audio/phrases/kk-3.mp3', ru: '/audio/phrases/ru-3.mp3' },
        },
        {
          fi: { fi: 'Apua!', en: 'Help!', ru: 'Помогите!', kk: 'Көмек!' },
          kk: 'Көмек! (Kömek!)',
          ru: 'Помогите! (Pomogite!)',
          audioUrls: { kk: '/audio/phrases/kk-5.mp3', ru: '/audio/phrases/ru-5.mp3' },
        },
      ],
    },
    {
      label: { fi: 'Viestintä', en: 'Communication', ru: 'Общение', kk: 'Байланыс' },
      phrases: [
        {
          fi: { fi: 'En ymmärrä', en: "I don't understand", ru: 'Не понимаю', kk: 'Түсінбеймін' },
          kk: 'Түсінбеймін (Tüsinbeymin)',
          ru: 'Не понимаю (Ne ponimayu)',
          audioUrls: { kk: '/audio/phrases/kk-11.mp3', ru: '/audio/phrases/ru-11.mp3' },
        },
        {
          fi: {
            fi: 'Puhutteko englantia?',
            en: 'Do you speak English?',
            ru: 'Вы говорите по-английски?',
            kk: 'Ағылшынша сөйлейсіз бе?',
          },
          kk: 'Ағылшынша сөйлейсіз бе? (Aghylshinsha söyleyiz be?)',
          ru: 'Вы говорите по-английски? (Vy govorite po-angliyski?)',
          audioUrls: { kk: '/audio/phrases/kk-13.mp3', ru: '/audio/phrases/ru-13.mp3' },
        },
        {
          fi: {
            fi: 'En puhu venäjää.',
            en: "I don't speak Russian.",
            ru: 'Я не говорю по-русски.',
            kk: 'Мен орысша сөйлемеймін.',
          },
          kk: 'Мен орысша сөйлемеймін. (Men oryssha söylemeymin.)',
          ru: 'Я не говорю по-русски. (Ya ne govoryu po-russki.)',
          audioUrls: { kk: '/audio/phrases/kk-14.mp3', ru: '/audio/phrases/ru-14.mp3' },
        },
        {
          fi: {
            fi: 'En puhu kazakkia.',
            en: "I don't speak Kazakh.",
            ru: 'Я не говорю по-казахски.',
            kk: 'Мен қазақша сөйлемеймін.',
          },
          kk: 'Мен қазақша сөйлемеймін. (Men qazaqsha söylemeymin.)',
          ru: 'Я не говорю по-казахски. (Ya ne govoryu po-kazakhski.)',
          audioUrls: { kk: '/audio/phrases/kk-15.mp3', ru: '/audio/phrases/ru-15.mp3' },
        },
      ],
    },
    {
      label: { fi: 'Navigointi', en: 'Navigation', ru: 'Навигация', kk: 'Бағдарлау' },
      phrases: [
        {
          fi: { fi: 'Missä on...?', en: 'Where is...?', ru: 'Где...?', kk: 'Қайда...?' },
          kk: 'Қайда...? (Kayda...?)',
          ru: 'Где...? (Gde...?)',
          audioUrls: { kk: '/audio/phrases/kk-6.mp3', ru: '/audio/phrases/ru-6.mp3' },
        },
        {
          fi: {
            fi: 'Vasen / Oikea / Suoraan',
            en: 'Left / Right / Straight',
            ru: 'Налево / Направо / Прямо',
            kk: 'Сол / Оң / Тура',
          },
          kk: 'Сол / Оң / Тура (Sol / Oñ / Tura)',
          ru: 'Налево / Направо / Прямо (Nalevo / Napravo / Pryamo)',
          audioUrls: { kk: '/audio/phrases/kk-7.mp3', ru: '/audio/phrases/ru-7.mp3' },
        },
        {
          fi: { fi: 'Missä on WC?', en: 'Where is the toilet?', ru: 'Где туалет?', kk: 'Дәретхана қайда?' },
          kk: 'Дәретхана қайда? (Däretkhana kayda?)',
          ru: 'Где туалет? (Gde tualet?)',
          audioUrls: { kk: '/audio/phrases/kk-16.mp3', ru: '/audio/phrases/ru-16.mp3' },
        },
        {
          fi: { fi: 'Tarvitsen taksin.', en: 'I need a taxi.', ru: 'Мне нужно такси.', kk: 'Маған такси керек.' },
          kk: 'Маған такси керек. (Maghan taksi kerek.)',
          ru: 'Мне нужно такси. (Mne nuzhno taksi.)',
          audioUrls: { kk: '/audio/phrases/kk-18.mp3', ru: '/audio/phrases/ru-18.mp3' },
        },
      ],
    },
    {
      label: { fi: 'Ruoka & juoma', en: 'Food & drink', ru: 'Еда и напитки', kk: 'Тамақ пен сусын' },
      phrases: [
        {
          fi: { fi: 'Vettä, kiitos', en: 'Water, please', ru: 'Воды, пожалуйста', kk: 'Су беріңіз' },
          kk: 'Су беріңіз (Su beríngiz)',
          ru: 'Воды, пожалуйста (Vody, pozhaluysta)',
          audioUrls: { kk: '/audio/phrases/kk-8.mp3', ru: '/audio/phrases/ru-8.mp3' },
        },
        {
          fi: { fi: 'Lasku, kiitos', en: 'Bill, please', ru: 'Счёт, пожалуйста', kk: 'Есеп беріңіз' },
          kk: 'Есеп беріңіз (Esep beríngiz)',
          ru: 'Счёт, пожалуйста (Shchyot, pozhaluysta)',
          audioUrls: { kk: '/audio/phrases/kk-9.mp3', ru: '/audio/phrases/ru-9.mp3' },
        },
        {
          fi: { fi: 'Herkullista!', en: 'Delicious!', ru: 'Вкусно!', kk: 'Дәмді!' },
          kk: 'Дәмді! (Dämdi!)',
          ru: 'Вкусно! (Vkusno!)',
          audioUrls: { kk: '/audio/phrases/kk-10.mp3', ru: '/audio/phrases/ru-10.mp3' },
        },
      ],
    },
    {
      label: { fi: 'Ostokset & maksu', en: 'Shopping & payment', ru: 'Покупки и оплата', kk: 'Сатып алу және төлем' },
      phrases: [
        {
          fi: { fi: 'Paljonko maksaa?', en: 'How much does it cost?', ru: 'Сколько стоит?', kk: 'Қанша тұрады?' },
          kk: 'Қанша тұрады? (Qansha turady?)',
          ru: 'Сколько стоит? (Skolko stoit?)',
          audioUrls: { kk: '/audio/phrases/kk-4.mp3', ru: '/audio/phrases/ru-4.mp3' },
        },
        {
          fi: { fi: 'Liian kallis', en: 'Too expensive', ru: 'Дорого', kk: 'Қымбат' },
          kk: 'Қымбат (Qymbat)',
          ru: 'Дорого (Dorogo)',
          audioUrls: { kk: '/audio/phrases/kk-12.mp3', ru: '/audio/phrases/ru-12.mp3' },
        },
        {
          fi: { fi: 'Voiko maksaa kortilla?', en: 'Can I pay by card?', ru: 'Можно оплатить картой?', kk: 'Картамен төлей аламын ба?' },
          kk: 'Картамен төлей аламын ба? (Kartamen töley alamyn ba?)',
          ru: 'Можно оплатить картой? (Mozhno oplatit kartoy?)',
          audioUrls: { kk: '/audio/phrases/kk-17.mp3', ru: '/audio/phrases/ru-17.mp3' },
        },
        {
          fi: { fi: 'Voiko maksaa käteisellä?', en: 'Can I pay in cash?', ru: 'Можно оплатить наличными?', kk: 'Қолма-қол ақшамен төлей аламын ба?' },
          kk: 'Қолма-қол ақшамен төлей аламын ба? (Qolma-qol aqshamen töley alamyn ba?)',
          ru: 'Можно оплатить наличными? (Mozhno oplatit nalichnymi?)',
          audioUrls: { kk: '/audio/phrases/kk-19.mp3', ru: '/audio/phrases/ru-19.mp3' },
        },
      ],
    },
    {
      label: {
        fi: 'Ruokarajoitukset',
        en: 'Dietary restrictions',
        ru: 'Пищевые ограничения',
        kk: 'Тағамдық шектеулер',
      },
      playAll: true,
      phrases: [
        {
          fi: { fi: 'Olen allerginen', en: 'I am allergic', ru: 'У меня аллергия', kk: 'Менің аллергиям бар' },
          kk: 'Менің аллергиям бар (Mening allergiyam bar)',
          ru: 'У меня аллергия (U menya allergiya)',
          audioUrls: { kk: '/audio/phrases/kk-25.mp3', ru: '/audio/phrases/ru-25.mp3' },
        },
        {
          fi: { fi: 'Gluteeniton', en: 'Gluten-free', ru: 'Без глютена', kk: 'Глютенсіз' },
          kk: 'Глютенсіз (Glyutensiz)',
          ru: 'Без глютена (Bez glyutena)',
          audioUrls: { kk: '/audio/phrases/kk-20.mp3', ru: '/audio/phrases/ru-20.mp3' },
        },
        {
          fi: { fi: 'Kalaton', en: 'No fish', ru: 'Без рыбы', kk: 'Балықсыз' },
          kk: 'Балықсыз (Balyqsyz)',
          ru: 'Без рыбы (Bez ryby)',
          audioUrls: { kk: '/audio/phrases/kk-21.mp3', ru: '/audio/phrases/ru-21.mp3' },
        },
        {
          fi: { fi: 'Ei viljaa', en: 'No grains', ru: 'Без зерна', kk: 'Дән жоқ' },
          kk: 'Дән жоқ (Dän joq)',
          ru: 'Без зерна (Bez zerna)',
          audioUrls: { kk: '/audio/phrases/kk-22.mp3', ru: '/audio/phrases/ru-22.mp3' },
        },
        {
          fi: { fi: 'Ei jauhoa', en: 'No flour', ru: 'Без муки', kk: 'Ұн жоқ' },
          kk: 'Ұн жоқ (Un joq)',
          ru: 'Без муки (Bez muki)',
          audioUrls: { kk: '/audio/phrases/kk-23.mp3', ru: '/audio/phrases/ru-23.mp3' },
        },
        {
          fi: { fi: 'Ei leipää', en: 'No bread', ru: 'Без хлеба', kk: 'Нан жоқ' },
          kk: 'Нан жоқ (Nan joq)',
          ru: 'Без хлеба (Bez khleba)',
          audioUrls: { kk: '/audio/phrases/kk-24.mp3', ru: '/audio/phrases/ru-24.mp3' },
        },
      ],
    },
  ],
  notes: {
    fi: 'Venäjä on edelleen laajalti puhuttu, etenkin kaupungeissa. Kazakki vahvistuu kouluissa ja virallisessa käytössä. Englantia osataan rajoitetusti — käännösappi (Google Translate offline-paketilla) on hyödyllinen.',
    en: 'Russian is still widely spoken, especially in cities. Kazakh is gaining ground in schools and official use. English is understood only to a limited extent — a translation app (Google Translate with the offline pack) is useful.',
    ru: 'Русский язык по-прежнему широко распространён, особенно в городах. Казахский укрепляется в школах и официальном использовании. Английский знают ограниченно — приложение-переводчик (Google Translate с офлайн-пакетом) будет полезным.',
    kk: 'Орыс тілі әлі де кең қолданылады, әсіресе қалаларда. Қазақ тілі мектептерде және ресми қолданыста күшейіп келеді. Ағылшын тілін шектеулі білетіндер бар — аударма қосымшасы (Google Translate офлайн топтамасымен) пайдалы болады.',
  },
  alphabet: {
    fi: 'Kazakki kirjoitetaan kyrillisillä aakkosilla (siirtyminen latinaan suunniteltu mutta hidasta). Opettele tunnistamaan ainakin metroasemat ja katukyltit.',
    en: 'Kazakh is written in Cyrillic (a transition to Latin is planned but slow). Learn to recognise at least metro stations and street signs.',
    ru: 'Казахский язык пишется кириллицей (переход на латиницу запланирован, но идёт медленно). Научитесь распознавать хотя бы названия станций метро и уличные таблички.',
    kk: 'Қазақ тілі кирилл әліпбиімен жазылады (латынға көшу жоспарланған, бірақ баяу жүруде). Кем дегенде метро станциялары мен көше тақтайшаларын тани білуді үйреніңіз.',
  },
};

export const safetyNotes: TranslatableString[] = [
  {
    fi: 'Kazakstan on yleisesti rauhallinen matkakohde. Yleisin riski on pikkurikollisuus tungoksessa — pidä lompakko etutaskussa.',
    en: 'Kazakhstan is generally a calm destination. The most common risk is petty crime in crowds — keep your wallet in a front pocket.',
    ru: 'Казахстан в целом спокойное туристическое направление. Самый распространённый риск — мелкие кражи в толпе, держите кошелёк в переднем кармане.',
    kk: 'Қазақстан жалпы алғанда тыныш бағыт. Ең кең таралған тәуекел — қалың топта ұсақ ұрлық, әмияныңызды алдыңғы қалтада ұстаңыз.',
  },
  {
    fi: 'Iso Almatyn järvi (BAO) sijaitsee rajavyöhykkeellä — virallista permittiä ei nykyään yleensä vaadita itse järvelle, mutta tiellä on sotilastarkastuspisteitä. Pidä passi mukana ja varmista paikalliselta oppaalta nykytilanne ennen retkeä.',
    en: 'Big Almaty Lake (BAO) lies in the border zone — an official permit is no longer usually required for the lake itself, but there are military checkpoints on the road. Carry your passport and verify the current situation with a local guide before the trip.',
    ru: 'Большое Алматинское озеро (БАО) находится в пограничной зоне — официальное разрешение на сам водоём сейчас обычно не требуется, но на дороге есть военные блокпосты. Берите с собой паспорт и уточняйте актуальную ситуацию у местного гида перед поездкой.',
    kk: 'Үлкен Алматы көлі (БАК) шекара аймағында орналасқан — қазір көлдің өзіне ресми рұқсат әдетте талап етілмейді, бірақ жолда әскери бақылау пункттері бар. Паспортыңызды ала жүріңіз және сапарға шықпас бұрын ағымдағы жағдайды жергілікті гидпен тексеріп алыңыз.',
  },
  {
    fi: 'Liikenne kaupungissa on vilkasta — käytä Yandex Go -taksiappia hinnoitelluille matkoille.',
    en: 'City traffic is busy — use the Yandex Go taxi app for trips with a set price.',
    ru: 'Движение в городе оживлённое — пользуйтесь приложением такси Yandex Go для поездок с фиксированной ценой.',
    kk: 'Қаладағы көлік қозғалысы қарбалас — белгіленген бағамен жүру үшін Yandex Go такси қосымшасын пайдаланыңыз.',
  },
  {
    fi: 'Käteistä (KZT) kannattaa pitää mukana maaseudulla; kortit toimivat kaupungeissa hyvin.',
    en: 'Keep some cash (KZT) on you in rural areas; cards work well in cities.',
    ru: 'В сельской местности стоит иметь при себе наличные (KZT); в городах карты работают хорошо.',
    kk: 'Ауылдық жерлерде қолма-қол ақша (KZT) ұстаған жөн; қалаларда карталар жақсы жұмыс істейді.',
  },
  {
    fi: 'Mangystaussa ja muilla syrjäisillä alueilla älkää lähtekö ilman kokenutta kuljettajaa ja 4WD-autoa — eksyminen on todellinen riski.',
    en: 'In Mangystau and other remote areas, do not set out without an experienced driver and a 4WD vehicle — getting lost is a real risk.',
    ru: 'В Мангистау и других отдалённых районах не отправляйтесь в путь без опытного водителя и автомобиля с полным приводом — заблудиться там вполне реально.',
    kk: 'Маңғыстауда және басқа шалғай аймақтарда тәжірибелі жүргізушісіз және 4WD көліксіз жолға шықпаңыз — адасу қаупі шынайы.',
  },
  {
    fi: 'Naispuolisille matkailijoille: kaupungit ovat turvallisia, mutta peittävä pukeutuminen pyhäkköihin on tarpeen.',
    en: 'For female travellers: cities are safe, but modest, covering clothing is required at religious sites.',
    ru: 'Для путешественниц: города безопасны, но для посещения святых мест необходима закрытая одежда.',
    kk: 'Әйел саяхатшылар үшін: қалалар қауіпсіз, бірақ қасиетті орындарға баруға жабық киім қажет.',
  },
];

interface TransportSection {
  title: TranslatableString;
  body: TranslatableString;
}

interface TransportSections {
  flights: TransportSection;
  trains: TransportSection;
  cars: TransportSection;
  local: TransportSection;
}

export const transportSections: TransportSections = {
  flights: {
    title: {
      fi: 'Lennot kaupunkien välillä',
      en: 'Flights between cities',
      ru: 'Перелёты между городами',
      kk: 'Қалалар арасындағы рейстер',
    },
    body: {
      fi: 'Kotimaan lentoja operoivat Air Astana ja FlyArystan. Almaty↔Astana on ~1,5 h, Almaty↔Aktau ~3 h. Liput ovat halvempia ostettuna suoraan yhtiöiltä kuin metasivuilta. FlyArystan on halpalentoyhtiö, Air Astana laajempi verkko.',
      en: 'Domestic flights are operated by Air Astana and FlyArystan. Almaty↔Astana is about 1.5 h, Almaty↔Aktau about 3 h. Tickets are cheaper bought directly from the airlines than through meta-search sites. FlyArystan is a low-cost carrier, Air Astana has a wider network.',
      ru: 'Внутренние рейсы выполняют Air Astana и FlyArystan. Алматы↔Астана — около 1,5 ч, Алматы↔Актау — около 3 ч. Билеты дешевле покупать напрямую у авиакомпаний, чем через метапоисковики. FlyArystan — лоукостер, у Air Astana более широкая сеть.',
      kk: 'Ішкі рейстерді Air Astana және FlyArystan компаниялары орындайды. Алматы↔Астана — шамамен 1,5 сағат, Алматы↔Ақтау — шамамен 3 сағат. Билеттерді мета-іздеу сайттарының орнына авиакомпаниялардан тікелей сатып алу арзанырақ. FlyArystan — арзан тасымалдаушы, Air Astana желісі кеңірек.',
    },
  },
  trains: {
    title: {
      fi: 'Junat — Talgo ja yöjunat',
      en: 'Trains — Talgo and night trains',
      ru: 'Поезда — Talgo и ночные',
      kk: 'Пойыздар — Talgo және түнгі пойыздар',
    },
    body: {
      fi: 'Talgo-pikajunat yhdistävät pääkaupungit. Almaty↔Turkistan on yöjunalla ~13 h ja se on tunnelmallinen, halpa tapa siirtyä etelään. Liput osoitteessa railways.kz tai Bilet.railways.kz. Lähivaunut ovat halvimmat, kupé (4 hengen hytti) miellyttävämpi.',
      en: 'Talgo express trains connect the major cities. Almaty↔Turkistan takes about 13 h by night train and is an atmospheric, cheap way to head south. Tickets at railways.kz or Bilet.railways.kz. Platzkart open carriages are the cheapest, kupé (4-berth compartment) more comfortable.',
      ru: 'Скоростные поезда Talgo связывают крупные города. Алматы↔Туркестан ночным поездом — около 13 ч, это атмосферный и недорогой способ добраться на юг. Билеты на railways.kz или Bilet.railways.kz. Плацкарт самый дешёвый, купе (на 4 человек) комфортнее.',
      kk: 'Talgo жылдам пойыздары ірі қалаларды байланыстырады. Алматы↔Түркістан түнгі пойызбен шамамен 13 сағат — оңтүстікке баруға атмосфералы әрі арзан жол. Билеттер railways.kz немесе Bilet.railways.kz сайтында. Плацкарт ең арзан, купе (4 орындық) ыңғайлырақ.',
    },
  },
  cars: {
    title: {
      fi: 'Vuokra-auto ja kuljettaja',
      en: 'Rental car and driver',
      ru: 'Аренда автомобиля и водитель',
      kk: 'Автокөлік жалдау және жүргізуші',
    },
    body: {
      fi: 'Mangystaussa ja Altyn-Emelissä tarvitaan yleensä 4WD ja paikallinen opas — älkää lähtekö itse syrjäalueille. Almatyn ympäristössä tavallinen auto riittää, mutta kuljettajan palkkaaminen (n. 60–100 € / päivä) on usein järkevää koska kyltit ovat kyrillisin aakkosin ja liikennekulttuuri on omanlaisensa.',
      en: 'In Mangystau and Altyn-Emel you usually need a 4WD and a local guide — do not head into remote areas on your own. Around Almaty an ordinary car is enough, but hiring a driver (about €60–100 / day) is often sensible because signs are in Cyrillic and the traffic culture is its own thing.',
      ru: 'В Мангистау и Алтын-Эмеле обычно нужны полный привод и местный гид — не отправляйтесь в отдалённые районы самостоятельно. Вокруг Алматы хватит и обычной машины, но нанять водителя (около 60–100 € / день) часто разумно, потому что указатели на кириллице, а культура вождения своеобразная.',
      kk: 'Маңғыстау мен Алтын-Емелде әдетте 4WD және жергілікті гид қажет — шалғай аймақтарға өз бетіңізше шықпаңыз. Алматы маңында қарапайым көлік жеткілікті, бірақ жүргізуші жалдау (тәулігіне шамамен 60–100 €) жиі тиімді, өйткені белгілер кирилл әліпбиімен жазылған, ал қозғалыс мәдениеті өзіндік.',
    },
  },
  local: {
    title: {
      fi: 'Paikallisliikenne',
      en: 'Local transport',
      ru: 'Местный транспорт',
      kk: 'Жергілікті көлік',
    },
    body: {
      fi: 'Almatyssa on metro (yksi linja) ja runsaasti Yandex Go -takseja. Astanassa busseja ja takseja. Lataa Yandex Go -sovellus ennen lähtöä — hinnat ovat reilut ja hinnoittelu läpinäkyvää.',
      en: 'Almaty has a metro (one line) and plenty of Yandex Go taxis. Astana has buses and taxis. Install the Yandex Go app before you leave — prices are fair and the pricing is transparent.',
      ru: 'В Алматы есть метро (одна линия) и много такси Yandex Go. В Астане — автобусы и такси. Установите приложение Yandex Go ещё до поездки: цены справедливые, тарификация прозрачная.',
      kk: 'Алматыда метро бар (бір желі) және Yandex Go таксилері көп. Астанада автобустар мен таксилер бар. Жолға шықпас бұрын Yandex Go қосымшасын орнатыңыз — бағалар әділ, тарификация ашық.',
    },
  },
};
