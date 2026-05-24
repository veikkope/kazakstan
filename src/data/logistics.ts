// Sisäiset siirtymät Suomi → Aqtau → Almaty → Astana → Suomi.
// Sovellus on päätöstuki — esitetään vaihtoehdot puolueettomasti pros/cons-listoilla.

import type { TransportMode, TranslatableString } from '@/lib/types';

export interface TransportOption {
  mode: TransportMode;
  /** Operaattori jos relevantti, esim 'Air Astana', 'FlyArystan', 'Kazakhstan Railways (Talgo)' */
  operator?: TranslatableString;
  /** Kesto vapaana tekstinä, esim "1 h 45 min" tai "13–18 h" */
  duration: TranslatableString;
  /** Hintahaarukka EUR per henkilö */
  priceRangeEUR: [number, number];
  /** Hyödyt — lyhyt lista */
  pros: TranslatableString[];
  /** Haitat — lyhyt lista */
  cons: TranslatableString[];
  /** Mistä varata, esim 'flyarystan.com', 'bilet.railways.kz' */
  bookVia?: TranslatableString;
  /** Booking-kiireellisyys */
  bookWhen?: 'now' | 'week-before' | 'on-arrival' | 'walk-in';
}

export interface TransportLegInfo {
  id: string;
  from: TranslatableString;
  to: TranslatableString;
  /** Lyhyt kuvaus mistä on kyse */
  context: TranslatableString;
  options: TransportOption[];
  /** Suositus — kerro mikä on todennäköisesti paras valinta ja miksi */
  recommendation: TranslatableString;
  lastVerified: string;
}

export const transportLegs: TransportLegInfo[] = [
  // ============== Helsinki → Aqtau ==============
  {
    id: 'helsinki-aqtau',
    from: {
      fi: 'Helsinki',
      en: 'Helsinki',
      ru: 'Хельсинки',
      kk: 'Хельсинки',
    },
    to: {
      fi: 'Aqtau',
      en: 'Aqtau',
      ru: 'Актау',
      kk: 'Ақтау',
    },
    context: {
      fi: 'Suora yhteys Suomesta Aqtauhun on harvinaista — yleensä vaihto Istanbulissa, Frankfurtissa tai Dubaissa. Saapuminen Aqtauhun usein yöllä klo 02–06.',
      en: 'A direct connection from Finland to Aqtau is rare — usually you transfer in Istanbul, Frankfurt or Dubai. Arrival in Aqtau is often at night between 02:00 and 06:00.',
      ru: 'Прямого рейса из Финляндии в Актау практически нет — обычно пересадка в Стамбуле, Франкфурте или Дубае. Прилёт в Актау часто ночью, между 02:00 и 06:00.',
      kk: 'Финляндиядан Ақтауға тікелей рейс сирек — әдетте Стамбулда, Франкфуртта немесе Дубайда ауысу. Ақтауға келу көбіне түнгі 02:00–06:00 аралығында.',
    },
    options: [
      {
        mode: 'plane',
        operator: {
          fi: 'Turkish Airlines (vaihto Istanbul)',
          en: 'Turkish Airlines (transfer in Istanbul)',
          ru: 'Turkish Airlines (пересадка в Стамбуле)',
          kk: 'Turkish Airlines (Стамбулда ауысу)',
        },
        duration: {
          fi: '8–11 h kokonaiskesto',
          en: '8–11 h total travel time',
          ru: '8–11 ч общее время в пути',
          kk: '8–11 сағ жалпы саяхат уақыты',
        },
        priceRangeEUR: [350, 600],
        pros: [
          {
            fi: 'Yleisin reitti',
            en: 'Most common route',
            ru: 'Самый распространённый маршрут',
            kk: 'Ең көп таралған бағыт',
          },
          {
            fi: 'Hyvät vaihtoyhteydet',
            en: 'Good connections',
            ru: 'Удобные пересадки',
            kk: 'Қолайлы ауысулар',
          },
          {
            fi: 'Suomen kielinen henkilökunta usein saatavilla',
            en: 'Finnish-speaking staff often available',
            ru: 'Часто доступен персонал, говорящий по-фински',
            kk: 'Фин тілінде сөйлейтін қызметкерлер жиі қолжетімді',
          },
        ],
        cons: [
          {
            fi: 'Pitkä välilasku',
            en: 'Long layover',
            ru: 'Длинная пересадка',
            kk: 'Ұзақ аялдама',
          },
          {
            fi: 'Yösaapuminen Aqtauhun',
            en: 'Night arrival in Aqtau',
            ru: 'Ночной прилёт в Актау',
            kk: 'Ақтауға түнде келу',
          },
        ],
        bookVia: {
          fi: 'turkishairlines.com / Finnair-yhteistyö',
          en: 'turkishairlines.com / Finnair partnership',
          ru: 'turkishairlines.com / партнёрство с Finnair',
          kk: 'turkishairlines.com / Finnair серіктестігі',
        },
        bookWhen: 'now',
      },
      {
        mode: 'plane',
        operator: {
          fi: 'Lufthansa (vaihto Frankfurt)',
          en: 'Lufthansa (transfer in Frankfurt)',
          ru: 'Lufthansa (пересадка во Франкфурте)',
          kk: 'Lufthansa (Франкфуртта ауысу)',
        },
        duration: {
          fi: '9–13 h',
          en: '9–13 h',
          ru: '9–13 ч',
          kk: '9–13 сағ',
        },
        priceRangeEUR: [400, 700],
        pros: [
          {
            fi: 'Eurooppalainen palvelutaso',
            en: 'European service standard',
            ru: 'Европейский уровень сервиса',
            kk: 'Еуропалық қызмет деңгейі',
          },
          {
            fi: 'Joskus halvempi kuin Turkish',
            en: 'Sometimes cheaper than Turkish',
            ru: 'Иногда дешевле, чем Turkish',
            kk: 'Кейде Turkish-тен арзан',
          },
        ],
        cons: [
          {
            fi: 'Pitkät vaihtoajat',
            en: 'Long transfer times',
            ru: 'Долгие пересадки',
            kk: 'Ұзақ ауысу уақыттары',
          },
          {
            fi: 'Frankfurt-tikkari on ruuhkainen',
            en: 'Frankfurt airport is busy',
            ru: 'Аэропорт Франкфурта загружен',
            kk: 'Франкфурт әуежайы қарбалас',
          },
        ],
        bookWhen: 'now',
      },
      {
        mode: 'plane',
        operator: {
          fi: 'flydubai (vaihto Dubai)',
          en: 'flydubai (transfer in Dubai)',
          ru: 'flydubai (пересадка в Дубае)',
          kk: 'flydubai (Дубайда ауысу)',
        },
        duration: {
          fi: '10–14 h',
          en: '10–14 h',
          ru: '10–14 ч',
          kk: '10–14 сағ',
        },
        priceRangeEUR: [380, 650],
        pros: [
          {
            fi: 'Etelän kautta hyvät yhteydet',
            en: 'Good connections via the south',
            ru: 'Хорошие стыковки через юг',
            kk: 'Оңтүстік арқылы жақсы байланыстар',
          },
          {
            fi: 'Dubain lentokenttä modernein',
            en: 'Dubai airport is the most modern',
            ru: 'Аэропорт Дубая — самый современный',
            kk: 'Дубай әуежайы — ең заманауи',
          },
        ],
        cons: [
          {
            fi: 'Pitkä vaihto',
            en: 'Long layover',
            ru: 'Длинная пересадка',
            kk: 'Ұзақ ауысу',
          },
          {
            fi: 'Aikavyöhykemuutos rasittavampi',
            en: 'Time zone shift is more taxing',
            ru: 'Смена часовых поясов более изнуряющая',
            kk: 'Уақыт белдеуінің ауысуы қиынырақ',
          },
        ],
        bookWhen: 'now',
      },
    ],
    recommendation: {
      fi: 'Turkish Airlines Istanbulin kautta on yleisimmin paras yhdistelmä hintaa ja vaihtoaikoja. Varaa nyt — kesäkuu on huippusesonki ja hinnat nousevat lähemmäs lähtöä.',
      en: 'Turkish Airlines via Istanbul is usually the best combination of price and transfer times. Book now — June is peak season and prices rise closer to departure.',
      ru: 'Turkish Airlines через Стамбул обычно предлагает лучшее сочетание цены и времени пересадок. Бронируйте сейчас — июнь — это пик сезона, и цены растут ближе к вылету.',
      kk: 'Turkish Airlines Стамбул арқылы әдетте баға мен ауысу уақытының ең жақсы үйлесімі. Қазір брондаңыз — маусым — пик маусымы, бағалар ұшу күніне жақын өседі.',
    },
    lastVerified: '2026-05-21',
  },

  // ============== Aqtau → Almaty ==============
  {
    id: 'aqtau-almaty',
    from: {
      fi: 'Aqtau',
      en: 'Aqtau',
      ru: 'Актау',
      kk: 'Ақтау',
    },
    to: {
      fi: 'Almaty',
      en: 'Almaty',
      ru: 'Алматы',
      kk: 'Алматы',
    },
    context: {
      fi: 'Vain lento — junayhteys vie 50+ tuntia. Kolme kotimaista operaattoria, yhteensä useita vuoroja päivässä. Kesäkuussa hinnat huipussaan.',
      en: 'Flight only — the train takes 50+ hours. Three domestic operators with several flights per day. Prices peak in June.',
      ru: 'Только самолёт — поезд идёт более 50 часов. Три отечественных перевозчика, несколько рейсов в день. В июне цены на пике.',
      kk: 'Тек ұшақ — пойызбен 50+ сағат жүреді. Үш отандық тасымалдаушы, күніне бірнеше рейс. Маусымда бағалар шарықтау шегіне жетеді.',
    },
    options: [
      {
        mode: 'plane',
        operator: { fi: 'Air Astana', en: 'Air Astana', ru: 'Air Astana', kk: 'Air Astana' },
        duration: {
          fi: '3 h 10 min suoraan',
          en: '3 h 10 min direct',
          ru: '3 ч 10 мин без пересадок',
          kk: '3 сағ 10 мин тікелей',
        },
        priceRangeEUR: [80, 150],
        pros: [
          {
            fi: 'Maan päälentoyhtiö',
            en: 'The country’s flag carrier',
            ru: 'Главная авиакомпания страны',
            kk: 'Елдің басты әуе компаниясы',
          },
          {
            fi: 'Sisältyy ruoka + 23 kg matkatavara',
            en: 'Meal and 23 kg checked baggage included',
            ru: 'В стоимость входит питание и 23 кг багажа',
            kk: 'Тамақ пен 23 кг жүк бағаға кіреді',
          },
          {
            fi: 'Luotettava aikataulu',
            en: 'Reliable schedule',
            ru: 'Надёжное расписание',
            kk: 'Сенімді кесте',
          },
        ],
        cons: [
          {
            fi: 'Kallein vaihtoehto',
            en: 'Most expensive option',
            ru: 'Самый дорогой вариант',
            kk: 'Ең қымбат нұсқа',
          },
          {
            fi: 'Vähemmän vuoroja kuin FlyArystan',
            en: 'Fewer flights than FlyArystan',
            ru: 'Меньше рейсов, чем у FlyArystan',
            kk: 'FlyArystan-нан аз рейс',
          },
        ],
        bookVia: { fi: 'airastana.com', en: 'airastana.com', ru: 'airastana.com', kk: 'airastana.com' },
        bookWhen: 'week-before',
      },
      {
        mode: 'plane',
        operator: { fi: 'FlyArystan', en: 'FlyArystan', ru: 'FlyArystan', kk: 'FlyArystan' },
        duration: {
          fi: '3 h 10 min suoraan',
          en: '3 h 10 min direct',
          ru: '3 ч 10 мин без пересадок',
          kk: '3 сағ 10 мин тікелей',
        },
        priceRangeEUR: [50, 110],
        pros: [
          {
            fi: 'Halvin vaihtoehto',
            en: 'Cheapest option',
            ru: 'Самый дешёвый вариант',
            kk: 'Ең арзан нұсқа',
          },
          {
            fi: 'Useita vuoroja päivässä',
            en: 'Several flights per day',
            ru: 'Несколько рейсов в день',
            kk: 'Күніне бірнеше рейс',
          },
          {
            fi: 'Yölento Almatysta klo 21:25 → Aqtau 00:45 (ja päinvastoin)',
            en: 'Night flight from Almaty at 21:25 → Aqtau 00:45 (and vice versa)',
            ru: 'Ночной рейс из Алматы в 21:25 → Актау 00:45 (и наоборот)',
            kk: 'Алматыдан түнгі рейс 21:25 → Ақтау 00:45 (және керісінше)',
          },
        ],
        cons: [
          {
            fi: 'Käsimatkatavara vain 5 kg, ruumaan maksu',
            en: 'Carry-on only 5 kg, checked baggage costs extra',
            ru: 'Ручная кладь только 5 кг, багаж за доплату',
            kk: 'Қол жүгі тек 5 кг, жүкке қосымша ақы',
          },
          {
            fi: 'Air Astanan tytäryhtiö mutta low-cost-malli',
            en: 'Subsidiary of Air Astana but a low-cost model',
            ru: 'Дочерняя компания Air Astana, но лоукост',
            kk: 'Air Astana-ның еншілес компаниясы, бірақ лоукост моделі',
          },
        ],
        bookVia: { fi: 'flyarystan.com', en: 'flyarystan.com', ru: 'flyarystan.com', kk: 'flyarystan.com' },
        bookWhen: 'week-before',
      },
      {
        mode: 'plane',
        operator: { fi: 'SCAT Airlines', en: 'SCAT Airlines', ru: 'SCAT Airlines', kk: 'SCAT Airlines' },
        duration: {
          fi: '3 h 15 min',
          en: '3 h 15 min',
          ru: '3 ч 15 мин',
          kk: '3 сағ 15 мин',
        },
        priceRangeEUR: [60, 130],
        pros: [
          {
            fi: 'Kotimainen pelaaja',
            en: 'Domestic carrier',
            ru: 'Отечественный перевозчик',
            kk: 'Отандық тасымалдаушы',
          },
          {
            fi: 'Kohtuuhinta',
            en: 'Reasonable price',
            ru: 'Разумная цена',
            kk: 'Қолайлы баға',
          },
        ],
        cons: [
          {
            fi: 'Vanhempi kalusto',
            en: 'Older fleet',
            ru: 'Более старый парк',
            kk: 'Ескілеу әуе паркі',
          },
          {
            fi: 'Aikataulu ei aina pidä',
            en: 'Schedule is not always reliable',
            ru: 'Расписание не всегда соблюдается',
            kk: 'Кесте әрқашан сақтала бермейді',
          },
        ],
        bookVia: { fi: 'scat.kz', en: 'scat.kz', ru: 'scat.kz', kk: 'scat.kz' },
        bookWhen: 'week-before',
      },
    ],
    recommendation: {
      fi: 'FlyArystan iltapäivä- tai iltalennolla — halvin ja säilyttää koko Aqtau-päivän käyttöön. Jos matkatavaraa on paljon, Air Astana sisältää 23 kg ruumaan ja yhteishinta voi olla samaa luokkaa.',
      en: 'FlyArystan on an afternoon or evening flight — cheapest and keeps the whole Aqtau day usable. If you have a lot of luggage, Air Astana includes 23 kg checked baggage and the total price can be in the same ballpark.',
      ru: 'FlyArystan дневным или вечерним рейсом — самый дешёвый вариант, и весь день в Актау остаётся свободным. Если багажа много, Air Astana включает 23 кг, и суммарная цена может быть сопоставимой.',
      kk: 'FlyArystan түстен кейінгі немесе кешкі рейспен — ең арзан, әрі бүкіл Ақтау күні бос қалады. Жүк көп болса, Air Astana 23 кг қосады және жалпы баға ұқсас болуы мүмкін.',
    },
    lastVerified: '2026-05-21',
  },

  // ============== Almaty → Astana ==============
  {
    id: 'almaty-astana',
    from: {
      fi: 'Almaty',
      en: 'Almaty',
      ru: 'Алматы',
      kk: 'Алматы',
    },
    to: {
      fi: 'Astana',
      en: 'Astana',
      ru: 'Астана',
      kk: 'Астана',
    },
    context: {
      fi: 'Kaksi käytännön vaihtoehtoa: lento (~2 h) tai Talgo-yöjuna (~13–18 h). Juna säästää hotelliyön ja on selvästi halvempi, mutta vie kokonaisen päivän/yön.',
      en: 'Two practical options: a flight (~2 h) or the Talgo night train (~13–18 h). The train saves a hotel night and is clearly cheaper, but it eats an entire day/night.',
      ru: 'Два практичных варианта: самолёт (~2 ч) или ночной поезд Talgo (~13–18 ч). Поезд экономит ночь в отеле и явно дешевле, но забирает целый день и ночь.',
      kk: 'Екі қолайлы нұсқа: ұшақ (~2 сағ) немесе Talgo түнгі пойызы (~13–18 сағ). Пойыз қонақ үй түнін үнемдейді әрі арзанырақ, бірақ бір күн мен түнді алады.',
    },
    options: [
      {
        mode: 'plane',
        operator: { fi: 'Air Astana / FlyArystan / SCAT', en: 'Air Astana / FlyArystan / SCAT', ru: 'Air Astana / FlyArystan / SCAT', kk: 'Air Astana / FlyArystan / SCAT' },
        duration: {
          fi: '1 h 45 min',
          en: '1 h 45 min',
          ru: '1 ч 45 мин',
          kk: '1 сағ 45 мин',
        },
        priceRangeEUR: [50, 100],
        pros: [
          {
            fi: 'Nopein',
            en: 'Fastest',
            ru: 'Самый быстрый',
            kk: 'Ең жылдам',
          },
          {
            fi: '5+ vuoroa päivässä',
            en: '5+ flights per day',
            ru: '5+ рейсов в день',
            kk: 'Күніне 5+ рейс',
          },
          {
            fi: 'Hyvä jos vapaa-aika rajallista',
            en: 'Good if free time is limited',
            ru: 'Хорошо, если время ограничено',
            kk: 'Уақыт шектеулі болса жақсы',
          },
        ],
        cons: [
          {
            fi: 'Lentokenttäaika syö nopeusedun',
            en: 'Airport time eats up the speed advantage',
            ru: 'Время в аэропорту съедает преимущество в скорости',
            kk: 'Әуежайдағы уақыт жылдамдық артықшылығын жояды',
          },
          {
            fi: 'Hotelliyö Astanassa erikseen',
            en: 'Hotel night in Astana is extra',
            ru: 'Ночь в отеле в Астане — отдельно',
            kk: 'Астанадағы қонақ үй түні бөлек',
          },
        ],
        bookVia: { fi: 'aviata.kz / flyarystan.com', en: 'aviata.kz / flyarystan.com', ru: 'aviata.kz / flyarystan.com', kk: 'aviata.kz / flyarystan.com' },
        bookWhen: 'week-before',
      },
      {
        mode: 'train',
        operator: {
          fi: 'Kazakhstan Railways — Talgo (nopea yöjuna)',
          en: 'Kazakhstan Railways — Talgo (fast night train)',
          ru: 'Kazakhstan Railways — Talgo (быстрый ночной поезд)',
          kk: 'Kazakhstan Railways — Talgo (жылдам түнгі пойыз)',
        },
        duration: {
          fi: '11–13 h (Talgo) — 18 h (tavallinen)',
          en: '11–13 h (Talgo) — 18 h (standard)',
          ru: '11–13 ч (Talgo) — 18 ч (обычный)',
          kk: '11–13 сағ (Talgo) — 18 сағ (қарапайым)',
        },
        priceRangeEUR: [25, 60],
        pros: [
          {
            fi: 'Säästää hotelliyön',
            en: 'Saves a hotel night',
            ru: 'Экономит ночь в отеле',
            kk: 'Қонақ үй түнін үнемдейді',
          },
          {
            fi: 'Talgo-business kupé (4 hengen) noin 35 €',
            en: 'Talgo business compartment (4-berth) around €35',
            ru: 'Бизнес-купе Talgo (4-местное) около €35',
            kk: 'Talgo бизнес-купесі (4 орындық) шамамен 35 €',
          },
          {
            fi: 'Kokemus sinänsä — kazakkilaisen maaston pituus tuntuu',
            en: 'An experience in itself — you feel the vastness of the Kazakh landscape',
            ru: 'Сам по себе опыт — чувствуется размах казахских просторов',
            kk: 'Өз алдына тәжірибе — қазақ даласының ұлылығы сезіледі',
          },
          {
            fi: 'Kesäkuussa viilennettyä — hyvä matkata yötä päivän kuumalle',
            en: 'Air-conditioned in June — good to travel by night to avoid daytime heat',
            ru: 'В июне с кондиционером — хорошо ехать ночью, спасаясь от дневной жары',
            kk: 'Маусымда кондиционерлі — күндізгі ыстықтан түнде жол жүру қолайлы',
          },
        ],
        cons: [
          {
            fi: 'Vie kokonaisen yön',
            en: 'Takes a whole night',
            ru: 'Занимает целую ночь',
            kk: 'Бүкіл түнді алады',
          },
          {
            fi: 'Vain Astana-asemalle (siirtymä keskustaan erikseen)',
            en: 'Only to Astana station (transfer to centre separately)',
            ru: 'Только до вокзала Астаны (трансфер в центр отдельно)',
            kk: 'Тек Астана вокзалына дейін (орталыққа жету бөлек)',
          },
          {
            fi: 'Matkatavarat hihnoilla',
            en: 'Luggage on overhead racks',
            ru: 'Багаж на полках',
            kk: 'Жүк үстіңгі сөрелерде',
          },
        ],
        bookVia: { fi: 'bilet.railways.kz', en: 'bilet.railways.kz', ru: 'bilet.railways.kz', kk: 'bilet.railways.kz' },
        bookWhen: 'week-before',
      },
    ],
    recommendation: {
      fi: 'Talgo-yöjuna on tämän reissun "secret weapon" — säästää sekä hotelliyön (~60 €) että lentolipun (~70 €). Lähtee Almatysta noin 23:00, saapuu Astanaan aamulla. Käytännössä reissun budjetti-ja-aikatehokkain ratkaisu, mikäli yöuni junassa on ok. Jos taas haluaa edes yhden ylimääräisen päivän Almatyssa, ota aamulento.',
      en: 'The Talgo night train is this trip’s "secret weapon" — it saves both a hotel night (~€60) and a flight ticket (~€70). It leaves Almaty around 23:00 and arrives in Astana in the morning. In practice the most budget- and time-efficient solution of the trip, as long as you can sleep on the train. If you want even one extra day in Almaty, take the morning flight instead.',
      ru: 'Ночной поезд Talgo — «секретное оружие» этой поездки: экономит и ночь в отеле (~€60), и авиабилет (~€70). Уходит из Алматы около 23:00, приходит в Астану утром. На практике самое выгодное по бюджету и времени решение, если вы можете спать в поезде. Если хочется хотя бы лишний день в Алматы — выбирайте утренний рейс.',
      kk: 'Talgo түнгі пойызы — осы саяхаттың «құпия қаруы»: ол қонақ үй түнін (~60 €) де, ұшақ билетін (~70 €) де үнемдейді. Алматыдан шамамен 23:00-де шығып, Астанаға таңертең жетеді. Пойызда ұйықтай алсаңыз, бұл бюджет пен уақыт жағынан ең тиімді шешім. Ал Алматыда тіпті бір күн қосымша қалғыңыз келсе, таңғы ұшақты алыңыз.',
    },
    lastVerified: '2026-05-21',
  },

  // ============== Astana → Helsinki (paluu) ==============
  {
    id: 'astana-helsinki',
    from: {
      fi: 'Astana',
      en: 'Astana',
      ru: 'Астана',
      kk: 'Астана',
    },
    to: {
      fi: 'Helsinki',
      en: 'Helsinki',
      ru: 'Хельсинки',
      kk: 'Хельсинки',
    },
    context: {
      fi: 'Astanasta on enemmän kansainvälisiä yhteyksiä kuin Aqtausta. Vaihto Istanbulissa, Frankfurtissa tai Dubaissa. Vältä paluulennon viime hetken varausta — kesäkuun loppu on kalliimpi.',
      en: 'Astana has more international connections than Aqtau. Transfers in Istanbul, Frankfurt or Dubai. Avoid last-minute return bookings — late June is more expensive.',
      ru: 'Из Астаны больше международных рейсов, чем из Актау. Пересадки в Стамбуле, Франкфурте или Дубае. Не бронируйте обратный рейс в последний момент — конец июня дороже.',
      kk: 'Астанадан Ақтауға қарағанда халықаралық рейстер көп. Стамбулда, Франкфуртта немесе Дубайда ауысу. Кері рейсті соңғы сәтте брондаудан аулақ болыңыз — маусымның соңы қымбатырақ.',
    },
    options: [
      {
        mode: 'plane',
        operator: {
          fi: 'Turkish Airlines (Istanbul-vaihto)',
          en: 'Turkish Airlines (Istanbul transfer)',
          ru: 'Turkish Airlines (пересадка в Стамбуле)',
          kk: 'Turkish Airlines (Стамбулда ауысу)',
        },
        duration: {
          fi: '8–11 h',
          en: '8–11 h',
          ru: '8–11 ч',
          kk: '8–11 сағ',
        },
        priceRangeEUR: [350, 600],
        pros: [
          {
            fi: 'Yleisin reitti',
            en: 'Most common route',
            ru: 'Самый распространённый маршрут',
            kk: 'Ең көп таралған бағыт',
          },
          {
            fi: 'Joustavat aikataulut',
            en: 'Flexible schedules',
            ru: 'Гибкое расписание',
            kk: 'Икемді кесте',
          },
          {
            fi: 'Hyvä vaihtoaika',
            en: 'Good transfer time',
            ru: 'Удобное время пересадки',
            kk: 'Қолайлы ауысу уақыты',
          },
        ],
        cons: [
          {
            fi: 'Istanbulin lentokenttä iso ja ruuhkainen',
            en: 'Istanbul airport is large and busy',
            ru: 'Стамбульский аэропорт большой и загруженный',
            kk: 'Стамбул әуежайы үлкен әрі қарбалас',
          },
        ],
        bookWhen: 'now',
      },
      {
        mode: 'plane',
        operator: {
          fi: 'Lufthansa / KLM (Frankfurt / Amsterdam)',
          en: 'Lufthansa / KLM (Frankfurt / Amsterdam)',
          ru: 'Lufthansa / KLM (Франкфурт / Амстердам)',
          kk: 'Lufthansa / KLM (Франкфурт / Амстердам)',
        },
        duration: {
          fi: '9–13 h',
          en: '9–13 h',
          ru: '9–13 ч',
          kk: '9–13 сағ',
        },
        priceRangeEUR: [400, 700],
        pros: [
          {
            fi: 'Eurooppalaiset palvelut',
            en: 'European service',
            ru: 'Европейский сервис',
            kk: 'Еуропалық қызмет',
          },
          {
            fi: 'Schengen-yhteys helppo',
            en: 'Easy Schengen connection',
            ru: 'Удобная стыковка в Шенгене',
            kk: 'Шенген байланысы оңай',
          },
        ],
        cons: [
          {
            fi: 'Joskus pitkät vaihdot',
            en: 'Sometimes long layovers',
            ru: 'Иногда долгие пересадки',
            kk: 'Кейде ұзақ ауысулар',
          },
        ],
        bookWhen: 'now',
      },
      {
        mode: 'plane',
        operator: {
          fi: 'Air Astana — suora Astana–Frankfurt + jatko',
          en: 'Air Astana — direct Astana–Frankfurt + onward connection',
          ru: 'Air Astana — прямой Астана–Франкфурт + стыковка',
          kk: 'Air Astana — тікелей Астана–Франкфурт + жалғасы',
        },
        duration: {
          fi: '10–12 h',
          en: '10–12 h',
          ru: '10–12 ч',
          kk: '10–12 сағ',
        },
        priceRangeEUR: [400, 650],
        pros: [
          {
            fi: 'Yksi vaihto',
            en: 'Single transfer',
            ru: 'Одна пересадка',
            kk: 'Бір ауысу',
          },
          {
            fi: 'Operaattori tuntee KZ-puolen',
            en: 'Operator knows the KZ side',
            ru: 'Перевозчик хорошо знает казахстанскую сторону',
            kk: 'Тасымалдаушы Қазақстан жағын жақсы біледі',
          },
        ],
        cons: [
          {
            fi: 'Hinta vaihtelee',
            en: 'Price varies',
            ru: 'Цена варьируется',
            kk: 'Бағасы өзгеріп тұрады',
          },
        ],
        bookWhen: 'now',
      },
    ],
    recommendation: {
      fi: 'Astanasta paluu on loogisempi kuin Almatysta — säästät yhden sisäisen lennon. Varaa molemmat lennot (Helsinki→Aqtau + Astana→Helsinki) samalla operaattorilla tai liittolaisparilla, jolloin saat reklamaatioturvaa jos toinen viivästyy.',
      en: 'Returning from Astana is more logical than from Almaty — you save one domestic flight. Book both flights (Helsinki→Aqtau + Astana→Helsinki) with the same operator or alliance pair so you have claim protection if one leg is delayed.',
      ru: 'Возвращаться из Астаны логичнее, чем из Алматы — экономите один внутренний рейс. Бронируйте оба перелёта (Хельсинки→Актау + Астана→Хельсинки) у одного перевозчика или альянса, чтобы иметь защиту в случае задержки одного из них.',
      kk: 'Астанадан қайту Алматыдан қарағанда қисындырақ — бір ішкі рейсті үнемдейсіз. Екі рейсті де (Хельсинки→Ақтау + Астана→Хельсинки) бір тасымалдаушыдан немесе одақтас жұптан брондаңыз, сонда бір рейс кешіксе шағым ете аласыз.',
    },
    lastVerified: '2026-05-21',
  },
];

/** Kuljettaja-info Mangystaun retkille (1–3 päivän versiot). */
export interface DriverTripOption {
  durationDays: number;
  title: TranslatableString;
  /** Mitä ehtii — pääkohteet */
  includes: TranslatableString[];
  /** Päivähinta-arvio per ryhmä (4WD + kuljettaja), EUR */
  pricePerDayEUR: [number, number];
  pros: TranslatableString[];
  cons: TranslatableString[];
}

export const mangystauDriverOptions: DriverTripOption[] = [
  {
    durationDays: 1,
    title: {
      fi: '1-päivän express',
      en: '1-day express',
      ru: 'Однодневный экспресс',
      kk: '1 күндік экспресс',
    },
    includes: [
      {
        fi: 'Sherkala-vuori TAI Pallolaakso (Torysh)',
        en: 'Mount Sherkala OR Valley of Balls (Torysh)',
        ru: 'Гора Шеркала ИЛИ Долина шаров (Торыш)',
        kk: 'Шерқала тауы НЕМЕСЕ Торыш (Шарлар алқабы)',
      },
      {
        fi: 'paluu Aqtauhun illaksi',
        en: 'return to Aqtau by evening',
        ru: 'возвращение в Актау к вечеру',
        kk: 'кешке Ақтауға қайту',
      },
    ],
    pricePerDayEUR: [120, 180],
    pros: [
      {
        fi: 'Säästää aikaa muille kaupungeille',
        en: 'Saves time for other cities',
        ru: 'Экономит время для других городов',
        kk: 'Басқа қалаларға уақыт үнемдейді',
      },
      {
        fi: 'Halvin majoitus (vain Aqtau)',
        en: 'Cheapest accommodation (only Aqtau)',
        ru: 'Самое дешёвое размещение (только Актау)',
        kk: 'Ең арзан тұру (тек Ақтау)',
      },
      {
        fi: 'Sopii jos jaksaminen rajallista',
        en: 'Good if energy is limited',
        ru: 'Подходит, если силы ограничены',
        kk: 'Күш-қуат шектеулі болса қолайлы',
      },
    ],
    cons: [
      {
        fi: 'Ei näe Bozzhyraa (liian kaukana)',
        en: 'Doesn’t reach Bozzhyra (too far)',
        ru: 'Не успеть до Бозжыры (слишком далеко)',
        kk: 'Бозжыраға жетпейді (тым алыс)',
      },
      {
        fi: 'Pitkä autopäivä',
        en: 'Long driving day',
        ru: 'Длинный день в машине',
        kk: 'Көлікте ұзақ күн',
      },
      {
        fi: 'Ei sukella erämaaan tunnelmaan',
        en: 'Doesn’t immerse you in desert atmosphere',
        ru: 'Не позволяет погрузиться в атмосферу пустыни',
        kk: 'Шөл атмосферасын сезіне алмайсыз',
      },
    ],
  },
  {
    durationDays: 2,
    title: {
      fi: '2-päivän klassikko (suositus)',
      en: '2-day classic (recommended)',
      ru: 'Двухдневная классика (рекомендуется)',
      kk: '2 күндік классика (ұсынылады)',
    },
    includes: [
      {
        fi: 'Bozzhyra',
        en: 'Bozzhyra',
        ru: 'Бозжыра',
        kk: 'Бозжыра',
      },
      {
        fi: 'Sherkala',
        en: 'Sherkala',
        ru: 'Шеркала',
        kk: 'Шерқала',
      },
      {
        fi: 'Tuzbair tai Pallolaakso',
        en: 'Tuzbair or Valley of Balls',
        ru: 'Тузбаир или Долина шаров',
        kk: 'Тұзбайыр немесе Шарлар алқабы',
      },
      {
        fi: 'yö jurttassa tai Shetpe-kylässä',
        en: 'overnight in a yurt or Shetpe village',
        ru: 'ночёвка в юрте или в посёлке Шетпе',
        kk: 'киіз үйде немесе Шетпе ауылында түнеу',
      },
    ],
    pricePerDayEUR: [110, 160],
    pros: [
      {
        fi: 'Kattaa Mangystaun pää-ikoonit',
        en: 'Covers Mangystau’s main icons',
        ru: 'Охватывает главные иконы Мангистау',
        kk: 'Маңғыстаудың басты нысандарын қамтиды',
      },
      {
        fi: 'Yö erämaassa = tähtitaivas',
        en: 'Night in the desert = starry sky',
        ru: 'Ночь в пустыне = звёздное небо',
        kk: 'Шөлдегі түн = жұлдызды аспан',
      },
      {
        fi: 'Kustannustehokas EUR/kohde',
        en: 'Cost-efficient EUR per site',
        ru: 'Экономично по евро на объект',
        kk: 'Бір нысанға шаққанда үнемді',
      },
    ],
    cons: [
      {
        fi: 'Toinen päivä paluu vie energian',
        en: 'The second day’s return drive drains energy',
        ru: 'Возвращение во второй день забирает силы',
        kk: 'Екінші күнгі қайту жолы күш алады',
      },
      {
        fi: 'Yön mukavuus vaihtelee',
        en: 'Night comfort varies',
        ru: 'Комфорт ночёвки варьируется',
        kk: 'Түнгі жайлылық әртүрлі',
      },
    ],
  },
  {
    durationDays: 3,
    title: {
      fi: '3-päivän syvempi',
      en: '3-day deeper trip',
      ru: 'Трёхдневный углублённый',
      kk: '3 күндік тереңірек',
    },
    includes: [
      {
        fi: 'Bozzhyra',
        en: 'Bozzhyra',
        ru: 'Бозжыра',
        kk: 'Бозжыра',
      },
      {
        fi: 'Sherkala',
        en: 'Sherkala',
        ru: 'Шеркала',
        kk: 'Шерқала',
      },
      {
        fi: 'Tuzbair',
        en: 'Tuzbair',
        ru: 'Тузбаир',
        kk: 'Тұзбайыр',
      },
      {
        fi: 'Beket-Atan luolamoskeija',
        en: 'Beket-Ata cave mosque',
        ru: 'Пещерная мечеть Бекет-Ата',
        kk: 'Бекет-Ата үңгір мешіті',
      },
      {
        fi: 'Kyzylkup (Linnanlaakso)',
        en: 'Kyzylkup (Castle Valley)',
        ru: 'Кызылкуп (Долина замков)',
        kk: 'Қызылқұп (Қамал алқабы)',
      },
      {
        fi: '2 yötä erämaassa',
        en: '2 nights in the desert',
        ru: '2 ночи в пустыне',
        kk: 'Шөлде 2 түн',
      },
    ],
    pricePerDayEUR: [100, 150],
    pros: [
      {
        fi: 'Näkee kaikki pääikoonit',
        en: 'See all the main icons',
        ru: 'Увидите все главные достопримечательности',
        kk: 'Барлық басты нысандарды көресіз',
      },
      {
        fi: 'Levollisempi rytmi',
        en: 'Calmer pace',
        ru: 'Более спокойный ритм',
        kk: 'Тыныш ырғақ',
      },
      {
        fi: 'Halvempi EUR/päivä isossa ryhmässä',
        en: 'Cheaper EUR per day in a larger group',
        ru: 'Дешевле в евро/день в большой группе',
        kk: 'Үлкен топта бір күнге арзанырақ',
      },
    ],
    cons: [
      {
        fi: 'Vie 3 päivää 14 päivän reissusta',
        en: 'Takes 3 days out of a 14-day trip',
        ru: 'Занимает 3 дня из 14-дневной поездки',
        kk: '14 күндік сапардан 3 күн алады',
      },
      {
        fi: 'Vaatii hyvän kunnon ja unen joustavuuden',
        en: 'Requires good fitness and flexible sleep',
        ru: 'Требует хорошей формы и гибкого сна',
        kk: 'Жақсы дене дайындығын және ұйқы икемділігін талап етеді',
      },
      {
        fi: 'Kuumassa kesäkuussa rasittava',
        en: 'Demanding in the June heat',
        ru: 'Тяжело в июньскую жару',
        kk: 'Маусым ыстығында ауыр',
      },
    ],
  },
];

/** Mangystau-alueen 4WD-operaattori, vahvistettu yhteystiedoilla ja hintaesimerkillä. */
export interface MangystauOperator {
  /** Operaattorin nimi sellaisena kuin se mainostaa itseään. */
  name: string;
  /** Tärkein virallinen sivu. */
  website?: string;
  /** WhatsApp-numero kansainvälisellä prefix-muotoilulla — priorisoi tämä koska toimii Kazakstanissa. */
  whatsapp?: string;
  /** Telegram, jos eri kuin WhatsApp. */
  telegram?: string;
  email?: string;
  /** Aktauin fyysinen toimisto-osoite jos walk-in on mahdollinen. */
  officeAddress?: TranslatableString;
  /** 2 päivän retken hinta — vapaa tekstiarvio, jotta voi sisältää "per auto" / "per henki" -nuanssin. */
  twoDayPrice: TranslatableString;
  /** Mitä paketti tyypillisesti sisältää. */
  includes: TranslatableString[];
  /** Kielitaito kuljettajalla / oppaalla. */
  languages: TranslatableString[];
  /** Maksuehdot tiivistettynä — mikä on ennakko, mikä maksetaan paikan päällä. */
  payment: TranslatableString;
  /** Maine yhdellä lauseella + tärkein lähde (TripAdvisor / blogi / Caravanistan). */
  reputation: TranslatableString;
  /** Erityishuomiot tai varoitukset (esim. "pyydä Nurdiyar nimeltä"). */
  caveat?: TranslatableString;
}

/**
 * Konkreettiset operaattorit Mangystaun 4WD-retkelle.
 * Strategia: lähetä TOP-3:lle sama WhatsApp-briefi rinnan, varaa nopeimmin vastaava.
 * Lähde: src/research/_mangystau-operators.md (2026-05-21).
 */
export const mangystauOperators: MangystauOperator[] = [
  {
    name: 'Mangystau Tour 999',
    website: 'https://mangystautour999.kz/en/2-day',
    whatsapp: '+7 700 909 9986',
    telegram: '+7 708 513 6071',
    email: 'mangystautour999@gmail.com',
    twoDayPrice: {
      fi: '$900 / 4WD (auto) / 2 päivää — kahdelle $450/hlö. Englanninkielinen opas +$120 (suositus alle 6 hengen ryhmässä).',
      en: '$900 / 4WD (vehicle) / 2 days — $450/person for two. English-speaking guide +$120 (recommended for groups under 6).',
      ru: '$900 / внедорожник / 2 дня — $450 с человека для двоих. Англоговорящий гид +$120 (рекомендуется для групп до 6 человек).',
      kk: '$900 / 4WD (көлік) / 2 күн — екеуге $450/адам. Ағылшынша гид +$120 (6-дан аз топ үшін ұсынылады).',
    },
    includes: [
      {
        fi: '4WD + kuljettaja',
        en: '4WD + driver',
        ru: 'Внедорожник + водитель',
        kk: '4WD + жүргізуші',
      },
      {
        fi: 'jurtta + makuupussit',
        en: 'yurt + sleeping bags',
        ru: 'юрта + спальные мешки',
        kk: 'киіз үй + ұйқы қаптары',
      },
      {
        fi: 'liikkuva suihku & WC',
        en: 'mobile shower & toilet',
        ru: 'мобильный душ и туалет',
        kk: 'жылжымалы душ пен дәретхана',
      },
      {
        fi: 'käytännössä full board',
        en: 'effectively full board',
        ru: 'фактически полный пансион',
        kk: 'іс жүзінде толық пансион',
      },
      {
        fi: 'sisäänpääsymaksut',
        en: 'entry fees',
        ru: 'входные билеты',
        kk: 'кіру ақылары',
      },
    ],
    languages: [
      {
        fi: 'kazakki',
        en: 'Kazakh',
        ru: 'казахский',
        kk: 'қазақша',
      },
      {
        fi: 'venäjä',
        en: 'Russian',
        ru: 'русский',
        kk: 'орысша',
      },
      {
        fi: 'englanti (erillinen opas)',
        en: 'English (separate guide)',
        ru: 'английский (отдельный гид)',
        kk: 'ағылшынша (бөлек гид)',
      },
    ],
    payment: {
      fi: 'Sovittavissa WhatsAppissa — tyypillisesti pieni ennakko (Wise/USD), loput käteisellä KZT.',
      en: 'Negotiable on WhatsApp — typically a small deposit (Wise/USD), the rest in cash KZT.',
      ru: 'Согласовывается в WhatsApp — обычно небольшой аванс (Wise/USD), остальное наличными KZT.',
      kk: 'WhatsApp арқылы келісіледі — әдетте шағын алдын ала төлем (Wise/USD), қалғаны қолма-қол KZT.',
    },
    reputation: {
      fi: 'TripAdvisor 4.9/5 (7 arvostelua 2025–2026). Reitti kattaa Torysh, Sherkala, Airakty, Bozzhyra 2-spots, Kyzylkup — pääsuositus.',
      en: 'TripAdvisor 4.9/5 (7 reviews 2025–2026). Route covers Torysh, Sherkala, Airakty, two Bozzhyra spots, Kyzylkup — top recommendation.',
      ru: 'TripAdvisor 4.9/5 (7 отзывов 2025–2026). Маршрут охватывает Торыш, Шеркалу, Айракты, две точки Бозжыры, Кызылкуп — главная рекомендация.',
      kk: 'TripAdvisor 4.9/5 (7 пікір 2025–2026). Бағыт Торыш, Шерқала, Айрақты, Бозжыраның 2 нүктесі, Қызылқұпты қамтиды — басты ұсыныс.',
    },
    caveat: {
      fi: 'Kuski Baurin englanti on rajallinen — käytä kääntäjäsovellusta tai tilaa erillinen EN-opas.',
      en: 'Driver Baur’s English is limited — use a translator app or book a separate EN guide.',
      ru: 'Английский водителя Баура ограничен — используйте приложение-переводчик или закажите отдельного англоязычного гида.',
      kk: 'Жүргізуші Баурдың ағылшыншасы шектеулі — аударма қолданбасын пайдаланыңыз немесе бөлек EN гид алыңыз.',
    },
  },
  {
    name: 'RedMaya Travel',
    website: 'https://redmaya-travel.kz/eng/tours/private/2days',
    whatsapp: '+7 771 286 9516',
    email: 'mangystau@redmaya-travel.kz',
    officeAddress: {
      fi: 'Urban Business Center, Office 416, 4th Floor, Aktau',
      en: 'Urban Business Center, Office 416, 4th Floor, Aktau',
      ru: 'Urban Business Center, офис 416, 4-й этаж, Актау',
      kk: 'Urban Business Center, 416-кеңсе, 4-қабат, Ақтау',
    },
    twoDayPrice: {
      fi: '$152–$580/hlö (4 hengen ryhmäreferenssi). 2 hengelle korkeampi — pyydä tarjous WhatsAppissa. Englanti vain Plus/Comfort Plus -tasoilla.',
      en: '$152–$580/person (reference for a group of 4). Higher for two — request a quote on WhatsApp. English only on Plus/Comfort Plus tiers.',
      ru: '$152–$580 с человека (ориентир для группы из 4). Для двоих дороже — запросите смету в WhatsApp. Английский только на уровнях Plus/Comfort Plus.',
      kk: '$152–$580/адам (4 адамдық топқа арналған бағдар). Екеуге қымбатырақ — WhatsApp арқылы баға сұраңыз. Ағылшын тек Plus/Comfort Plus деңгейлерінде.',
    },
    includes: [
      {
        fi: '4WD + AC',
        en: '4WD + AC',
        ru: 'Внедорожник + кондиционер',
        kk: '4WD + кондиционер',
      },
      {
        fi: '3 ateriaa/päivä',
        en: '3 meals/day',
        ru: '3 приёма пищи в день',
        kk: 'Күніне 3 рет тамақ',
      },
      {
        fi: 'leiriytymisvarusteet',
        en: 'camping equipment',
        ru: 'снаряжение для кемпинга',
        kk: 'кемпинг жабдықтары',
      },
      {
        fi: 'vakuutus',
        en: 'insurance',
        ru: 'страховка',
        kk: 'сақтандыру',
      },
      {
        fi: 'pullovesi',
        en: 'bottled water',
        ru: 'бутилированная вода',
        kk: 'құтыдағы су',
      },
    ],
    languages: [
      {
        fi: 'venäjä',
        en: 'Russian',
        ru: 'русский',
        kk: 'орысша',
      },
      {
        fi: 'kazakki',
        en: 'Kazakh',
        ru: 'казахский',
        kk: 'қазақша',
      },
      {
        fi: 'englanti (Plus-tasolta)',
        en: 'English (from Plus tier)',
        ru: 'английский (с уровня Plus)',
        kk: 'ағылшынша (Plus деңгейінен бастап)',
      },
    ],
    payment: {
      fi: '20 % ennakkomaksu varaa paikan (dokumentoitu). Loput paikan päällä. Bank transfer / Stripe.',
      en: '20% deposit secures the booking (documented). The rest is paid on site. Bank transfer / Stripe.',
      ru: 'Аванс 20 % фиксирует бронь (задокументировано). Остаток на месте. Банковский перевод / Stripe.',
      kk: '20% алдын ала төлем брондауды бекітеді (құжатталған). Қалғаны орнында. Банк аударымы / Stripe.',
    },
    reputation: {
      fi: 'Lisensoitu yritys, virallinen toimisto. Useita 5★-arvosteluja mutta loka 2025 kolme reklamaatiota (ryhmäkoko, opas-laatu).',
      en: 'Licensed company with an official office. Many 5★ reviews but three complaints in October 2025 (group size, guide quality).',
      ru: 'Лицензированная компания с официальным офисом. Много отзывов на 5★, но в октябре 2025 — три жалобы (размер группы, качество гида).',
      kk: 'Ресми кеңсесі бар лицензияланған компания. Көптеген 5★ пікірлер, бірақ 2025 жылдың қазанында үш шағым (топ көлемі, гид сапасы).',
    },
    caveat: {
      fi: 'Pyydä eksplisiittisesti opas **Nurdiyar** tai **Saken** — laatu riippuu nimetystä oppaasta. Älä varaa Econom-pakettia jos haluat englantia.',
      en: 'Explicitly request guide **Nurdiyar** or **Saken** — quality depends on the named guide. Do not book the Econom package if you want English.',
      ru: 'Явно просите гида **Нурдияра** или **Сакена** — качество зависит от конкретного гида. Не берите пакет Econom, если нужен английский.',
      kk: 'Гид **Нұрдияр** немесе **Сәкенді** атап сұраңыз — сапа аталған гидке байланысты. Ағылшын керек болса Econom пакетін алмаңыз.',
    },
  },
  {
    name: 'Travel to Mangistau (Eduard Chuishbaev)',
    website: 'https://traveltomangistau.kz/',
    whatsapp: '+7 702 466 3322',
    email: 'traveltomangistau@gmail.com',
    officeAddress: {
      fi: 'Aktau, 11 microdistrict, building 5, office 58',
      en: 'Aktau, 11th microdistrict, building 5, office 58',
      ru: 'Актау, 11-й микрорайон, дом 5, офис 58',
      kk: 'Ақтау, 11-шағын аудан, 5-үй, 58-кеңсе',
    },
    twoDayPrice: {
      fi: 'Alkaen $90/hlö. Vahvista pakettisisältö 2 hengelle — täysi Bozzhyra+Tuzbair+Beket-Ata reitti vaatii todennäköisesti ylätason paketin.',
      en: 'From $90/person. Confirm package contents for two — a full Bozzhyra+Tuzbair+Beket-Ata route likely requires the higher-tier package.',
      ru: 'От $90 с человека. Уточните содержание пакета для двоих — полный маршрут Бозжыра+Тузбаир+Бекет-Ата, скорее всего, требует более дорогого пакета.',
      kk: 'Адамына $90-нан бастап. Екеуге арналған пакет мазмұнын нақтылаңыз — толық Бозжыра+Тұзбайыр+Бекет-Ата бағыты жоғары деңгейдегі пакетті қажет етеді.',
    },
    includes: [
      {
        fi: 'ateriat',
        en: 'meals',
        ru: 'питание',
        kk: 'тамақ',
      },
      {
        fi: 'leiriytyminen ("warm tents, hot fresh food")',
        en: 'camping ("warm tents, hot fresh food")',
        ru: 'кемпинг («тёплые палатки, горячая свежая еда»)',
        kk: 'кемпинг («жылы шатырлар, ыстық жаңа тамақ»)',
      },
      {
        fi: 'kuljetus',
        en: 'transport',
        ru: 'транспорт',
        kk: 'көлік',
      },
    ],
    languages: [
      {
        fi: 'englanti',
        en: 'English',
        ru: 'английский',
        kk: 'ағылшынша',
      },
      {
        fi: 'venäjä',
        en: 'Russian',
        ru: 'русский',
        kk: 'орысша',
      },
      {
        fi: 'italia',
        en: 'Italian',
        ru: 'итальянский',
        kk: 'итальянша',
      },
    ],
    payment: {
      fi: 'Neuvoteltavissa WhatsAppissa. Pyydä Wise/bank transfer -kuitti kuluttajansuojaksi.',
      en: 'Negotiable on WhatsApp. Request a Wise/bank transfer receipt for consumer protection.',
      ru: 'Согласовывается в WhatsApp. Запросите чек Wise/банковского перевода для защиты прав потребителя.',
      kk: 'WhatsApp арқылы келісіледі. Тұтынушы қорғауы үшін Wise/банк аударымы түбіртегін сұраңыз.',
    },
    reputation: {
      fi: 'Pieni vakaa toimija, halvin selkeästi hinnoiteltu vaihtoehto. Vähemmän reviewejä kuin TOP-2:lla.',
      en: 'Small, stable operator — the cheapest clearly priced option. Fewer reviews than the top two.',
      ru: 'Небольшой стабильный оператор, самый дешёвый с прозрачной ценой вариант. Отзывов меньше, чем у топ-2.',
      kk: 'Шағын, тұрақты оператор — бағасы анық ең арзан нұсқа. Топ-2-ге қарағанда пікірлер аз.',
    },
  },
  {
    name: 'Indy Guide -alusta (Askhat / Gaukhar / Sergey)',
    website: 'https://indyguide.com/mangystau',
    twoDayPrice: {
      fi: 'Vaihtelee — alustan kautta vahvistettu hinta. Askhat Tairov ★4.9 (25 arv.), Gaukhar Yessirkepova ★5.0 (16), Sergey Khachatryan ★5.0.',
      en: 'Varies — price confirmed via the platform. Askhat Tairov ★4.9 (25 reviews), Gaukhar Yessirkepova ★5.0 (16), Sergey Khachatryan ★5.0.',
      ru: 'Варьируется — цена подтверждается через платформу. Асхат Таиров ★4.9 (25 отзывов), Гаухар Есиркепова ★5.0 (16), Сергей Хачатрян ★5.0.',
      kk: 'Әртүрлі — баға платформа арқылы расталады. Асхат Таиров ★4.9 (25 пікір), Гауһар Есіркепова ★5.0 (16), Сергей Хачатрян ★5.0.',
    },
    includes: [
      {
        fi: 'Riippuu kuljettajasta — vahvista chatissa ennen maksua',
        en: 'Depends on the driver — confirm in chat before paying',
        ru: 'Зависит от водителя — уточняйте в чате до оплаты',
        kk: 'Жүргізушіге байланысты — төлемге дейін чатта нақтылаңыз',
      },
    ],
    languages: [
      {
        fi: 'englanti useimmilla',
        en: 'English with most',
        ru: 'английский у большинства',
        kk: 'көпшілігі ағылшынша сөйлейді',
      },
    ],
    payment: {
      fi: 'Alustan kautta = escrow-suoja. Paras kuluttajansuoja näistä vaihtoehdoista.',
      en: 'Via the platform = escrow protection. Best consumer protection among these options.',
      ru: 'Через платформу = эскроу-защита. Лучшая защита потребителя из этих вариантов.',
      kk: 'Платформа арқылы = эскроу қорғауы. Осы нұсқалардың ішіндегі ең жақсы тұтынушы қорғауы.',
    },
    reputation: {
      fi: 'Sveitsiläinen marketplace-alusta. Korkeat tähdet useilla Mangystau-hosteilla.',
      en: 'Swiss marketplace platform. High star ratings for several Mangystau hosts.',
      ru: 'Швейцарская маркетплейс-платформа. Высокие оценки у нескольких хостов в Мангистау.',
      kk: 'Швейцариялық маркетплейс платформасы. Маңғыстаудағы бірнеше хосттың рейтингі жоғары.',
    },
    caveat: {
      fi: 'Käytä jos kuluttajansuoja on tärkein — hinta voi olla hieman korkeampi alustan provision takia.',
      en: 'Use this if consumer protection is your priority — price may be slightly higher due to platform commission.',
      ru: 'Используйте, если защита потребителя в приоритете — цена может быть немного выше из-за комиссии платформы.',
      kk: 'Тұтынушы қорғауы маңызды болса пайдаланыңыз — платформа комиссиясынан баға сәл жоғары болуы мүмкін.',
    },
  },
];

/**
 * Ehdotettu Plan B jos varaus epäonnistuu Helsingistä käsin — saavu Aktauiin ilman varausta.
 * Lähde: src/research/_mangystau-operators.md
 */
export const mangystauFallbackPlan: TranslatableString[] = [
  {
    fi: 'Aqtau Airport Hotelin / Holiday Inn / Tengri Hotelin reception (24h, EN) järjestää saman päivän tour-varauksen 2–3 operaattorin kautta.',
    en: 'The reception of Aqtau Airport Hotel / Holiday Inn / Tengri Hotel (24h, EN) can arrange a same-day tour booking via 2–3 operators.',
    ru: 'Стойка регистрации Aqtau Airport Hotel / Holiday Inn / Tengri Hotel (24 ч, англ.) организует тур на тот же день через 2–3 оператора.',
    kk: 'Aqtau Airport Hotel / Holiday Inn / Tengri Hotel қабылдау бөлімі (24 сағ, EN) сол күнгі турды 2–3 оператор арқылы ұйымдастырады.',
  },
  {
    fi: 'Walk-in Aktaun keskustassa: Tourist LLP (mangystau-tourist.com), RedMayan toimisto, Travel to Mangistau (osoitteet logisticsissa).',
    en: 'Walk in in central Aktau: Tourist LLP (mangystau-tourist.com), the RedMaya office, Travel to Mangistau (addresses in logistics).',
    ru: 'Walk-in в центре Актау: Tourist LLP (mangystau-tourist.com), офис RedMaya, Travel to Mangistau (адреса в logistics).',
    kk: 'Ақтау орталығында walk-in: Tourist LLP (mangystau-tourist.com), RedMaya кеңсесі, Travel to Mangistau (мекенжайлар logistics-те).',
  },
  {
    fi: 'Indy Guide:n 24/7-chat välittää viime hetken kuljettajan alustan kautta.',
    en: 'Indy Guide’s 24/7 chat can broker a last-minute driver via the platform.',
    ru: 'Чат Indy Guide 24/7 поможет найти водителя в последний момент через платформу.',
    kk: 'Indy Guide-тың 24/7 чаты платформа арқылы соңғы сәттегі жүргізушіні табуға көмектеседі.',
  },
  {
    fi: 'Älä vuokraa 4WD:tä ilman kuljettajaa Mangystaussa — reitit eivät ole Google Mapsissa, sähköttä alueella, hätätilanne hengenvaara.',
    en: 'Do not rent a 4WD without a driver in Mangystau — the routes are not on Google Maps, there is no power on the plateau, and an emergency is life-threatening.',
    ru: 'Не арендуйте внедорожник без водителя в Мангистау — маршрутов нет в Google Maps, в районе нет электричества, ЧП — угроза жизни.',
    kk: 'Маңғыстауда 4WD-ні жүргізушісіз жалдамаңыз — бағыттар Google Maps-та жоқ, аймақта электр жоқ, төтенше жағдай өмірге қауіпті.',
  },
];

/**
 * Aktaussa vuokratun auton booking — pickup-paikka, päivät, koordinaatit, yhteystiedot.
 * Käytetään itineraryn päivien 2 (pickup 31.5.) ja 4 (return 2.6.) anchoreissa
 * ja /vuokra-auto-sivulla.
 */
export interface CarRentalLocation {
  /** Paikan näkyvä nimi (esim. "ЖК Оазис"). */
  name: TranslatableString;
  /** Täysi osoite — venäjä/kazakki sellaisena kuin paikallinen näkee. */
  address: TranslatableString;
  /** Postinumero jos annettu. */
  postalCode?: string;
  coords: { lat: number; lng: number };
}

export interface CarRentalBooking {
  /** Operaattorin/yrityksen näkyvä nimi. */
  operator: TranslatableString;
  /** Operaattorin paikallinen kirjoitusasu (kyrillisillä) jos eri. */
  operatorLocal?: string;
  /** Missä auto noudetaan ja palautetaan. */
  pickup: CarRentalLocation;
  /** Yrityksen virallinen toimisto jos eri kuin pickup. */
  office?: CarRentalLocation;
  /** ISO-päivä pickup. */
  pickupDate: string;
  /** ISO-päivä return. */
  returnDate: string;
  /** Aukioloajat operaattorin firmasivun mukaan (esim. "24/7"). */
  hours?: TranslatableString;
  /** Puhelinnumero kansainvälisellä prefixillä. */
  phone?: string;
  /** WhatsApp-numero jos eri. */
  whatsapp?: string;
  instagram?: string;
  /** Linkki ulkoisille firmasivuille (2GIS, Google Maps, instagram...). */
  externalLinks?: { label: TranslatableString; url: string }[];
  /** Maine yhdellä lauseella, jos saatavilla. */
  reputation?: TranslatableString;
  /** Free-form-huomiot. */
  notes?: TranslatableString[];
  lastVerified: string;
}

/** Aktauin vuokra-auton noutopaikka 2026-05-31 → 2026-06-02. */
export const carRental: CarRentalBooking = {
  operator: {
    fi: 'Caspi autorent',
    en: 'Caspi autorent',
    ru: 'Caspi autorent',
    kk: 'Caspi autorent',
  },
  operatorLocal: 'Прокат автотранспорта',
  pickup: {
    name: {
      fi: 'ЖК Оазис / Oasis Residential Complex',
      en: 'Oasis Residential Complex (ЖК Оазис)',
      ru: 'ЖК Оазис',
      kk: 'Оазис тұрғын кешені (ЖК Оазис)',
    },
    address: {
      fi: '15-й микрорайон, 69, Актау, Мангистауская область, Казахстан',
      en: '15th microdistrict, 69, Aktau, Mangystau region, Kazakhstan',
      ru: '15-й микрорайон, 69, Актау, Мангистауская область, Казахстан',
      kk: '15-шағын аудан, 69, Ақтау, Маңғыстау облысы, Қазақстан',
    },
    postalCode: 'R00A6X3',
    coords: { lat: 43.669388, lng: 51.134028 },
  },
  office: {
    name: {
      fi: 'Caspi autorent — virallinen toimisto',
      en: 'Caspi autorent — official office',
      ru: 'Caspi autorent — официальный офис',
      kk: 'Caspi autorent — ресми кеңсе',
    },
    address: {
      fi: '12-й микрорайон, 23, Актау, Мангистауская область, Казахстан',
      en: '12th microdistrict, 23, Aktau, Mangystau region, Kazakhstan',
      ru: '12-й микрорайон, 23, Актау, Мангистауская область, Казахстан',
      kk: '12-шағын аудан, 23, Ақтау, Маңғыстау облысы, Қазақстан',
    },
    coords: { lat: 43.658508, lng: 51.147013 },
  },
  pickupDate: '2026-05-31',
  returnDate: '2026-06-02',
  hours: {
    fi: '24/7 (круглосуточно)',
    en: '24/7',
    ru: '24/7 (круглосуточно)',
    kk: '24/7 (тәулік бойы)',
  },
  phone: '+7 701 500 1094',
  whatsapp: '+7 701 500 1094',
  instagram: '@caspi.autorent',
  externalLinks: [
    {
      label: {
        fi: '2GIS — firmasivu (5★, 28 arvostelua)',
        en: '2GIS — company page (5★, 28 reviews)',
        ru: '2GIS — страница компании (5★, 28 отзывов)',
        kk: '2GIS — компания беті (5★, 28 пікір)',
      },
      url: 'https://2gis.kz/aktau/firm/70000001111843251',
    },
    {
      label: {
        fi: 'Instagram — @caspi.autorent',
        en: 'Instagram — @caspi.autorent',
        ru: 'Instagram — @caspi.autorent',
        kk: 'Instagram — @caspi.autorent',
      },
      url: 'https://instagram.com/caspi.autorent',
    },
  ],
  reputation: {
    fi: '5★ (28 arvostelua) — 2GIS Aktau, kategoria "Прокат автотранспорта".',
    en: '5★ (28 reviews) — 2GIS Aktau, category "Прокат автотранспорта" (car rental).',
    ru: '5★ (28 отзывов) — 2GIS Актау, категория «Прокат автотранспорта».',
    kk: '5★ (28 пікір) — 2GIS Ақтау, «Прокат автотранспорта» санаты.',
  },
  notes: [
    {
      fi: 'Pickup-paikka on asuinkompleksi (ЖК Оазис, 15-й мкр., 69), ei perinteinen vuokraamotoimisto — vahvista WhatsAppissa tarkka tapaamispiste kompleksin sisäänkäynnillä ennen lähtöä.',
      en: 'The pickup point is a residential complex (ЖК Оазис, 15th microdistrict, 69), not a traditional rental office — confirm the exact meeting point at the complex entrance via WhatsApp before departure.',
      ru: 'Точка получения — жилой комплекс (ЖК Оазис, 15-й мкр., 69), а не классический офис проката. Уточните точное место встречи у входа в комплекс через WhatsApp перед выездом.',
      kk: 'Қабылдау орны — тұрғын кешен (ЖК Оазис, 15-шағын аудан, 69), дәстүрлі прокат кеңсесі емес. Шықпас бұрын кешен кіреберісінде нақты кездесу нүктесін WhatsApp арқылы нақтылаңыз.',
    },
    {
      fi: 'Operaattorin virallinen toimisto on eri osoitteessa: 12-й микрорайон, 23 (n. 2 km kaakkoon ЖК Оазikseta). Älä mene sinne erehdyksessä — pickup on ЖК Оазikseen.',
      en: 'The operator’s official office is at a different address: 12th microdistrict, 23 (about 2 km southeast of ЖК Оазис). Don’t go there by mistake — the pickup is at ЖК Оазис.',
      ru: 'Официальный офис оператора по другому адресу: 12-й микрорайон, 23 (около 2 км к юго-востоку от ЖК Оазис). Не приезжайте туда по ошибке — получение в ЖК Оазис.',
      kk: 'Оператордың ресми кеңсесі басқа мекенжайда: 12-шағын аудан, 23 (ЖК Оазистен оңтүстік-шығысқа қарай шамамен 2 км). Қателесіп онда бармаңыз — қабылдау ЖК Оазисте.',
    },
    {
      fi: 'Operaattori on 24/7 WhatsAppin kautta — soita/viestitä jos ette löydä toisianne ajoissa.',
      en: 'The operator is available 24/7 via WhatsApp — call or message if you can’t find each other in time.',
      ru: 'Оператор доступен 24/7 в WhatsApp — звоните или пишите, если не можете найти друг друга вовремя.',
      kk: 'Оператор WhatsApp арқылы 24/7 қолжетімді — уақытында таба алмасаңыз хабарласыңыз немесе қоңырау шалыңыз.',
    },
    {
      fi: 'Wikimapian formaatti pickup-pisteelle: 43°40\'9"N 51°8\'3"E.',
      en: 'Wikimapia format for the pickup point: 43°40\'9"N 51°8\'3"E.',
      ru: 'Формат Wikimapia для точки получения: 43°40\'9"N 51°8\'3"E.',
      kk: 'Қабылдау нүктесі үшін Wikimapia форматы: 43°40\'9"N 51°8\'3"E.',
    },
  ],
  lastVerified: '2026-05-24',
};

export const logisticsLastVerified = '2026-05-21';
