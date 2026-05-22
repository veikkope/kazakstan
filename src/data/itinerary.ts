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
    city: 'Helsinki / ilma',
    sleepCity: 'Lentokoneessa',
    title: 'Lähtö Suomesta',
    summary:
      'Lento Helsingistä Aqtauhun, todennäköisesti vaihto Istanbulissa. Saapuminen Aqtauhun yöllä klo 03 aikoihin.',
    sightIds: [],
    anchors: [
      { time: '~17:00', kind: 'departure', label: 'Lähtö Helsinki-Vantaa', urgency: 'now' },
      { time: 'yö', kind: 'flight', label: 'Vaihto Istanbul (tai Frankfurt)', urgency: 'now' },
    ],
    primaryPlan:
      'Pakkaa kevyesti, lue Aqtauhun saapumisesta. Lentokenttätaksi tai juna Helsinki-Vantaalle. Käteistä KZT vaihdettu tai nostettu Aqtaun lentokentällä.',
    backupPlan: 'Lennon viivästyessä yhteyspaperit ja seuraavan vuoron tieto valmiina.',
    earlyWakeRisk: true,
    cashKZT: 0,
    offlineNote:
      '⚠️ Lataa 2GIS:n Aqtau-paketti, Organic Mapsin Mangystau-kartta ja Aqtau Airport → keskusta-reitti ennen lähtöä. eSIM aktivoituna ennen laskeutumista.',
  },

  // ============== PÄIVÄ 2 — Aqtau saapuminen ==============
  {
    day: 2,
    date: '2026-05-31',
    city: 'Aqtau',
    sleepCity: 'Aqtau',
    title: 'Saapuminen Aqtauhun + vuokra-auton pickup',
    summary:
      'Laskeutuminen yöllä, taksi hotellille. Aamupäivä lepoa. Iltapäivällä vuokra-auton pickup (Avis/Europcar/paikallinen) ja iltakävely Kaspian-rannalla.',
    sightIds: ['aqtau-promenade'],
    anchors: [
      { time: '~03:00', kind: 'arrival', label: 'Lasku Aqtau Intl (SCO)' },
      { time: '~04:00', kind: 'drive', label: 'Taksi keskustaan, ~3 000–5 000 KZT' },
      { time: '~05:00', kind: 'checkin', label: 'Hotelli — pyydä aikainen check-in etukäteen' },
      { time: 'iltapäivä', kind: 'drive', label: 'Vuokra-auton pickup — Avis/Europcar/Hertz', urgency: 'now' },
    ],
    primaryPlan:
      'Nukkua aamupäivä kuntoon. Iltapäivällä vuokra-auton pickup keskustasta tai lentokentältä (varaa etukäteen, hinta n. 30–60 €/päivä). Iltakävely Kaspian-rannalle (aqtau-promenadi, "I love Aktau" -merkki) ja paikallinen ravintola illalliseksi. **Nosta käteistä Mangystau-retkeä varten: 150 000 KZT/2 hlöä** (ATM-raja 100 000 KZT/nosto — tee kahdessa nostossa) Halyk- tai Kaspi-pankin ATM:stä. Tarkista WhatsApp-viestit Mangystau-operaattorilta — vahvista pickup-aika huomista varten.',
    alternatives: [
      {
        title: 'Aktiivinen päivä',
        summary: 'Jos jaksaminen riittää, ajakaa vuokra-autolla Aqtauta pohjoiseen rannikkoa pitkin — eteläiset rannat ovat hyviä iltapäiväuintiin.',
        tradeoff: '+ aktiivinen aloitus / − vie energiaa 4WD-retkeä varten',
      },
      {
        title: 'Vuokra-auto vasta päivänä 5',
        summary: 'Voitte myös noutaa vuokra-auton vasta paluupäivänä — silloin Mangystau-retken aikana auto ei seiso turhaan.',
        tradeoff: '+ säästää 2 vrk vuokrasta / − ei oman auton iltapäivää',
      },
    ],
    backupPlan: 'Jos uupumus on liikaa, jää hotelliin koko päivä. Vuokra-auton voi noutaa myöhemminkin.',
    lodgingHint: {
      area: 'Aqtau keskusta — Mikrorajon-3, lähellä rantakatua',
      priceRangeEUR: [40, 80],
      bookingApps: ['Booking.com', 'Ostrovok', 'paikalliset hotellit'],
      note: 'Kysele aikaista check-iniä etukäteen — saapuminen yöllä',
    },
    cashKZT: 15000,
    driverNeeded: false,
    earlyWakeRisk: false,
    notes:
      'Käyttäjä-vinkki: Aqtau-saapuminen ennen klo 06 voi tarkoittaa hotellin yhden yön lisämaksua (early check-in). Kysele booking-vahvistuksessa. — Mangystau-operaattorin pitää olla varattu jo Helsingistä käsin (deadline 22.5., ks. päivän 3 notes).',
  },

  // ============== PÄIVÄ 3 — Mangystau day 1 ==============
  {
    day: 3,
    date: '2026-06-01',
    city: 'Mangystau (Sherkala / Pallolaakso)',
    sleepCity: 'Jurtta erämaassa tai Shetpe-kylä',
    title: 'Mangystau 4WD-retki päivä 1 — Sherkala + Pallolaakso',
    summary:
      '4WD + opas -retki (ERILLINEN vuokra-autosta — vuokra-auto jää hotellille). Sherkalan kalliovuori, sitten Torysh-pallolaakso. Yö jurttassa tähtitaivaan alla.',
    sightIds: ['sherkala', 'valley-of-balls'],
    anchors: [
      { time: '07:00', kind: 'tour', label: '4WD-kuljettaja noutaa hotellilta (vahvista WhatsApp-pickup edellisenä iltana)', urgency: 'now' },
      { time: 'ilta', kind: 'checkin', label: 'Jurttamajoitus tai guesthouse Shetpessä — operaattori järjestää' },
    ],
    primaryPlan:
      '⚠️ TÄMÄ ON 4WD + OPAS -RETKI, ei vuokra-auto. Vuokra-auto jää hotellille. Sherkalassa kävelykierros n. 1 h, Pallolaaksossa valokuvauspysähdys. Vesi (8L/hlö), aurinkovoide, päähine pakollisia — kesäkuussa +30–35°C. Vahvista kuljettajan nimi WhatsAppissa — jos eri henkilö saapuu hakemaan, soita operaattorille ennen lähtöä.',
    alternatives: [
      {
        title: '1-päivän express (paluu Aqtauhun illalla)',
        summary: 'Vain Sherkala TAI Pallolaakso, ei Bozzhyraa. Halvin ja kevyin.',
        tradeoff: '+ säästää 1 päivä reissusta / − ei näe pääikoonia Bozzhyraa',
      },
      {
        title: '3-päivän syvempi (lisätään Beket-Ata + Kyzylkup)',
        summary: 'Kolmas päivä Beket-Atan luolamoskeijaan ja Kyzylkupin punaiseen Linnanlaaksoon.',
        tradeoff: '+ kattaa kaiken / − vie 3 päivää Almaty/Astana-ajasta',
      },
      {
        title: 'Sherkala vuokra-autolla itse',
        summary: 'Sherkalaan pääsee päällystettyä tietä ja 10–15 km gravelia kuivassa säässä. Voitte ajaa itse päiväretkenä Aqtausta (~170 km/suunta) jos vuokrasopimus sallii sorateiden ajamisen — VARMISTA TÄMÄ vuokraamosta.',
        tradeoff: '+ halvempi / − vain Sherkala, ei muita kohteita; ajaminen vie energiaa',
      },
    ],
    backupPlan:
      'Jos sää on liian kuuma (>40°C) tai pölymyrsky, siirrä retki päivällä eteenpäin. Kuljettaja antaa yleensä vapaata peruutusta 24 h ennen.',
    cashKZT: 80000,
    driverNeeded: true,
    earlyWakeRisk: false,
    offlineNote:
      'Mangystaussa signaalia ei usein ole. Lataa 2GIS + Organic Maps offline. WhatsApp/Telegram-yhteys kuljettajaan lähtöpäivänä etukäteen.',
    notes:
      'OPERAATTORI varattu etukäteen (ks. logistics.ts → mangystauOperators). TOP-3-suositus: Mangystau Tour 999 (WhatsApp +7 700 909 9986, $900/auto/2pv), RedMaya Travel (WhatsApp +7 771 286 9516, pyydä opas Nurdiyar/Saken), Travel to Mangistau (WhatsApp +7 702 466 3322). Strategia: lähetä sama briefi kolmelle rinnan **viim. 22.5.**, varaa nopeimmin vastaava 20 % Wise-ennakolla, loput käteisellä KZT. Vuokra-auto jää hotellin parkkipaikalle — kysele turvallisuutta etukäteen.',
  },

  // ============== PÄIVÄ 4 — Mangystau day 2 ==============
  {
    day: 4,
    date: '2026-06-02',
    city: 'Mangystau (Bozzhyra) → Aqtau',
    sleepCity: 'Aqtau',
    title: 'Mangystau 4WD-retki päivä 2 — Bozzhyra + paluu',
    summary:
      'Aamulla auringonnousu Bozzhyran kanjonissa (4WD-opasretken jatko). Pitkä ajo Tuzbairin suolajärven kautta takaisin Aqtauhun. Paluu iltapäivällä, illallinen kaupungissa.',
    sightIds: ['bozzhyra', 'tuzbair'],
    anchors: [
      { time: '05:00', kind: 'tour', label: 'Auringonnousu Bozzhyrassa — paras valo' },
      { time: '~18:00', kind: 'arrival', label: 'Paluu Aqtauhun + vuokra-auto haku hotellilta' },
    ],
    primaryPlan:
      '⚠️ EDELLEEN 4WD + OPAS. Bozzhyra parhaiten aamuvalossa — 1–2 h kuvauspisteillä. Paluumatkalla pysähdys Tuzbairin näköalapisteellä. Suihku Aqtauhun, illallinen rantaravintolassa. Bozzhyra ja Tuzbair eivät ole vuokra-autoreittejä. Loppumaksu kuljettajalle paluun yhteydessä — käteinen KZT, lisäksi tippi 10–15 % ($50–80) kuski + opas.',
    backupPlan:
      'Jos Bozzhyran tie on huonossa kunnossa (sade tms.), kuljettaja vaihtaa reitin Tuzbairin tai Karyniaragin kautta. Älä paina kuljettajaa kun hän sanoo "ei mene".',
    lodgingHint: {
      area: 'Aqtau keskusta',
      priceRangeEUR: [40, 80],
      bookingApps: ['Booking.com', 'Ostrovok'],
      note: 'Sama hotelli kuin saapumispäivänä, jos säilytyspalvelu hoiti Mangystaun aikana — sovi etukäteen',
    },
    cashKZT: 30000,
    driverNeeded: true,
    earlyWakeRisk: true,
    offlineNote: 'Bozzhyrassa ei signaalia. Sovi paluuaika kuljettajan kanssa Aqtau-päässä etukäteen.',
  },

  // ============== PÄIVÄ 5 — Aqtau lepopäivä → lento Almatyyn ==============
  {
    day: 5,
    date: '2026-06-03',
    city: 'Aqtau → Almaty',
    sleepCity: 'Almaty',
    title: 'Vuokra-auto-päivä Aqtaussa + iltalento Almatyyn',
    summary:
      'Aamu rauhassa. Vuokra-autolla päiväretki (Cape Zhygylgan, Saura tai kaupunki). Auto palautus iltapäivällä, iltalento Almatyyn (FlyArystan klo 21:25 → 00:45).',
    sightIds: ['saura-canyon', 'aqtau-promenade'],
    anchors: [
      { time: '07:00', kind: 'drive', label: 'Vuokra-autolla Saura-kanjoniin (~1,5 h)' },
      { time: '~13:00', kind: 'arrival', label: 'Paluu Aqtauhun + lounas' },
      { time: '~16:00', kind: 'checkout', label: 'Hotellin checkout' },
      { time: '~17:00', kind: 'drive', label: 'Vuokra-auton palautus', urgency: 'walk-in' },
      { time: '~19:30', kind: 'drive', label: 'Taksi lentokentälle (~30 min)' },
      { time: '21:25', kind: 'flight', label: 'FlyArystan SCO → ALA, ~3 h', urgency: 'week-before' },
    ],
    primaryPlan:
      'Suositus: vuokra-auto-päivä. Aamulla Saura-kanjoniin (~1,5 h/suunta) — kanjoni + Karakupp-järvi, paluu lounasaikaan. Iltapäivä Aqtaun rantakadulla, käteistä loppuun, auton palautus. Iltalento Almatyyn.',
    alternatives: [
      {
        title: 'Pelkkä lepo + rantakatu',
        summary: 'Jos Mangystau uuvutti, jätä auto-retki pois. Aamu kahvilassa, rantakatu, lounas, auton palautus, iltalento.',
        tradeoff: '+ kunnon lepo / − ei näe Saura-kanjonia',
      },
      {
        title: 'Cape Zhygylgan koko päivä',
        summary: 'Pidempi vuokra-auto-retki Cape Zhygylganiin (2,5–3 h/suunta) — vaatii aikaisen lähdön klo 06. Paluu tiukasti checkout-aikaan mennessä.',
        tradeoff: '+ dramaattisempi maisema / − todella pitkä autopäivä iltalennon edellä',
      },
      {
        title: 'Aamulento + päivä Almatyssa',
        summary: 'Lento aamulla → koko päivä Almatyssa. Vältä jos Mangystau-paluu venyi.',
        tradeoff: '+ ekstrapäivä Almatyssa / − Aqtaun viimeinen päivä menetetty',
      },
    ],
    backupPlan:
      'Jos Saura-tien viimeiset 10–15 km gravelia näyttävät vuokra-autolle huonoilta tai sade kastelee tien — käännytään ja tehdään puoli päivää Aqtaun rantakadulla.',
    lodgingHint: {
      area: 'Almaty keskusta — Dostyk Avenue / Panfilov',
      priceRangeEUR: [50, 100],
      bookingApps: ['Booking.com', 'Ostrovok', 'Airbnb'],
      note: 'Yön check-in mahdollinen, mutta varmista että vastaanotto on auki 01:00',
    },
    cashKZT: 15000,
    driverNeeded: false,
    earlyWakeRisk: true,
    offlineNote: 'Saura-tien viimeiset km offline-kartalla — lataa Organic Maps Mangystau ennen lähtöä.',
  },

  // ============== PÄIVÄ 6 — Almaty saapuminen ==============
  {
    day: 6,
    date: '2026-06-04',
    city: 'Almaty',
    sleepCity: 'Almaty',
    title: 'Almaty — kaupunki, basaari, ortodoksikatedraali',
    summary:
      'Yöllinen saapuminen lennolla → aamu rauhallinen. Iltapäivä kävellen Panfilovin puisto, Zenkov-katedraali, Vihreä basaari, lounas.',
    sightIds: ['almaty-keskusta', 'zenkov-cathedral', 'green-bazaar'],
    anchors: [
      { time: '~01:00', kind: 'arrival', label: 'Almaty Intl (ALA) — taksi keskustaan' },
    ],
    primaryPlan:
      'Aamu nukkuen yön päälle. Iltapäivällä klassinen kävely: Panfilov → katedraali → basaari → kotaylanya. Lounaan basaarissa (lihapullia, kävely-vältettävät).',
    alternatives: [
      {
        title: 'Aktiivinen aloitus',
        summary: 'Kök-Töbe köysiradalla iltapäivällä — auringonlasku kaupunkivuorimaisemaan.',
        tradeoff: '+ näyttävää / − vaatii energiaa lennon jälkeen',
      },
    ],
    lodgingHint: {
      area: 'Dostyk Avenue tai Almaly — keskeinen ja kävelyetäisyys nähtävyyksille',
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
    city: 'Almaty',
    sleepCity: 'Almaty',
    title: 'Medeu, Shymbulak ja Kök-Töbe',
    summary:
      'Aamulla taksi/bussi Medeun luistinhalliin, gondolihissi Shymbulak-laskettelukeskukseen. Iltapäivä Kök-Töbessä auringonlaskuun.',
    sightIds: ['medeu-shymbulak', 'kok-tobe', 'almaty-arbat'],
    primaryPlan:
      'Aamupäivä: Medeu (1700 m) → Shymbulak (3200 m) gondolihissillä, lounas vuorella. Iltapäivä: Kök-Töbe köysiradalla auringonlaskuun. Ilta Arbatilla.',
    alternatives: [
      {
        title: 'Iso Almatyn järvi (BAO) sen sijaan',
        summary: 'Päiväretki BAO:lle — vaatii rajavyöhykeluvan ja taksin. Spektaakkelimaisempi vuori.',
        tradeoff: '+ uniikki vuorijärvi / − lupa-asia + kuljettaja',
      },
      {
        title: 'Keskusvaltion museo + Arbat',
        summary: 'Sateella sisätila-päivä, museon kierros, ilta katukävelyllä.',
        tradeoff: '+ säävapaa / − vähemmän ikonimaisemia',
      },
    ],
    backupPlan: 'Sade Shymbulakissa = vaihda Kök-Töbeen ja museoon.',
    lodgingHint: {
      area: 'Sama kuin edellinen yö',
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
    city: 'Almaty → Charyn (päiväretki)',
    sleepCity: 'Almaty',
    title: 'Charynin kanjoni — päiväretki',
    summary:
      'Aikainen lähtö (07:00) kuljettajan tai jaetun retken kanssa. 3,5 h ajo Charynin Linnojen laaksoon. Vaellus 2–3 km, lounas ja paluu Almatyyn illalla.',
    sightIds: ['charyn-canyon'],
    anchors: [
      { time: '07:00', kind: 'tour', label: 'Lähtö Almatysta — pickup hotellilta', urgency: 'on-arrival' },
      { time: '~20:00', kind: 'arrival', label: 'Paluu Almatyyn' },
    ],
    primaryPlan:
      'Yksityiskuljettaja (~150–200 €/päivä) tai jaettu ryhmäretki (~60–80 €/hlö). Linnojen laakso 2–3 km vaellus, vesi 2 L/hlö, päähine. Paluu samana päivänä.',
    alternatives: [
      {
        title: 'Charyn + Kolsai yhdistettynä (yö Satyssa)',
        summary: '2 päivän retki: päivä 1 Charyn, ilta Satyssa, päivä 2 Kolsai. Yhdistää päivät 8 ja 9.',
        tradeoff: '+ tehokas / − ekstrayö guesthouseilla',
      },
      {
        title: 'Charyn jaetussa minibussissa',
        summary: 'Halvempi ryhmäretki Almatysta — vähemmän joustoa pysähdyksiin.',
        tradeoff: '+ halvempi / − ei valokuvauspysähdyksiä',
      },
    ],
    backupPlan: 'Helle yli +35°C → lähtö klo 06 ja paluu klo 17. Älä jää keskipäivän kuumaan vaellukseen.',
    cashKZT: 25000,
    driverNeeded: true,
    earlyWakeRisk: true,
    offlineNote: 'Charynissa heikko signaali — lataa 2GIS Almaty-region offline',
  },

  // ============== PÄIVÄ 9 — Kolsai + Kaindy ==============
  {
    day: 9,
    date: '2026-06-07',
    city: 'Almaty → Saty (yövytään)',
    sleepCity: 'Saty (guesthouse)',
    title: 'Kolsai-järvet ja Kaindy',
    summary:
      'Lähtö Almatysta aamulla. Kolsai-1 (1820 m), valinnainen vaellus Kolsai-2:lle (4–5 h ed-takaisin). Iltapäivällä Kaindy-järvi. Yö Saty-kylässä.',
    sightIds: ['kolsai-lakes', 'kaindy-lake'],
    anchors: [
      { time: '07:30', kind: 'drive', label: 'Lähtö Almatysta — kuljettajan kanssa, ~5 h ajo' },
    ],
    primaryPlan:
      'Saavu Kolsai-1:lle puoliltapäivin. Kävelykierros järven ympäri (1 h) TAI vaellus Kolsai-2:lle (4–5 h, vaativampi, 2500 m korkeudella). Iltapäivä Kaindy. Yöksi Saty-guesthouseen.',
    alternatives: [
      {
        title: 'Päiväretki ilman yötä',
        summary: 'Lähtö Almatysta klo 05, vain Kolsai-1 + Kaindy, paluu illalla. Pitkä päivä.',
        tradeoff: '+ säästää yön / − hektinen, ei ehdi Kolsai-2:lle',
      },
      {
        title: 'Vain Kaindy',
        summary: 'Jos Kolsai ei lumesta puhdistunut, vain Kaindy + Charyn yhdistettynä.',
        tradeoff: '+ helpompi / − missaa Kolsain',
      },
    ],
    backupPlan: 'Sade vuoristossa = yövy Satyssa, retki seuraavalle päivälle. Kaindy 4WD vaaditaan — varmista että kuljettajalla on Niva tai vastaava.',
    lodgingHint: {
      area: 'Saty-kylä — paikallinen guesthouse, ei verkkovarausta',
      priceRangeEUR: [25, 50],
      bookingApps: ['paikan päällä', 'kuljettajan suositus', 'kalpak-travel.com etukäteen'],
      note: 'WC ulkona useimmiten. Lämmin yötakki — 1800 m yöllä +5–10°C',
    },
    cashKZT: 35000,
    driverNeeded: true,
    earlyWakeRisk: false,
    offlineNote: 'Saty-kylässä signaali heikko — varmista että kuljettaja saa sinut takaisin sovittuna aikana',
  },

  // ============== PÄIVÄ 10 — Paluu Almaty + siirtymä Astanaan ==============
  {
    day: 10,
    date: '2026-06-08',
    city: 'Saty → Almaty → Astana',
    sleepCity: 'Talgo-juna TAI Astana',
    title: 'Paluu Almatyyn + siirtymä Astanaan',
    summary:
      'Aamulla paluu Satysta Almatyyn (5 h). Iltapäivä vapaa Almatyssa — basaari, sauna, lounas. Illalla siirtymä Astanaan (suositus: Talgo-yöjuna).',
    sightIds: ['almaty-craft-beer'],
    anchors: [
      { time: '08:00', kind: 'drive', label: 'Lähtö Satysta' },
      { time: '~13:00', kind: 'arrival', label: 'Paluu Almatyyn' },
      { time: '~22:00', kind: 'train', label: 'Talgo-yöjuna ALA → AST, ~13 h', urgency: 'week-before' },
    ],
    primaryPlan:
      'Suositus: Talgo-yöjuna säästää sekä hotelliyön (~60 €) että lentolipun (~70 €) — bisnesluokan kupé 4 hengelle ~35 €. Lähtö 22:00, saapuminen Astanaan klo ~11.',
    alternatives: [
      {
        title: 'Iltalento ALA → NQZ',
        summary: 'Air Astana / FlyArystan iltapäivä-/iltalento, ~1h 45min, ~50–100 €. Hotelliyö Astanassa erikseen.',
        tradeoff: '+ nopeampi / − maksaa hotelliyön + lentolipun = ~130 €',
      },
      {
        title: 'Aamulento seuraavana päivänä',
        summary: 'Yö Almatyssa, lento päivän 11 aamulla. Aiheuttaa pituuden Almaty-osuuteen.',
        tradeoff: '+ kunnon yöuni / − vie yhden Astana-päivän',
      },
    ],
    lodgingHint: {
      area: 'Talgo-juna: 4 hengen kupé, suihkua ei ole — pese ennen lähtöä',
      priceRangeEUR: [25, 60],
      bookingApps: ['bilet.railways.kz', 'Tutu.ru'],
      note: 'Junalipun voi varata 60 päivää etukäteen — kesäkuussa täynnä, varaa heti',
    },
    cashKZT: 20000,
    driverNeeded: true,
    earlyWakeRisk: false,
    offlineNote: 'Junaolipun e-versio puhelimessa offline — lataa PDF',
  },

  // ============== PÄIVÄ 11 — Astana saapuminen ==============
  {
    day: 11,
    date: '2026-06-09',
    city: 'Astana',
    sleepCity: 'Astana',
    title: 'Astana — Atameken, Baiterek ja Khan Shatyr',
    summary:
      'Yöjuna saapuu aamulla. Iltapäivällä Atameken-pienoismalli (maan kartta kokoluokassa), sitten Baiterek-torni auringonlaskuun ja Khan Shatyr illalla.',
    sightIds: ['atameken-map', 'bayterek', 'khan-shatyr'],
    anchors: [
      { time: '~11:00', kind: 'arrival', label: 'Talgo saapuu Astana-asemalle (Nurly-Zhol)' },
      { time: '~12:00', kind: 'drive', label: 'Yandex Go hotellille (~15 min)' },
    ],
    primaryPlan:
      'Suihku ja lounas hotelilla. Iltapäivä jalan ja Yandex Go:lla: Atameken-pienoismalli (1,5 h, 1500 KZT) antaa hyvän yleiskuvan Kazakstanin maantieteestä → Baiterek-torni auringonlaskuun (näköala, 2500 KZT) → Khan Shatyr illalla (ilmainen sisäänkäynti). Illallinen kaupungissa.',
    alternatives: [
      {
        title: 'Lentokenttä-saapuminen',
        summary: 'Jos otit lennon: Astana lentokenttä (NQZ) on kaupungista 16 km, taksi Yandex Go ~20 min ~2 500 KZT.',
      },
      {
        title: 'Pelkkä Baiterek + Khan Shatyr (Atameken jätetty)',
        summary: 'Jos jaksaminen rajoittunut yöjunan jälkeen, ohita Atameken ja tee vain klassikkoduo Baiterek + Khan Shatyr.',
        tradeoff: '+ kevyempi / − ei maankuvaa',
      },
    ],
    lodgingHint: {
      area: 'Astana — Yesil-joen oikea ranta (Левый берег), Nurzhol-bulevardin lähellä',
      priceRangeEUR: [50, 110],
      bookingApps: ['Booking.com', 'Ostrovok'],
      note: 'Vältä Vanhakaupunkia (Saryarka) jos haluat olla lähellä ikoneja',
    },
    cashKZT: 8000,
    driverNeeded: false,
    earlyWakeRisk: false,
  },

  // ============== PÄIVÄ 12 — Astana moskeijat & Rauhan palatsi ==============
  {
    day: 12,
    date: '2026-06-10',
    city: 'Astana',
    sleepCity: 'Astana',
    title: 'Astana — Kansallismuseo, moskeijat ja Rauhan palatsi',
    summary:
      'Aamupäivä Kazakstanin kansallismuseossa (Independence Square). Iltapäivällä Hazret Sultan -moskeija, Rauhan palatsin pyramidi ja Nur-Astanan kupoli — kaikki kävelyetäisyydellä.',
    sightIds: ['national-museum-kz', 'hazret-sultan-mosque', 'palace-of-peace', 'nur-astana-mosque'],
    primaryPlan:
      'Klusteripäivä Independence Square -alueella: 09:30 Kansallismuseo (3 h, 1000 KZT) — kuratoitu kierros kivikaudesta itsenäisyyteen, audio-opas englanniksi. Lounas museon kahvilassa tai Hazret Sultanin viereisissä ravintoloissa. Iltapäivä Hazret Sultan (1 h, ilmainen) → Rauhan palatsi (1 h) → Nur-Astana-moskeija. Illalla joenvarsi-kävely.',
    alternatives: [
      {
        title: 'Päiväretki Burabay-luonnonpuistoon',
        summary: '~250 km pohjoiseen Astanasta — vuori ja järvi (Borovoe). Kokopäivän retki, ~70–100 €/hlö.',
        tradeoff: '+ luonto kaupunkirutiinin keskellä / − pitkä autopäivä, vaihda päivän 13 kanssa',
      },
      {
        title: 'EXPO-alue + Astana Opera ulkoa',
        summary: 'Vaihtoehtoinen kulttuuripäivä: Nur Alem (EXPO-sfääri, museum), kävely EXPO-alueella, Opera-talo ulkoa (kesäkuussa kausi suljettu).',
        tradeoff: '+ moderni arkkitehtuuri / − ei klassisia moskeijoita tällä päivällä',
      },
      {
        title: 'Pudota Nur-Astana, keskitytä kolmeen pääkohteeseen',
        summary: 'Nur-Astana ratesti 3/3/3 — voit ohittaa sen ja viettää enemmän aikaa Hazret Sultanin ja Rauhan palatsin parissa.',
        tradeoff: '+ syvempi vierailu / − yksi moskeija jää näkemättä',
      },
    ],
    lodgingHint: {
      area: 'Sama kuin edellinen yö',
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
    city: 'Astana / Burabay',
    sleepCity: 'Astana',
    title: 'Päiväretki Burabay-luonnonpuistoon (TAI EXPO-päivä)',
    summary:
      'Aikainen lähtö Burabay-luonnonpuistoon (250 km, 3 h) — kazakkien "Pohjoinen Sveitsi" graniittivuori, järvi ja mäntymetsät. Paluu illalla, viimeiset asiat ja illallinen.',
    sightIds: ['burabay-park'],
    anchors: [
      { time: '07:00', kind: 'drive', label: 'Lähtö Astanasta — kuljettaja/jaettu retki (~3 h)' },
      { time: '~10:00', kind: 'arrival', label: 'Saapuminen Burabayn ympäristöön' },
      { time: '~17:00', kind: 'drive', label: 'Paluu Astanaan' },
    ],
    primaryPlan:
      'Päiväretki Burabay-luonnonpuistoon — graniittivuori (Okzhetpes), Burabay-järven uintipaikka, mäntymetsät. Lounas Schuchinskissa tai järvellä. Kesäkuussa järvi on uimakelpoinen. Yksityinen kuljettaja 30 000–45 000 KZT/päivä TAI jaettu retki 35 000–50 000 KZT/hlö. Lähtö viimeistään klo 7.',
    alternatives: [
      {
        title: 'EXPO-päivä (Nur Alem + Atameken jos ei vielä)',
        summary: 'Kaupunkipäivä: Nur Alem -sfääri (8 kerrosta tulevaisuuden energiasta) + EXPO-alue kävellen. Atameken jos jäi väliin. Kevyempi kuin Burabay.',
        tradeoff: '+ ei pitkää autoretkeä / − ei luontoa Astana-osuuden keskellä',
      },
      {
        title: 'Astana Opera ulkoa + vanhakaupunki',
        summary: 'Oopperatalon valkoinen "kakku" ulkoa (kausi suljettu kesäkuussa), kävely oikean rannan vanhempaan kaupunkikuvaan kontrastiksi.',
        tradeoff: '+ arkkitehtuuri-fokus / − kohteet tarjoavat lyhyemmän kokemuksen',
      },
      {
        title: 'Lepopäivä + basaari Artyom',
        summary: 'Jos koko reissu on uuvuttanut: kahvilaa, basaari Artyom lahjoiksi, pakkaaminen, sauna.',
        tradeoff: '+ kunnon lepo / − ei näe Burabaytä tai EXPO:a',
      },
    ],
    backupPlan: 'Jos Burabay ei tunnu houkuttavalta tai sää sateinen, EXPO-päivä on hyvä B-plani. Kuljettaja vahvistetaan päivää ennen — peruutusehdot 24 h.',
    lodgingHint: {
      area: 'Sama kuin edellinen yö',
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
    city: 'Astana → ilma → Helsinki',
    sleepCity: 'Lentokoneessa',
    title: 'Paluulento Suomeen',
    summary:
      'Hotellin uloskirjautuminen aamulla. Taksi lentokentälle. Lento NQZ → Istanbul/Frankfurt → Helsinki. Saapuminen Suomeen 13.6. aamulla.',
    sightIds: [],
    anchors: [
      { time: '~10:00', kind: 'checkout', label: 'Hotelli — säilytys jos lento myöhemmin' },
      { time: '~13:00', kind: 'drive', label: 'Yandex Go lentokentälle (~20 min)' },
      { time: 'iltapäivä', kind: 'flight', label: 'Astana → Istanbul/Frankfurt', urgency: 'now' },
      { time: 'yö', kind: 'flight', label: 'Vaihto → Helsinki, saapuminen aamulla 13.6.', urgency: 'now' },
    ],
    primaryPlan:
      'Astanan lentokenttä (NQZ) sijaitsee 16 km kaupungista. Vaihda viimeiset KZT euroiksi tai säästä kotia varten. Lounas lentokentällä.',
    backupPlan: 'Jos lento myöhästyy, hae apua suoraan lentoyhtiöltä. Suomen edustusto Astanassa auki virka-ajan.',
    cashKZT: 5000,
    driverNeeded: false,
    earlyWakeRisk: true,
    offlineNote:
      'Sähköpostiin lataa: boarding-passit, hotelliresepti viimeiseltä yöltä, KZT-lähetysmerkit. Lentokentällä ei välttämättä WiFiä jonossa.',
  },
];
