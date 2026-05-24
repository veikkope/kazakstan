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

  // ============== PÄIVÄ 6 — Almaty saapuminen ==============
  {
    day: 6,
    date: '2026-06-04',
    city: { fi: 'Almaty', en: 'Almaty', ru: 'Алматы', kk: 'Алматы' },
    sleepCity: { fi: 'Almaty', en: 'Almaty', ru: 'Алматы', kk: 'Алматы' },
    title: {
      fi: 'Almaty — kaupunki, basaari, ortodoksikatedraali',
      en: 'Almaty — city, bazaar, Orthodox cathedral',
      ru: 'Алматы — город, базар, православный собор',
      kk: 'Алматы — қала, базар, православ соборы',
    },
    summary: {
      fi: 'Yöllinen saapuminen lennolla → aamu rauhallinen. Iltapäivä kävellen Panfilovin puisto, Zenkov-katedraali, Vihreä basaari, lounas.',
      en: 'Night arrival by flight → calm morning. Afternoon on foot: Panfilov Park, Zenkov Cathedral, Green Bazaar, lunch.',
      ru: 'Ночное прибытие рейсом → спокойное утро. Днём пешком: парк Панфилова, Вознесенский собор Зенкова, Зелёный базар, обед.',
      kk: 'Түнгі рейспен келу → тыныш таң. Түстен кейін жаяу: Панфилов саябағы, Зенков соборы, Жасыл базар, түскі ас.',
    },
    sightIds: ['almaty-keskusta', 'zenkov-cathedral', 'green-bazaar'],
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
      fi: 'Aamu nukkuen yön päälle. Iltapäivällä klassinen kävely: Panfilov → katedraali → basaari → kotaylanya. Lounaan basaarissa (lihapullia, kävely-vältettävät).',
      en: 'Morning sleeping off the night. In the afternoon, a classic walk: Panfilov → cathedral → bazaar → back home. Lunch at the bazaar (meat dumplings, avoid the touristy bits).',
      ru: 'Утром отсыпаемся после ночи. Днём классическая прогулка: Панфилов → собор → базар → домой. Обед на базаре (манты/самса, избегайте туристических ловушек).',
      kk: 'Таңертең түннен кейін ұйықтап аламыз. Түстен кейін классикалық серуен: Панфилов → собор → базар → үйге. Базарда түскі ас (мәнті/самса, туристік тұзақтардан аулақ болыңыз).',
    },
    alternatives: [
      {
        title: {
          fi: 'Aktiivinen aloitus',
          en: 'Active start',
          ru: 'Активное начало',
          kk: 'Белсенді бастау',
        },
        summary: {
          fi: 'Kök-Töbe köysiradalla iltapäivällä — auringonlasku kaupunkivuorimaisemaan.',
          en: 'Kök-Töbe by cable car in the afternoon — sunset over the city-mountain panorama.',
          ru: 'Кок-Тобе по канатной дороге днём — закат над городом и горами.',
          kk: 'Түстен кейін Көк-Төбеге арқан жолмен — қала мен таулар үстіндегі күн батуы.',
        },
        tradeoff: {
          fi: '+ näyttävää / − vaatii energiaa lennon jälkeen',
          en: '+ spectacular / − requires energy after the flight',
          ru: '+ эффектно / − требует сил после рейса',
          kk: '+ әсерлі / − рейстен кейін күш қажет',
        },
      },
    ],
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
  },

  // ============== PÄIVÄ 7 — Almaty vuoristoa & kulttuuri ==============
  {
    day: 7,
    date: '2026-06-05',
    city: { fi: 'Almaty', en: 'Almaty', ru: 'Алматы', kk: 'Алматы' },
    sleepCity: { fi: 'Almaty', en: 'Almaty', ru: 'Алматы', kk: 'Алматы' },
    title: {
      fi: 'Medeu, Shymbulak ja Kök-Töbe',
      en: 'Medeu, Shymbulak and Kök-Töbe',
      ru: 'Медеу, Шымбулак и Кок-Тобе',
      kk: 'Медеу, Шымбұлақ және Көк-Төбе',
    },
    summary: {
      fi: 'Aamulla taksi/bussi Medeun luistinhalliin, gondolihissi Shymbulak-laskettelukeskukseen. Iltapäivä Kök-Töbessä auringonlaskuun.',
      en: 'In the morning, taxi/bus to the Medeu skating rink and gondola to the Shymbulak ski resort. Afternoon on Kök-Töbe until sunset.',
      ru: 'Утром такси/автобус на каток Медеу, гондола на горнолыжный курорт Шымбулак. Днём Кок-Тобе до заката.',
      kk: 'Таңертең Медеу мұз айдынына таксимен/автобуспен, Шымбұлақ шаңғы курортына гондоламен. Түстен кейін күн батуға дейін Көк-Төбеде.',
    },
    sightIds: ['medeu-shymbulak', 'kok-tobe', 'almaty-arbat'],
    primaryPlan: {
      fi: 'Aamupäivä: Medeu (1700 m) → Shymbulak (3200 m) gondolihissillä, lounas vuorella. Iltapäivä: Kök-Töbe köysiradalla auringonlaskuun. Ilta Arbatilla.',
      en: 'Morning: Medeu (1,700 m) → Shymbulak (3,200 m) by gondola, lunch on the mountain. Afternoon: Kök-Töbe by cable car for sunset. Evening on the Arbat.',
      ru: 'Утро: Медеу (1700 м) → Шымбулак (3200 м) по гондоле, обед в горах. Днём: Кок-Тобе по канатной дороге к закату. Вечер на Арбате.',
      kk: 'Таң: Медеу (1700 м) → Шымбұлақ (3200 м) гондоламен, тауда түскі ас. Түстен кейін: Көк-Төбеге арқан жолмен күн батуға. Кешке Арбатта.',
    },
    alternatives: [
      {
        title: {
          fi: 'Iso Almatyn järvi (BAO) sen sijaan',
          en: 'Big Almaty Lake (BAO) instead',
          ru: 'Большое Алматинское озеро (БАО) вместо этого',
          kk: 'Оның орнына Үлкен Алматы көлі (БАК)',
        },
        summary: {
          fi: 'Päiväretki BAO:lle — vaatii rajavyöhykeluvan ja taksin. Spektaakkelimaisempi vuori.',
          en: 'Day trip to BAO — requires a border zone permit and a taxi. A more spectacular mountain.',
          ru: 'Однодневная поездка на БАО — нужны разрешение в погранзону и такси. Более эффектные горы.',
          kk: 'БАК-қа бір күндік сапар — шекаралық аймаққа рұқсат пен такси қажет. Әсерлі таулы пейзаж.',
        },
        tradeoff: {
          fi: '+ uniikki vuorijärvi / − lupa-asia + kuljettaja',
          en: '+ unique mountain lake / − permit hassle + driver',
          ru: '+ уникальное горное озеро / − вопрос с разрешением + водитель',
          kk: '+ ерекше тау көлі / − рұқсат қажет + жүргізуші',
        },
      },
      {
        title: {
          fi: 'Keskusvaltion museo + Arbat',
          en: 'Central State Museum + Arbat',
          ru: 'Центральный государственный музей + Арбат',
          kk: 'Орталық мемлекеттік музей + Арбат',
        },
        summary: {
          fi: 'Sateella sisätila-päivä, museon kierros, ilta katukävelyllä.',
          en: 'A rainy-day indoor option: museum tour, evening street walk.',
          ru: 'Дождливый день в помещении: экскурсия по музею, вечерняя прогулка по улицам.',
          kk: 'Жаңбырлы күнге арналған ішкі нұсқа: музей экскурсиясы, кешке көше серуені.',
        },
        tradeoff: {
          fi: '+ säävapaa / − vähemmän ikonimaisemia',
          en: '+ weather-proof / − fewer iconic views',
          ru: '+ не зависит от погоды / − меньше культовых видов',
          kk: '+ ауа райына тәуелсіз / − белгілі көріністер аз',
        },
      },
    ],
    backupPlan: {
      fi: 'Sade Shymbulakissa = vaihda Kök-Töbeen ja museoon.',
      en: 'Rain at Shymbulak = switch to Kök-Töbe and the museum.',
      ru: 'Дождь на Шымбулаке = переключитесь на Кок-Тобе и музей.',
      kk: 'Шымбұлақта жаңбыр болса = Көк-Төбе мен музейге ауысыңыз.',
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
    earlyWakeRisk: false,
  },

  // ============== PÄIVÄ 8 — Charyn päiväretki ==============
  {
    day: 8,
    date: '2026-06-06',
    city: {
      fi: 'Almaty → Charyn (päiväretki)',
      en: 'Almaty → Charyn (day trip)',
      ru: 'Алматы → Чарын (однодневная поездка)',
      kk: 'Алматы → Шарын (бір күндік сапар)',
    },
    sleepCity: { fi: 'Almaty', en: 'Almaty', ru: 'Алматы', kk: 'Алматы' },
    title: {
      fi: 'Charynin kanjoni — päiväretki',
      en: 'Charyn Canyon — day trip',
      ru: 'Чарынский каньон — однодневная поездка',
      kk: 'Шарын шатқалы — бір күндік сапар',
    },
    summary: {
      fi: 'Aikainen lähtö (07:00) kuljettajan tai jaetun retken kanssa. 3,5 h ajo Charynin Linnojen laaksoon. Vaellus 2–3 km, lounas ja paluu Almatyyn illalla.',
      en: 'Early departure (07:00) with a driver or on a shared tour. 3.5 h drive to the Valley of Castles in Charyn. A 2–3 km hike, lunch and return to Almaty in the evening.',
      ru: 'Ранний выезд (07:00) с водителем или групповым туром. 3,5 ч в пути до Долины замков в Чарыне. Поход 2–3 км, обед и возвращение в Алматы вечером.',
      kk: 'Ерте шығу (07:00) жүргізушімен немесе ортақ турмен. Шарындағы Қамалдар алқабына 3,5 сағаттық жол. 2–3 км жаяу серуен, түскі ас және кешке Алматыға қайту.',
    },
    sightIds: ['charyn-canyon'],
    anchors: [
      {
        time: { fi: '07:00', en: '07:00', ru: '07:00', kk: '07:00' },
        kind: 'tour',
        label: {
          fi: 'Lähtö Almatysta — pickup hotellilta',
          en: 'Departure from Almaty — pickup at the hotel',
          ru: 'Выезд из Алматы — забор у отеля',
          kk: 'Алматыдан шығу — қонақүйден алу',
        },
        urgency: 'on-arrival',
      },
      {
        time: { fi: '~20:00', en: '~20:00', ru: '~20:00', kk: '~20:00' },
        kind: 'arrival',
        label: {
          fi: 'Paluu Almatyyn',
          en: 'Return to Almaty',
          ru: 'Возвращение в Алматы',
          kk: 'Алматыға қайту',
        },
      },
    ],
    primaryPlan: {
      fi: 'Yksityiskuljettaja (~150–200 €/päivä) tai jaettu ryhmäretki (~60–80 €/hlö). Linnojen laakso 2–3 km vaellus, vesi 2 L/hlö, päähine. Paluu samana päivänä.',
      en: 'Private driver (~€150–200/day) or shared group tour (~€60–80/person). Valley of Castles 2–3 km hike, 2 L water per person, headwear. Return the same day.',
      ru: 'Частный водитель (~150–200 €/день) или групповой тур (~60–80 €/чел.). Долина замков, поход 2–3 км, 2 л воды на человека, головной убор. Возвращение в тот же день.',
      kk: 'Жеке жүргізуші (~150–200 €/күн) немесе топтық тур (~60–80 €/адам). Қамалдар алқабында 2–3 км серуен, 1 адамға 2 л су, бас киім. Сол күні қайту.',
    },
    alternatives: [
      {
        title: {
          fi: 'Charyn + Kolsai yhdistettynä (yö Satyssa)',
          en: 'Charyn + Kolsai combined (night in Saty)',
          ru: 'Чарын + Колсай вместе (ночь в Саты)',
          kk: 'Шарын + Көлсай бірге (Сатыда түнеу)',
        },
        summary: {
          fi: '2 päivän retki: päivä 1 Charyn, ilta Satyssa, päivä 2 Kolsai. Yhdistää päivät 8 ja 9.',
          en: '2-day trip: day 1 Charyn, evening in Saty, day 2 Kolsai. Combines days 8 and 9.',
          ru: '2-дневная поездка: день 1 — Чарын, вечер в Саты, день 2 — Колсай. Объединяет дни 8 и 9.',
          kk: '2 күндік сапар: 1-күн Шарын, кеште Сатыда, 2-күн Көлсай. 8 және 9-күндерді біріктіреді.',
        },
        tradeoff: {
          fi: '+ tehokas / − ekstrayö guesthouseilla',
          en: '+ efficient / − extra night in guesthouses',
          ru: '+ эффективно / − лишняя ночь в гостевых домах',
          kk: '+ тиімді / − қонақ үйде қосымша түн',
        },
      },
      {
        title: {
          fi: 'Charyn jaetussa minibussissa',
          en: 'Charyn on a shared minibus',
          ru: 'Чарын на групповом микроавтобусе',
          kk: 'Шарын ортақ микроавтобуспен',
        },
        summary: {
          fi: 'Halvempi ryhmäretki Almatysta — vähemmän joustoa pysähdyksiin.',
          en: 'Cheaper group tour from Almaty — less flexibility for stops.',
          ru: 'Более дешёвый групповой тур из Алматы — меньше гибкости в остановках.',
          kk: 'Алматыдан арзанырақ топтық сапар — аялдамаларға аз икемділік.',
        },
        tradeoff: {
          fi: '+ halvempi / − ei valokuvauspysähdyksiä',
          en: '+ cheaper / − no photo stops',
          ru: '+ дешевле / − без фотоостановок',
          kk: '+ арзанырақ / − суретке түсу үшін аялдамалар жоқ',
        },
      },
    ],
    backupPlan: {
      fi: 'Helle yli +35°C → lähtö klo 06 ja paluu klo 17. Älä jää keskipäivän kuumaan vaellukseen.',
      en: 'Heat above +35°C → depart at 06:00 and return by 17:00. Do not get caught hiking in the midday heat.',
      ru: 'Жара выше +35°C → выезд в 06:00 и возврат к 17:00. Не оставайтесь на пешем переходе в полуденный зной.',
      kk: '+35°C-тан жоғары ыстық → 06:00-де шығу және 17:00-ге дейін қайту. Күн ортасында ыстықта серуендеп қалмаңыз.',
    },
    cashKZT: 25000,
    driverNeeded: true,
    earlyWakeRisk: true,
    offlineNote: {
      fi: 'Charynissa heikko signaali — lataa 2GIS Almaty-region offline',
      en: 'Weak signal at Charyn — download the 2GIS Almaty region offline',
      ru: 'В Чарыне слабый сигнал — скачайте 2GIS по региону Алматы офлайн',
      kk: 'Шарында сигнал әлсіз — 2GIS-тің Алматы аймағын офлайн жүктеп алыңыз',
    },
  },

  // ============== PÄIVÄ 9 — Kolsai + Kaindy ==============
  {
    day: 9,
    date: '2026-06-07',
    city: {
      fi: 'Almaty → Saty (yövytään)',
      en: 'Almaty → Saty (overnight)',
      ru: 'Алматы → Саты (ночёвка)',
      kk: 'Алматы → Саты (түнеу)',
    },
    sleepCity: {
      fi: 'Saty (guesthouse)',
      en: 'Saty (guesthouse)',
      ru: 'Саты (гостевой дом)',
      kk: 'Саты (қонақ үй)',
    },
    title: {
      fi: 'Kolsai-järvet ja Kaindy',
      en: 'Kolsai Lakes and Kaindy',
      ru: 'Кольсайские озёра и Каинды',
      kk: 'Көлсай көлдері және Қайыңды',
    },
    summary: {
      fi: 'Lähtö Almatysta aamulla. Kolsai-1 (1820 m), valinnainen vaellus Kolsai-2:lle (4–5 h ed-takaisin). Iltapäivällä Kaindy-järvi. Yö Saty-kylässä.',
      en: 'Departure from Almaty in the morning. Kolsai-1 (1,820 m), optional hike to Kolsai-2 (4–5 h round trip). Kaindy Lake in the afternoon. Night in Saty village.',
      ru: 'Выезд из Алматы утром. Кольсай-1 (1820 м), по желанию поход к Кольсай-2 (4–5 ч туда-обратно). Днём озеро Каинды. Ночь в селе Саты.',
      kk: 'Таңертең Алматыдан шығу. Көлсай-1 (1820 м), қаласаңыз Көлсай-2-ге серуен (барып-қайтуға 4–5 сағ). Түстен кейін Қайыңды көлі. Саты ауылында түнеу.',
    },
    sightIds: ['kolsai-lakes', 'kaindy-lake'],
    anchors: [
      {
        time: { fi: '07:30', en: '07:30', ru: '07:30', kk: '07:30' },
        kind: 'drive',
        label: {
          fi: 'Lähtö Almatysta — kuljettajan kanssa, ~5 h ajo',
          en: 'Departure from Almaty — with the driver, ~5 h drive',
          ru: 'Выезд из Алматы — с водителем, ~5 ч в пути',
          kk: 'Алматыдан шығу — жүргізушімен, ~5 сағ жол',
        },
      },
    ],
    primaryPlan: {
      fi: 'Saavu Kolsai-1:lle puoliltapäivin. Kävelykierros järven ympäri (1 h) TAI vaellus Kolsai-2:lle (4–5 h, vaativampi, 2500 m korkeudella). Iltapäivä Kaindy. Yöksi Saty-guesthouseen.',
      en: 'Arrive at Kolsai-1 around midday. Walking loop around the lake (1 h) OR hike to Kolsai-2 (4–5 h, more demanding, at 2,500 m altitude). Afternoon at Kaindy. Overnight at a Saty guesthouse.',
      ru: 'Прибытие на Кольсай-1 ближе к полудню. Прогулка вокруг озера (1 ч) ИЛИ поход на Кольсай-2 (4–5 ч, сложнее, на высоте 2500 м). Днём Каинды. Ночь в гостевом доме в Саты.',
      kk: 'Көлсай-1-ге түс шамасында жетесіз. Көл айналасында серуен (1 сағ) НЕМЕСЕ Көлсай-2-ге серуен (4–5 сағ, ауырырақ, 2500 м биіктікте). Түстен кейін Қайыңды. Сатыдағы қонақ үйде түнеу.',
    },
    alternatives: [
      {
        title: {
          fi: 'Päiväretki ilman yötä',
          en: 'Day trip without overnight',
          ru: 'Однодневная поездка без ночёвки',
          kk: 'Түнеусіз бір күндік сапар',
        },
        summary: {
          fi: 'Lähtö Almatysta klo 05, vain Kolsai-1 + Kaindy, paluu illalla. Pitkä päivä.',
          en: 'Depart Almaty at 05:00, only Kolsai-1 + Kaindy, return in the evening. A long day.',
          ru: 'Выезд из Алматы в 05:00, только Кольсай-1 + Каинды, возврат вечером. Длинный день.',
          kk: 'Алматыдан 05:00-де шығу, тек Көлсай-1 + Қайыңды, кешке қайту. Ұзақ күн.',
        },
        tradeoff: {
          fi: '+ säästää yön / − hektinen, ei ehdi Kolsai-2:lle',
          en: '+ saves the night / − hectic, no time for Kolsai-2',
          ru: '+ экономит ночь / − суматошно, не успеете на Кольсай-2',
          kk: '+ түнді үнемдейді / − қарбалас, Көлсай-2-ге үлгермейсіз',
        },
      },
      {
        title: {
          fi: 'Vain Kaindy',
          en: 'Kaindy only',
          ru: 'Только Каинды',
          kk: 'Тек Қайыңды',
        },
        summary: {
          fi: 'Jos Kolsai ei lumesta puhdistunut, vain Kaindy + Charyn yhdistettynä.',
          en: 'If Kolsai is not yet clear of snow, just Kaindy + Charyn combined.',
          ru: 'Если Кольсай ещё не очистился от снега, только Каинды + Чарын вместе.',
          kk: 'Көлсай әлі қардан тазармаған болса, тек Қайыңды + Шарын біріктірілген.',
        },
        tradeoff: {
          fi: '+ helpompi / − missaa Kolsain',
          en: '+ easier / − you miss Kolsai',
          ru: '+ проще / − пропускаете Кольсай',
          kk: '+ оңайырақ / − Көлсайды жіберіп аласыз',
        },
      },
    ],
    backupPlan: {
      fi: 'Sade vuoristossa = yövy Satyssa, retki seuraavalle päivälle. Kaindy 4WD vaaditaan — varmista että kuljettajalla on Niva tai vastaava.',
      en: 'Rain in the mountains = stay overnight in Saty, push the trip a day. 4WD is required for Kaindy — make sure the driver has a Niva or equivalent.',
      ru: 'Дождь в горах = переночуйте в Саты, поход на следующий день. Для Каинды нужен 4WD — убедитесь, что у водителя есть Нива или аналог.',
      kk: 'Тауда жаңбыр болса = Сатыда түнеп, сапарды келесі күнге қалдырыңыз. Қайыңдыға 4WD қажет — жүргізушіде Нива немесе соған ұқсас көлік бар екенін тексеріңіз.',
    },
    lodgingHint: {
      area: {
        fi: 'Saty-kylä — paikallinen guesthouse, ei verkkovarausta',
        en: 'Saty village — local guesthouse, no online booking',
        ru: 'Село Саты — местный гостевой дом, без онлайн-бронирования',
        kk: 'Саты ауылы — жергілікті қонақ үй, онлайн брондау жоқ',
      },
      priceRangeEUR: [25, 50],
      bookingApps: ['paikan päällä', 'kuljettajan suositus', 'kalpak-travel.com etukäteen'],
      note: {
        fi: 'WC ulkona useimmiten. Lämmin yötakki — 1800 m yöllä +5–10°C',
        en: 'Toilet usually outdoors. A warm overnight jacket — 1,800 m at night is +5–10°C',
        ru: 'Туалет обычно на улице. Тёплая куртка на ночь — на высоте 1800 м ночью +5–10°C',
        kk: 'Дәретхана көбіне сыртта. Жылы кешкі күрте — 1800 м-де түнде +5–10°C',
      },
    },
    cashKZT: 35000,
    driverNeeded: true,
    earlyWakeRisk: false,
    offlineNote: {
      fi: 'Saty-kylässä signaali heikko — varmista että kuljettaja saa sinut takaisin sovittuna aikana',
      en: 'Signal is weak in Saty village — make sure the driver picks you up at the agreed time',
      ru: 'В селе Саты сигнал слабый — убедитесь, что водитель заберёт вас в условленное время',
      kk: 'Саты ауылында сигнал әлсіз — жүргізушінің сізді келісілген уақытта алып кететініне көз жеткізіңіз',
    },
  },

  // ============== PÄIVÄ 10 — Paluu Almaty + siirtymä Astanaan ==============
  {
    day: 10,
    date: '2026-06-08',
    city: {
      fi: 'Saty → Almaty → Astana',
      en: 'Saty → Almaty → Astana',
      ru: 'Саты → Алматы → Астана',
      kk: 'Саты → Алматы → Астана',
    },
    sleepCity: {
      fi: 'Talgo-juna TAI Astana',
      en: 'Talgo train OR Astana',
      ru: 'Поезд Talgo ИЛИ Астана',
      kk: 'Talgo пойызы НЕМЕСЕ Астана',
    },
    title: {
      fi: 'Paluu Almatyyn + siirtymä Astanaan',
      en: 'Return to Almaty + transfer to Astana',
      ru: 'Возвращение в Алматы + переезд в Астану',
      kk: 'Алматыға қайту + Астанаға көшу',
    },
    summary: {
      fi: 'Aamulla paluu Satysta Almatyyn (5 h). Iltapäivä vapaa Almatyssa — basaari, sauna, lounas. Illalla siirtymä Astanaan (suositus: Talgo-yöjuna).',
      en: 'Morning return from Saty to Almaty (5 h). Afternoon free in Almaty — bazaar, sauna, lunch. Evening transfer to Astana (recommended: Talgo night train).',
      ru: 'Утром возвращение из Саты в Алматы (5 ч). Днём свободное время в Алматы — базар, сауна, обед. Вечером переезд в Астану (рекомендуется: ночной Talgo).',
      kk: 'Таңертең Сатыдан Алматыға қайту (5 сағ). Түстен кейін Алматыда бос — базар, сауна, түскі ас. Кешке Астанаға көшу (ұсыныс: түнгі Talgo пойызы).',
    },
    sightIds: ['almaty-craft-beer'],
    anchors: [
      {
        time: { fi: '08:00', en: '08:00', ru: '08:00', kk: '08:00' },
        kind: 'drive',
        label: {
          fi: 'Lähtö Satysta',
          en: 'Departure from Saty',
          ru: 'Выезд из Саты',
          kk: 'Сатыдан шығу',
        },
      },
      {
        time: { fi: '~13:00', en: '~13:00', ru: '~13:00', kk: '~13:00' },
        kind: 'arrival',
        label: {
          fi: 'Paluu Almatyyn',
          en: 'Return to Almaty',
          ru: 'Возвращение в Алматы',
          kk: 'Алматыға қайту',
        },
      },
      {
        time: { fi: '~22:00', en: '~22:00', ru: '~22:00', kk: '~22:00' },
        kind: 'train',
        label: {
          fi: 'Talgo-yöjuna ALA → AST, ~13 h',
          en: 'Talgo night train ALA → AST, ~13 h',
          ru: 'Ночной поезд Talgo ALA → AST, ~13 ч',
          kk: 'Talgo түнгі пойызы ALA → AST, ~13 сағ',
        },
        urgency: 'week-before',
      },
    ],
    primaryPlan: {
      fi: 'Suositus: Talgo-yöjuna säästää sekä hotelliyön (~60 €) että lentolipun (~70 €) — bisnesluokan kupé 4 hengelle ~35 €. Lähtö 22:00, saapuminen Astanaan klo ~11.',
      en: 'Recommended: the Talgo night train saves both a hotel night (~€60) and a flight ticket (~€70) — a business-class compartment for 4 is ~€35. Departs 22:00, arrives in Astana around 11:00.',
      ru: 'Рекомендуется: ночной поезд Talgo экономит и ночь в отеле (~60 €), и авиабилет (~70 €) — купе бизнес-класса на 4 человек ~35 €. Отправление в 22:00, прибытие в Астану около 11:00.',
      kk: 'Ұсыныс: Talgo түнгі пойызы қонақүй түнін де (~60 €), әуе билетін де (~70 €) үнемдейді — 4 адамға арналған бизнес-класс купесі ~35 €. Жөнелу 22:00-де, Астанаға келу шамамен 11:00-де.',
    },
    alternatives: [
      {
        title: {
          fi: 'Iltalento ALA → NQZ',
          en: 'Evening flight ALA → NQZ',
          ru: 'Вечерний рейс ALA → NQZ',
          kk: 'ALA → NQZ кешкі рейсі',
        },
        summary: {
          fi: 'Air Astana / FlyArystan iltapäivä-/iltalento, ~1h 45min, ~50–100 €. Hotelliyö Astanassa erikseen.',
          en: 'Air Astana / FlyArystan afternoon/evening flight, ~1 h 45 min, ~€50–100. Hotel night in Astana separately.',
          ru: 'Air Astana / FlyArystan дневной/вечерний рейс, ~1 ч 45 мин, ~50–100 €. Ночь в отеле в Астане отдельно.',
          kk: 'Air Astana / FlyArystan түстен кейінгі/кешкі рейс, ~1 сағ 45 мин, ~50–100 €. Астанадағы қонақүй түні бөлек.',
        },
        tradeoff: {
          fi: '+ nopeampi / − maksaa hotelliyön + lentolipun = ~130 €',
          en: '+ faster / − costs a hotel night + a flight = ~€130',
          ru: '+ быстрее / − стоит ночь в отеле + авиабилет = ~130 €',
          kk: '+ жылдамырақ / − қонақүй түні + әуе билеті = ~130 €',
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
          fi: 'Yö Almatyssa, lento päivän 11 aamulla. Aiheuttaa pituuden Almaty-osuuteen.',
          en: 'Night in Almaty, flight on the morning of day 11. Extends the Almaty leg.',
          ru: 'Ночь в Алматы, рейс утром 11-го дня. Удлиняет алматинскую часть.',
          kk: 'Алматыда түнеу, 11-күні таңертең рейс. Алматы бөлігін ұзартады.',
        },
        tradeoff: {
          fi: '+ kunnon yöuni / − vie yhden Astana-päivän',
          en: '+ proper night sleep / − costs you one Astana day',
          ru: '+ нормальный сон / − забирает один день в Астане',
          kk: '+ толық түнгі ұйқы / − Астанадан бір күн алады',
        },
      },
    ],
    lodgingHint: {
      area: {
        fi: 'Talgo-juna: 4 hengen kupé, suihkua ei ole — pese ennen lähtöä',
        en: 'Talgo train: 4-person compartment, no shower — wash before boarding',
        ru: 'Поезд Talgo: купе на 4 человек, душа нет — помойтесь до отправления',
        kk: 'Talgo пойызы: 4 адамдық купе, душ жоқ — мінер алдында жуынып алыңыз',
      },
      priceRangeEUR: [25, 60],
      bookingApps: ['bilet.railways.kz', 'Tutu.ru'],
      note: {
        fi: 'Junalipun voi varata 60 päivää etukäteen — kesäkuussa täynnä, varaa heti',
        en: 'Train tickets open 60 days in advance — June sells out, book immediately',
        ru: 'Билеты на поезд продаются за 60 дней — июнь распродаётся, бронируйте сразу',
        kk: 'Пойыз билеттері 60 күн бұрын ашылады — маусымда тез сатылып бітеді, бірден брондаңыз',
      },
    },
    cashKZT: 20000,
    driverNeeded: true,
    earlyWakeRisk: false,
    offlineNote: {
      fi: 'Junaolipun e-versio puhelimessa offline — lataa PDF',
      en: 'Keep the e-ticket on your phone offline — download the PDF',
      ru: 'E-билет на телефоне офлайн — скачайте PDF',
      kk: 'Электрондық билетті телефонда офлайн ұстаңыз — PDF-ті жүктеп алыңыз',
    },
  },

  // ============== PÄIVÄ 11 — Astana saapuminen ==============
  {
    day: 11,
    date: '2026-06-09',
    city: { fi: 'Astana', en: 'Astana', ru: 'Астана', kk: 'Астана' },
    sleepCity: { fi: 'Astana', en: 'Astana', ru: 'Астана', kk: 'Астана' },
    title: {
      fi: 'Astana — Atameken, Baiterek ja Khan Shatyr',
      en: 'Astana — Atameken, Baiterek and Khan Shatyr',
      ru: 'Астана — Атамекен, Байтерек и Хан Шатыр',
      kk: 'Астана — Атамекен, Бәйтерек және Хан Шатыр',
    },
    summary: {
      fi: 'Yöjuna saapuu aamulla. Iltapäivällä Atameken-pienoismalli (maan kartta kokoluokassa), sitten Baiterek-torni auringonlaskuun ja Khan Shatyr illalla.',
      en: 'The night train arrives in the morning. In the afternoon, the Atameken miniature park (a scale map of the country), then Baiterek Tower at sunset and Khan Shatyr in the evening.',
      ru: 'Ночной поезд прибывает утром. Днём — парк миниатюр Атамекен (карта страны в масштабе), затем башня Байтерек на закате и Хан Шатыр вечером.',
      kk: 'Түнгі пойыз таңертең келеді. Түстен кейін Атамекен миниатюра паркі (ел картасы масштабта), содан кейін күн батуға Бәйтерек мұнарасы және кешке Хан Шатыр.',
    },
    sightIds: ['atameken-map', 'bayterek', 'khan-shatyr'],
    anchors: [
      {
        time: { fi: '~11:00', en: '~11:00', ru: '~11:00', kk: '~11:00' },
        kind: 'arrival',
        label: {
          fi: 'Talgo saapuu Astana-asemalle (Nurly-Zhol)',
          en: 'Talgo arrives at Astana station (Nurly-Zhol)',
          ru: 'Talgo прибывает на вокзал Астаны (Нурлы-Жол)',
          kk: 'Talgo Астана вокзалына келеді (Нұрлы-Жол)',
        },
      },
      {
        time: { fi: '~12:00', en: '~12:00', ru: '~12:00', kk: '~12:00' },
        kind: 'drive',
        label: {
          fi: 'Yandex Go hotellille (~15 min)',
          en: 'Yandex Go to the hotel (~15 min)',
          ru: 'Yandex Go в отель (~15 мин)',
          kk: 'Yandex Go-мен қонақүйге (~15 мин)',
        },
      },
    ],
    primaryPlan: {
      fi: 'Suihku ja lounas hotelilla. Iltapäivä jalan ja Yandex Go:lla: Atameken-pienoismalli (1,5 h, 1500 KZT) antaa hyvän yleiskuvan Kazakstanin maantieteestä → Baiterek-torni auringonlaskuun (näköala, 2500 KZT) → Khan Shatyr illalla (ilmainen sisäänkäynti). Illallinen kaupungissa.',
      en: 'Shower and lunch at the hotel. Afternoon on foot and with Yandex Go: Atameken miniature park (1.5 h, 1,500 KZT) gives a good overview of Kazakhstan\'s geography → Baiterek Tower at sunset (viewpoint, 2,500 KZT) → Khan Shatyr in the evening (free entry). Dinner in the city.',
      ru: 'Душ и обед в отеле. Днём пешком и на Yandex Go: парк миниатюр Атамекен (1,5 ч, 1500 KZT) — хороший обзор географии Казахстана → башня Байтерек на закате (смотровая, 2500 KZT) → Хан Шатыр вечером (вход бесплатный). Ужин в городе.',
      kk: 'Қонақүйде душ және түскі ас. Түстен кейін жаяу және Yandex Go-мен: Атамекен миниатюра паркі (1,5 сағ, 1500 KZT) Қазақстан географиясына жақсы шолу береді → күн батуға Бәйтерек мұнарасы (шолу алаңы, 2500 KZT) → кешке Хан Шатыр (кіру тегін). Қалада кешкі ас.',
    },
    alternatives: [
      {
        title: {
          fi: 'Lentokenttä-saapuminen',
          en: 'Arrival by air',
          ru: 'Прибытие через аэропорт',
          kk: 'Әуежай арқылы келу',
        },
        summary: {
          fi: 'Jos otit lennon: Astana lentokenttä (NQZ) on kaupungista 16 km, taksi Yandex Go ~20 min ~2 500 KZT.',
          en: 'If you took the flight: Astana airport (NQZ) is 16 km from the city, Yandex Go taxi ~20 min ~2,500 KZT.',
          ru: 'Если летите: аэропорт Астаны (NQZ) в 16 км от города, такси Yandex Go ~20 мин ~2 500 KZT.',
          kk: 'Рейспен келсеңіз: Астана әуежайы (NQZ) қаладан 16 км, Yandex Go таксиі ~20 мин ~2 500 KZT.',
        },
      },
      {
        title: {
          fi: 'Pelkkä Baiterek + Khan Shatyr (Atameken jätetty)',
          en: 'Just Baiterek + Khan Shatyr (skip Atameken)',
          ru: 'Только Байтерек + Хан Шатыр (без Атамекена)',
          kk: 'Тек Бәйтерек + Хан Шатыр (Атамекенсіз)',
        },
        summary: {
          fi: 'Jos jaksaminen rajoittunut yöjunan jälkeen, ohita Atameken ja tee vain klassikkoduo Baiterek + Khan Shatyr.',
          en: 'If energy is limited after the night train, skip Atameken and do just the classic duo Baiterek + Khan Shatyr.',
          ru: 'Если сил мало после ночного поезда, пропустите Атамекен и сделайте только классический дуэт — Байтерек + Хан Шатыр.',
          kk: 'Түнгі пойыздан кейін күш жетпесе, Атамекенді өткізіп жіберіп, тек классикалық қос нысанды (Бәйтерек + Хан Шатыр) аралаңыз.',
        },
        tradeoff: {
          fi: '+ kevyempi / − ei maankuvaa',
          en: '+ lighter / − no country overview',
          ru: '+ легче / − без обзора страны',
          kk: '+ жеңілірек / − ел картасын көрмейсіз',
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

  // ============== PÄIVÄ 12 — Astana moskeijat & Rauhan palatsi ==============
  {
    day: 12,
    date: '2026-06-10',
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
          fi: 'Päiväretki Burabay-luonnonpuistoon',
          en: 'Day trip to Burabay National Park',
          ru: 'Однодневная поездка в Бурабай',
          kk: 'Бурабай ұлттық саябағына бір күндік сапар',
        },
        summary: {
          fi: '~250 km pohjoiseen Astanasta — vuori ja järvi (Borovoe). Kokopäivän retki, ~70–100 €/hlö.',
          en: '~250 km north of Astana — mountain and lake (Borovoye). Full-day trip, ~€70–100/person.',
          ru: '~250 км к северу от Астаны — гора и озеро (Боровое). Поездка на весь день, ~70–100 €/чел.',
          kk: 'Астанадан солтүстікке ~250 км — тау мен көл (Бурабай). Бір күндік сапар, 1 адамға ~70–100 €.',
        },
        tradeoff: {
          fi: '+ luonto kaupunkirutiinin keskellä / − pitkä autopäivä, vaihda päivän 13 kanssa',
          en: '+ nature in the middle of city routine / − long driving day, swap with day 13',
          ru: '+ природа посреди городских будней / − долгий день в авто, поменяйте местами с днём 13',
          kk: '+ қала бағдарламасының ортасында табиғат / − ұзақ көлік күні, 13-күнмен ауыстырыңыз',
        },
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

  // ============== PÄIVÄ 13 — Astana vapaapäivä / valmistautuminen ==============
  {
    day: 13,
    date: '2026-06-11',
    city: {
      fi: 'Astana / Burabay',
      en: 'Astana / Burabay',
      ru: 'Астана / Бурабай',
      kk: 'Астана / Бурабай',
    },
    sleepCity: { fi: 'Astana', en: 'Astana', ru: 'Астана', kk: 'Астана' },
    title: {
      fi: 'Päiväretki Burabay-luonnonpuistoon (TAI EXPO-päivä)',
      en: 'Day trip to Burabay National Park (OR EXPO day)',
      ru: 'Однодневная поездка в Бурабай (ИЛИ день EXPO)',
      kk: 'Бурабай ұлттық саябағына бір күндік сапар (НЕМЕСЕ EXPO күні)',
    },
    summary: {
      fi: 'Aikainen lähtö Burabay-luonnonpuistoon (250 km, 3 h) — kazakkien "Pohjoinen Sveitsi" graniittivuori, järvi ja mäntymetsät. Paluu illalla, viimeiset asiat ja illallinen.',
      en: 'Early departure to Burabay National Park (250 km, 3 h) — the Kazakh "Northern Switzerland" with granite mountain, lake and pine forests. Return in the evening, last errands and dinner.',
      ru: 'Ранний выезд в Бурабай (250 км, 3 ч) — казахстанская "Северная Швейцария" с гранитной горой, озером и сосновыми лесами. Возвращение вечером, последние дела и ужин.',
      kk: 'Бурабай ұлттық саябағына ерте шығу (250 км, 3 сағ) — қазақтардың "Солтүстік Швейцариясы" — гранит тауы, көл және қарағайлы орман. Кешке қайту, соңғы шаруалар мен кешкі ас.',
    },
    sightIds: ['burabay-park'],
    anchors: [
      {
        time: { fi: '07:00', en: '07:00', ru: '07:00', kk: '07:00' },
        kind: 'drive',
        label: {
          fi: 'Lähtö Astanasta — kuljettaja/jaettu retki (~3 h)',
          en: 'Departure from Astana — driver/shared tour (~3 h)',
          ru: 'Выезд из Астаны — водитель/групповой тур (~3 ч)',
          kk: 'Астанадан шығу — жүргізуші/ортақ тур (~3 сағ)',
        },
      },
      {
        time: { fi: '~10:00', en: '~10:00', ru: '~10:00', kk: '~10:00' },
        kind: 'arrival',
        label: {
          fi: 'Saapuminen Burabayn ympäristöön',
          en: 'Arrival in the Burabay area',
          ru: 'Прибытие в район Бурабая',
          kk: 'Бурабай аумағына жету',
        },
      },
      {
        time: { fi: '~17:00', en: '~17:00', ru: '~17:00', kk: '~17:00' },
        kind: 'drive',
        label: {
          fi: 'Paluu Astanaan',
          en: 'Return to Astana',
          ru: 'Возвращение в Астану',
          kk: 'Астанаға қайту',
        },
      },
    ],
    primaryPlan: {
      fi: 'Päiväretki Burabay-luonnonpuistoon — graniittivuori (Okzhetpes), Burabay-järven uintipaikka, mäntymetsät. Lounas Schuchinskissa tai järvellä. Kesäkuussa järvi on uimakelpoinen. Yksityinen kuljettaja 30 000–45 000 KZT/päivä TAI jaettu retki 35 000–50 000 KZT/hlö. Lähtö viimeistään klo 7.',
      en: 'Day trip to Burabay National Park — granite mountain (Okzhetpes), Burabay lake swimming spot, pine forests. Lunch in Shchuchinsk or by the lake. In June the lake is swimmable. Private driver 30,000–45,000 KZT/day OR shared trip 35,000–50,000 KZT/person. Depart no later than 07:00.',
      ru: 'Однодневная поездка в Бурабай — гранитная гора (Окжетпес), купание в озере Бурабай, сосновые леса. Обед в Щучинске или у озера. В июне в озере можно купаться. Частный водитель 30 000–45 000 KZT/день ИЛИ групповая поездка 35 000–50 000 KZT/чел. Выезд не позже 7 утра.',
      kk: 'Бурабай ұлттық саябағына бір күндік сапар — гранит тауы (Оқжетпес), Бурабай көлінде шомылу орны, қарағайлы орман. Щучинскіде немесе көл жанында түскі ас. Маусымда көлге шомылуға болады. Жеке жүргізуші 30 000–45 000 KZT/күн НЕМЕСЕ ортақ сапар 35 000–50 000 KZT/адам. Кешіктірмей 07:00-де шығыңыз.',
    },
    alternatives: [
      {
        title: {
          fi: 'EXPO-päivä (Nur Alem + Atameken jos ei vielä)',
          en: 'EXPO day (Nur Alem + Atameken if not yet visited)',
          ru: 'День EXPO (Нур Алем + Атамекен, если ещё не были)',
          kk: 'EXPO күні (Нұр Әлем + Атамекен, әлі көрмесеңіз)',
        },
        summary: {
          fi: 'Kaupunkipäivä: Nur Alem -sfääri (8 kerrosta tulevaisuuden energiasta) + EXPO-alue kävellen. Atameken jos jäi väliin. Kevyempi kuin Burabay.',
          en: 'A city day: the Nur Alem sphere (8 floors on future energy) + EXPO area on foot. Atameken if you missed it. Lighter than Burabay.',
          ru: 'Городской день: сфера Нур Алем (8 этажей про энергию будущего) + EXPO пешком. Атамекен, если не были раньше. Легче, чем Бурабай.',
          kk: 'Қалалық күн: Нұр Әлем сферасы (болашақ энергиясы туралы 8 қабат) + EXPO аумағын жаяу. Көрмеген болсаңыз, Атамекен. Бурабайдан жеңілірек.',
        },
        tradeoff: {
          fi: '+ ei pitkää autoretkeä / − ei luontoa Astana-osuuden keskellä',
          en: '+ no long road trip / − no nature in the Astana leg',
          ru: '+ без долгой поездки / − без природы в астанинской части',
          kk: '+ ұзақ көлік сапары жоқ / − Астана бөлігінде табиғат жоқ',
        },
      },
      {
        title: {
          fi: 'Astana Opera ulkoa + vanhakaupunki',
          en: 'Astana Opera from outside + old town',
          ru: 'Astana Opera снаружи + старый город',
          kk: 'Астана Операсы сыртынан + ескі қала',
        },
        summary: {
          fi: 'Oopperatalon valkoinen "kakku" ulkoa (kausi suljettu kesäkuussa), kävely oikean rannan vanhempaan kaupunkikuvaan kontrastiksi.',
          en: 'The opera house\'s white "cake" from outside (season closed in June), walk along the right bank to the older cityscape for contrast.',
          ru: 'Белый "торт" оперного театра снаружи (сезон закрыт в июне), прогулка по правому берегу — старая часть города для контраста.',
          kk: 'Опера театрының ақ "торты" сыртынан (маусымда маусым жабық), оң жағалаудың ескі бөлігінде серуен — қарама-қайшылық үшін.',
        },
        tradeoff: {
          fi: '+ arkkitehtuuri-fokus / − kohteet tarjoavat lyhyemmän kokemuksen',
          en: '+ architecture focus / − the sights are a shorter experience',
          ru: '+ фокус на архитектуре / − объекты дают более короткий опыт',
          kk: '+ сәулетке шоғырлану / − нысандар қысқа тәжірибе береді',
        },
      },
      {
        title: {
          fi: 'Lepopäivä + basaari Artyom',
          en: 'Rest day + Artyom bazaar',
          ru: 'День отдыха + базар Артём',
          kk: 'Демалыс күн + Артем базары',
        },
        summary: {
          fi: 'Jos koko reissu on uuvuttanut: kahvilaa, basaari Artyom lahjoiksi, pakkaaminen, sauna.',
          en: 'If the whole trip has worn you out: cafe time, Artyom bazaar for gifts, packing, sauna.',
          ru: 'Если вся поездка вымотала: кафе, базар Артём за подарками, сборы, сауна.',
          kk: 'Бүкіл сапар шаршатса: кафе, сыйлықтарға Артем базары, жинау, сауна.',
        },
        tradeoff: {
          fi: '+ kunnon lepo / − ei näe Burabaytä tai EXPO:a',
          en: '+ proper rest / − you do not see Burabay or EXPO',
          ru: '+ нормальный отдых / − не увидите Бурабай или EXPO',
          kk: '+ толық демалыс / − Бурабай мен EXPO-ны көрмейсіз',
        },
      },
    ],
    backupPlan: {
      fi: 'Jos Burabay ei tunnu houkuttavalta tai sää sateinen, EXPO-päivä on hyvä B-plani. Kuljettaja vahvistetaan päivää ennen — peruutusehdot 24 h.',
      en: 'If Burabay does not appeal or the weather is rainy, the EXPO day is a good plan B. The driver is confirmed the day before — 24 h cancellation terms.',
      ru: 'Если Бурабай не привлекает или дождливо, день EXPO — хороший план Б. Водитель подтверждается за день — отмена за 24 ч.',
      kk: 'Бурабай қызықтырмаса немесе ауа райы жаңбырлы болса, EXPO күні жақсы Б-жоспар. Жүргізуші бір күн бұрын расталады — бас тарту шарты 24 сағат.',
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
    cashKZT: 12000,
    driverNeeded: false,
    earlyWakeRisk: true,
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
