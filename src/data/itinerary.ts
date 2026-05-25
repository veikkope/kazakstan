import type { ItineraryDay } from '@/lib/types';

// 14 päivän runko reissulle 30.5.–12.6.2026 (paluu Suomeen 13.6. aamulla).
// Default-reitti: Aqtau → Mangystau-retket → Almaty → Charyn/Kolsai → Astana → paluu.
// Vaihtoehtoja näkyvillä alternatives-kentässä — päätös tehdään paikan päällä.
//
// Ei lukittuja varauksia: lodgingHint tarjoaa alue + hintahaarukka + bookkaussovellukset.
// Käteinen (cashKZT) on arvio päivän tarpeesta — kuljettajat ja yhteismarshrutkat ottavat vain käteistä.

export const userItinerary: ItineraryDay[] = [
  // ============== PÄIVÄ 1 — Helsinki → Aqtau (matkapäivä) ==============
  {
    day: 1,
    date: '2026-05-30',
    city: {
      fi: 'Helsinki / ilma',
      en: 'Helsinki / in the air',
      ru: 'Хельсинки / в воздухе',
      kk: 'Хельсинки / әуеде',
    },
    sleepCity: {
      fi: 'Lentokoneessa',
      en: 'On the plane',
      ru: 'В самолёте',
      kk: 'Ұшақта',
    },
    title: {
      fi: 'Lähtö Suomesta',
      en: 'Departure from Finland',
      ru: 'Вылет из Финляндии',
      kk: 'Финляндиядан ұшу',
    },
    summary: {
      fi: 'Lento Helsingistä Aqtauhun, todennäköisesti vaihto Istanbulissa. Saapuminen Aqtauhun yöllä klo 03 aikoihin.',
      en: 'Flight from Helsinki to Aktau, most likely with a connection in Istanbul. Arrival in Aktau at night around 03:00.',
      ru: 'Перелёт из Хельсинки в Актау, скорее всего с пересадкой в Стамбуле. Прибытие в Актау ночью около 03:00.',
      kk: 'Хельсинкиден Ақтауға ұшу, ықтимал Стамбұлда трансфермен. Ақтауға түнгі сағат 03:00 шамасында жету.',
    },
    sightIds: [],
    anchors: [
      {
        time: { fi: '~17:00', en: '~17:00', ru: '~17:00', kk: '~17:00' },
        kind: 'departure',
        label: {
          fi: 'Lähtö Helsinki-Vantaa',
          en: 'Departure from Helsinki-Vantaa',
          ru: 'Вылет из Хельсинки-Вантаа',
          kk: 'Хельсинки-Вантаадан ұшу',
        },
        urgency: 'now',
      },
      {
        time: { fi: 'yö', en: 'night', ru: 'ночь', kk: 'түнде' },
        kind: 'flight',
        label: {
          fi: 'Vaihto Istanbul (tai Frankfurt)',
          en: 'Connection in Istanbul (or Frankfurt)',
          ru: 'Пересадка в Стамбуле (или Франкфурте)',
          kk: 'Стамбұлда (немесе Франкфуртта) трансфер',
        },
        urgency: 'now',
      },
    ],
    primaryPlan: {
      fi: 'Pakkaa kevyesti, lue Aqtauhun saapumisesta. Lentokenttätaksi tai juna Helsinki-Vantaalle. Käteistä KZT vaihdettu tai nostettu Aqtaun lentokentällä.',
      en: 'Pack light, read up on arriving in Aktau. Airport taxi or train to Helsinki-Vantaa. KZT cash exchanged or withdrawn at Aktau airport.',
      ru: 'Соберите вещи налегке, изучите информацию о прибытии в Актау. Такси или поезд до аэропорта Хельсинки-Вантаа. Наличные KZT обменяйте или снимите в аэропорту Актау.',
      kk: 'Жеңіл жинаңыз, Ақтауға келу туралы оқып шығыңыз. Хельсинки-Вантаа әуежайына такси немесе пойызбен. KZT қолма-қол ақшаны Ақтау әуежайында айырбастаңыз немесе шешіп алыңыз.',
    },
    backupPlan: {
      fi: 'Lennon viivästyessä yhteyspaperit ja seuraavan vuoron tieto valmiina.',
      en: 'If the flight is delayed, keep connection documents and next-flight info ready.',
      ru: 'В случае задержки рейса держите наготове документы о пересадке и информацию о следующем рейсе.',
      kk: 'Рейс кешіксе, трансфер құжаттары мен келесі ұшу туралы ақпарат дайын болсын.',
    },
    earlyWakeRisk: true,
    cashKZT: 0,
    offlineNote: {
      fi: '⚠️ Lataa 2GIS:n Aqtau-paketti, Organic Mapsin Mangystau-kartta ja Aqtau Airport → keskusta-reitti ennen lähtöä. eSIM aktivoituna ennen laskeutumista.',
      en: '⚠️ Download the 2GIS Aktau package, Organic Maps Mangystau map, and the Aktau Airport → city centre route before departure. Activate eSIM before landing.',
      ru: '⚠️ Перед вылетом скачайте пакет 2GIS для Актау, карту Мангистау в Organic Maps и маршрут Аэропорт Актау → центр. Активируйте eSIM до посадки.',
      kk: '⚠️ Шығар алдында 2GIS-тің Ақтау пакетін, Organic Maps-тың Маңғыстау картасын және Ақтау әуежайы → орталық бағытын жүктеп алыңыз. eSIM-ді қонар алдында іске қосыңыз.',
    },
  },

  // ============== PÄIVÄ 2 — Aqtau saapuminen ==============
  {
    day: 2,
    date: '2026-05-31',
    city: { fi: 'Aqtau', en: 'Aktau', ru: 'Актау', kk: 'Ақтау' },
    sleepCity: { fi: 'Aqtau', en: 'Aktau', ru: 'Актау', kk: 'Ақтау' },
    title: {
      fi: 'Saapuminen Aqtauhun + vuokra-auton pickup',
      en: 'Arrival in Aktau + rental car pickup',
      ru: 'Прибытие в Актау + получение арендованного авто',
      kk: 'Ақтауға келу + жалға алынған көлікті алу',
    },
    summary: {
      fi: 'Laskeutuminen yöllä, taksi hotellille. Aamupäivä lepoa. Iltapäivällä vuokra-auton pickup (Avis/Europcar/paikallinen) ja iltakävely Kaspian-rannalla.',
      en: 'Landing at night, taxi to the hotel. Morning to rest. In the afternoon, pick up the rental car (Avis/Europcar/local) and take an evening walk along the Caspian shore.',
      ru: 'Посадка ночью, такси в отель. Утро на отдых. Днём получение арендованного авто (Avis/Europcar/местный) и вечерняя прогулка по берегу Каспия.',
      kk: 'Түнде қону, қонақүйге такси. Таңертең демалу. Түстен кейін жалға алынған көлікті алу (Avis/Europcar/жергілікті) және Каспий жағалауында кешкі серуен.',
    },
    sightIds: ['aqtau-promenade'],
    anchors: [
      {
        time: { fi: '~03:00', en: '~03:00', ru: '~03:00', kk: '~03:00' },
        kind: 'arrival',
        label: {
          fi: 'Lasku Aqtau Intl (SCO)',
          en: 'Landing at Aktau Intl (SCO)',
          ru: 'Посадка в Актау Интл (SCO)',
          kk: 'Ақтау Халықаралық әуежайына (SCO) қону',
        },
      },
      {
        time: { fi: '~04:00', en: '~04:00', ru: '~04:00', kk: '~04:00' },
        kind: 'drive',
        label: {
          fi: 'Taksi keskustaan, ~3 000–5 000 KZT',
          en: 'Taxi to the city centre, ~3,000–5,000 KZT',
          ru: 'Такси в центр, ~3 000–5 000 KZT',
          kk: 'Орталыққа такси, ~3 000–5 000 KZT',
        },
      },
      {
        time: { fi: '~05:00', en: '~05:00', ru: '~05:00', kk: '~05:00' },
        kind: 'checkin',
        label: {
          fi: 'Hotelli — pyydä aikainen check-in etukäteen',
          en: 'Hotel — request early check-in in advance',
          ru: 'Отель — заранее попросите ранний заезд',
          kk: 'Қонақүй — ертерек тіркелуді алдын ала сұраңыз',
        },
      },
      {
        time: {
          fi: 'iltapäivä',
          en: 'afternoon',
          ru: 'после полудня',
          kk: 'түстен кейін',
        },
        kind: 'drive',
        label: {
          fi: 'Vuokra-auton pickup — Caspi autorent, ЖК Оазис (15-й мкр., 69)',
          en: 'Rental car pickup — Caspi autorent, ZhK Oazis (15th mkr., 69)',
          ru: 'Получение арендованного авто — Caspi autorent, ЖК Оазис (15-й мкр., 69)',
          kk: 'Жалға алынған көлікті алу — Caspi autorent, ЖК Оазис (15-ші мкр., 69)',
        },
        urgency: 'now',
      },
    ],
    primaryPlan: {
      fi: 'Nukkua aamupäivä kuntoon. Iltapäivällä vuokra-auton pickup **Caspi autorent** -toimijalta (24/7, +7 701 500 1094, Instagram @caspi.autorent), paikka ЖК Оазис (15-й микрорайон, 69 — koordinaatit 43.669388, 51.134028). Vahvista WhatsApp-tapaamispiste kompleksin sisäänkäynnillä ennen lähtöä — sijainti on asuinkompleksi, ei perinteinen vuokraamotoimisto. ⚠️ Älä mene yrityksen viralliseen toimistoon 12-й мкр., 23 — eri paikka, n. 2 km kaakkoon. Iltakävely Kaspian-rannalle (aqtau-promenadi, "I love Aktau" -merkki) ja paikallinen ravintola illalliseksi. **Nosta käteistä Mangystau-retkeä varten: 150 000 KZT/2 hlöä** (ATM-raja 100 000 KZT/nosto — tee kahdessa nostossa) Halyk- tai Kaspi-pankin ATM:stä. Tarkista WhatsApp-viestit Mangystau-operaattorilta — vahvista pickup-aika huomista varten.',
      en: 'Sleep through the morning to recover. In the afternoon, pick up the rental from **Caspi autorent** (24/7, +7 701 500 1094, Instagram @caspi.autorent), at ZhK Oazis (15th microdistrict, 69 — coordinates 43.669388, 51.134028). Confirm the WhatsApp meeting point at the complex entrance before leaving — the location is a residential complex, not a traditional rental office. ⚠️ Do not go to the company\'s official office at 12th mkr., 23 — that is a different place about 2 km to the southeast. Evening walk along the Caspian shore (Aktau promenade, "I love Aktau" sign) and a local restaurant for dinner. **Withdraw cash for the Mangystau trip: 150,000 KZT for 2 people** (ATM limit 100,000 KZT per withdrawal — do it in two pulls) from a Halyk or Kaspi bank ATM. Check WhatsApp messages from the Mangystau operator — confirm tomorrow\'s pickup time.',
      ru: 'Поспите утром, чтобы восстановиться. Днём заберите авто у **Caspi autorent** (24/7, +7 701 500 1094, Instagram @caspi.autorent), место — ЖК Оазис (15-й микрорайон, 69 — координаты 43.669388, 51.134028). Перед выходом подтвердите по WhatsApp точку встречи у входа в комплекс — это жилой комплекс, а не классический офис проката. ⚠️ Не идите в официальный офис компании по адресу 12-й мкр., 23 — это другое место примерно в 2 км к юго-востоку. Вечером прогулка по набережной Каспия (актауский променад, знак "I love Aktau") и ужин в местном ресторане. **Снимите наличные для поездки в Мангистау: 150 000 KZT на 2 человека** (лимит банкомата 100 000 KZT за раз — снимайте в два захода) в банкомате Halyk или Kaspi. Проверьте сообщения WhatsApp от оператора в Мангистау — подтвердите время выезда на завтра.',
      kk: 'Қалпына келу үшін таңертең ұйықтап алыңыз. Түстен кейін **Caspi autorent**-тен (24/7, +7 701 500 1094, Instagram @caspi.autorent) көлікті алыңыз, орны ЖК Оазис (15-ші шағын аудан, 69 — координаттар 43.669388, 51.134028). Шығар алдында WhatsApp арқылы кешен кіреберісіндегі кездесу нүктесін растаңыз — бұл тұрғын үй кешені, дәстүрлі прокат кеңсесі емес. ⚠️ Компанияның 12-ші мкр., 23 мекенжайындағы ресми кеңсесіне бармаңыз — ол басқа жер, шамамен 2 км оңтүстік-шығыста. Кешке Каспий жағалауында серуен (Ақтау променады, "I love Aktau" белгісі) және жергілікті мейрамханада кешкі ас. **Маңғыстау сапарына қолма-қол ақша шешіп алыңыз: 2 адамға 150 000 KZT** (банкомат шегі бір шешуге 100 000 KZT — екі рет шешіңіз) Halyk немесе Kaspi банкоматынан. Маңғыстау операторынан WhatsApp хабарламаларын тексеріңіз — ертеңгі күні алу уақытын растаңыз.',
    },
    alternatives: [
      {
        title: {
          fi: 'Aktiivinen päivä',
          en: 'Active day',
          ru: 'Активный день',
          kk: 'Белсенді күн',
        },
        summary: {
          fi: 'Jos jaksaminen riittää, ajakaa vuokra-autolla Aqtauta pohjoiseen rannikkoa pitkin — eteläiset rannat ovat hyviä iltapäiväuintiin.',
          en: 'If you have energy, drive the rental north of Aktau along the coast — the southern beaches are good for afternoon swimming.',
          ru: 'Если есть силы, поезжайте на арендованном авто к северу от Актау вдоль побережья — южные пляжи хороши для дневного купания.',
          kk: 'Күш-қуат жетсе, жалға алынған көлікпен Ақтаудан солтүстікке жағалаумен жүріңіз — оңтүстік жағажайлар түстен кейінгі шомылуға қолайлы.',
        },
        tradeoff: {
          fi: '+ aktiivinen aloitus / − vie energiaa 4WD-retkeä varten',
          en: '+ active start / − drains energy needed for the 4WD trip',
          ru: '+ активное начало / − забирает энергию, нужную для 4WD-выезда',
          kk: '+ белсенді бастау / − 4WD сапары үшін қажет күшті азайтады',
        },
      },
      {
        title: {
          fi: 'Vuokra-auto vasta päivänä 5',
          en: 'Pick up the rental car only on day 5',
          ru: 'Брать арендованное авто только на 5-й день',
          kk: 'Жалға алынған көлікті тек 5-ші күні алу',
        },
        summary: {
          fi: 'Voitte myös noutaa vuokra-auton vasta paluupäivänä — silloin Mangystau-retken aikana auto ei seiso turhaan.',
          en: 'You can also pick up the rental only on the return day — that way the car does not sit idle during the Mangystau trip.',
          ru: 'Можно забрать арендованное авто только в день возвращения — тогда машина не будет стоять без дела во время поездки в Мангистау.',
          kk: 'Жалға алынған көлікті тек қайтып келген күні де алуға болады — сонда Маңғыстау сапары кезінде көлік бос тұрмайды.',
        },
        tradeoff: {
          fi: '+ säästää 2 vrk vuokrasta / − ei oman auton iltapäivää',
          en: '+ saves 2 days of rental / − no rental-car afternoon',
          ru: '+ экономит 2 дня аренды / − нет дневной поездки на своей машине',
          kk: '+ 2 күндік жалдау ақысын үнемдейді / − өз көлігімен жүретін түстен кейінгі уақыт жоқ',
        },
      },
    ],
    backupPlan: {
      fi: 'Jos uupumus on liikaa, jää hotelliin koko päivä. Vuokra-auton voi noutaa myöhemminkin.',
      en: 'If you are too tired, stay at the hotel the whole day. The rental car can be picked up later.',
      ru: 'Если устали слишком сильно, оставайтесь в отеле весь день. Арендованное авто можно забрать и позже.',
      kk: 'Шаршау тым көп болса, бүкіл күн қонақүйде қалыңыз. Жалға алынған көлікті кейінірек те алуға болады.',
    },
    lodgingHint: {
      area: {
        fi: 'Aqtau keskusta — Mikrorajon-3, lähellä rantakatua',
        en: 'Aktau city centre — Microdistrict-3, near the promenade',
        ru: 'Центр Актау — Микрорайон-3, рядом с набережной',
        kk: 'Ақтау орталығы — 3-ші шағын аудан, жағалаудың жанында',
      },
      priceRangeEUR: [40, 80],
      bookingApps: ['Booking.com', 'Ostrovok', 'paikalliset hotellit'],
      note: {
        fi: 'Kysele aikaista check-iniä etukäteen — saapuminen yöllä',
        en: 'Ask for an early check-in in advance — arrival is at night',
        ru: 'Заранее попросите ранний заезд — прибытие ночью',
        kk: 'Ертерек тіркелуді алдын ала сұраңыз — келу түнде болады',
      },
    },
    cashKZT: 15000,
    driverNeeded: false,
    earlyWakeRisk: false,
    notes: {
      fi: 'Käyttäjä-vinkki: Aqtau-saapuminen ennen klo 06 voi tarkoittaa hotellin yhden yön lisämaksua (early check-in). Kysele booking-vahvistuksessa. — Mangystau-operaattorin pitää olla varattu jo Helsingistä käsin (deadline 22.5., ks. päivän 3 notes).',
      en: 'User tip: Arrival in Aktau before 06:00 may mean an extra one-night charge at the hotel (early check-in). Ask when confirming the booking. — The Mangystau operator must be booked already from Helsinki (deadline 22 May, see day 3 notes).',
      ru: 'Совет пользователя: прибытие в Актау до 06:00 может означать доплату за дополнительную ночь в отеле (ранний заезд). Уточните это при подтверждении бронирования. — Оператора в Мангистау нужно забронировать ещё из Хельсинки (дедлайн 22.05., см. заметки на день 3).',
      kk: 'Пайдаланушы кеңесі: Ақтауға 06:00-ге дейін келу қонақүйде қосымша бір түнге ақы төлеуді (ертерек тіркелу) білдіруі мүмкін. Брондауды растағанда сұраңыз. — Маңғыстау операторын Хельсинкиде жатып брондау керек (мерзімі 22.05., 3-күн ескертпелерін қараңыз).',
    },
  },

  // ============== PÄIVÄ 3 — Mangystau day 1 ==============
  {
    day: 3,
    date: '2026-06-01',
    city: {
      fi: 'Mangystau (Sherkala / Pallolaakso)',
      en: 'Mangystau (Sherkala / Valley of Balls)',
      ru: 'Мангистау (Шеркала / Долина шаров)',
      kk: 'Маңғыстау (Шерқала / Шарлар алқабы)',
    },
    sleepCity: {
      fi: 'Jurtta erämaassa tai Shetpe-kylä',
      en: 'Yurt in the wilderness or Shetpe village',
      ru: 'Юрта в пустыне или село Шетпе',
      kk: 'Шөл даладағы киіз үй немесе Шетпе ауылы',
    },
    title: {
      fi: 'Mangystau 4WD-retki päivä 1 — Sherkala + Pallolaakso',
      en: 'Mangystau 4WD trip day 1 — Sherkala + Valley of Balls',
      ru: 'Поездка по Мангистау на 4WD день 1 — Шеркала + Долина шаров',
      kk: 'Маңғыстау 4WD сапары 1-күн — Шерқала + Шарлар алқабы',
    },
    summary: {
      fi: '4WD + opas -retki (ERILLINEN vuokra-autosta — vuokra-auto jää hotellille). Sherkalan kalliovuori, sitten Torysh-pallolaakso. Yö jurttassa tähtitaivaan alla.',
      en: '4WD + guide trip (SEPARATE from the rental — rental stays at the hotel). Sherkala rock mountain, then the Torysh Valley of Balls. Overnight in a yurt under the starry sky.',
      ru: 'Поездка на 4WD с гидом (ОТДЕЛЬНО от арендованного авто — арендованное остаётся в отеле). Скала Шеркала, затем долина шаров Торыш. Ночёвка в юрте под звёздным небом.',
      kk: '4WD + гидпен сапар (жалға алынған көліктен БӨЛЕК — жалға алынған көлік қонақүйде қалады). Шерқала жартас тауы, содан кейін Торыш шарлар алқабы. Жұлдызды аспан астында киіз үйде түнеу.',
    },
    sightIds: ['sherkala', 'valley-of-balls'],
    anchors: [
      {
        time: { fi: '07:00', en: '07:00', ru: '07:00', kk: '07:00' },
        kind: 'tour',
        label: {
          fi: '4WD-kuljettaja noutaa hotellilta (vahvista WhatsApp-pickup edellisenä iltana)',
          en: '4WD driver picks you up at the hotel (confirm WhatsApp pickup the night before)',
          ru: 'Водитель на 4WD забирает из отеля (подтвердите забор по WhatsApp накануне вечером)',
          kk: '4WD жүргізушісі қонақүйден алады (алдыңғы күні кешке WhatsApp арқылы растаңыз)',
        },
        urgency: 'now',
      },
      {
        time: { fi: 'ilta', en: 'evening', ru: 'вечер', kk: 'кешке' },
        kind: 'checkin',
        label: {
          fi: 'Jurttamajoitus tai guesthouse Shetpessä — operaattori järjestää',
          en: 'Yurt accommodation or guesthouse in Shetpe — arranged by the operator',
          ru: 'Размещение в юрте или гостевом доме в Шетпе — организует оператор',
          kk: 'Шетпеде киіз үйде немесе қонақ үйде орналасу — оператор ұйымдастырады',
        },
      },
    ],
    primaryPlan: {
      fi: '⚠️ TÄMÄ ON 4WD + OPAS -RETKI, ei vuokra-auto. Vuokra-auto jää hotellille. Sherkalassa kävelykierros n. 1 h, Pallolaaksossa valokuvauspysähdys. Vesi (8L/hlö), aurinkovoide, päähine pakollisia — kesäkuussa +30–35°C. Vahvista kuljettajan nimi WhatsAppissa — jos eri henkilö saapuu hakemaan, soita operaattorille ennen lähtöä.',
      en: '⚠️ THIS IS A 4WD + GUIDE TRIP, not the rental car. The rental stays at the hotel. At Sherkala a walking loop of about 1 h, at the Valley of Balls a photo stop. Water (8 L/person), sunscreen, headwear are mandatory — in June it is +30–35°C. Confirm the driver\'s name on WhatsApp — if a different person comes to pick you up, call the operator before leaving.',
      ru: '⚠️ ЭТО ПОЕЗДКА НА 4WD С ГИДОМ, не на арендованном авто. Арендованное остаётся в отеле. У Шеркалы пеший круг около 1 ч, в Долине шаров — остановка для фото. Вода (8 л/чел.), солнцезащитный крем, головной убор обязательны — в июне +30–35°C. Подтвердите имя водителя по WhatsApp — если приедет другой человек, позвоните оператору перед выездом.',
      kk: '⚠️ БҰЛ 4WD + ГИДПЕН САПАР, жалға алынған көлікпен емес. Жалға алынған көлік қонақүйде қалады. Шерқалада шамамен 1 сағаттық серуен, Шарлар алқабында суретке түсу үшін аялдама. Су (1 адамға 8 л), күннен қорғайтын крем, бас киім міндетті — маусымда +30–35°C. Жүргізушінің атын WhatsApp арқылы растаңыз — басқа адам алуға келсе, шығар алдында операторға қоңырау шалыңыз.',
    },
    alternatives: [
      {
        title: {
          fi: '1-päivän express (paluu Aqtauhun illalla)',
          en: '1-day express (return to Aktau in the evening)',
          ru: '1-дневный экспресс (возврат в Актау вечером)',
          kk: '1 күндік экспресс (кешке Ақтауға қайту)',
        },
        summary: {
          fi: 'Vain Sherkala TAI Pallolaakso, ei Bozzhyraa. Halvin ja kevyin.',
          en: 'Only Sherkala OR the Valley of Balls, no Bozzhyra. Cheapest and lightest.',
          ru: 'Только Шеркала ИЛИ Долина шаров, без Бозжыры. Самый дешёвый и лёгкий.',
          kk: 'Тек Шерқала НЕМЕСЕ Шарлар алқабы, Бозжырасыз. Ең арзан әрі жеңіл.',
        },
        tradeoff: {
          fi: '+ säästää 1 päivä reissusta / − ei näe pääikoonia Bozzhyraa',
          en: '+ saves 1 day of the trip / − you do not see the main icon Bozzhyra',
          ru: '+ экономит 1 день поездки / − не увидите главную икону — Бозжыру',
          kk: '+ сапардан 1 күн үнемдейді / − басты белгі Бозжыраны көрмейсіз',
        },
      },
      {
        title: {
          fi: '3-päivän syvempi (lisätään Beket-Ata + Kyzylkup)',
          en: '3-day deeper version (adds Beket-Ata + Kyzylkup)',
          ru: '3-дневный углублённый (добавляются Бекет-Ата + Кызылкуп)',
          kk: '3 күндік тереңірек нұсқа (Бекет-Ата + Қызылқұп қосылады)',
        },
        summary: {
          fi: 'Kolmas päivä Beket-Atan luolamoskeijaan ja Kyzylkupin punaiseen Linnanlaaksoon.',
          en: 'Third day to Beket-Ata cave mosque and the red Castle Valley at Kyzylkup.',
          ru: 'Третий день — к пещерной мечети Бекет-Ата и красной Долине замков в Кызылкупе.',
          kk: 'Үшінші күн Бекет-Атаның үңгір мешітіне және Қызылқұптағы қызыл Қамалдар алқабына.',
        },
        tradeoff: {
          fi: '+ kattaa kaiken / − vie 3 päivää Almaty/Astana-ajasta',
          en: '+ covers everything / − takes 3 days from Almaty/Astana time',
          ru: '+ охватывает всё / − забирает 3 дня из времени на Алматы/Астану',
          kk: '+ бәрін қамтиды / − Алматы/Астана уақытынан 3 күн алады',
        },
      },
      {
        title: {
          fi: 'Sherkala vuokra-autolla itse',
          en: 'Sherkala on your own with the rental',
          ru: 'Шеркала самостоятельно на арендованном авто',
          kk: 'Шерқалаға жалға алынған көлікпен өздігіңізше',
        },
        summary: {
          fi: 'Sherkalaan pääsee päällystettyä tietä ja 10–15 km gravelia kuivassa säässä. Voitte ajaa itse päiväretkenä Aqtausta (~170 km/suunta) jos vuokrasopimus sallii sorateiden ajamisen — VARMISTA TÄMÄ vuokraamosta.',
          en: 'Sherkala is reachable by paved road plus 10–15 km of gravel in dry weather. You can drive there yourself as a day trip from Aktau (~170 km each way) if your rental contract allows gravel roads — CONFIRM THIS with the rental company.',
          ru: 'До Шеркалы можно доехать по асфальту, плюс 10–15 км гравия в сухую погоду. Можно съездить туда самостоятельно одним днём из Актау (~170 км в одну сторону), если договор аренды разрешает движение по грунтовкам — УТОЧНИТЕ это в прокате.',
          kk: 'Шерқалаға асфальт жолмен және құрғақ ауа райында 10–15 км қиыршық таспен жетуге болады. Жалдау шарты қиыршық таста жүруге рұқсат берсе, Ақтаудан күндізгі сапар ретінде өздігіңізше барып келуге болады (~170 км бір бағытта) — мұны жалдау компаниясынан АНЫҚТАП АЛЫҢЫЗ.',
        },
        tradeoff: {
          fi: '+ halvempi / − vain Sherkala, ei muita kohteita; ajaminen vie energiaa',
          en: '+ cheaper / − only Sherkala, no other sights; driving drains energy',
          ru: '+ дешевле / − только Шеркала, без других мест; вождение забирает силы',
          kk: '+ арзанырақ / − тек Шерқала, басқа нысандарсыз; көлік жүргізу күш алады',
        },
      },
    ],
    backupPlan: {
      fi: 'Jos sää on liian kuuma (>40°C) tai pölymyrsky, siirrä retki päivällä eteenpäin. Kuljettaja antaa yleensä vapaata peruutusta 24 h ennen.',
      en: 'If the weather is too hot (>40°C) or there is a dust storm, push the trip one day forward. The driver usually allows free cancellation 24 h in advance.',
      ru: 'Если погода слишком жаркая (>40°C) или пыльная буря, перенесите выезд на день вперёд. Водитель обычно даёт бесплатную отмену за 24 часа.',
      kk: 'Ауа райы тым ыстық (>40°C) немесе шаңды дауыл болса, сапарды бір күнге кейін шегеріңіз. Жүргізуші әдетте 24 сағат бұрын тегін бас тартуға мүмкіндік береді.',
    },
    cashKZT: 80000,
    driverNeeded: true,
    earlyWakeRisk: false,
    offlineNote: {
      fi: 'Mangystaussa signaalia ei usein ole. Lataa 2GIS + Organic Maps offline. WhatsApp/Telegram-yhteys kuljettajaan lähtöpäivänä etukäteen.',
      en: 'In Mangystau there is often no signal. Download 2GIS + Organic Maps offline. Have a WhatsApp/Telegram contact with the driver ready before departure day.',
      ru: 'В Мангистау сигнала часто нет. Скачайте 2GIS + Organic Maps офлайн. Заранее наладьте WhatsApp/Telegram-связь с водителем до дня выезда.',
      kk: 'Маңғыстауда сигнал жиі болмайды. 2GIS + Organic Maps-ты офлайн жүктеп алыңыз. Шығу күніне дейін жүргізушімен WhatsApp/Telegram байланысы дайын болсын.',
    },
    notes: {
      fi: 'OPERAATTORI varattu etukäteen (ks. logistics.ts → mangystauOperators). TOP-3-suositus: Mangystau Tour 999 (WhatsApp +7 700 909 9986, $900/auto/2pv), RedMaya Travel (WhatsApp +7 771 286 9516, pyydä opas Nurdiyar/Saken), Travel to Mangistau (WhatsApp +7 702 466 3322). Strategia: lähetä sama briefi kolmelle rinnan **viim. 22.5.**, varaa nopeimmin vastaava 20 % Wise-ennakolla, loput käteisellä KZT. Vuokra-auto jää hotellin parkkipaikalle — kysele turvallisuutta etukäteen.',
      en: 'OPERATOR booked in advance (see logistics.ts → mangystauOperators). TOP-3 recommendation: Mangystau Tour 999 (WhatsApp +7 700 909 9986, $900/car/2 days), RedMaya Travel (WhatsApp +7 771 286 9516, ask for guide Nurdiyar/Saken), Travel to Mangistau (WhatsApp +7 702 466 3322). Strategy: send the same brief to three operators in parallel **by 22 May**, book the first one to reply with a 20% Wise deposit and the rest in KZT cash. The rental car stays in the hotel parking — ask about security in advance.',
      ru: 'ОПЕРАТОР забронирован заранее (см. logistics.ts → mangystauOperators). ТОП-3: Mangystau Tour 999 (WhatsApp +7 700 909 9986, $900/машина/2 дня), RedMaya Travel (WhatsApp +7 771 286 9516, просите гида Нурдияра/Сакена), Travel to Mangistau (WhatsApp +7 702 466 3322). Стратегия: отправьте один и тот же бриф трём операторам параллельно **до 22.05.**, забронируйте первого ответившего с предоплатой 20% через Wise, остальное — наличными KZT. Арендованное авто остаётся на парковке отеля — заранее уточните безопасность.',
      kk: 'ОПЕРАТОР алдын ала брондалған (logistics.ts → mangystauOperators қараңыз). ТОП-3 ұсыныс: Mangystau Tour 999 (WhatsApp +7 700 909 9986, $900/көлік/2 күн), RedMaya Travel (WhatsApp +7 771 286 9516, Нурдияр/Сәкен гидін сұраңыз), Travel to Mangistau (WhatsApp +7 702 466 3322). Стратегия: үш операторға бір мезгілде бір ғана брифті жіберіңіз **22.05-ке дейін**, ең алдымен жауап бергенді Wise арқылы 20% алдын ала төлеммен брондап, қалғанын қолма-қол KZT-мен төлеңіз. Жалға алынған көлік қонақүйдің тұрағында қалады — қауіпсіздікті алдын ала сұраңыз.',
    },
  },

  // ============== PÄIVÄ 4 — Mangystau day 2 ==============
  {
    day: 4,
    date: '2026-06-02',
    city: {
      fi: 'Mangystau (Bozzhyra) → Aqtau',
      en: 'Mangystau (Bozzhyra) → Aktau',
      ru: 'Мангистау (Бозжыра) → Актау',
      kk: 'Маңғыстау (Бозжыра) → Ақтау',
    },
    sleepCity: { fi: 'Aqtau', en: 'Aktau', ru: 'Актау', kk: 'Ақтау' },
    title: {
      fi: 'Mangystau 4WD-retki päivä 2 — Bozzhyra + paluu',
      en: 'Mangystau 4WD trip day 2 — Bozzhyra + return',
      ru: 'Поездка по Мангистау на 4WD день 2 — Бозжыра + возвращение',
      kk: 'Маңғыстау 4WD сапары 2-күн — Бозжыра + қайту',
    },
    summary: {
      fi: 'Aamulla auringonnousu Bozzhyran kanjonissa (4WD-opasretken jatko). Pitkä ajo Tuzbairin suolajärven kautta takaisin Aqtauhun. Paluu iltapäivällä, vuokra-auton palautus ЖК Оазikseen ennen illallista.',
      en: 'Sunrise in the Bozzhyra canyon in the morning (continuation of the 4WD guided trip). Long drive back to Aktau via the Tuzbair salt flat. Return in the afternoon, drop off the rental at ZhK Oazis before dinner.',
      ru: 'Утром рассвет в каньоне Бозжыра (продолжение поездки на 4WD с гидом). Долгая дорога обратно в Актау через солончак Тузбаир. Возвращение днём, сдача арендованного авто в ЖК Оазис до ужина.',
      kk: 'Таңертең Бозжыра шатқалында күн шығу (4WD гидпен сапардың жалғасы). Тұзбайыр тұзды көлі арқылы Ақтауға ұзақ жол. Түстен кейін қайту, кешкі асқа дейін ЖК Оазисте жалға алынған көлікті тапсыру.',
    },
    sightIds: ['bozzhyra', 'tuzbair'],
    anchors: [
      {
        time: { fi: '05:00', en: '05:00', ru: '05:00', kk: '05:00' },
        kind: 'tour',
        label: {
          fi: 'Auringonnousu Bozzhyrassa — paras valo',
          en: 'Sunrise at Bozzhyra — best light',
          ru: 'Рассвет в Бозжыре — лучший свет',
          kk: 'Бозжырада күн шығу — ең жақсы жарық',
        },
      },
      {
        time: { fi: '~18:00', en: '~18:00', ru: '~18:00', kk: '~18:00' },
        kind: 'arrival',
        label: {
          fi: 'Paluu Aqtauhun + vuokra-auto haku hotellilta',
          en: 'Return to Aktau + pick up the rental from the hotel',
          ru: 'Возвращение в Актау + забор арендованного авто из отеля',
          kk: 'Ақтауға қайту + қонақүйден жалға алынған көлікті алу',
        },
      },
      {
        time: { fi: '~19:00', en: '~19:00', ru: '~19:00', kk: '~19:00' },
        kind: 'drive',
        label: {
          fi: 'Vuokra-auton palautus Caspi autorent — ЖК Оазис (15-й мкр., 69)',
          en: 'Rental return to Caspi autorent — ZhK Oazis (15th mkr., 69)',
          ru: 'Возврат арендованного авто в Caspi autorent — ЖК Оазис (15-й мкр., 69)',
          kk: 'Жалға алынған көлікті Caspi autorent-ке қайтару — ЖК Оазис (15-ші мкр., 69)',
        },
        urgency: 'now',
      },
    ],
    primaryPlan: {
      fi: '⚠️ EDELLEEN 4WD + OPAS. Bozzhyra parhaiten aamuvalossa — 1–2 h kuvauspisteillä. Paluumatkalla pysähdys Tuzbairin näköalapisteellä. Aqtauhun palaamisen jälkeen: suihku, hae oma vuokra-auto hotellin parkista ja **aja se Caspi autorentille ЖК Оазikseen palautukseen (15-й микрорайон, 69 — 43.669388, 51.134028)**. Tarkasta auto kuljettajan kanssa, kuvaa mittarit ja vauriot. Sen jälkeen Yandex Go takaisin keskustaan illalliselle. Loppumaksu Mangystau-kuljettajalle paluun yhteydessä — käteinen KZT, lisäksi tippi 10–15 % ($50–80) kuski + opas.',
      en: '⚠️ STILL 4WD + GUIDE. Bozzhyra is best in morning light — 1–2 h at the viewpoints. On the way back, stop at the Tuzbair viewpoint. After returning to Aktau: shower, pick up your rental from the hotel parking and **drive it back to Caspi autorent at ZhK Oazis (15th microdistrict, 69 — 43.669388, 51.134028)**. Inspect the car with the driver, photograph the meters and any damage. After that, Yandex Go back to the centre for dinner. Final payment to the Mangystau driver on return — in KZT cash, plus a tip of 10–15% ($50–80) for the driver + guide.',
      ru: '⚠️ ВСЁ ЕЩЁ 4WD + ГИД. Бозжыра лучше всего в утреннем свете — 1–2 ч на смотровых точках. На обратном пути остановка на смотровой Тузбаира. После возвращения в Актау: душ, заберите свою арендованную машину с парковки отеля и **отгоните её в Caspi autorent в ЖК Оазис (15-й микрорайон, 69 — 43.669388, 51.134028)**. Проверьте машину с сотрудником, сфотографируйте показания и повреждения. Затем Yandex Go обратно в центр на ужин. Финальная оплата водителю в Мангистау при возвращении — наличными KZT, плюс чаевые 10–15% ($50–80) водителю + гиду.',
      kk: '⚠️ ЖАЛҒАСЫНДА 4WD + ГИД. Бозжыра таңғы жарықта ең жақсы — көрсету нүктелерінде 1–2 сағат. Қайту жолында Тұзбайыр шолу алаңында аялдама. Ақтауға қайтып келген соң: душ қабылдап, жалға алынған көлігіңізді қонақүй тұрағынан алыңыз да, **оны Caspi autorent-ке ЖК Оазиске қайтарыңыз (15-ші шағын аудан, 69 — 43.669388, 51.134028)**. Көлікті қызметкермен тексеріп шығыңыз, есептегіштер мен зақымдарды суретке түсіріңіз. Содан кейін Yandex Go-мен орталыққа кешкі асқа қайтыңыз. Маңғыстау жүргізушісіне қайтып келген кезде соңғы төлем — қолма-қол KZT-мен, оған қоса жүргізушіге + гидке 10–15% ($50–80) шай ақы.',
    },
    backupPlan: {
      fi: 'Jos Bozzhyran tie on huonossa kunnossa (sade tms.), kuljettaja vaihtaa reitin Tuzbairin tai Karyniaragin kautta. Älä paina kuljettajaa kun hän sanoo "ei mene".',
      en: 'If the road to Bozzhyra is in bad shape (rain etc.), the driver will switch the route via Tuzbair or Karyniarag. Do not push the driver when they say "it does not go".',
      ru: 'Если дорога на Бозжыру в плохом состоянии (дождь и т. п.), водитель сменит маршрут через Тузбаир или Карыниараг. Не давите на водителя, если он говорит "не проедем".',
      kk: 'Бозжыраға баратын жол нашар жағдайда болса (жаңбыр т.б.), жүргізуші бағытты Тұзбайыр немесе Қарыниараг арқылы өзгертеді. Жүргізуші "өтпейді" десе, оған қысым жасамаңыз.',
    },
    lodgingHint: {
      area: {
        fi: 'Aqtau keskusta',
        en: 'Aktau city centre',
        ru: 'Центр Актау',
        kk: 'Ақтау орталығы',
      },
      priceRangeEUR: [40, 80],
      bookingApps: ['Booking.com', 'Ostrovok'],
      note: {
        fi: 'Sama hotelli kuin saapumispäivänä, jos säilytyspalvelu hoiti Mangystaun aikana — sovi etukäteen',
        en: 'Same hotel as on arrival day if they stored your luggage during Mangystau — agree in advance',
        ru: 'Тот же отель, что и в день прибытия, если они хранили багаж во время поездки в Мангистау — договоритесь заранее',
        kk: 'Маңғыстау сапары кезінде жүкті сақтап берсе, келген күнгі сол қонақүй — алдын ала келісіңіз',
      },
    },
    cashKZT: 30000,
    driverNeeded: true,
    earlyWakeRisk: true,
    offlineNote: {
      fi: 'Bozzhyrassa ei signaalia. Sovi paluuaika kuljettajan kanssa Aqtau-päässä etukäteen.',
      en: 'No signal in Bozzhyra. Agree on the return time with the driver in advance on the Aktau end.',
      ru: 'В Бозжыре сигнала нет. Заранее согласуйте время возвращения с водителем на стороне Актау.',
      kk: 'Бозжырада сигнал жоқ. Ақтау жағында жүргізушімен қайту уақытын алдын ала келісіңіз.',
    },
  },

  // ============== PÄIVÄ 5 — Aqtau lepopäivä → lento Almatyyn ==============
  {
    day: 5,
    date: '2026-06-03',
    city: {
      fi: 'Aqtau → Almaty',
      en: 'Aktau → Almaty',
      ru: 'Актау → Алматы',
      kk: 'Ақтау → Алматы',
    },
    sleepCity: { fi: 'Almaty', en: 'Almaty', ru: 'Алматы', kk: 'Алматы' },
    title: {
      fi: 'Aqtaun viimeinen päivä — kävely + iltalento Almatyyn',
      en: 'Last day in Aktau — walking + evening flight to Almaty',
      ru: 'Последний день в Актау — прогулка + вечерний рейс в Алматы',
      kk: 'Ақтаудағы соңғы күн — серуен + Алматыға кешкі рейс',
    },
    summary: {
      fi: 'Auto on palautettu eilen — tämä on rauhallinen päivä jalan ja Yandex Go:lla. Aamu rantakadulla, lounas, hotellin checkout, iltalento Almatyyn (FlyArystan klo 21:25 → 00:45).',
      en: 'The car was returned yesterday — this is a calm day on foot and by Yandex Go. Morning on the promenade, lunch, hotel checkout, evening flight to Almaty (FlyArystan 21:25 → 00:45).',
      ru: 'Машина сдана вчера — это спокойный день пешком и на Yandex Go. Утро на набережной, обед, выселение из отеля, вечерний рейс в Алматы (FlyArystan 21:25 → 00:45).',
      kk: 'Көлік кеше тапсырылды — бұл жаяу және Yandex Go-мен өтетін тыныш күн. Таңертең жағалауда, түскі ас, қонақүйден шығу, Алматыға кешкі рейс (FlyArystan 21:25 → 00:45).',
    },
    sightIds: ['aqtau-promenade'],
    anchors: [
      {
        time: { fi: '~09:00', en: '~09:00', ru: '~09:00', kk: '~09:00' },
        kind: 'tour',
        label: {
          fi: 'Aamu rantakadulla — "I love Aktau" -merkki ja Kaspian-promenadi',
          en: 'Morning on the promenade — "I love Aktau" sign and the Caspian promenade',
          ru: 'Утро на набережной — знак "I love Aktau" и каспийский променад',
          kk: 'Таңертең жағалауда — "I love Aktau" белгісі және Каспий променады',
        },
      },
      {
        time: { fi: '~13:00', en: '~13:00', ru: '~13:00', kk: '~13:00' },
        kind: 'tour',
        label: {
          fi: 'Lounas keskustassa, viimeiset lahjaostokset',
          en: 'Lunch in the centre, last souvenir shopping',
          ru: 'Обед в центре, последние покупки сувениров',
          kk: 'Орталықта түскі ас, соңғы сыйлық сатып алу',
        },
      },
      {
        time: { fi: '~16:00', en: '~16:00', ru: '~16:00', kk: '~16:00' },
        kind: 'checkout',
        label: {
          fi: 'Hotellin checkout — säilytä laukut vastaanottoon',
          en: 'Hotel checkout — leave your luggage at the reception',
          ru: 'Выселение из отеля — оставьте багаж на ресепшене',
          kk: 'Қонақүйден шығу — жүкті қабылдау бөлімінде қалдырыңыз',
        },
      },
      {
        time: { fi: '~19:30', en: '~19:30', ru: '~19:30', kk: '~19:30' },
        kind: 'drive',
        label: {
          fi: 'Yandex Go lentokentälle (~30 min, ~3 000 KZT)',
          en: 'Yandex Go to the airport (~30 min, ~3,000 KZT)',
          ru: 'Yandex Go в аэропорт (~30 мин, ~3 000 KZT)',
          kk: 'Yandex Go-мен әуежайға (~30 мин, ~3 000 KZT)',
        },
      },
      {
        time: { fi: '21:25', en: '21:25', ru: '21:25', kk: '21:25' },
        kind: 'flight',
        label: {
          fi: 'FlyArystan SCO → ALA, ~3 h',
          en: 'FlyArystan SCO → ALA, ~3 h',
          ru: 'FlyArystan SCO → ALA, ~3 ч',
          kk: 'FlyArystan SCO → ALA, ~3 сағ',
        },
        urgency: 'week-before',
      },
    ],
    primaryPlan: {
      fi: 'Vuokra-auto on jo palautettu (eilen 2.6.), joten päivä kuluu jalan ja taksilla. Aamulla rauhallisesti kahvit, Kaspian rantakatu ja "I love Aktau" -merkki valokuville. Lounas keskustassa, käteinen KZT loppuun (lentokentällä vaihto on huono). Iltapäivällä hotellin checkout — pyydä laukkujen säilytys vastaanottoon. Yandex Go lentokentälle ajoissa.',
      en: 'The rental was returned yesterday (2 June), so the day is spent on foot and by taxi. In the morning, take it easy with coffees, the Caspian promenade and the "I love Aktau" sign for photos. Lunch in the centre, spend the rest of your KZT cash (exchange at the airport is poor). In the afternoon, hotel checkout — ask reception to store your luggage. Yandex Go to the airport in good time.',
      ru: 'Арендованное авто уже сдано (вчера, 2 июня), поэтому день проходит пешком и на такси. Утром спокойно — кофе, каспийская набережная и знак "I love Aktau" для фото. Обед в центре, потратьте остатки KZT (в аэропорту обмен невыгодный). Днём выселение из отеля — попросите хранение багажа на ресепшене. Yandex Go в аэропорт заранее.',
      kk: 'Жалға алынған көлік кеше (2 маусымда) қайтарылды, сондықтан күн жаяу және таксимен өтеді. Таңертең тыныш — кофе, Каспий жағалауы және "I love Aktau" белгісі суретке түсу үшін. Орталықта түскі ас, қалған KZT-ні жұмсаңыз (әуежайда айырбас тиімсіз). Түстен кейін қонақүйден шығу — қабылдауда жүкті сақтауды сұраңыз. Әуежайға Yandex Go-мен ертерек жетіңіз.',
    },
    alternatives: [
      {
        title: {
          fi: 'Saura-kanjoni taksilla',
          en: 'Saura canyon by taxi',
          ru: 'Каньон Саура на такси',
          kk: 'Саура шатқалына таксимен',
        },
        summary: {
          fi: 'Tilaa Yandex Go tai paikallinen kuljettaja Saura-kanjoniin (~1,5 h/suunta, ~25 000–35 000 KZT kokonaishinta meno-paluu + odotusaika). Pitää ehtiä takaisin checkout-aikaan.',
          en: 'Order Yandex Go or a local driver to the Saura canyon (~1.5 h each way, ~25,000–35,000 KZT total round trip + waiting). You need to be back by checkout time.',
          ru: 'Закажите Yandex Go или местного водителя до каньона Саура (~1,5 ч в одну сторону, ~25 000–35 000 KZT суммарно туда-обратно + ожидание). Нужно успеть к выселению.',
          kk: 'Yandex Go немесе жергілікті жүргізушіні Саура шатқалына шақырыңыз (бір бағытта ~1,5 сағ, барып-қайту + күту үшін жалпы ~25 000–35 000 KZT). Шығу уақытына дейін қайтып келу керек.',
        },
        tradeoff: {
          fi: '+ vielä yksi luontokohde / − maksaa ~30 € + vie energiaa lennon edellä',
          en: '+ one more nature spot / − costs ~€30 + drains energy before the flight',
          ru: '+ ещё одно природное место / − ~30 € + забирает силы перед рейсом',
          kk: '+ тағы бір табиғи нысан / − ~30 € + рейс алдында күшті алады',
        },
      },
      {
        title: {
          fi: 'Cape Zhygylgan taksilla / opastetulla retkellä',
          en: 'Cape Zhygylgan by taxi / on a guided trip',
          ru: 'Мыс Жыгылган на такси / с гидом',
          kk: 'Жығылған мүйісіне таксимен / гидпен',
        },
        summary: {
          fi: 'Vaatii kokopäiväkuljetuksen (2,5–3 h/suunta) — käytännössä yksityinen kuljettaja koko päiväksi 40 000–60 000 KZT. Paluu tiukasti checkout-aikaan.',
          en: 'Requires a full-day driver (2.5–3 h each way) — effectively a private driver for the whole day at 40,000–60,000 KZT. Return strictly before checkout time.',
          ru: 'Требуется водитель на весь день (2,5–3 ч в одну сторону) — фактически частный водитель на день за 40 000–60 000 KZT. Возврат строго к выселению.',
          kk: 'Толық күндік жүргізушіні талап етеді (бір бағытта 2,5–3 сағ) — іс жүзінде күні бойы жеке жүргізуші 40 000–60 000 KZT. Шығу уақытына дейін қатаң қайту керек.',
        },
        tradeoff: {
          fi: '+ dramaattinen maisema / − kallis ja raskas iltalennon edellä',
          en: '+ dramatic landscape / − expensive and heavy before an evening flight',
          ru: '+ драматичный пейзаж / − дорого и тяжело перед вечерним рейсом',
          kk: '+ әсерлі пейзаж / − қымбат әрі кешкі рейс алдында ауыр',
        },
      },
      {
        title: {
          fi: 'Aamulento + päivä Almatyssa',
          en: 'Morning flight + a day in Almaty',
          ru: 'Утренний рейс + день в Алматы',
          kk: 'Таңғы рейс + Алматыда күн',
        },
        summary: {
          fi: 'Lento aamulla → koko päivä Almatyssa. Vältä jos Mangystau-paluu venyi.',
          en: 'Morning flight → full day in Almaty. Avoid if the Mangystau return ran long.',
          ru: 'Утренний рейс → целый день в Алматы. Избегайте, если возвращение из Мангистау затянулось.',
          kk: 'Таңғы рейс → күні бойы Алматыда. Маңғыстаудан қайту ұзаққа созылса, бұл нұсқадан бас тартыңыз.',
        },
        tradeoff: {
          fi: '+ ekstrapäivä Almatyssa / − Aqtaun viimeinen päivä menetetty',
          en: '+ extra day in Almaty / − last day in Aktau lost',
          ru: '+ дополнительный день в Алматы / − потерян последний день в Актау',
          kk: '+ Алматыда қосымша күн / − Ақтаудағы соңғы күн жоғалады',
        },
      },
    ],
    backupPlan: {
      fi: 'Jos Mangystau uuvutti aidosti, hyppää alternativet pois ja vietä päivä rauhassa kahvilassa + rantakadulla. Iltalento on tärkein, älä myöhästy siitä.',
      en: 'If Mangystau really wore you out, skip the alternatives and spend the day quietly in a cafe and on the promenade. The evening flight is the priority — do not be late.',
      ru: 'Если Мангистау действительно вымотал, пропустите альтернативы и проведите день спокойно в кафе и на набережной. Вечерний рейс — главное, не опоздайте.',
      kk: 'Маңғыстау шынымен шаршатса, баламалардан бас тартып, күнді кафеде және жағалауда тыныш өткізіңіз. Кешкі рейс ең маңыздысы, кешікпеңіз.',
    },
    lodgingHint: {
      area: {
        fi: 'Almaty keskusta — Dostyk Avenue / Panfilov',
        en: 'Almaty city centre — Dostyk Avenue / Panfilov',
        ru: 'Центр Алматы — проспект Достык / Панфилов',
        kk: 'Алматы орталығы — Достық даңғылы / Панфилов',
      },
      priceRangeEUR: [50, 100],
      bookingApps: ['Booking.com', 'Ostrovok', 'Airbnb'],
      note: {
        fi: 'Yön check-in mahdollinen, mutta varmista että vastaanotto on auki 01:00',
        en: 'Night check-in is possible, but confirm reception is open at 01:00',
        ru: 'Ночной заезд возможен, но убедитесь, что ресепшен работает в 01:00',
        kk: 'Түнгі тіркелу мүмкін, бірақ қабылдау бөлімінің 01:00-де ашық екеніне көз жеткізіңіз',
      },
    },
    cashKZT: 15000,
    driverNeeded: false,
    earlyWakeRisk: false,
    offlineNote: {
      fi: 'Jos otat Saura-alternativen, lataa Organic Maps Mangystau ennen lähtöä — viimeiset km offline-kartalla.',
      en: 'If you take the Saura alternative, download Organic Maps Mangystau before leaving — the last kilometres on the offline map.',
      ru: 'Если выбрали альтернативу с Саурой, скачайте Organic Maps Mangystau до выезда — последние километры по офлайн-карте.',
      kk: 'Саура нұсқасын таңдасаңыз, шығар алдында Organic Maps-тың Маңғыстау картасын жүктеңіз — соңғы шақырымдар офлайн картамен.',
    },
  },

  // ============== PÄIVÄ 6 — Almaty-saapuminen + Kök-Zhailau (kevyt akklimatisointi) ==============
  {
    day: 6,
    date: '2026-06-04',
    city: { fi: 'Almaty', en: 'Almaty', ru: 'Алматы', kk: 'Алматы' },
    sleepCity: { fi: 'Almaty', en: 'Almaty', ru: 'Алматы', kk: 'Алматы' },
    title: {
      fi: 'Almaty-saapuminen + Kök-Zhailau-akklimatisointi',
      en: 'Arrival in Almaty + Kok-Zhailau acclimatisation',
      ru: 'Прибытие в Алматы + акклиматизация на Кок-Жайляу',
      kk: 'Алматыға келу + Көк Жайлауда бейімделу',
    },
    summary: {
      fi: 'Yöllinen saapuminen lennolla → aamu nukkuen. Iltapäivällä kevyt akklimatisointikävely Kök-Zhailau-ylätasangolle (2240 m) — helppo polku, ei lupia.',
      en: 'Night arrival by flight → morning sleeping in. In the afternoon, an easy acclimatisation walk up to the Kok-Zhailau plateau (2,240 m) — an easy trail, no permits.',
      ru: 'Ночное прибытие рейсом → утро на сон. Днём лёгкая акклиматизационная прогулка на плато Кок-Жайляу (2240 м) — лёгкая тропа, без пропусков.',
      kk: 'Түнгі рейспен келу → таңертең ұйықтау. Түстен кейін Көк Жайлау жайлауына (2240 м) жеңіл бейімделу серуені — жеңіл соқпақ, рұқсат қажет емес.',
    },
    sightIds: ['kok-zhailau', 'green-bazaar'],
    anchors: [
      {
        time: { fi: '~01:00', en: '~01:00', ru: '~01:00', kk: '~01:00' },
        kind: 'arrival',
        label: {
          fi: 'Almaty Intl (ALA) — taksi keskustaan',
          en: 'Almaty Intl (ALA) — taxi to the city centre',
          ru: 'Алматы Интл (ALA) — такси в центр',
          kk: 'Алматы Халықаралық (ALA) — орталыққа такси',
        },
      },
    ],
    primaryPlan: {
      fi: 'Aamu nukkuen yön päälle. Iltapäivällä bussi 12 Prosveshchenets-lähtöpisteelle ja kevyt akklimatisointivaellus Kök-Zhailau-ylätasangolle (2240 m): 10–13 km edestakaisin, nousua +600–700 m, 5–6 h, ei lupia. Vesi ja eväät mukaan, tasangolla ei kioskeja. Tämä on tärkeä korkeuskävely ennen huomista Furmanovia. Vesipullot täyteen ja kerrospukeutuminen.',
      en: 'Morning sleeping off the night. In the afternoon, bus 12 to the Prosveshchenets trailhead and an easy acclimatisation hike up to the Kok-Zhailau plateau (2,240 m): 10–13 km return, +600–700 m of ascent, 5–6 h, no permits. Bring water and snacks — no kiosks on the plateau. This is an important altitude walk before tomorrow\'s Furmanov. Fill your water bottles and dress in layers.',
      ru: 'Утром отсыпаемся после ночи. Днём автобус 12 до старта Просвещенец и лёгкий акклиматизационный поход на плато Кок-Жайляу (2240 м): 10–13 км туда-обратно, набор +600–700 м, 5–6 ч, без пропусков. Берите воду и перекус — на плато нет киосков. Это важная высотная прогулка перед завтрашним Фурмановым. Наполните бутылки и оденьтесь слоями.',
      kk: 'Таңертең түннен кейін ұйықтап аламыз. Түстен кейін 12 автобуспен Просвещенец бастауына барып, Көк Жайлау жайлауына (2240 м) жеңіл бейімделу жорығы: барып-қайту 10–13 км, көтерілу +600–700 м, 5–6 сағат, рұқсат қажет емес. Су мен азық алыңыз — жайлауда дүңгіршек жоқ. Бұл ертеңгі Фурмановқа дейінгі маңызды биіктік серуені. Су бөтелкелерін толтырып, қабат-қабат киініңіз.',
    },
    alternatives: [
      {
        title: {
          fi: 'Klassinen Almaty-kaupunkikävely',
          en: 'Classic Almaty city walk',
          ru: 'Классическая прогулка по Алматы',
          kk: 'Классикалық Алматы серуені',
        },
        summary: {
          fi: 'Jos yölento uuvutti, jätä vaellus väliin: Panfilovin puisto, Zenkov-katedraali ja Vihreä basaari kävellen, lounas basaarissa.',
          en: 'If the night flight wore you out, skip the hike: Panfilov Park, Zenkov Cathedral and the Green Bazaar on foot, lunch at the bazaar.',
          ru: 'Если ночной рейс вымотал, пропустите поход: парк Панфилова, Вознесенский собор Зенкова и Зелёный базар пешком, обед на базаре.',
          kk: 'Түнгі рейс шаршатса, жорықты өткізіп жіберіңіз: Панфилов саябағы, Зенков соборы және Жасыл базар жаяу, базарда түскі ас.',
        },
        tradeoff: {
          fi: '+ kevyt lennon jälkeen / − ei korkeusakklimatisointia ennen Furmanovia',
          en: '+ light after the flight / − no altitude acclimatisation before Furmanov',
          ru: '+ легко после рейса / − без высотной акклиматизации перед Фурмановым',
          kk: '+ рейстен кейін жеңіл / − Фурмановқа дейін биіктікке бейімделусіз',
        },
        sightIds: ['almaty-keskusta', 'zenkov-cathedral', 'green-bazaar'],
      },
      {
        title: {
          fi: 'Butakovkan vesiputoukset (helppo vaihtoehto)',
          en: 'Butakovka Waterfalls (easy alternative)',
          ru: 'Бутаковские водопады (лёгкая альтернатива)',
          kk: 'Бутаковка сарқырамалары (жеңіл балама)',
        },
        summary: {
          fi: 'Helppo metsävaellus vesiputouksille kaupungin kupeessa — alaputoukselle 6–8 km edestakaisin, 3–4 h. Bussi 29P eco-postille.',
          en: 'An easy forest hike to waterfalls on the city\'s edge — 6–8 km return to the lower fall, 3–4 h. Bus 29P to the eco-post.',
          ru: 'Лёгкий лесной маршрут к водопадам у края города — до нижнего водопада 6–8 км туда-обратно, 3–4 ч. Автобус 29P до эко-поста.',
          kk: 'Қаланың шетіндегі сарқырамаларға жеңіл орман жорығы — төменгі сарқыраға барып-қайту 6–8 км, 3–4 сағат. 29P автобус эко-бекетке.',
        },
        tradeoff: {
          fi: '+ kevyempi ja lyhyempi / − vähemmän korkeutta akklimatisointiin',
          en: '+ lighter and shorter / − less altitude for acclimatisation',
          ru: '+ легче и короче / − меньше высоты для акклиматизации',
          kk: '+ жеңілірек әрі қысқа / − бейімделуге биіктік аз',
        },
        sightIds: ['butakovka-falls'],
      },
    ],
    backupPlan: {
      fi: 'Jos yölento oli rankka, täysi lepo hotellissa — Furmanov huomenna vaatii voimia. Kök-Zhailaun voi siirtää tai korvata kevyellä kaupunkikävelyllä.',
      en: 'If the night flight was rough, full rest at the hotel — Furmanov tomorrow needs energy. Kok-Zhailau can be postponed or replaced with an easy city walk.',
      ru: 'Если ночной рейс был тяжёлым, полный отдых в отеле — на завтрашний Фурманов нужны силы. Кок-Жайляу можно перенести или заменить лёгкой прогулкой по городу.',
      kk: 'Түнгі рейс ауыр болса, қонақүйде толық демалыңыз — ертеңгі Фурмановқа күш керек. Көк Жайлауды кейінге қалдыруға немесе жеңіл қала серуенімен ауыстыруға болады.',
    },
    lodgingHint: {
      area: {
        fi: 'Dostyk Avenue tai Almaly — keskeinen ja kävelyetäisyys nähtävyyksille',
        en: 'Dostyk Avenue or Almaly — central and within walking distance of the sights',
        ru: 'Проспект Достык или Алмалы — центрально и в пешей доступности от достопримечательностей',
        kk: 'Достық даңғылы немесе Алмалы — орталық, көрікті жерлерге жаяу жетуге болады',
      },
      priceRangeEUR: [50, 100],
      bookingApps: ['Booking.com', 'Ostrovok', 'Airbnb'],
    },
    cashKZT: 8000,
    driverNeeded: false,
    earlyWakeRisk: false,
    offlineNote: {
      fi: 'Alkukesäkuu on lumen sulamiskautta — tarkista Kök-Zhailaun säätila ja lataa Organic Maps Almaty offline ennen lähtöä.',
      en: 'Early June is the snowmelt season — check the Kok-Zhailau weather and download Organic Maps Almaty offline before setting off.',
      ru: 'Начало июня — сезон таяния снега — проверьте погоду на Кок-Жайляу и скачайте Organic Maps по Алматы офлайн перед выходом.',
      kk: 'Маусым басы — қар еру маусымы — Көк Жайлаудың ауа райын тексеріп, шығар алдында Organic Maps-тың Алматы картасын офлайн жүктеп алыңыз.',
    },
  },

  // ============== PÄIVÄ 7 — Furmanov-huippu (nimetty huippu jalan) ==============
  {
    day: 7,
    date: '2026-06-05',
    city: { fi: 'Almaty', en: 'Almaty', ru: 'Алматы', kk: 'Алматы' },
    sleepCity: { fi: 'Almaty', en: 'Almaty', ru: 'Алматы', kk: 'Алматы' },
    title: {
      fi: 'Furmanov-huippu (3050 m) jalan',
      en: 'Furmanov Peak (3,050 m) on foot',
      ru: 'Пик Фурманова (3050 м) пешком',
      kk: 'Фурманов шыңы (3050 м) жаяу',
    },
    summary: {
      fi: 'Koko päivän vaellus Furmanov-huipulle (3050 m) suoraan Medeun luistinradalta (1609 m). ~16 km edestakaisin, nousua ~1400 m, 7–8 h. Lähde aamulla iltapäiväukkosten takia.',
      en: 'A full-day hike up Furmanov Peak (3,050 m) straight from the Medeu rink (1,609 m). ~16 km return, ~1,400 m of ascent, 7–8 h. Start in the morning because of afternoon thunderstorms.',
      ru: 'Поход на весь день на пик Фурманова (3050 м) прямо от катка Медеу (1609 м). ~16 км туда-обратно, набор ~1400 м, 7–8 ч. Выходите утром из-за дневных гроз.',
      kk: 'Медеу мұз айдынынан (1609 м) тура басталатын Фурманов шыңына (3050 м) күні бойғы жорық. Барып-қайту ~16 км, көтерілу ~1400 м, 7–8 сағат. Түстен кейінгі найзағайға байланысты таңертең шығыңыз.',
    },
    sightIds: ['furmanov-peak', 'medeu-dam'],
    anchors: [
      {
        time: { fi: '07:00', en: '07:00', ru: '07:00', kk: '07:00' },
        kind: 'drive',
        label: {
          fi: 'Bussi 12/28 tai Yandex Go keskustasta Medeulle',
          en: 'Bus 12/28 or Yandex Go from the centre to Medeu',
          ru: 'Автобус 12/28 или Yandex Go из центра на Медеу',
          kk: 'Орталықтан Медеуге 12/28 автобус немесе Yandex Go',
        },
      },
    ],
    primaryPlan: {
      fi: 'Furmanov (3050 m) koko päivän vaelluksena suoraan Medeun luistinradalta (1609 m): ~16 km edestakaisin, nousua ~1400 m, 7–8 h, ei lupia. Lähde aamulla — iltapäivällä Ile-Alatausin harjanteille nousee usein ukkoskuuroja. Täytä vesi ~2,5 km lähteestä, yläosassa ei ole vettä. Pitävät vaelluskengät ja kerrospukeutuminen: alaosa lämmin metsä, harjanne tuulinen ja viileä. Huippu jää lumirajan alapuolelle ja on kuljettavissa, mutta tarkista sää aamulla.',
      en: 'Furmanov (3,050 m) as a full-day hike straight from the Medeu rink (1,609 m): ~16 km return, ~1,400 m of ascent, 7–8 h, no permits. Start in the morning — afternoon thunderstorms often build over the Ile Alatau ridges. Fill up water at the spring around the 2.5 km mark; there is no water higher up. Sturdy hiking boots and layers: the lower section is warm forest, the ridge is windy and cool. The summit sits below the snow line and is walkable, but check the weather in the morning.',
      ru: 'Фурманова (3050 м) как поход на весь день прямо от катка Медеу (1609 м): ~16 км туда-обратно, набор ~1400 м, 7–8 ч, без пропусков. Выходите утром — днём над гребнями Иле-Алатау часто собираются грозы. Наберите воду у родника примерно на 2,5 км, выше воды нет. Надёжные ботинки и одежда слоями: внизу тёплый лес, на гребне ветрено и прохладно. Вершина ниже снеговой линии и проходима, но проверьте погоду утром.',
      kk: 'Фурманов (3050 м) Медеу мұз айдынынан (1609 м) тура басталатын күні бойғы жорық ретінде: барып-қайту ~16 км, көтерілу ~1400 м, 7–8 сағат, рұқсат қажет емес. Таңертең шығыңыз — түстен кейін Іле Алатау жоталарында жиі найзағайлы жаңбыр пайда болады. Шамамен 2,5 км белгісіндегі бұлақтан су толтырыңыз, жоғарыда су жоқ. Берік жорық аяқкиімі мен қабат киім: төменгі бөлік жылы орман, жота желді әрі салқын. Шың қар сызығынан төмен әрі жүруге болады, бірақ таңертең ауа райын тексеріңіз.',
    },
    alternatives: [
      {
        title: {
          fi: '4-huipun harjareitti Shymbulakille',
          en: '4-peak ridge traverse to Shymbulak',
          ru: 'Гребневой траверс 4 вершин до Шымбулака',
          kk: 'Шымбұлаққа дейінгі 4 шыңды жота траверсі',
        },
        summary: {
          fi: 'Kunnostautuneille: Furmanov → Panorama → Bashuta → Shymbulak-huippu, nousua ~2000 m, lasku gondolilla. Pitkä ja vaativa.',
          en: 'For the fit: Furmanov → Panorama → Bashuta → Shymbulak peak, ~2,000 m of ascent, descend by gondola. Long and demanding.',
          ru: 'Для подготовленных: Фурманов → Панорама → Башута → пик Шымбулак, набор ~2000 м, спуск на гондоле. Долгий и тяжёлый.',
          kk: 'Дайындалғандарға: Фурманов → Панорама → Башута → Шымбұлақ шыңы, көтерілу ~2000 м, гондоламен түсу. Ұзақ әрі ауыр.',
        },
        tradeoff: {
          fi: '+ neljä huippua yhdellä reissulla / − ~2000 m nousua, vaatii hyvän kunnon',
          en: '+ four peaks in one go / − ~2,000 m of ascent, needs good fitness',
          ru: '+ четыре вершины за раз / − набор ~2000 м, нужна хорошая форма',
          kk: '+ бір жолы төрт шың / − ~2000 м көтерілу, жақсы форма қажет',
        },
        sightIds: ['furmanov-peak', 'medeu-shymbulak'],
      },
      {
        title: {
          fi: 'Kevyempi Medeu + Shymbulak gondolilla',
          en: 'Lighter Medeu + Shymbulak by gondola',
          ru: 'Полегче: Медеу + Шымбулак на гондоле',
          kk: 'Жеңілірек: Медеу + Шымбұлақ гондоламен',
        },
        summary: {
          fi: 'Jos sää on huono tai kunto ei riitä huipulle: Medeu (1700 m) → Shymbulak (3200 m) gondolihissillä, lounas vuorella.',
          en: 'If the weather is bad or you are not up for the summit: Medeu (1,700 m) → Shymbulak (3,200 m) by gondola, lunch on the mountain.',
          ru: 'Если погода плохая или не до вершины: Медеу (1700 м) → Шымбулак (3200 м) на гондоле, обед в горах.',
          kk: 'Ауа райы нашар болса немесе шыңға күш жетпесе: Медеу (1700 м) → Шымбұлақ (3200 м) гондоламен, тауда түскі ас.',
        },
        tradeoff: {
          fi: '+ helppo ja säävarma / − ei huippukokemusta',
          en: '+ easy and weather-proof / − no summit experience',
          ru: '+ легко и не зависит от погоды / − без вершины',
          kk: '+ жеңіл әрі ауа райына тәуелсіз / − шың тәжірибесі жоқ',
        },
        sightIds: ['medeu-shymbulak'],
      },
      {
        title: {
          fi: 'Kumbel-huippu gondoliavusteisesti',
          en: 'Kumbel Peak with gondola assist',
          ru: 'Пик Кумбель с помощью гондолы',
          kk: 'Гондола көмегімен Күмбел шыңы',
        },
        summary: {
          fi: 'Nouse gondolilla Shymbulakin ylätasolle ja jatka Kumbel-huipulle — lyhyempi nousu kuin Furmanov suoraan Medeulta.',
          en: 'Take the gondola to the upper Shymbulak station and continue to Kumbel Peak — a shorter climb than Furmanov straight from Medeu.',
          ru: 'Поднимитесь на гондоле к верхней станции Шымбулака и продолжите на пик Кумбель — подъём короче, чем Фурманов прямо от Медеу.',
          kk: 'Гондоламен Шымбұлақтың жоғарғы бекетіне көтеріліп, Күмбел шыңына жалғастырыңыз — Медеуден тура Фурмановқа қарағанда қысқа көтерілу.',
        },
        tradeoff: {
          fi: '+ vähemmän nousua / − gondolimaksu, riippuu hissin aukiolosta',
          en: '+ less ascent / − gondola fee, depends on the lift being open',
          ru: '+ меньше набора / − плата за гондолу, зависит от работы подъёмника',
          kk: '+ көтерілу аз / − гондола ақысы, көтергіштің ашық болуына байланысты',
        },
        sightIds: ['kumbel-peak'],
      },
    ],
    backupPlan: {
      fi: 'Sade tai ukkonen harjanteilla → vaihda gondolipäivään (Medeu + Shymbulak). Älä jää harjanteelle ukkosen sattuessa — käänny ajoissa.',
      en: 'Rain or thunderstorms on the ridges → switch to the gondola day (Medeu + Shymbulak). Do not stay on the ridge if a storm hits — turn back in time.',
      ru: 'Дождь или гроза на гребнях → переключитесь на гондольный день (Медеу + Шымбулак). Не оставайтесь на гребне во время грозы — поворачивайте вовремя.',
      kk: 'Жоталарда жаңбыр немесе найзағай болса → гондола күніне ауысыңыз (Медеу + Шымбұлақ). Найзағай болса жотада қалмаңыз — уақытында кері қайтыңыз.',
    },
    lodgingHint: {
      area: {
        fi: 'Sama kuin edellinen yö',
        en: 'Same as the previous night',
        ru: 'Тот же, что и предыдущая ночь',
        kk: 'Алдыңғы түнгідей',
      },
      priceRangeEUR: [50, 100],
      bookingApps: ['Booking.com'],
    },
    cashKZT: 15000,
    driverNeeded: false,
    earlyWakeRisk: true,
    offlineNote: {
      fi: 'Alkukesäkuussa lumi sulaa korkealla — tarkista sää aamulla ja lataa Organic Maps Almaty offline. Iltapäiväukkoset ovat todennäköisiä.',
      en: 'In early June snow is melting at altitude — check the weather in the morning and download Organic Maps Almaty offline. Afternoon thunderstorms are likely.',
      ru: 'В начале июня снег тает на высоте — проверьте погоду утром и скачайте Organic Maps по Алматы офлайн. Днём вероятны грозы.',
      kk: 'Маусым басында биікте қар ериді — таңертең ауа райын тексеріп, Organic Maps-тың Алматы картасын офлайн жүктеңіз. Түстен кейін найзағай ықтимал.',
    },
  },

  // ============== PÄIVÄ 8 — Charyn → ajo Satyyn ==============
  {
    day: 8,
    date: '2026-06-06',
    city: {
      fi: 'Almaty → Charyn → Saty',
      en: 'Almaty → Charyn → Saty',
      ru: 'Алматы → Чарын → Саты',
      kk: 'Алматы → Шарын → Саты',
    },
    sleepCity: {
      fi: 'Saty (guesthouse)',
      en: 'Saty (guesthouse)',
      ru: 'Саты (гостевой дом)',
      kk: 'Саты (қонақ үй)',
    },
    title: {
      fi: 'Charynin kanjoni + ajo Satyyn',
      en: 'Charyn Canyon + drive to Saty',
      ru: 'Чарынский каньон + переезд в Саты',
      kk: 'Шарын шатқалы + Сатыға көшу',
    },
    summary: {
      fi: 'Aikainen lähtö (07:00) kuljettajan kanssa Charynin Linnojen laaksoon. Vaellus joelle ja takaisin, pysähdys Saaren-lehdossa. Iltapäivällä ajo Satyyn — ei palata Almatyyn.',
      en: 'Early departure (07:00) with a driver to the Valley of Castles in Charyn. Hike down to the river and back, a stop at the Ash Grove. In the afternoon, drive on to Saty — no return to Almaty.',
      ru: 'Ранний выезд (07:00) с водителем в Долину замков в Чарыне. Поход к реке и обратно, остановка в Ясеневой роще. Днём переезд в Саты — без возвращения в Алматы.',
      kk: 'Жүргізушімен ерте шығу (07:00) Шарындағы Қамалдар алқабына. Өзенге дейін серуен және кері қайту, Шағанды тоғайында аялдама. Түстен кейін Сатыға көшу — Алматыға қайтпайды.',
    },
    sightIds: ['charyn-canyon', 'charyn-ash-grove'],
    anchors: [
      {
        time: { fi: '07:00', en: '07:00', ru: '07:00', kk: '07:00' },
        kind: 'drive',
        label: {
          fi: 'Lähtö Almatysta kuljettajan kanssa — pickup hotellilta',
          en: 'Departure from Almaty with the driver — pickup at the hotel',
          ru: 'Выезд из Алматы с водителем — забор у отеля',
          kk: 'Жүргізушімен Алматыдан шығу — қонақүйден алу',
        },
        urgency: 'on-arrival',
      },
      {
        time: {
          fi: 'iltapäivä',
          en: 'afternoon',
          ru: 'после полудня',
          kk: 'түстен кейін',
        },
        kind: 'drive',
        label: {
          fi: 'Ajo Charynista Satyyn (Kolsain tukikohta)',
          en: 'Drive from Charyn to Saty (Kolsai base)',
          ru: 'Переезд из Чарына в Саты (база для Кольсая)',
          kk: 'Шарыннан Сатыға көшу (Көлсай тірегі)',
        },
      },
      {
        time: { fi: 'ilta', en: 'evening', ru: 'вечер', kk: 'кешке' },
        kind: 'checkin',
        label: {
          fi: 'Saty-guesthouse — käteismaksu, ateriat sis.',
          en: 'Saty guesthouse — cash payment, meals included',
          ru: 'Гостевой дом в Саты — оплата наличными, питание включено',
          kk: 'Саты қонақ үйі — қолма-қол төлем, тамақ кіреді',
        },
      },
    ],
    primaryPlan: {
      fi: 'Aikainen lähtö Almatysta (07:00) kuljettajan kanssa, ~3,5 h ajo. Charynin Linnojen laakso: laskeudu joelle (~5 km edestakaisin, 2–3 h), palaa rim-yläpolkua näköalojen kautta. Pysähdys Saaren-lehdossa (Sarytogai). Vie 2 l vettä/hlö ja päähine, lähde laaksoon aikaisin kuumuuden takia. Iltapäivällä ajo Satyyn — tämä yhdistää Charynin ja Kolsai-osuuden saumattomasti, ei palata Almatyyn. ⚠️ Tarvitaan kuljettaja koko Charyn→Saty-osuudelle (tai oma järjestely).',
      en: 'Early departure from Almaty (07:00) with a driver, ~3.5 h drive. Charyn Valley of Castles: descend to the river (~5 km return, 2–3 h), come back along the upper rim path past the viewpoints. Stop at the Ash Grove (Sarytogai). Bring 2 L water per person and headwear, and head into the valley early because of the heat. In the afternoon, drive on to Saty — this links Charyn and the Kolsai leg seamlessly with no return to Almaty. ⚠️ A driver is needed for the whole Charyn→Saty leg (or your own arrangement).',
      ru: 'Ранний выезд из Алматы (07:00) с водителем, ~3,5 ч в пути. Долина замков в Чарыне: спуститесь к реке (~5 км туда-обратно, 2–3 ч), вернитесь по верхней тропе вдоль смотровых. Остановка в Ясеневой роще (Сарытогай). Берите 2 л воды на человека и головной убор, в долину спускайтесь рано из-за жары. Днём переезд в Саты — так Чарын и Кольсай соединяются без возврата в Алматы. ⚠️ Водитель нужен на весь участок Чарын→Саты (или своя организация).',
      kk: 'Жүргізушімен Алматыдан ерте шығу (07:00), ~3,5 сағаттық жол. Шарынның Қамалдар алқабы: өзенге түсіңіз (барып-қайту ~5 км, 2–3 сағат), жоғарғы соқпақпен шолу нүктелері арқылы қайтыңыз. Шағанды тоғайында (Сарытоғай) аялдама. 1 адамға 2 л су мен бас киім алыңыз, ыстыққа байланысты алқапқа ерте түсіңіз. Түстен кейін Сатыға көшу — бұл Шарын мен Көлсай бөлігін Алматыға қайтпай үздіксіз байланыстырады. ⚠️ Бүкіл Шарын→Саты бөлігіне жүргізуші қажет (немесе өз ұйымдастыруыңыз).',
    },
    alternatives: [
      {
        title: {
          fi: '"4 kanjonin" jeeppikierros',
          en: '"4 canyons" jeep tour',
          ru: 'Джип-тур «4 каньона»',
          kk: '«4 шатқал» джип-туры',
        },
        summary: {
          fi: 'Jos halutaan enemmän Charynia: Kuu-, Musta- ja Temirlik-kanjonit jeepillä. Vie oman päivän — siirtäisi Saty-ajon eteenpäin.',
          en: 'If you want more Charyn: the Moon, Black and Temirlik canyons by jeep. Takes a whole day — would push the Saty drive forward.',
          ru: 'Если хочется больше Чарына: Лунный, Чёрный и Темирликский каньоны на джипе. Занимает целый день — сдвинет переезд в Саты.',
          kk: 'Шарынды көбірек қаласаңыз: Ай, Қара және Темірлік шатқалдары джиппен. Бір күнді алады — Сатыға көшуді кейінге жылжытады.',
        },
        tradeoff: {
          fi: '+ enemmän Charynia / − vie oman päivän, lykkää Saty-osuutta',
          en: '+ more Charyn / − takes a whole day, delays the Saty leg',
          ru: '+ больше Чарына / − занимает целый день, откладывает Саты',
          kk: '+ Шарын көбірек / − бір күнді алады, Сатыны кейінге жылжытады',
        },
        sightIds: ['charyn-canyon'],
      },
      {
        title: {
          fi: 'Turgen-rotko matkan varrella',
          en: 'Turgen Gorge on the way',
          ru: 'Тургеньское ущелье по пути',
          kk: 'Жол бойындағы Түрген шатқалы',
        },
        summary: {
          fi: 'Jos aikaa jää, pysähdys Turgen-rotkon vesiputouksille matkan varrella ennen Satyä.',
          en: 'If there is time, a stop at the Turgen Gorge waterfalls along the way before Saty.',
          ru: 'Если есть время, остановка у водопадов Тургеньского ущелья по пути до Саты.',
          kk: 'Уақыт болса, Сатыға дейін жол бойындағы Түрген шатқалының сарқырамаларында аялдама.',
        },
        tradeoff: {
          fi: '+ ekstrakohde matkalla / − pidentää päivää, vähemmän aikaa Charynissa',
          en: '+ extra sight en route / − lengthens the day, less time at Charyn',
          ru: '+ ещё одно место по пути / − удлиняет день, меньше времени в Чарыне',
          kk: '+ жол бойындағы қосымша нысан / − күнді ұзартады, Шарында уақыт аз',
        },
        sightIds: ['turgen-gorge'],
      },
    ],
    backupPlan: {
      fi: 'Helle yli +35°C → lähde laaksoon klo 08 ja nouse takaisin ennen keskipäivää. Älä jää keskipäivän kuumaan kanjoniin. Ajon Satyyn voi tehdä illalla viileämmässä.',
      en: 'Heat above +35°C → go into the valley by 08:00 and climb back before midday. Do not get caught in the midday canyon heat. The drive to Saty can be done in the cooler evening.',
      ru: 'Жара выше +35°C → спускайтесь в долину к 08:00 и поднимайтесь до полудня. Не оставайтесь в каньоне в полуденный зной. Переезд в Саты можно сделать прохладным вечером.',
      kk: '+35°C-тан жоғары ыстық → алқапқа 08:00-ге дейін түсіп, түске дейін көтеріліп үлгеріңіз. Күн ортасында шатқалдың ыстығында қалмаңыз. Сатыға көшуді салқын кеште жасауға болады.',
    },
    lodgingHint: {
      area: {
        fi: 'Saty-kylä — guesthouse (esim. Kolsay Aisha), ei verkkovarausta',
        en: 'Saty village — guesthouse (e.g. Kolsay Aisha), no online booking',
        ru: 'Село Саты — гостевой дом (напр. Kolsay Aisha), без онлайн-бронирования',
        kk: 'Саты ауылы — қонақ үй (мысалы, Kolsay Aisha), онлайн брондау жоқ',
      },
      priceRangeEUR: [40, 60],
      bookingApps: ['paikan päällä', 'kuljettajan suositus', 'kalpak-travel.com etukäteen'],
      note: {
        fi: '20 000–30 000 KZT/2 hh sis. ateriat, käteinen. Varaa etukäteen kesäviikonlopuille — paikat täyttyvät.',
        en: '20,000–30,000 KZT per double room including meals, cash. Book ahead for summer weekends — rooms fill up.',
        ru: '20 000–30 000 KZT за двухместный номер с питанием, наличные. Бронируйте заранее на летние выходные — места заполняются.',
        kk: 'Тамақпен қоса 2 орындық бөлме 20 000–30 000 KZT, қолма-қол. Жазғы демалыс күндеріне алдын ала брондаңыз — орындар толады.',
      },
    },
    cashKZT: 60000,
    driverNeeded: true,
    earlyWakeRisk: true,
    offlineNote: {
      fi: 'Charynissa ja Satyssa heikko signaali — lataa 2GIS + Organic Maps Almaty-region offline. Sovi guesthouse käteisellä etukäteen.',
      en: 'Weak signal at Charyn and in Saty — download 2GIS + Organic Maps Almaty region offline. Arrange the guesthouse (cash) in advance.',
      ru: 'В Чарыне и Саты слабый сигнал — скачайте 2GIS + Organic Maps по региону Алматы офлайн. Договоритесь о гостевом доме (наличные) заранее.',
      kk: 'Шарында және Сатыда сигнал әлсіз — 2GIS + Organic Maps-тың Алматы аймағын офлайн жүктеңіз. Қонақ үйді (қолма-қол) алдын ала келісіңіз.',
    },
  },

  // ============== PÄIVÄ 9 — Kolsai-1 → Kolsai-2 -vaellus ==============
  {
    day: 9,
    date: '2026-06-07',
    city: {
      fi: 'Saty / Kolsai',
      en: 'Saty / Kolsai',
      ru: 'Саты / Кольсай',
      kk: 'Саты / Көлсай',
    },
    sleepCity: {
      fi: 'Saty (guesthouse)',
      en: 'Saty (guesthouse)',
      ru: 'Саты (гостевой дом)',
      kk: 'Саты (қонақ үй)',
    },
    title: {
      fi: 'Kolsai-1 → Kolsai-2 -vaellus',
      en: 'Kolsai-1 → Kolsai-2 hike',
      ru: 'Поход Кольсай-1 → Кольсай-2',
      kk: 'Көлсай-1 → Көлсай-2 жорығы',
    },
    summary: {
      fi: 'Päivävaellus Kolsai-1:ltä (1818 m) Kolsai-2:lle (2252 m): ~8–9 km suuntaan, nousua ~430 m, 3–4 h ylös. Lähde aamulla ukkosten takia. Yö Satyssa.',
      en: 'Day hike from Kolsai-1 (1,818 m) to Kolsai-2 (2,252 m): ~8–9 km each way, ~430 m of ascent, 3–4 h up. Start in the morning because of thunderstorms. Night in Saty.',
      ru: 'Дневной поход от Кольсай-1 (1818 м) к Кольсай-2 (2252 м): ~8–9 км в одну сторону, набор ~430 м, 3–4 ч вверх. Выходите утром из-за гроз. Ночь в Саты.',
      kk: 'Көлсай-1-ден (1818 м) Көлсай-2-ге (2252 м) күндізгі жорық: бір бағытта ~8–9 км, көтерілу ~430 м, жоғары 3–4 сағат. Найзағайға байланысты таңертең шығыңыз. Сатыда түнеу.',
    },
    sightIds: ['kolsai-lakes'],
    anchors: [
      {
        time: { fi: '08:00', en: '08:00', ru: '08:00', kk: '08:00' },
        kind: 'drive',
        label: {
          fi: 'Satysta Kolsai-1:lle — lyhyt siirtymä, vaellus alkaa järveltä',
          en: 'From Saty to Kolsai-1 — short transfer, the hike starts at the lake',
          ru: 'Из Саты на Кольсай-1 — короткий переезд, поход начинается у озера',
          kk: 'Сатыдан Көлсай-1-ге — қысқа көшу, жорық көлден басталады',
        },
      },
    ],
    primaryPlan: {
      fi: 'Kolsai-1 (1818 m) → Kolsai-2 (2252 m) -päivävaellus: ~8–9 km suuntaan, nousua ~430 m, 3–4 h ylös ja 5,5–6 h edestakaisin. Lähde aamulla — iltapäivällä nousee ukkoskuuroja. Polku voi olla mutainen ja lumilaikkuja kesäkuun alussa: pitäväpohjaiset kengät, sadetakki, kerrospukeutuminen. Passi pakollinen tarkastuspisteellä. Yö Satyssa.',
      en: 'Kolsai-1 (1,818 m) → Kolsai-2 (2,252 m) day hike: ~8–9 km each way, ~430 m of ascent, 3–4 h up and 5.5–6 h return. Start in the morning — afternoon thunderstorms build up. The trail can be muddy with snow patches in early June: grippy boots, a rain jacket, layers. Your passport is mandatory at the checkpoint. Night in Saty.',
      ru: 'Дневной поход Кольсай-1 (1818 м) → Кольсай-2 (2252 м): ~8–9 км в одну сторону, набор ~430 м, 3–4 ч вверх и 5,5–6 ч туда-обратно. Выходите утром — днём собираются грозы. Тропа может быть грязной, со снежными участками в начале июня: обувь с протектором, дождевик, одежда слоями. Паспорт обязателен на пункте контроля. Ночь в Саты.',
      kk: 'Көлсай-1 (1818 м) → Көлсай-2 (2252 м) күндізгі жорық: бір бағытта ~8–9 км, көтерілу ~430 м, жоғары 3–4 сағат, барып-қайту 5,5–6 сағат. Таңертең шығыңыз — түстен кейін найзағайлы жаңбыр жиналады. Маусым басында соқпақ батпақты әрі қар дақтары болуы мүмкін: табаны берік аяқкиім, жаңбыр плащы, қабат киім. Бақылау бекетінде төлқұжат міндетті. Сатыда түнеу.',
    },
    alternatives: [
      {
        title: {
          fi: 'Kevyt Kolsai-1-rantakierros',
          en: 'Easy Kolsai-1 lakeshore loop',
          ru: 'Лёгкая прогулка вокруг Кольсай-1',
          kk: 'Жеңіл Köлсай-1 жағалау серуені',
        },
        summary: {
          fi: 'Jos kunto tai sää ei salli ylempää: kävelykierros Kolsai-1:n rannalla (1 h), nauti järvimaisemasta.',
          en: 'If fitness or weather does not allow going higher: a walking loop along the Kolsai-1 shore (1 h), enjoy the lake views.',
          ru: 'Если форма или погода не позволяют идти выше: прогулка по берегу Кольсай-1 (1 ч), любуйтесь озером.',
          kk: 'Форма не ауа райы жоғары шығуға мүмкіндік бермесе: Көлсай-1 жағалауымен серуен (1 сағ), көл көрінісінен ләззат алыңыз.',
        },
        tradeoff: {
          fi: '+ helppo ja lyhyt / − ei ylempää järveä',
          en: '+ easy and short / − no upper lake',
          ru: '+ легко и коротко / − без верхнего озера',
          kk: '+ жеңіл әрі қысқа / − жоғарғы көл жоқ',
        },
        sightIds: ['kolsai-lakes'],
      },
      {
        title: {
          fi: 'Hevosvaellus ylemmäs',
          en: 'Horseback ride higher up',
          ru: 'Конная прогулка выше',
          kk: 'Атпен жоғары серуен',
        },
        summary: {
          fi: 'Kolsai-1:ltä ylemmäs hevosella oppaan kera — säästää jalkoja ja kantaa kovemmankin nousun.',
          en: 'From Kolsai-1 higher up on horseback with a guide — saves your legs and covers the steeper climb.',
          ru: 'От Кольсай-1 выше на лошади с гидом — бережёт ноги и берёт более крутой подъём.',
          kk: 'Көлсай-1-ден жоғары атпен гидпен — аяқты сақтайды әрі тіктеу көтерілуді алады.',
        },
        tradeoff: {
          fi: '+ vähemmän rasitusta / − maksaa, riippuu oppaan ja hevosten saatavuudesta',
          en: '+ less effort / − costs money, depends on guide and horse availability',
          ru: '+ меньше усилий / − стоит денег, зависит от наличия гида и лошадей',
          kk: '+ күш аз / − ақы тұрады, гид пен ат болуына байланысты',
        },
        sightIds: ['kolsai-lakes'],
      },
    ],
    backupPlan: {
      fi: 'Sade vuoristossa = lepää Satyssa tai siirrä vaellus. ⚠️ Kolsai-3 / Sarybulak-sola (2700–3278 m) on kesäkuun alussa vielä lumessa — älä yritä sitä ilman lumikamoja ja opasta.',
      en: 'Rain in the mountains = rest in Saty or move the hike. ⚠️ Kolsai-3 / the Sarybulak pass (2,700–3,278 m) is still under snow in early June — do not attempt it without snow gear and a guide.',
      ru: 'Дождь в горах = отдых в Саты или перенос похода. ⚠️ Кольсай-3 / перевал Сарыбулак (2700–3278 м) в начале июня ещё под снегом — не идите без снаряжения и гида.',
      kk: 'Тауда жаңбыр болса = Сатыда демалыңыз немесе жорықты жылжытыңыз. ⚠️ Көлсай-3 / Сарыбұлақ асуы (2700–3278 м) маусым басында әлі қар астында — қар жабдығы мен гидсіз әрекеттенбеңіз.',
    },
    lodgingHint: {
      area: {
        fi: 'Saty-kylä — sama guesthouse kuin edellinen yö',
        en: 'Saty village — same guesthouse as the previous night',
        ru: 'Село Саты — тот же гостевой дом, что и накануне',
        kk: 'Саты ауылы — алдыңғы түнгі сол қонақ үй',
      },
      priceRangeEUR: [40, 60],
      bookingApps: ['paikan päällä', 'kuljettajan suositus'],
      note: {
        fi: 'WC usein ulkona. Lämmin yötakki — yöt viileitä korkealla.',
        en: 'Toilet often outdoors. A warm overnight jacket — nights are cool at altitude.',
        ru: 'Туалет часто на улице. Тёплая куртка на ночь — ночи на высоте прохладные.',
        kk: 'Дәретхана көбіне сыртта. Жылы кешкі күрте — биікте түндер салқын.',
      },
    },
    cashKZT: 20000,
    driverNeeded: false,
    earlyWakeRisk: true,
    offlineNote: {
      fi: 'Alkukesäkuu = lumen sulamiskausi: polulla mutaa ja lumilaikkuja. Lataa Organic Maps offline ja tarkista sää aamulla. Saty-kylässä signaali heikko.',
      en: 'Early June = snowmelt season: mud and snow patches on the trail. Download Organic Maps offline and check the weather in the morning. Signal is weak in Saty.',
      ru: 'Начало июня = сезон таяния снега: на тропе грязь и снежники. Скачайте Organic Maps офлайн и проверьте погоду утром. В Саты слабый сигнал.',
      kk: 'Маусым басы = қар еру маусымы: соқпақта батпақ пен қар дақтары. Organic Maps-ты офлайн жүктеп, таңертең ауа райын тексеріңіз. Сатыда сигнал әлсіз.',
    },
  },

  // ============== PÄIVÄ 10 — Kaindy + ylänousu/hevosvaellus (ekstravuoristoyö) ==============
  {
    day: 10,
    date: '2026-06-08',
    city: {
      fi: 'Saty / Kaindy',
      en: 'Saty / Kaindy',
      ru: 'Саты / Каинды',
      kk: 'Саты / Қайыңды',
    },
    sleepCity: {
      fi: 'Saty (guesthouse)',
      en: 'Saty (guesthouse)',
      ru: 'Саты (гостевой дом)',
      kk: 'Саты (қонақ үй)',
    },
    title: {
      fi: 'Kaindy-järvi + valinnainen ylänousu',
      en: 'Kaindy Lake + optional higher climb',
      ru: 'Озеро Каинды + по желанию подъём выше',
      kk: 'Қайыңды көлі + қаласаңыз жоғары көтерілу',
    },
    summary: {
      fi: 'Aamulla Kaindy-järvi 4WD-shuttlella Satysta, lyhyt kävely uponneelle metsälle. Iltapäivällä ylänousu kohti Kolsai-3:a niin pitkälle kuin sula sallii, hevosvaellus tai lepo. Ekstra vuoristoyö Satyssa.',
      en: 'Kaindy Lake by 4WD shuttle from Saty in the morning, a short walk to the sunken forest. In the afternoon, climb higher toward Kolsai-3 as far as the snowmelt allows, ride horseback or rest. An extra mountain night in Saty.',
      ru: 'Утром озеро Каинды на 4WD-шаттле из Саты, короткая прогулка к затопленному лесу. Днём подъём выше к Кольсай-3 насколько позволяет снеготаяние, конная прогулка или отдых. Дополнительная горная ночь в Саты.',
      kk: 'Таңертең Сатыдан 4WD-шаттлмен Қайыңды көлі, батқан орманға қысқа серуен. Түстен кейін қар еруі мүмкіндік бергенше Көлсай-3-ке қарай жоғары көтерілу, атпен серуен немесе демалу. Сатыда қосымша таулы түн.',
    },
    sightIds: ['kaindy-lake'],
    anchors: [
      {
        time: { fi: 'aamu', en: 'morning', ru: 'утро', kk: 'таңертең' },
        kind: 'tour',
        label: {
          fi: 'Paikallinen 4WD/UAZ-shuttle Satysta Kaindyyn (~30 min)',
          en: 'Local 4WD/UAZ shuttle from Saty to Kaindy (~30 min)',
          ru: 'Местный 4WD/УАЗ-шаттл из Саты в Каинды (~30 мин)',
          kk: 'Сатыдан Қайыңдыға жергілікті 4WD/УАЗ-шаттл (~30 мин)',
        },
      },
    ],
    primaryPlan: {
      fi: 'Aamulla Kaindy-järvi: paikallinen 4WD/UAZ-shuttle Satysta (~30 min, kivinen ja tulviva tie — oma auto ei käy), sitten lyhyt kävely uponneelle kuusimetsälle. Iltapäivällä valinta: (a) ylänousu kohti Kolsai-3:a niin pitkälle kuin sula sallii — käänny lumirajalla, opas suositeltava; (b) hevosvaellus; tai (c) lepo + Kolsai-1-rantakierros. Tämä lisätty vuoristoyö syventää Kolsai-kokemuksen.',
      en: 'Kaindy Lake in the morning: a local 4WD/UAZ shuttle from Saty (~30 min, rocky and flood-prone road — your own car will not make it), then a short walk to the sunken spruce forest. In the afternoon, choose: (a) climb higher toward Kolsai-3 as far as the snowmelt allows — turn back at the snow line, a guide is advisable; (b) a horseback ride; or (c) rest + the Kolsai-1 shore loop. This added mountain night deepens the Kolsai experience.',
      ru: 'Утром озеро Каинды: местный 4WD/УАЗ-шаттл из Саты (~30 мин, каменистая и подтопляемая дорога — своя машина не пройдёт), затем короткая прогулка к затопленному еловому лесу. Днём на выбор: (a) подъём выше к Кольсай-3 насколько позволяет снеготаяние — поворачивайте у снеговой линии, желателен гид; (b) конная прогулка; или (c) отдых + прогулка вокруг Кольсай-1. Эта дополнительная горная ночь углубляет опыт Кольсая.',
      kk: 'Таңертең Қайыңды көлі: Сатыдан жергілікті 4WD/УАЗ-шаттл (~30 мин, тасты әрі су басатын жол — өз көлігіңіз өтпейді), содан кейін батқан шыршалы орманға қысқа серуен. Түстен кейін таңдау: (a) қар еруі мүмкіндік бергенше Көлсай-3-ке қарай жоғары көтерілу — қар сызығында кері қайтыңыз, гид ұсынылады; (b) атпен серуен; немесе (c) демалу + Көлсай-1 жағалау серуені. Бұл қосымша таулы түн Көлсай тәжірибесін тереңдетеді.',
    },
    alternatives: [
      {
        title: {
          fi: 'Lepopäivä Satyssa',
          en: 'Rest day in Saty',
          ru: 'День отдыха в Саты',
          kk: 'Сатыда демалыс күн',
        },
        summary: {
          fi: 'Jos edelliset päivät uuvuttivat: vain Kaindy aamulla, sitten lepo guesthousessa — kerää voimia siirtymäpäivään.',
          en: 'If the previous days wore you out: just Kaindy in the morning, then rest at the guesthouse — gather strength for the transfer day.',
          ru: 'Если предыдущие дни вымотали: только Каинды утром, затем отдых в гостевом доме — соберитесь с силами перед переездом.',
          kk: 'Алдыңғы күндер шаршатса: тек таңертең Қайыңды, содан кейін қонақ үйде демалыс — көшу күніне күш жинаңыз.',
        },
        tradeoff: {
          fi: '+ palautuminen / − ei ylänousua',
          en: '+ recovery / − no higher climb',
          ru: '+ восстановление / − без подъёма выше',
          kk: '+ қалпына келу / − жоғары көтерілу жоқ',
        },
        sightIds: ['kaindy-lake'],
      },
      {
        title: {
          fi: 'Turgen/Assy-suunnan tutkiminen',
          en: 'Explore the Turgen/Assy direction',
          ru: 'Исследование направления Тургень/Асы',
          kk: 'Түрген/Асы бағытын зерттеу',
        },
        summary: {
          fi: 'Jos kuljettaja saatavilla, suuntaa Turgen-rotkon vesiputouksille tai Assy-ylätasangolle — vaatii oman kuljetuksen.',
          en: 'If a driver is available, head to the Turgen Gorge waterfalls or the Assy plateau — requires your own transport.',
          ru: 'Если есть водитель, направляйтесь к водопадам Тургеньского ущелья или на плато Асы — нужен свой транспорт.',
          kk: 'Жүргізуші болса, Түрген шатқалының сарқырамаларына немесе Асы жайлауына барыңыз — өз көлігіңіз қажет.',
        },
        tradeoff: {
          fi: '+ uusi suunta / − vaatii kuljettajan, vie Kaindy-aikaa',
          en: '+ a new direction / − needs a driver, takes Kaindy time',
          ru: '+ новое направление / − нужен водитель, забирает время у Каинды',
          kk: '+ жаңа бағыт / − жүргізуші қажет, Қайыңды уақытын алады',
        },
        sightIds: ['turgen-gorge'],
      },
    ],
    backupPlan: {
      fi: 'Kaindyn tie tulvii helposti — kysy shuttle-tilanne guesthousesta aamulla. Jos tie kiinni, jää Kolsai-1:lle tai lepää kylässä. Ylänousulla käänny ajoissa lumirajalla.',
      en: 'The Kaindy road floods easily — ask the guesthouse about the shuttle situation in the morning. If the road is closed, stay at Kolsai-1 or rest in the village. On the higher climb, turn back in time at the snow line.',
      ru: 'Дорога на Каинды легко затопляется — утром уточните в гостевом доме про шаттл. Если дорога закрыта, оставайтесь на Кольсай-1 или отдыхайте в селе. На подъёме поворачивайте вовремя у снеговой линии.',
      kk: 'Қайыңды жолы оңай су басады — таңертең қонақ үйден шаттл жағдайын сұраңыз. Жол жабық болса, Көлсай-1-де қалыңыз немесе ауылда демалыңыз. Жоғары көтерілуде қар сызығында уақытында кері қайтыңыз.',
    },
    lodgingHint: {
      area: {
        fi: 'Saty-kylä — sama guesthouse kuin edelliset yöt',
        en: 'Saty village — same guesthouse as the previous nights',
        ru: 'Село Саты — тот же гостевой дом, что и прошлые ночи',
        kk: 'Саты ауылы — алдыңғы түндердегі сол қонақ үй',
      },
      priceRangeEUR: [40, 60],
      bookingApps: ['paikan päällä', 'kuljettajan suositus'],
      note: {
        fi: 'Sovi Kaindy-shuttle ja huomisen Almaty-kuljetus guesthousen kautta etukäteen.',
        en: 'Arrange the Kaindy shuttle and tomorrow\'s Almaty transfer through the guesthouse in advance.',
        ru: 'Заранее договоритесь о шаттле на Каинды и завтрашнем переезде в Алматы через гостевой дом.',
        kk: 'Қайыңды шаттлын және ертеңгі Алматыға көшуді қонақ үй арқылы алдын ала келісіңіз.',
      },
    },
    cashKZT: 30000,
    driverNeeded: true,
    earlyWakeRisk: false,
    offlineNote: {
      fi: 'Alkukesäkuu = sulamiskausi: Kaindyn tie tulvii ja jokiylitykset korkealla. Lataa Organic Maps offline. Saty-kylässä signaali heikko.',
      en: 'Early June = snowmelt season: the Kaindy road floods and river crossings run high. Download Organic Maps offline. Signal is weak in Saty.',
      ru: 'Начало июня = сезон таяния: дорога на Каинды затопляется, переправы через реки высокие. Скачайте Organic Maps офлайн. В Саты слабый сигнал.',
      kk: 'Маусым басы = қар еру маусымы: Қайыңды жолы су басады, өзен өткелдері жоғары. Organic Maps-ты офлайн жүктеңіз. Сатыда сигнал әлсіз.',
    },
  },

  // ============== PÄIVÄ 11 — Saty → Almaty → iltalento Astanaan ==============
  {
    day: 11,
    date: '2026-06-09',
    city: {
      fi: 'Saty → Almaty → Astana',
      en: 'Saty → Almaty → Astana',
      ru: 'Саты → Алматы → Астана',
      kk: 'Саты → Алматы → Астана',
    },
    sleepCity: { fi: 'Astana', en: 'Astana', ru: 'Астана', kk: 'Астана' },
    title: {
      fi: 'Saty → Almaty + iltalento Astanaan',
      en: 'Saty → Almaty + evening flight to Astana',
      ru: 'Саты → Алматы + вечерний рейс в Астану',
      kk: 'Саты → Алматы + Астанаға кешкі рейс',
    },
    summary: {
      fi: 'Aamulla ajo Satysta Almatyyn (5–6 h, saapuminen ~14:00). Iltapäivä Almatyssa (suihku, lounas, basaari/lahjat). Iltalento Almaty → Astana, saapuminen illalla. Yö Astanassa.',
      en: 'Morning drive from Saty to Almaty (5–6 h, arrival ~14:00). Afternoon in Almaty (shower, lunch, bazaar/gifts). Evening flight Almaty → Astana, arrival in the evening. Night in Astana.',
      ru: 'Утром переезд из Саты в Алматы (5–6 ч, прибытие ~14:00). Днём в Алматы (душ, обед, базар/подарки). Вечерний рейс Алматы → Астана, прибытие вечером. Ночь в Астане.',
      kk: 'Таңертең Сатыдан Алматыға көшу (5–6 сағ, келу ~14:00). Түстен кейін Алматыда (душ, түскі ас, базар/сыйлық). Алматы → Астана кешкі рейсі, кешке келу. Астанада түнеу.',
    },
    sightIds: ['almaty-craft-beer'],
    anchors: [
      {
        time: { fi: '08:00', en: '08:00', ru: '08:00', kk: '08:00' },
        kind: 'drive',
        label: {
          fi: 'Lähtö Satysta — kuljettajan kanssa Almatyyn (~5–6 h)',
          en: 'Departure from Saty — with the driver to Almaty (~5–6 h)',
          ru: 'Выезд из Саты — с водителем в Алматы (~5–6 ч)',
          kk: 'Сатыдан шығу — жүргізушімен Алматыға (~5–6 сағ)',
        },
      },
      {
        time: { fi: '~14:00', en: '~14:00', ru: '~14:00', kk: '~14:00' },
        kind: 'arrival',
        label: {
          fi: 'Saapuminen Almatyyn — suihku, lounas',
          en: 'Arrival in Almaty — shower, lunch',
          ru: 'Прибытие в Алматы — душ, обед',
          kk: 'Алматыға келу — душ, түскі ас',
        },
      },
      {
        time: { fi: 'ilta', en: 'evening', ru: 'вечер', kk: 'кешке' },
        kind: 'flight',
        label: {
          fi: 'Iltalento ALA → NQZ (Air Astana / FlyArystan, ~1 h 45 min)',
          en: 'Evening flight ALA → NQZ (Air Astana / FlyArystan, ~1 h 45 min)',
          ru: 'Вечерний рейс ALA → NQZ (Air Astana / FlyArystan, ~1 ч 45 мин)',
          kk: 'ALA → NQZ кешкі рейсі (Air Astana / FlyArystan, ~1 сағ 45 мин)',
        },
        urgency: 'week-before',
      },
    ],
    primaryPlan: {
      fi: 'Aamulla ajo Satysta Almatyyn (5–6 h kuljettajan kanssa, saapuminen ~14:00). Iltapäivällä Almatyssa: suihku, lounas, mahdollinen basaari- ja lahjakierros. Iltalento Almaty → Astana (Air Astana tai FlyArystan, ~1 h 45 min), saapuminen illalla, yö Astanassa. ⚠️ Varaa lento etukäteen — kesäkuun illat täyttyvät. Tämä korvaa aiemmin suunnitellun Talgo-yöjunan, koska Satyssa ollaan kaksi yötä.',
      en: 'Morning drive from Saty to Almaty (5–6 h with the driver, arrival ~14:00). Afternoon in Almaty: shower, lunch, an optional bazaar and gift round. Evening flight Almaty → Astana (Air Astana or FlyArystan, ~1 h 45 min), arrival in the evening, night in Astana. ⚠️ Book the flight in advance — June evenings fill up. This replaces the previously planned Talgo night train, since you stay two nights in Saty.',
      ru: 'Утром переезд из Саты в Алматы (5–6 ч с водителем, прибытие ~14:00). Днём в Алматы: душ, обед, по желанию базар и покупка подарков. Вечерний рейс Алматы → Астана (Air Astana или FlyArystan, ~1 ч 45 мин), прибытие вечером, ночь в Астане. ⚠️ Бронируйте рейс заранее — вечера в июне заполняются. Это заменяет ранее запланированный ночной поезд Talgo, так как в Саты вы ночуете две ночи.',
      kk: 'Таңертең Сатыдан Алматыға көшу (жүргізушімен 5–6 сағат, келу ~14:00). Түстен кейін Алматыда: душ, түскі ас, қаласаңыз базар мен сыйлық сатып алу. Алматы → Астана кешкі рейсі (Air Astana немесе FlyArystan, ~1 сағ 45 мин), кешке келу, Астанада түнеу. ⚠️ Рейсті алдын ала брондаңыз — маусым кештері толады. Бұл бұрын жоспарланған Talgo түнгі пойызын алмастырады, өйткені Сатыда екі түн боласыз.',
    },
    alternatives: [
      {
        title: {
          fi: 'Talgo-yöjuna (säästö)',
          en: 'Talgo night train (savings)',
          ru: 'Ночной поезд Talgo (экономия)',
          kk: 'Talgo түнгі пойызы (үнем)',
        },
        summary: {
          fi: 'Jos halutaan säästää: Talgo-yöjuna ALA → AST (~13 h, bisnesluokan kupé ~35 €/4 hlö). Vaatii ehtimisen Satysta ajoissa Almatyyn iltaan mennessä — tiukka.',
          en: 'If you want to save: Talgo night train ALA → AST (~13 h, business compartment ~€35 for 4). Requires getting from Saty to Almaty in time by the evening — tight.',
          ru: 'Если хотите сэкономить: ночной поезд Talgo ALA → AST (~13 ч, купе бизнес-класса ~35 € на 4). Нужно успеть из Саты в Алматы к вечеру — впритык.',
          kk: 'Үнемдегіңіз келсе: Talgo түнгі пойызы ALA → AST (~13 сағ, бизнес купе ~35 €/4 адам). Сатыдан Алматыға кешке дейін үлгеру керек — тығыз.',
        },
        tradeoff: {
          fi: '+ säästää lennon ja hotelliyön / − tiukka aikataulu Satysta, vie yön junassa',
          en: '+ saves a flight and a hotel night / − tight schedule from Saty, a night on the train',
          ru: '+ экономит рейс и ночь в отеле / − плотный график из Саты, ночь в поезде',
          kk: '+ рейс пен қонақүй түнін үнемдейді / − Сатыдан тығыз кесте, пойызда түн',
        },
      },
      {
        title: {
          fi: 'Aamulento seuraavana päivänä',
          en: 'Morning flight the next day',
          ru: 'Утренний рейс на следующий день',
          kk: 'Келесі күні таңғы рейс',
        },
        summary: {
          fi: 'Jos Saty-paluu venyy: yö Almatyssa, lento päivän 12 aamulla. Lyhentää Astana-aikaa.',
          en: 'If the Saty return runs long: night in Almaty, flight on the morning of day 12. Shortens the Astana time.',
          ru: 'Если возвращение из Саты затянется: ночь в Алматы, рейс утром 12-го дня. Сокращает время в Астане.',
          kk: 'Сатыдан қайту ұзаққа созылса: Алматыда түнеу, 12-күні таңғы рейс. Астана уақытын қысқартады.',
        },
        tradeoff: {
          fi: '+ kunnon yöuni Almatyssa / − vie osan Astana-päivästä',
          en: '+ a proper night sleep in Almaty / − costs part of an Astana day',
          ru: '+ нормальный сон в Алматы / − забирает часть дня в Астане',
          kk: '+ Алматыда толық ұйқы / − Астана күнінің бір бөлігін алады',
        },
      },
    ],
    backupPlan: {
      fi: 'Jos Saty-paluu venyy ruuhkan tai sään takia, vaihda aamulennoksi (alternatives). Älä myöhästy iltalennosta — pidä Almatyn puskuri (saapuminen ~14:00) väljänä.',
      en: 'If the Saty return runs long due to traffic or weather, switch to a morning flight (alternatives). Do not miss the evening flight — keep the Almaty buffer (arrival ~14:00) generous.',
      ru: 'Если возвращение из Саты затянется из-за пробок или погоды, переключитесь на утренний рейс (альтернативы). Не опоздайте на вечерний рейс — держите запас в Алматы (прибытие ~14:00) свободным.',
      kk: 'Сатыдан қайту кептеліс не ауа райынан ұзаса, таңғы рейске ауысыңыз (баламалар). Кешкі рейстен кешікпеңіз — Алматыдағы қорды (келу ~14:00) бос ұстаңыз.',
    },
    lodgingHint: {
      area: {
        fi: 'Astana — Yesil-joen oikea ranta (Левый берег), Nurzhol-bulevardin lähellä',
        en: 'Astana — right bank of the Esil river (Levy bereg), near Nurzhol Boulevard',
        ru: 'Астана — правый берег Есиля (Левый берег), рядом с бульваром Нуржол',
        kk: 'Астана — Есіл өзенінің оң жағалауы (Левый берег), Нұржол бульварының жанында',
      },
      priceRangeEUR: [50, 110],
      bookingApps: ['Booking.com', 'Ostrovok'],
      note: {
        fi: 'Yöllinen check-in mahdollinen — varmista että vastaanotto on auki saapumisaikaan.',
        en: 'Night check-in is possible — confirm that reception is open at your arrival time.',
        ru: 'Ночной заезд возможен — убедитесь, что ресепшен работает к вашему прибытию.',
        kk: 'Түнгі тіркелу мүмкін — қабылдау бөлімінің келу уақытында ашық екеніне көз жеткізіңіз.',
      },
    },
    cashKZT: 20000,
    driverNeeded: true,
    earlyWakeRisk: true,
    offlineNote: {
      fi: 'Lataa lennon e-lippu PDF:nä puhelimeen. Saty-päässä signaali heikko — varmista kuljettajan pickup edellisiltana.',
      en: 'Download the flight e-ticket as a PDF to your phone. Signal is weak on the Saty end — confirm the driver pickup the night before.',
      ru: 'Скачайте электронный билет на рейс в PDF на телефон. На стороне Саты сигнал слабый — подтвердите забор водителем накануне вечером.',
      kk: 'Рейстің электрондық билетін PDF-пен телефонға жүктеңіз. Саты жағында сигнал әлсіз — жүргізушінің алуын алдыңғы кеште растаңыз.',
    },
  },

  // ============== PÄIVÄ 12 — Astana-ikonit ==============
  {
    day: 12,
    date: '2026-06-10',
    city: { fi: 'Astana', en: 'Astana', ru: 'Астана', kk: 'Астана' },
    sleepCity: { fi: 'Astana', en: 'Astana', ru: 'Астана', kk: 'Астана' },
    title: {
      fi: 'Astana — Atameken, Baiterek ja Khan Shatyr',
      en: 'Astana — Atameken, Baiterek and Khan Shatyr',
      ru: 'Астана — Атамекен, Байтерек и Хан Шатыр',
      kk: 'Астана — Атамекен, Бәйтерек және Хан Шатыр',
    },
    summary: {
      fi: 'Ensimmäinen täysi Astana-päivä: Atameken-pienoismalli (maan kartta kokoluokassa), Baiterek-torni auringonlaskuun ja Khan Shatyr illalla.',
      en: 'First full Astana day: the Atameken miniature park (a scale map of the country), Baiterek Tower at sunset and Khan Shatyr in the evening.',
      ru: 'Первый полный день в Астане: парк миниатюр Атамекен (карта страны в масштабе), башня Байтерек на закате и Хан Шатыр вечером.',
      kk: 'Астанадағы алғашқы толық күн: Атамекен миниатюра паркі (ел картасы масштабта), күн батуға Бәйтерек мұнарасы және кешке Хан Шатыр.',
    },
    sightIds: ['atameken-map', 'bayterek', 'khan-shatyr'],
    primaryPlan: {
      fi: 'Aamiainen hotelilla. Päivä jalan ja Yandex Go:lla: Atameken-pienoismalli (1,5 h, 1500 KZT) antaa hyvän yleiskuvan Kazakstanin maantieteestä → Baiterek-torni auringonlaskuun (näköala, 2500 KZT) → Khan Shatyr illalla (ilmainen sisäänkäynti). Illallinen kaupungissa.',
      en: 'Breakfast at the hotel. Day on foot and with Yandex Go: Atameken miniature park (1.5 h, 1,500 KZT) gives a good overview of Kazakhstan\'s geography → Baiterek Tower at sunset (viewpoint, 2,500 KZT) → Khan Shatyr in the evening (free entry). Dinner in the city.',
      ru: 'Завтрак в отеле. День пешком и на Yandex Go: парк миниатюр Атамекен (1,5 ч, 1500 KZT) — хороший обзор географии Казахстана → башня Байтерек на закате (смотровая, 2500 KZT) → Хан Шатыр вечером (вход бесплатный). Ужин в городе.',
      kk: 'Қонақүйде таңғы ас. Күн жаяу және Yandex Go-мен: Атамекен миниатюра паркі (1,5 сағ, 1500 KZT) Қазақстан географиясына жақсы шолу береді → күн батуға Бәйтерек мұнарасы (шолу алаңы, 2500 KZT) → кешке Хан Шатыр (кіру тегін). Қалада кешкі ас.',
    },
    alternatives: [
      {
        title: {
          fi: 'Pelkkä Baiterek + Khan Shatyr (Atameken jätetty)',
          en: 'Just Baiterek + Khan Shatyr (skip Atameken)',
          ru: 'Только Байтерек + Хан Шатыр (без Атамекена)',
          kk: 'Тек Бәйтерек + Хан Шатыр (Атамекенсіз)',
        },
        summary: {
          fi: 'Jos jaksaminen rajoittunut vuoristopäivien jälkeen, ohita Atameken ja tee vain klassikkoduo Baiterek + Khan Shatyr.',
          en: 'If energy is limited after the mountain days, skip Atameken and do just the classic duo Baiterek + Khan Shatyr.',
          ru: 'Если сил мало после горных дней, пропустите Атамекен и сделайте только классический дуэт — Байтерек + Хан Шатыр.',
          kk: 'Таулы күндерден кейін күш жетпесе, Атамекенді өткізіп жіберіп, тек классикалық қос нысанды (Бәйтерек + Хан Шатыр) аралаңыз.',
        },
        tradeoff: {
          fi: '+ kevyempi / − ei maankuvaa',
          en: '+ lighter / − no country overview',
          ru: '+ легче / − без обзора страны',
          kk: '+ жеңілірек / − ел картасын көрмейсіз',
        },
        sightIds: ['bayterek', 'khan-shatyr'],
      },
      {
        title: {
          fi: 'EXPO-alue + Nur Alem',
          en: 'EXPO area + Nur Alem',
          ru: 'Территория EXPO + Нур Алем',
          kk: 'EXPO аумағы + Нұр Әлем',
        },
        summary: {
          fi: 'Vaihtoehtoinen iltapäivä: Nur Alem -sfääri (tulevaisuuden energia) ja kävely EXPO-alueella modernin arkkitehtuurin parissa.',
          en: 'An alternative afternoon: the Nur Alem sphere (future energy) and a walk around the EXPO area among modern architecture.',
          ru: 'Альтернативный день: сфера Нур Алем (энергия будущего) и прогулка по EXPO среди современной архитектуры.',
          kk: 'Балама түстен кейін: Нұр Әлем сферасы (болашақ энергиясы) және заманауи сәулет арасында EXPO аумағында серуен.',
        },
        tradeoff: {
          fi: '+ moderni arkkitehtuuri / − vie aikaa ikonipäivältä',
          en: '+ modern architecture / − takes time from the icon day',
          ru: '+ современная архитектура / − забирает время у дня икон',
          kk: '+ заманауи сәулет / − белгі күнінен уақыт алады',
        },
      },
    ],
    lodgingHint: {
      area: {
        fi: 'Astana — Yesil-joen oikea ranta (Левый берег), Nurzhol-bulevardin lähellä',
        en: 'Astana — right bank of the Esil river (Levy bereg), near Nurzhol Boulevard',
        ru: 'Астана — правый берег Есиля (Левый берег), рядом с бульваром Нуржол',
        kk: 'Астана — Есіл өзенінің оң жағалауы (Левый берег), Нұржол бульварының жанында',
      },
      priceRangeEUR: [50, 110],
      bookingApps: ['Booking.com', 'Ostrovok'],
      note: {
        fi: 'Vältä Vanhakaupunkia (Saryarka) jos haluat olla lähellä ikoneja',
        en: 'Avoid the Old Town (Saryarka) if you want to be close to the iconic sights',
        ru: 'Избегайте Старого города (Сарыарка), если хотите быть ближе к ключевым достопримечательностям',
        kk: 'Ескі қаладан (Сарыарқа) аулақ болыңыз, негізгі көрікті жерлерге жақын болғыңыз келсе',
      },
    },
    cashKZT: 8000,
    driverNeeded: false,
    earlyWakeRisk: false,
  },

  // ============== PÄIVÄ 13 — Astana (museot, moskeijat, Rauhan palatsi) ==============
  {
    day: 13,
    date: '2026-06-11',
    city: { fi: 'Astana', en: 'Astana', ru: 'Астана', kk: 'Астана' },
    sleepCity: { fi: 'Astana', en: 'Astana', ru: 'Астана', kk: 'Астана' },
    title: {
      fi: 'Astana — Kansallismuseo, moskeijat ja Rauhan palatsi',
      en: 'Astana — National Museum, mosques and Palace of Peace',
      ru: 'Астана — Национальный музей, мечети и Дворец мира',
      kk: 'Астана — Ұлттық музей, мешіттер және Бейбітшілік сарайы',
    },
    summary: {
      fi: 'Aamupäivä Kazakstanin kansallismuseossa (Independence Square). Iltapäivällä Hazret Sultan -moskeija, Rauhan palatsin pyramidi ja Nur-Astanan kupoli — kaikki kävelyetäisyydellä.',
      en: 'Morning at the National Museum of Kazakhstan (Independence Square). In the afternoon, Hazret Sultan Mosque, the Palace of Peace pyramid and the Nur-Astana dome — all within walking distance.',
      ru: 'Утром в Национальном музее Казахстана (площадь Независимости). Днём мечеть Хазрет Султан, пирамида Дворца мира и купол Нур-Астана — всё в пешей доступности.',
      kk: 'Таңертең Қазақстанның Ұлттық музейінде (Тәуелсіздік алаңы). Түстен кейін Хазірет Сұлтан мешіті, Бейбітшілік сарайының пирамидасы және Нұр-Астана күмбезі — бәрі жаяу жетуге болатын қашықтықта.',
    },
    sightIds: ['national-museum-kz', 'hazret-sultan-mosque', 'palace-of-peace', 'nur-astana-mosque'],
    primaryPlan: {
      fi: 'Klusteripäivä Independence Square -alueella: 09:30 Kansallismuseo (3 h, 1000 KZT) — kuratoitu kierros kivikaudesta itsenäisyyteen, audio-opas englanniksi. Lounas museon kahvilassa tai Hazret Sultanin viereisissä ravintoloissa. Iltapäivä Hazret Sultan (1 h, ilmainen) → Rauhan palatsi (1 h) → Nur-Astana-moskeija. Illalla joenvarsi-kävely.',
      en: 'Cluster day in the Independence Square area: 09:30 National Museum (3 h, 1,000 KZT) — a curated tour from the Stone Age to independence, audio guide in English. Lunch at the museum cafe or restaurants next to Hazret Sultan. Afternoon Hazret Sultan (1 h, free) → Palace of Peace (1 h) → Nur-Astana Mosque. Evening riverside walk.',
      ru: 'Кластерный день в районе площади Независимости: 09:30 Национальный музей (3 ч, 1000 KZT) — кураторская экскурсия от каменного века до независимости, аудиогид на английском. Обед в кафе музея или ресторанах рядом с Хазрет Султаном. Днём Хазрет Султан (1 ч, бесплатно) → Дворец мира (1 ч) → мечеть Нур-Астана. Вечером прогулка вдоль реки.',
      kk: 'Тәуелсіздік алаңы ауданындағы кластерлік күн: 09:30 Ұлттық музей (3 сағ, 1000 KZT) — тас дәуірінен тәуелсіздікке дейінгі кураторлық экскурсия, ағылшынша аудиогид. Музей кафесінде немесе Хазірет Сұлтан жанындағы мейрамханаларда түскі ас. Түстен кейін Хазірет Сұлтан (1 сағ, тегін) → Бейбітшілік сарайы (1 сағ) → Нұр-Астана мешіті. Кешке өзен жағалауында серуен.',
    },
    alternatives: [
      {
        title: {
          fi: 'Päiväretki Burabayhin (vielä yksi luontopäivä)',
          en: 'Day trip to Burabay (one more nature day)',
          ru: 'Однодневная поездка в Бурабай (ещё один день на природе)',
          kk: 'Бурабайға бір күндік сапар (тағы бір табиғат күні)',
        },
        summary: {
          fi: 'Päiväretki Burabayhin — graniittikukkula Bolektau (näköalanousu) + järviuinti, jos haluatte vielä yhden luontopäivän kaupungin sijaan. ~250 km pohjoiseen, lähtö viimeistään klo 7.',
          en: 'Day trip to Burabay — the granite Bolektau hill (a panorama climb) + a lake swim, if you want one more nature day instead of the city. ~250 km north, depart no later than 07:00.',
          ru: 'Однодневная поездка в Бурабай — гранитный холм Болектау (подъём с панорамой) + купание в озере, если хотите ещё один день на природе вместо города. ~250 км на север, выезд не позже 7 утра.',
          kk: 'Бурабайға бір күндік сапар — гранит Бөлектау төбесі (панорамаға көтерілу) + көлде шомылу, қала орнына тағы бір табиғат күнін қаласаңыз. Солтүстікке ~250 км, кешіктірмей 07:00-де шығыңыз.',
        },
        tradeoff: {
          fi: '+ luonto kaupungin sijaan / − pitkä autopäivä, missaa museot/moskeijat',
          en: '+ nature instead of the city / − long driving day, you miss the museums/mosques',
          ru: '+ природа вместо города / − долгий день в авто, пропустите музеи/мечети',
          kk: '+ қала орнына табиғат / − ұзақ көлік күні, музей/мешіттерді жіберіп аласыз',
        },
        sightIds: ['burabay-park', 'bolektau-burabay'],
      },
      {
        title: {
          fi: 'EXPO-alue + Astana Opera ulkoa',
          en: 'EXPO area + Astana Opera from outside',
          ru: 'Территория EXPO + Astana Opera снаружи',
          kk: 'EXPO аумағы + Астана Опера сыртынан',
        },
        summary: {
          fi: 'Vaihtoehtoinen kulttuuripäivä: Nur Alem (EXPO-sfääri, museum), kävely EXPO-alueella, Opera-talo ulkoa (kesäkuussa kausi suljettu).',
          en: 'An alternative culture day: Nur Alem (the EXPO sphere, museum), walk around the EXPO area, opera house from outside (season closed in June).',
          ru: 'Альтернативный культурный день: Нур Алем (EXPO-сфера, музей), прогулка по EXPO, оперный театр снаружи (сезон закрыт в июне).',
          kk: 'Балама мәдени күн: Нұр Әлем (EXPO сферасы, музей), EXPO аумағында серуен, опера театры сыртынан (маусымда маусым жабық).',
        },
        tradeoff: {
          fi: '+ moderni arkkitehtuuri / − ei klassisia moskeijoita tällä päivällä',
          en: '+ modern architecture / − no classic mosques on this day',
          ru: '+ современная архитектура / − без классических мечетей в этот день',
          kk: '+ заманауи сәулет / − бұл күні классикалық мешіттер жоқ',
        },
      },
      {
        title: {
          fi: 'Pudota Nur-Astana, keskitytä kolmeen pääkohteeseen',
          en: 'Drop Nur-Astana, focus on the three main sights',
          ru: 'Откажитесь от Нур-Астаны, сосредоточьтесь на трёх главных объектах',
          kk: 'Нұр-Астанадан бас тартып, үш негізгі нысанға тоқталыңыз',
        },
        summary: {
          fi: 'Nur-Astana ratesti 3/3/3 — voit ohittaa sen ja viettää enemmän aikaa Hazret Sultanin ja Rauhan palatsin parissa.',
          en: 'Nur-Astana rates 3/3/3 — you can skip it and spend more time at Hazret Sultan and the Palace of Peace.',
          ru: 'Нур-Астана получила оценку 3/3/3 — её можно пропустить и провести больше времени в Хазрет Султане и Дворце мира.',
          kk: 'Нұр-Астана 3/3/3 деген баға алды — оны өткізіп жіберіп, Хазірет Сұлтан мен Бейбітшілік сарайында көбірек уақыт өткізуге болады.',
        },
        tradeoff: {
          fi: '+ syvempi vierailu / − yksi moskeija jää näkemättä',
          en: '+ deeper visit / − one mosque skipped',
          ru: '+ более глубокое посещение / − одна мечеть пропущена',
          kk: '+ тереңірек тану / − бір мешіт қалып қояды',
        },
      },
    ],
    backupPlan: {
      fi: 'Sateinen päivä = museot ja Rauhan palatsin sisätilat ovat hyvä säävarma valinta. Burabay-päiväretki kannattaa vain selkeällä säällä.',
      en: 'A rainy day = the museums and the Palace of Peace interiors are a good weather-proof choice. A Burabay day trip is worth it only in clear weather.',
      ru: 'Дождливый день = музеи и интерьеры Дворца мира — хороший выбор, не зависящий от погоды. Поездка в Бурабай оправдана только в ясную погоду.',
      kk: 'Жаңбырлы күн = музейлер мен Бейбітшілік сарайының ішкі кеңістігі ауа райына тәуелсіз жақсы таңдау. Бурабайға сапар тек ашық ауа райында тұрарлық.',
    },
    lodgingHint: {
      area: {
        fi: 'Sama kuin edellinen yö',
        en: 'Same as the previous night',
        ru: 'Тот же, что и предыдущая ночь',
        kk: 'Алдыңғы түнгідей',
      },
      priceRangeEUR: [50, 110],
      bookingApps: ['Booking.com'],
    },
    cashKZT: 10000,
    driverNeeded: false,
    earlyWakeRisk: false,
  },

  // ============== PÄIVÄ 14 — Paluulento Astanasta ==============
  {
    day: 14,
    date: '2026-06-12',
    city: {
      fi: 'Astana → ilma → Helsinki',
      en: 'Astana → in the air → Helsinki',
      ru: 'Астана → в воздухе → Хельсинки',
      kk: 'Астана → әуеде → Хельсинки',
    },
    sleepCity: {
      fi: 'Lentokoneessa',
      en: 'On the plane',
      ru: 'В самолёте',
      kk: 'Ұшақта',
    },
    title: {
      fi: 'Paluulento Suomeen',
      en: 'Return flight to Finland',
      ru: 'Обратный рейс в Финляндию',
      kk: 'Финляндияға қайту рейсі',
    },
    summary: {
      fi: 'Hotellin uloskirjautuminen aamulla. Taksi lentokentälle. Lento NQZ → Istanbul/Frankfurt → Helsinki. Saapuminen Suomeen 13.6. aamulla.',
      en: 'Hotel checkout in the morning. Taxi to the airport. Flight NQZ → Istanbul/Frankfurt → Helsinki. Arrival in Finland on the morning of 13 June.',
      ru: 'Утром выселение из отеля. Такси в аэропорт. Рейс NQZ → Стамбул/Франкфурт → Хельсинки. Прибытие в Финляндию утром 13 июня.',
      kk: 'Таңертең қонақүйден шығу. Әуежайға такси. NQZ → Стамбұл/Франкфурт → Хельсинки рейсі. Финляндияға 13 маусым таңертең жету.',
    },
    sightIds: [],
    anchors: [
      {
        time: { fi: '~10:00', en: '~10:00', ru: '~10:00', kk: '~10:00' },
        kind: 'checkout',
        label: {
          fi: 'Hotelli — säilytys jos lento myöhemmin',
          en: 'Hotel — luggage storage if the flight is later',
          ru: 'Отель — хранение багажа, если рейс позже',
          kk: 'Қонақүй — рейс кешірек болса, жүкті сақтау',
        },
      },
      {
        time: { fi: '~13:00', en: '~13:00', ru: '~13:00', kk: '~13:00' },
        kind: 'drive',
        label: {
          fi: 'Yandex Go lentokentälle (~20 min)',
          en: 'Yandex Go to the airport (~20 min)',
          ru: 'Yandex Go в аэропорт (~20 мин)',
          kk: 'Yandex Go-мен әуежайға (~20 мин)',
        },
      },
      {
        time: {
          fi: 'iltapäivä',
          en: 'afternoon',
          ru: 'после полудня',
          kk: 'түстен кейін',
        },
        kind: 'flight',
        label: {
          fi: 'Astana → Istanbul/Frankfurt',
          en: 'Astana → Istanbul/Frankfurt',
          ru: 'Астана → Стамбул/Франкфурт',
          kk: 'Астана → Стамбұл/Франкфурт',
        },
        urgency: 'now',
      },
      {
        time: { fi: 'yö', en: 'night', ru: 'ночь', kk: 'түнде' },
        kind: 'flight',
        label: {
          fi: 'Vaihto → Helsinki, saapuminen aamulla 13.6.',
          en: 'Connection → Helsinki, arrival in the morning on 13 June',
          ru: 'Пересадка → Хельсинки, прибытие утром 13 июня',
          kk: 'Трансфер → Хельсинки, 13 маусым таңертең жету',
        },
        urgency: 'now',
      },
    ],
    primaryPlan: {
      fi: 'Astanan lentokenttä (NQZ) sijaitsee 16 km kaupungista. Vaihda viimeiset KZT euroiksi tai säästä kotia varten. Lounas lentokentällä.',
      en: 'Astana airport (NQZ) is 16 km from the city. Exchange the last of your KZT to euros or save them for home. Lunch at the airport.',
      ru: 'Аэропорт Астаны (NQZ) находится в 16 км от города. Обменяйте остатки KZT на евро или оставьте на память. Обед в аэропорту.',
      kk: 'Астана әуежайы (NQZ) қаладан 16 км қашықтықта. Қалған KZT-ні еуроға айырбастаңыз немесе үйге апаруға сақтап қойыңыз. Әуежайда түскі ас.',
    },
    backupPlan: {
      fi: 'Jos lento myöhästyy, hae apua suoraan lentoyhtiöltä. Suomen edustusto Astanassa auki virka-ajan.',
      en: 'If the flight is delayed, seek help directly from the airline. The Finnish embassy in Astana is open during office hours.',
      ru: 'Если рейс задерживается, обратитесь напрямую к авиакомпании. Посольство Финляндии в Астане работает в рабочее время.',
      kk: 'Рейс кешіксе, авиакомпанияға тікелей хабарласыңыз. Финляндияның Астанадағы елшілігі жұмыс уақытында ашық.',
    },
    cashKZT: 5000,
    driverNeeded: false,
    earlyWakeRisk: true,
    offlineNote: {
      fi: 'Sähköpostiin lataa: boarding-passit, hotelliresepti viimeiseltä yöltä, KZT-lähetysmerkit. Lentokentällä ei välttämättä WiFiä jonossa.',
      en: 'Download to email: boarding passes, hotel receipt for the last night, KZT exchange receipts. The airport may not have WiFi in the queue.',
      ru: 'Скачайте на почту: посадочные талоны, чек отеля за последнюю ночь, чеки обмена KZT. В аэропорту в очереди WiFi может не быть.',
      kk: 'Электрондық поштаға сақтап қойыңыз: отырғызу талондары, соңғы түнгі қонақүй түбіртегі, KZT айырбастау түбіртектері. Әуежайда кезекте WiFi болмауы мүмкін.',
    },
  },
];
