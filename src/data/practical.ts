import type { VisaInfo } from '@/lib/types';

export const visaInfo: VisaInfo = {
  countryOfCitizen: 'Suomi',
  visaFree: true,
  visaFreeDays: 30,
  notes:
    'Suomen kansalaiset voivat matkustaa Kazakstaniin viisumivapaasti enintään 30 päiväksi. Passin tulee olla voimassa vähintään 6 kk yli paluupäivän. Tarkista aina tilanne ennen lähtöä — säännöt voivat muuttua.',
  lastVerified: '2026-05-21',
  sourceUrl: 'https://um.fi/matkustustiedotteet/-/c/KZ',
};

export const languageBasics = {
  greetings: [
    { fi: 'Hei', kk: 'Сәлем (Sälem)', ru: 'Привет (Privet)' },
    { fi: 'Kiitos', kk: 'Рахмет (Rakhmet)', ru: 'Спасибо (Spasibo)' },
    { fi: 'Anteeksi', kk: 'Кешіріңіз (Keshiriñiz)', ru: 'Извините (Izvinite)' },
    { fi: 'Kyllä / Ei', kk: 'Иә / Жоқ (İä / Jok)', ru: 'Да / Нет (Da / Net)' },
    { fi: 'Paljonko maksaa?', kk: 'Қанша тұрады? (Qansha turady?)', ru: 'Сколько стоит? (Skolko stoit?)' },
    { fi: 'Apua!', kk: 'Көмек! (Kömek!)', ru: 'Помогите! (Pomogite!)' },
  ],
  notes:
    'Venäjä on edelleen laajalti puhuttu, etenkin kaupungeissa. Kazakki vahvistuu kouluissa ja virallisessa käytössä. Englantia osataan rajoitetusti — käännösappi (Google Translate offline-paketilla) on hyödyllinen.',
  alphabet:
    'Kazakki kirjoitetaan kyrillisillä aakkosilla (siirtyminen latinaan suunniteltu mutta hidasta). Opettele tunnistamaan ainakin metroasemat ja katukyltit.',
};

export const safetyNotes = [
  'Kazakstan on yleisesti rauhallinen matkakohde. Yleisin riski on pikkurikollisuus tungoksessa — pidä lompakko etutaskussa.',
  'Iso Almatyn järvi (BAO) sijaitsee rajavyöhykkeellä — virallista permittiä ei nykyään yleensä vaadita itse järvelle, mutta tiellä on sotilastarkastuspisteitä. Pidä passi mukana ja varmista paikalliselta oppaalta nykytilanne ennen retkeä.',
  'Liikenne kaupungissa on vilkasta — käytä Yandex Go -taksiappia hinnoitelluille matkoille.',
  'Käteistä (KZT) kannattaa pitää mukana maaseudulla; kortit toimivat kaupungeissa hyvin.',
  'Mangystaussa ja muilla syrjäisillä alueilla älkää lähtekö ilman kokenutta kuljettajaa ja 4WD-autoa — eksyminen on todellinen riski.',
  'Naispuolisille matkailijoille: kaupungit ovat turvallisia, mutta peittävä pukeutuminen pyhäkköihin on tarpeen.',
];

export const transportSections = {
  flights: {
    title: 'Lennot kaupunkien välillä',
    body:
      'Kotimaan lentoja operoivat Air Astana ja FlyArystan. Almaty↔Astana on ~1,5 h, Almaty↔Aktau ~3 h. Liput ovat halvempia ostettuna suoraan yhtiöiltä kuin metasivuilta. FlyArystan on halpalentoyhtiö, Air Astana laajempi verkko.',
  },
  trains: {
    title: 'Junat — Talgo ja yöjunat',
    body:
      'Talgo-pikajunat yhdistävät pääkaupungit. Almaty↔Turkistan on yöjunalla ~13 h ja se on tunnelmallinen, halpa tapa siirtyä etelään. Liput osoitteessa railways.kz tai Bilet.railways.kz. Lähivaunut ovat halvimmat, kupé (4 hengen hytti) miellyttävämpi.',
  },
  cars: {
    title: 'Vuokra-auto ja kuljettaja',
    body:
      'Mangystaussa ja Altyn-Emelissä tarvitaan yleensä 4WD ja paikallinen opas — älkää lähtekö itse syrjäalueille. Almatyn ympäristössä tavallinen auto riittää, mutta kuljettajan palkkaaminen (n. 60–100 € / päivä) on usein järkevää koska kyltit ovat kyrillisin aakkosin ja liikennekulttuuri on omanlaisensa.',
  },
  local: {
    title: 'Paikallisliikenne',
    body:
      'Almatyssa on metro (yksi linja) ja runsaasti Yandex Go -takseja. Astanassa busseja ja takseja. Lataa Yandex Go -sovellus ennen lähtöä — hinnat ovat reilut ja hinnoittelu läpinäkyvää.',
  },
};
