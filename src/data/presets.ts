import type { Preset } from '@/lib/types';

// Kolme valmista reittipresettiä lähtökohdaksi. Kopioi runko `userItinerary`:in
// (src/data/itinerary.ts) jos haluat muokata reittiä omaan käyttöösi.
export const presets: Preset[] = [
  // ============== Preset 1: Luonto + Almaty (5 päivää) ==============
  {
    id: 'luonto-almaty-5',
    title: {
      fi: 'Luonto + Almaty — 5 päivää',
      en: 'Nature + Almaty — 5 days',
      ru: 'Природа + Алматы — 5 дней',
      kk: 'Табиғат + Алматы — 5 күн',
    },
    theme: 'nature',
    durationDays: 5,
    shortDescription: {
      fi: 'Yhdellä tukikohdalla (Almaty), päiväretket vuoristoon ja kanjoneihin.',
      en: 'A single base in Almaty with day trips to the mountains and canyons.',
      ru: 'Одна база в Алматы, однодневные поездки в горы и каньоны.',
      kk: 'Бір база Алматыда, таулар мен каньондарға күндік сапарлар.',
    },
    whoFor: {
      fi: 'Kun haluatte vuoria, järviä ja rauhaa ilman jatkuvia siirtymiä eri kaupunkeihin.',
      en: 'For travellers who want mountains, lakes and calm without constantly hopping between cities.',
      ru: 'Для тех, кто хочет гор, озёр и спокойствия без постоянных переездов между городами.',
      kk: 'Қалалар арасында үздіксіз жүрмей-ақ тауларды, көлдерді және тыныштықты қалайтындарға.',
    },
    highlights: [
      {
        fi: 'Charynin kanjoni — Keski-Aasian Grand Canyon',
        en: 'Charyn Canyon — the Grand Canyon of Central Asia',
        ru: 'Чарынский каньон — Гранд-Каньон Центральной Азии',
        kk: 'Шарын каньоны — Орталық Азияның Гранд-Каньоны',
      },
      {
        fi: 'Kolsain järvet — alppimaisema Tienšanissa',
        en: 'Kolsai Lakes — alpine scenery in the Tian Shan',
        ru: 'Кольсайские озёра — альпийские пейзажи Тянь-Шаня',
        kk: 'Көлсай көлдері — Тянь-Шаньдағы альпі көріністері',
      },
      {
        fi: 'Iso Almatyn järvi — turkoosi vuoristohelmi',
        en: 'Big Almaty Lake — a turquoise jewel of the mountains',
        ru: 'Большое Алматинское озеро — бирюзовая жемчужина гор',
        kk: 'Үлкен Алматы көлі — таулардың көгілдір меруерті',
      },
      {
        fi: 'Medeu & Shymbulak — gondoli vuoristoon',
        en: 'Medeu & Shymbulak — a gondola ride into the mountains',
        ru: 'Медеу и Шымбулак — канатная дорога в горы',
        kk: 'Медеу мен Шымбұлақ — тауларға арқан жолымен',
      },
    ],
    estimatedBudgetEUR: { low: 350, mid: 600 },
    days: [
      {
        day: 1,
        title: {
          fi: 'Saapuminen Almatyyn',
          en: 'Arrival in Almaty',
          ru: 'Прибытие в Алматы',
          kk: 'Алматыға келу',
        },
        summary: {
          fi: 'Lasku, hotelliin, ensimmäinen kävely Panfilovin puiston ja Vihreän basaarin kautta.',
          en: 'Land, check in, then a first walk through Panfilov Park and the Green Bazaar.',
          ru: 'Прилёт, заселение в отель и первая прогулка через парк Панфилова и Зелёный базар.',
          kk: 'Қону, қонақ үйге орналасу, Панфилов саябағы мен Жасыл базар арқылы алғашқы серуен.',
        },
        sightIds: ['almaty-keskusta', 'zenkov-cathedral', 'green-bazaar'],
        accommodation: {
          city: {
            fi: 'Almaty',
            en: 'Almaty',
            ru: 'Алматы',
            kk: 'Алматы',
          },
        },
      },
      {
        day: 2,
        title: {
          fi: 'Charynin kanjoni',
          en: 'Charyn Canyon',
          ru: 'Чарынский каньон',
          kk: 'Шарын каньоны',
        },
        summary: {
          fi: 'Päiväretki Charynin kanjoniin kuljettajan kanssa. Paluu illalla Almatyyn.',
          en: 'A day trip to Charyn Canyon with a driver. Back to Almaty in the evening.',
          ru: 'Однодневная поездка в Чарынский каньон с водителем. Возвращение в Алматы вечером.',
          kk: 'Жүргізушімен Шарын каньонына күндік сапар. Кешке Алматыға қайту.',
        },
        sightIds: ['charyn-canyon'],
        transport: [
          {
            mode: 'car',
            from: { fi: 'Almaty', en: 'Almaty', ru: 'Алматы', kk: 'Алматы' },
            to: { fi: 'Charyn', en: 'Charyn', ru: 'Чарын', kk: 'Шарын' },
            note: {
              fi: 'Yksityiskuljettaja',
              en: 'Private driver',
              ru: 'Частный водитель',
              kk: 'Жеке жүргізуші',
            },
          },
        ],
        accommodation: {
          city: { fi: 'Almaty', en: 'Almaty', ru: 'Алматы', kk: 'Алматы' },
        },
      },
      {
        day: 3,
        title: {
          fi: 'Kolsai ja Kaindy',
          en: 'Kolsai and Kaindy',
          ru: 'Кольсай и Каинды',
          kk: 'Көлсай және Қайыңды',
        },
        summary: {
          fi: 'Aikainen lähtö Kolsain järville. Yöpyminen Satyssa, jotta voi mennä myös Kaindyyn.',
          en: 'Early start towards the Kolsai Lakes. Overnight in Saty so you can also visit Kaindy.',
          ru: 'Ранний выезд к Кольсайским озёрам. Ночёвка в Саты, чтобы также посетить Каинды.',
          kk: 'Көлсай көлдеріне ерте шығу. Қайыңдыға да бару үшін Сатыда түнеу.',
        },
        sightIds: ['kolsai-lakes', 'kaindy-lake'],
        transport: [
          {
            mode: 'car',
            from: { fi: 'Almaty', en: 'Almaty', ru: 'Алматы', kk: 'Алматы' },
            to: { fi: 'Saty', en: 'Saty', ru: 'Саты', kk: 'Саты' },
          },
        ],
        accommodation: {
          city: { fi: 'Saty', en: 'Saty', ru: 'Саты', kk: 'Саты' },
          note: {
            fi: 'Paikallinen guesthouse',
            en: 'Local guesthouse',
            ru: 'Местный гостевой дом',
            kk: 'Жергілікті қонақ үй',
          },
        },
      },
      {
        day: 4,
        title: {
          fi: 'Iso Almatyn järvi + paluu',
          en: 'Big Almaty Lake + return',
          ru: 'Большое Алматинское озеро + возвращение',
          kk: 'Үлкен Алматы көлі + қайту',
        },
        summary: {
          fi: 'Paluu Almatyyn, iltapäivä BAO:lla (rajavyöhykelupa tarkistettava etukäteen).',
          en: 'Back to Almaty and an afternoon at BAO (check the border-zone permit in advance).',
          ru: 'Возвращение в Алматы, вторая половина дня на БАО (заранее проверьте пропуск в погранзону).',
          kk: 'Алматыға қайту, түстен кейін БАК-та (шекара аймағына рұқсатты алдын ала тексеріңіз).',
        },
        sightIds: ['big-almaty-lake'],
        accommodation: {
          city: { fi: 'Almaty', en: 'Almaty', ru: 'Алматы', kk: 'Алматы' },
        },
      },
      {
        day: 5,
        title: {
          fi: 'Medeu, Shymbulak ja lähtö',
          en: 'Medeu, Shymbulak and departure',
          ru: 'Медеу, Шымбулак и отъезд',
          kk: 'Медеу, Шымбұлақ және кету',
        },
        summary: {
          fi: 'Gondolihissi Shymbulakiin, lounas vuorilla. Illalla lento kotiin.',
          en: 'Gondola up to Shymbulak and lunch in the mountains. Flight home in the evening.',
          ru: 'Канатная дорога на Шымбулак, обед в горах. Вечером — рейс домой.',
          kk: 'Шымбұлаққа арқан жолы, тауларда түскі ас. Кешке үйге ұшу.',
        },
        sightIds: ['medeu-shymbulak'],
      },
    ],
  },

  // ============== Preset 2: Kaupungit + kulttuuri (7 päivää) ==============
  {
    id: 'kaupunki-kulttuuri-7',
    title: {
      fi: 'Kaupungit + kulttuuri — 7 päivää',
      en: 'Cities + culture — 7 days',
      ru: 'Города + культура — 7 дней',
      kk: 'Қалалар + мәдениет — 7 күн',
    },
    theme: 'culture',
    durationDays: 7,
    shortDescription: {
      fi: 'Almaty, Astana ja Turkistan — modernia arkkitehtuuria ja UNESCO-kohteita.',
      en: 'Almaty, Astana and Turkistan — modern architecture and UNESCO sites.',
      ru: 'Алматы, Астана и Туркестан — современная архитектура и объекты ЮНЕСКО.',
      kk: 'Алматы, Астана және Түркістан — заманауи сәулет пен ЮНЕСКО нысандары.',
    },
    whoFor: {
      fi: 'Kun haluatte nähdä kontrastin: vihreä Almaty, futuristinen Astana ja historiallinen Turkistan.',
      en: 'For travellers who want the contrast: leafy Almaty, futuristic Astana and historic Turkistan.',
      ru: 'Для тех, кто хочет увидеть контраст: зелёный Алматы, футуристичная Астана и исторический Туркестан.',
      kk: 'Қарама-қарсылықты көргісі келетіндерге: жасыл Алматы, футуристік Астана және тарихи Түркістан.',
    },
    highlights: [
      {
        fi: 'Almatyn keskusta, basaarit ja köysirata',
        en: 'Central Almaty, bazaars and the cable car',
        ru: 'Центр Алматы, базары и канатная дорога',
        kk: 'Алматы орталығы, базарлар мен арқан жолы',
      },
      {
        fi: 'Astanan modernit ikonit (Baiterek, Khan Shatyr, Rauhan palatsi)',
        en: 'Astana’s modern icons (Bayterek, Khan Shatyr, Palace of Peace)',
        ru: 'Современные иконы Астаны (Байтерек, Хан Шатыр, Дворец мира)',
        kk: 'Астананың заманауи нысандары (Бәйтерек, Хан Шатыр, Бейбітшілік сарайы)',
      },
      {
        fi: 'Khoja Ahmed Yasawin mausoleumi — UNESCO',
        en: 'Mausoleum of Khoja Ahmed Yasawi — UNESCO site',
        ru: 'Мавзолей Ходжи Ахмеда Ясави — объект ЮНЕСКО',
        kk: 'Қожа Ахмет Ясауи кесенесі — ЮНЕСКО нысаны',
      },
      {
        fi: 'Yöjuna kaupunkien välillä',
        en: 'An overnight train between cities',
        ru: 'Ночной поезд между городами',
        kk: 'Қалалар арасындағы түнгі пойыз',
      },
    ],
    estimatedBudgetEUR: { low: 500, mid: 850 },
    days: [
      {
        day: 1,
        title: {
          fi: 'Saapuminen Almatyyn',
          en: 'Arrival in Almaty',
          ru: 'Прибытие в Алматы',
          kk: 'Алматыға келу',
        },
        summary: {
          fi: 'Hotelliin, Panfilovin puisto ja Vihreä basaari.',
          en: 'Check in, then Panfilov Park and the Green Bazaar.',
          ru: 'Заселение, парк Панфилова и Зелёный базар.',
          kk: 'Қонақ үйге орналасу, Панфилов саябағы және Жасыл базар.',
        },
        sightIds: ['almaty-keskusta', 'zenkov-cathedral', 'green-bazaar'],
        accommodation: {
          city: { fi: 'Almaty', en: 'Almaty', ru: 'Алматы', kk: 'Алматы' },
        },
      },
      {
        day: 2,
        title: {
          fi: 'Almaty — kulttuuri ja näköalat',
          en: 'Almaty — culture and views',
          ru: 'Алматы — культура и виды',
          kk: 'Алматы — мәдениет пен көріністер',
        },
        summary: {
          fi: 'Keskusvaltion museo, Kök-Töbe köysiradalla, ilta Arbatilla.',
          en: 'Central State Museum, Kök-Töbe by cable car and an evening on the Arbat.',
          ru: 'Центральный государственный музей, Кёк-Тобе по канатной дороге, вечер на Арбате.',
          kk: 'Орталық мемлекеттік мұражай, арқан жолымен Көк-Төбе, кешке Арбатта.',
        },
        sightIds: ['central-state-museum', 'kok-tobe', 'almaty-arbat'],
        accommodation: {
          city: { fi: 'Almaty', en: 'Almaty', ru: 'Алматы', kk: 'Алматы' },
        },
      },
      {
        day: 3,
        title: {
          fi: 'Lento Astanaan',
          en: 'Flight to Astana',
          ru: 'Перелёт в Астану',
          kk: 'Астанаға ұшу',
        },
        summary: {
          fi: 'Aamulento, iltapäivä Baiterekissä ja Khan Shatyrissa.',
          en: 'Morning flight, afternoon at Bayterek and Khan Shatyr.',
          ru: 'Утренний рейс, во второй половине дня — Байтерек и Хан Шатыр.',
          kk: 'Таңертеңгі ұшу, түстен кейін Бәйтерек пен Хан Шатырда.',
        },
        sightIds: ['bayterek', 'khan-shatyr'],
        transport: [
          {
            mode: 'plane',
            from: { fi: 'Almaty', en: 'Almaty', ru: 'Алматы', kk: 'Алматы' },
            to: { fi: 'Astana', en: 'Astana', ru: 'Астана', kk: 'Астана' },
          },
        ],
        accommodation: {
          city: { fi: 'Astana', en: 'Astana', ru: 'Астана', kk: 'Астана' },
        },
      },
      {
        day: 4,
        title: {
          fi: 'Astanan moskeijat ja arkkitehtuuri',
          en: 'Astana’s mosques and architecture',
          ru: 'Мечети и архитектура Астаны',
          kk: 'Астананың мешіттері мен сәулеті',
        },
        summary: {
          fi: 'Hazret Sultan, Nur-Astana, Rauhan palatsi — kävellen ja taksilla.',
          en: 'Hazret Sultan, Nur-Astana and the Palace of Peace — on foot and by taxi.',
          ru: 'Хазрет Султан, Нур-Астана, Дворец мира — пешком и на такси.',
          kk: 'Хазірет Сұлтан, Нұр-Астана, Бейбітшілік сарайы — жаяу және таксимен.',
        },
        sightIds: ['hazret-sultan-mosque', 'nur-astana-mosque', 'palace-of-peace'],
        accommodation: {
          city: { fi: 'Astana', en: 'Astana', ru: 'Астана', kk: 'Астана' },
        },
      },
      {
        day: 5,
        title: {
          fi: 'Yöjuna Turkistaniin',
          en: 'Overnight train to Turkistan',
          ru: 'Ночной поезд в Туркестан',
          kk: 'Түркістанға түнгі пойыз',
        },
        summary: {
          fi: 'Päivä rauhassa Astanassa, illalla yöjunaan Turkistania kohti (~13 h).',
          en: 'A relaxed day in Astana, then board the overnight train to Turkistan (~13 h).',
          ru: 'Спокойный день в Астане, вечером — ночной поезд в Туркестан (~13 ч).',
          kk: 'Астанада тыныш күн, кешке Түркістанға түнгі пойызға (~13 сағ).',
        },
        sightIds: [],
        transport: [
          {
            mode: 'train',
            from: { fi: 'Astana', en: 'Astana', ru: 'Астана', kk: 'Астана' },
            to: { fi: 'Turkistan', en: 'Turkistan', ru: 'Туркестан', kk: 'Түркістан' },
            note: {
              fi: 'Yöjuna, sleeper',
              en: 'Overnight train, sleeper',
              ru: 'Ночной поезд, спальный вагон',
              kk: 'Түнгі пойыз, ұйықтайтын вагон',
            },
          },
        ],
        accommodation: {
          city: {
            fi: 'Juna',
            en: 'On the train',
            ru: 'В поезде',
            kk: 'Пойызда',
          },
        },
      },
      {
        day: 6,
        title: {
          fi: 'Turkistan — UNESCO',
          en: 'Turkistan — UNESCO',
          ru: 'Туркестан — ЮНЕСКО',
          kk: 'Түркістан — ЮНЕСКО',
        },
        summary: {
          fi: 'Khoja Ahmed Yasawin mausoleumi ja restauroitu vanhakaupunki.',
          en: 'Mausoleum of Khoja Ahmed Yasawi and the restored old town.',
          ru: 'Мавзолей Ходжи Ахмеда Ясави и отреставрированный старый город.',
          kk: 'Қожа Ахмет Ясауи кесенесі және қалпына келтірілген ескі қала.',
        },
        sightIds: ['khoja-ahmed-yasawi', 'turkistan-old-town'],
        accommodation: {
          city: { fi: 'Turkistan', en: 'Turkistan', ru: 'Туркестан', kk: 'Түркістан' },
        },
      },
      {
        day: 7,
        title: {
          fi: 'Paluu Almatyyn ja kotiin',
          en: 'Back to Almaty and home',
          ru: 'Возвращение в Алматы и домой',
          kk: 'Алматыға және үйге қайту',
        },
        summary: {
          fi: 'Aamulento Almatyyn, lyhyt välipysähdys ja paluulento kotiin.',
          en: 'Morning flight to Almaty, a short stopover and the flight home.',
          ru: 'Утренний рейс в Алматы, короткая пересадка и обратный рейс домой.',
          kk: 'Таңертеңгі Алматыға ұшу, қысқа аялдама және үйге қайтар рейс.',
        },
        sightIds: [],
        transport: [
          {
            mode: 'plane',
            from: {
              fi: 'Turkistan/Shymkent',
              en: 'Turkistan/Shymkent',
              ru: 'Туркестан/Шымкент',
              kk: 'Түркістан/Шымкент',
            },
            to: { fi: 'Almaty', en: 'Almaty', ru: 'Алматы', kk: 'Алматы' },
          },
          {
            mode: 'plane',
            from: { fi: 'Almaty', en: 'Almaty', ru: 'Алматы', kk: 'Алматы' },
            to: { fi: 'Helsinki', en: 'Helsinki', ru: 'Хельсинки', kk: 'Хельсинки' },
          },
        ],
      },
    ],
  },

  // ============== Preset 3: Eeppinen roadtrip (10 päivää) ==============
  {
    id: 'eeppinen-roadtrip-10',
    title: {
      fi: 'Eeppinen roadtrip — 10 päivää',
      en: 'Epic road trip — 10 days',
      ru: 'Эпический роуд-трип — 10 дней',
      kk: 'Эпикалық жол сапары — 10 күн',
    },
    theme: 'epic-roadtrip',
    durationDays: 10,
    shortDescription: {
      fi: 'Almaty + Altyn-Emel + Kolsai + Charyn + lento Aktauun + Mangystaun aavikko.',
      en: 'Almaty + Altyn-Emel + Kolsai + Charyn + flight to Aktau + the Mangystau desert.',
      ru: 'Алматы + Алтын-Эмель + Кольсай + Чарын + перелёт в Актау + пустыня Мангистау.',
      kk: 'Алматы + Алтын-Емел + Көлсай + Шарын + Ақтауға ұшу + Маңғыстау шөлі.',
    },
    whoFor: {
      fi: 'Kun haluatte parhaat puolet: vuoria, kanjoneita ja Marsia muistuttavaa aavikkoa. Vaatii enemmän siirtymiä.',
      en: 'For travellers who want the best of it all: mountains, canyons and Mars-like desert. Expect more transfers.',
      ru: 'Для тех, кто хочет всё лучшее: горы, каньоны и пустыню, похожую на Марс. Переездов будет больше.',
      kk: 'Ең үздіктерін: тауларды, каньондар мен Марсқа ұқсас шөлді қалайтындарға. Көбірек ауысулар қажет.',
    },
    highlights: [
      {
        fi: 'Laulavat dyynit ja Aktaun vuoret — Altyn-Emel',
        en: 'The Singing Dunes and Aktau Mountains — Altyn-Emel',
        ru: 'Поющий бархан и горы Актау — Алтын-Эмель',
        kk: 'Әнші құмдар мен Ақтау таулары — Алтын-Емел',
      },
      {
        fi: 'Kolsai + Kaindy',
        en: 'Kolsai + Kaindy',
        ru: 'Кольсай + Каинды',
        kk: 'Көлсай + Қайыңды',
      },
      {
        fi: 'Bozzhyran kanjonit — Mangystau',
        en: 'The Bozzhyra canyons — Mangystau',
        ru: 'Каньоны Бозжыра — Мангистау',
        kk: 'Бозжыра каньондары — Маңғыстау',
      },
      {
        fi: 'Beket-Atan luolamoskeija',
        en: 'The Beket-Ata cave mosque',
        ru: 'Пещерная мечеть Бекет-Ата',
        kk: 'Бекет-Ата үңгір мешіті',
      },
    ],
    estimatedBudgetEUR: { low: 900, mid: 1500 },
    days: [
      {
        day: 1,
        title: {
          fi: 'Saapuminen Almatyyn',
          en: 'Arrival in Almaty',
          ru: 'Прибытие в Алматы',
          kk: 'Алматыға келу',
        },
        summary: {
          fi: 'Lasku, illallinen Almatyn keskustassa.',
          en: 'Land and have dinner in central Almaty.',
          ru: 'Прилёт, ужин в центре Алматы.',
          kk: 'Қону, Алматы орталығында кешкі ас.',
        },
        sightIds: ['almaty-keskusta'],
        accommodation: {
          city: { fi: 'Almaty', en: 'Almaty', ru: 'Алматы', kk: 'Алматы' },
        },
      },
      {
        day: 2,
        title: {
          fi: 'Altyn-Emel — Laulavat dyynit & Aktau',
          en: 'Altyn-Emel — Singing Dunes & Aktau',
          ru: 'Алтын-Эмель — Поющий бархан и Актау',
          kk: 'Алтын-Емел — Әнші құмдар және Ақтау',
        },
        summary: {
          fi: 'Aikainen lähtö, yön yli puistoa.',
          en: 'Early start and an overnight in the park.',
          ru: 'Ранний выезд, ночёвка на территории парка.',
          kk: 'Ерте шығу, саябақта түнеу.',
        },
        sightIds: ['singing-dunes', 'altyn-emel-aktau'],
        transport: [
          {
            mode: 'car',
            from: { fi: 'Almaty', en: 'Almaty', ru: 'Алматы', kk: 'Алматы' },
            to: { fi: 'Altyn-Emel', en: 'Altyn-Emel', ru: 'Алтын-Эмель', kk: 'Алтын-Емел' },
          },
        ],
        accommodation: {
          city: {
            fi: 'Basshi (Altyn-Emel)',
            en: 'Basshi (Altyn-Emel)',
            ru: 'Басши (Алтын-Эмель)',
            kk: 'Басши (Алтын-Емел)',
          },
        },
      },
      {
        day: 3,
        title: {
          fi: 'Paluu Almatyyn',
          en: 'Return to Almaty',
          ru: 'Возвращение в Алматы',
          kk: 'Алматыға қайту',
        },
        summary: {
          fi: 'Aamupäivällä viimeiset näköalat, paluu illaksi Almatyyn.',
          en: 'A few last viewpoints in the morning, then back to Almaty for the evening.',
          ru: 'Утром — последние виды, к вечеру возвращение в Алматы.',
          kk: 'Таңертең соңғы көріністер, кешке Алматыға қайту.',
        },
        sightIds: [],
        accommodation: {
          city: { fi: 'Almaty', en: 'Almaty', ru: 'Алматы', kk: 'Алматы' },
        },
      },
      {
        day: 4,
        title: {
          fi: 'Charyn ja Kaindy',
          en: 'Charyn and Kaindy',
          ru: 'Чарын и Каинды',
          kk: 'Шарын және Қайыңды',
        },
        summary: {
          fi: 'Klassinen kanjoni-päivä, yöpyminen Satyssa.',
          en: 'A classic canyon day, overnight in Saty.',
          ru: 'Классический день каньонов, ночёвка в Саты.',
          kk: 'Классикалық каньон күні, Сатыда түнеу.',
        },
        sightIds: ['charyn-canyon', 'kaindy-lake'],
        accommodation: {
          city: { fi: 'Saty', en: 'Saty', ru: 'Саты', kk: 'Саты' },
        },
      },
      {
        day: 5,
        title: {
          fi: 'Kolsai-järvet',
          en: 'Kolsai Lakes',
          ru: 'Кольсайские озёра',
          kk: 'Көлсай көлдері',
        },
        summary: {
          fi: 'Aamukävely ensimmäiselle järvelle, mahdollinen ratsain ylempiin.',
          en: 'Morning walk to the first lake, with an optional horseback ride to the upper lakes.',
          ru: 'Утренняя прогулка к первому озеру, при желании — верхом к верхним.',
          kk: 'Таңертеңгі бірінші көлге серуен, қаласаңыз — атпен жоғарғы көлдерге.',
        },
        sightIds: ['kolsai-lakes'],
        accommodation: {
          city: { fi: 'Saty', en: 'Saty', ru: 'Саты', kk: 'Саты' },
        },
      },
      {
        day: 6,
        title: {
          fi: 'Paluu Almatyyn + lento Aktauun',
          en: 'Back to Almaty + flight to Aktau',
          ru: 'Возвращение в Алматы + перелёт в Актау',
          kk: 'Алматыға қайту + Ақтауға ұшу',
        },
        summary: {
          fi: 'Aamu Almatyssa, iltapäivän lento länteen.',
          en: 'Morning in Almaty, afternoon flight to the west.',
          ru: 'Утро в Алматы, дневной перелёт на запад.',
          kk: 'Таңертең Алматыда, түстен кейін батысқа ұшу.',
        },
        sightIds: [],
        transport: [
          {
            mode: 'plane',
            from: { fi: 'Almaty', en: 'Almaty', ru: 'Алматы', kk: 'Алматы' },
            to: { fi: 'Aktau', en: 'Aktau', ru: 'Актау', kk: 'Ақтау' },
          },
        ],
        accommodation: {
          city: { fi: 'Aktau', en: 'Aktau', ru: 'Актау', kk: 'Ақтау' },
        },
      },
      {
        day: 7,
        title: {
          fi: 'Mangystau — Pallolaakso',
          en: 'Mangystau — Valley of Balls',
          ru: 'Мангистау — Долина шаров',
          kk: 'Маңғыстау — Шарлар алқабы',
        },
        summary: {
          fi: 'Lähtö 4WD-kierrokselle, ensimmäinen kohde Torysh.',
          en: 'Start of the 4WD tour, first stop is Torysh.',
          ru: 'Старт 4WD-тура, первая точка — Торыш.',
          kk: '4WD турының басталуы, бірінші нүкте — Торыш.',
        },
        sightIds: ['valley-of-balls'],
        transport: [
          {
            mode: 'car',
            from: { fi: 'Aktau', en: 'Aktau', ru: 'Актау', kk: 'Ақтау' },
            to: { fi: 'Mangystau', en: 'Mangystau', ru: 'Мангистау', kk: 'Маңғыстау' },
          },
        ],
        accommodation: {
          city: {
            fi: 'Aavikko (jurtta)',
            en: 'Desert (yurt)',
            ru: 'Пустыня (юрта)',
            kk: 'Шөл (киіз үй)',
          },
        },
      },
      {
        day: 8,
        title: {
          fi: 'Bozzhyra',
          en: 'Bozzhyra',
          ru: 'Бозжыра',
          kk: 'Бозжыра',
        },
        summary: {
          fi: 'Mangystaun ikoni — koko päivä kanjoneilla.',
          en: 'The icon of Mangystau — a full day in the canyons.',
          ru: 'Икона Мангистау — целый день в каньонах.',
          kk: 'Маңғыстаудың символы — күні бойы каньондарда.',
        },
        sightIds: ['bozzhyra'],
        accommodation: {
          city: {
            fi: 'Aavikko (jurtta)',
            en: 'Desert (yurt)',
            ru: 'Пустыня (юрта)',
            kk: 'Шөл (киіз үй)',
          },
        },
      },
      {
        day: 9,
        title: {
          fi: 'Beket-Ata ja paluu Aktauun',
          en: 'Beket-Ata and back to Aktau',
          ru: 'Бекет-Ата и возвращение в Актау',
          kk: 'Бекет-Ата және Ақтауға қайту',
        },
        summary: {
          fi: 'Luolamoskeija aamulla, paluu Aktauun illaksi.',
          en: 'The cave mosque in the morning, back to Aktau for the evening.',
          ru: 'Утром — пещерная мечеть, к вечеру возвращение в Актау.',
          kk: 'Таңертең үңгір мешіті, кешке Ақтауға қайту.',
        },
        sightIds: ['beket-ata'],
        accommodation: {
          city: { fi: 'Aktau', en: 'Aktau', ru: 'Актау', kk: 'Ақтау' },
        },
      },
      {
        day: 10,
        title: {
          fi: 'Lento kotiin',
          en: 'Flight home',
          ru: 'Рейс домой',
          kk: 'Үйге ұшу',
        },
        summary: {
          fi: 'Aktau → Almaty → koti.',
          en: 'Aktau → Almaty → home.',
          ru: 'Актау → Алматы → домой.',
          kk: 'Ақтау → Алматы → үй.',
        },
        sightIds: [],
        transport: [
          {
            mode: 'plane',
            from: { fi: 'Aktau', en: 'Aktau', ru: 'Актау', kk: 'Ақтау' },
            to: { fi: 'Almaty', en: 'Almaty', ru: 'Алматы', kk: 'Алматы' },
          },
          {
            mode: 'plane',
            from: { fi: 'Almaty', en: 'Almaty', ru: 'Алматы', kk: 'Алматы' },
            to: { fi: 'Helsinki', en: 'Helsinki', ru: 'Хельсинки', kk: 'Хельсинки' },
          },
        ],
      },
    ],
  },
];
