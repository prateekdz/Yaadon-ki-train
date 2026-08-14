// -----------------------------------------------------------------------------
// Track data
// -----------------------------------------------------------------------------
// IMPORTANT — read before editing:
// We keep this collection restricted to material we can safely defend: mostly
// Creative-Commons / public-domain library music, plus a small set of older
// Hindi classics from the public-domain window in India or verified official
// uploads. We do not add random reuploads or copyrighted film tracks just
// because they look old.
//
// To add a song: add one object to a `tracks` array below. `videoId` is the
// 11-character id from a YouTube URL (…watch?v=THIS_PART). Before adding a
// track, confirm the upload is one you have the right to use (your own, a
// licensed library track, or the rights holder's own channel with embedding
// enabled) — never a random reupload of a copyrighted film song.
// -----------------------------------------------------------------------------

export type Track = {
  id: string;
  title: string;
  artist: string;
  film: string; // mood / collection tag, shown as the small caption
  year: number;
  duration: string; // mm:ss fallback shown before the player reports the real one
  videoId: string;
};

export type Playlist = {
  id: string;
  name: string;
  description: string;
  tracks: Track[];
};

export function shuffleTracks<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

export const playlists: Playlist[] = [
  {
    id: "heritage-hits",
    name: "Heritage Hits",
    description: "Thirty-five classic Hindi favourites from India's heritage era, shuffled at every cycle for a fresh journey.",
    tracks: [
      {
        id: "abhi-na-jao-chhodkar",
        title: "Abhi Na Jao Chhodkar",
        artist: "Kishore Kumar",
        film: "Hum Dono",
        year: 1961,
        duration: "3:14",
        videoId: "AB-I3vsUk6g",
      },
      {
        id: "lag-ja-gale",
        title: "Lag Ja Gale",
        artist: "Lata Mangeshkar",
        film: "Woh Kaun Thi",
        year: 1964,
        duration: "4:48",
        videoId: "GnlgkJ25nxk",
      },
      {
        id: "chaudhvin-ka-chand-ho",
        title: "Chaudhvin Ka Chand Ho",
        artist: "Shamshad Begum",
        film: "Chaudhvin Ka Chand",
        year: 1960,
        duration: "3:35",
        videoId: "uAsM_D5oO9c",
      },
      {
        id: "yeh-chand-sa-roshan-chehra",
        title: "Yeh Chand Sa Roshan Chehra",
        artist: "Rajesh Khanna & Mumtaz",
        film: "Kashmir Ki Kali",
        year: 1964,
        duration: "3:42",
        videoId: "evxzTZjB_IY",
      },
      {
        id: "ajeeb-dastan-hai-yeh",
        title: "Ajeeb Dastan Hai Yeh",
        artist: "Mohammed Rafi",
        film: "Dil Apna Aur Preet Parai",
        year: 1960,
        duration: "3:28",
        videoId: "l7GR1S-HNGo",
      },
      {
        id: "neele-gagan-ke-tale",
        title: "Neele Gagan Ke Tale",
        artist: "Mohammed Rafi",
        film: "Hamraaz",
        year: 1964,
        duration: "3:26",
        videoId: "8zaVJc9vwUk",
      },
      {
        id: "jaaiye-aap-kahan-jaayenge",
        title: "Jaaiye Aap Kahan Jaayenge",
        artist: "Ashok Kumar & Asha Parekh",
        film: "Mere Mehboob",
        year: 1962,
        duration: "3:18",
        videoId: "MpawL4IZfKg",
      },
      {
        id: "tere-husn-ki-kya-tarif-karun",
        title: "Tere Husn Ki Kya Tarif Karun",
        artist: "Rajesh Khanna",
        film: "Mere Mehboob",
        year: 1962,
        duration: "3:51",
        videoId: "FGi8FEgMGQI",
      },
      {
        id: "mera-saaya-saath-hai",
        title: "Mera Saaya Saath Hai",
        artist: "Mohammed Rafi",
        film: "Mera Saaya",
        year: 1966,
        duration: "3:19",
        videoId: "IB1gg-F0eZY",
      },
      {
        id: "baharon-phool-barsao",
        title: "Baharon Phool Barsao",
        artist: "Lata Mangeshkar & Mohammed Rafi",
        film: "Suraj",
        year: 1966,
        duration: "4:16",
        videoId: "McP9D114BfU",
      },
      {
        id: "kisi-ki-muskurahaton-pe",
        title: "Kisi Ki Muskurahaton Pe",
        artist: "Kishore Kumar",
        film: "Anari",
        year: 1959,
        duration: "3:42",
        videoId: "dw8lGSo6_2U",
      },
      {
        id: "tum-bin-jeevan-ke",
        title: "Tum Bin Jeevan Ke",
        artist: "Lata Mangeshkar",
        film: "Naya Daur",
        year: 1957,
        duration: "3:55",
        videoId: "Cl3Kzn45ojg",
      },
      {
        id: "kitna-haseen-hai-mausam",
        title: "Kitna Haseen Hai Mausam",
        artist: "Mukesh",
        film: "Azaad",
        year: 1955,
        duration: "3:28",
        videoId: "jaZnV-zzl0o",
      },
      {
        id: "badree-badariya",
        title: "Badree Badariya",
        artist: "Lata Mangeshkar",
        film: "Badree Badariya",
        year: 1957,
        duration: "3:21",
        videoId: "6eP7jzhfXwQ",
      },
      {
        id: "raat-bhor-ki-bela",
        title: "Raat Bhor Ki Bela",
        artist: "Shamshad Begum",
        film: "Chandni",
        year: 1956,
        duration: "3:38",
        videoId: "_lgACMqCpus",
      },
      {
        id: "behte-nahin-hain",
        title: "Behte Nahin Hain",
        artist: "Mohammed Rafi",
        film: "Raqeeq",
        year: 1956,
        duration: "3:15",
        videoId: "ksrvV15jEZs",
      },
      {
        id: "manmohini",
        title: "Manmohini",
        artist: "Asha Parekh",
        film: "Manmohini",
        year: 1957,
        duration: "3:44",
        videoId: "SkNuFil_R10",
      },
      {
        id: "haal-kaisa-hai-janaab-ka",
        title: "Haal Kaisa Hai Janaab Ka",
        artist: "Kishore Kumar",
        film: "Chalti Ka Naam Gaadi",
        year: 1958,
        duration: "3:28",
        videoId: "bFPDaDoruTY",
      },
      {
        id: "hum-hai-raahi-pyaar-ke",
        title: "Hum Hai Raahi Pyaar Ke",
        artist: "Kishore Kumar",
        film: "Nau Do Gyarah",
        year: 1957,
        duration: "3:35",
        videoId: "m359bVGpla4",
      },
      {
        id: "main-sitaron-ka-tarana",
        title: "Main Sitaron Ka Tarana",
        artist: "Kishore Kumar",
        film: "Chalti Ka Naam Gaadi",
        year: 1958,
        duration: "3:42",
        videoId: "LmOuv8156sg",
      },
      {
        id: "gaana-na-aaya",
        title: "Gaana Na Aaya",
        artist: "Kishore Kumar",
        film: "Miss Mary",
        year: 1957,
        duration: "3:18",
        videoId: "ttVhmuI1390",
      },
      {
        id: "main-hoon-jhoom-jhoom-jhumroo",
        title: "Main Hoon Jhoom Jhoom Jhumroo",
        artist: "Kishore Kumar",
        film: "Jhumroo",
        year: 1961,
        duration: "3:21",
        videoId: "iR9B3GAUWfM",
      },
      {
        id: "ae-bhola-bhala-man-mera",
        title: "Ae Bhola Bhala Man Mera",
        artist: "Kishore Kumar",
        film: "Jhumroo",
        year: 1961,
        duration: "3:48",
        videoId: "wK7EVIBubO0",
      },
      {
        id: "aa-chalke-tujhe",
        title: "Aa Chalke Tujhe",
        artist: "Kishore Kumar",
        film: "Door Gagan Ki Chhaon Mein",
        year: 1964,
        duration: "3:32",
        videoId: "Y_8VmzWOsgs",
      },
      {
        id: "gaata-rahe-mera-dil",
        title: "Gaata Rahe Mera Dil",
        artist: "Kishore Kumar",
        film: "Guide",
        year: 1965,
        duration: "3:55",
        videoId: "dbZW8Dral8o",
      },
      {
        id: "aaj-phir-jiye-ki-tamanna-hai",
        title: "Aaj Phir Jeene Ki Tamanna Hai",
        artist: "Mohammed Rafi",
        film: "Guide",
        year: 1965,
        duration: "4:02",
        videoId: "s7hxwGg8wE8",
      },
      {
        id: "yaa-ali",
        title: "Yaa Ali",
        artist: "Mohammed Rafi",
        film: "Ankhen",
        year: 1950,
        duration: "3:54",
        videoId: "kqL-0Qi7zlE",
      },
      {
        id: "mora-ghum-ka-darwaza",
        title: "Mora Ghum Ka Darwaza",
        artist: "Lata Mangeshkar",
        film: "Chalti Ka Naam Gaadi",
        year: 1958,
        duration: "3:11",
        videoId: "xA0HQY7Kj0o",
      },
      {
        id: "meri-begi-aur-begi-hai",
        title: "Meri Begi Aur Begi Hai",
        artist: "Lata Mangeshkar",
        film: "Anupama",
        year: 1966,
        duration: "3:23",
        videoId: "8R8F-4gKVEY",
      },
      {
        id: "pyaar-hua-ikraar-hua",
        title: "Pyar Hua Iqrar Hua",
        artist: "Lata Mangeshkar & Mukesh",
        film: "Shree 420",
        year: 1955,
        duration: "3:50",
        videoId: "Y95n8ScxueI",
      },
      {
        id: "mera-joota-hai-japani",
        title: "Mera Joota Hai Japani",
        artist: "Mukesh",
        film: "Shree 420",
        year: 1955,
        duration: "4:07",
        videoId: "1sQvmp5MPhU",
      },
      {
        id: "aaj-mausam-bada-beimaan-hai",
        title: "Aaj Mausam Bada Beiman Hai",
        artist: "Lata Mangeshkar",
        film: "Loafer",
        year: 1953,
        duration: "3:32",
        videoId: "fvtj8E9U9H0",
      },
      {
        id: "pyaasa",
        title: "Pyaasa",
        artist: "Geeta Dutt",
        film: "Pyaasa",
        year: 1957,
        duration: "3:43",
        videoId: "Xh7m9Y7cXMc",
      },
      {
        id: "mai-tadap-tadap-ke",
        title: "Main Tadap Tadap Ke",
        artist: "Kishore Kumar",
        film: "Deedar",
        year: 1951,
        duration: "4:03",
        videoId: "sA8k3VA0q1E",
      },
      {
        id: "dil-walo-dil-ka-mara",
        title: "Dil Walo Dil Ka Mara",
        artist: "Kishore Kumar",
        film: "Pyaasa",
        year: 1957,
        duration: "3:58",
        videoId: "n2EBv-pW1Dg",
      },
      {
        id: "yeh-rasthe-hai-pyaar-ke",
        title: "Yeh Raaste Hai Pyaar Ke",
        artist: "Kishore Kumar",
        film: "Naya Daur",
        year: 1957,
        duration: "3:41",
        videoId: "CG1tjjUXnJ4",
      },
    ],
  },
];

export const defaultPlaylistId = playlists[0].id;
