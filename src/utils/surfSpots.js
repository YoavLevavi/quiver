/**
 * An array of surf spot objects, each containing the name and geographic coordinates of a surf spot.
 * @constant
 * @type {Array<{name: string, lat: number, lng: number}>}
 * @property {string} name - The name of the surf spot.
 * @property {number} lat - The latitude of the surf spot.
 * @property {number} lng - The longitude of the surf spot.
 */
export const SPOTS = [
  {
    name: "אשדוד, לידו",
    lat: 31.81235932977217,
    lng: 34.63863686370215,
    image:
      "https://www.ashdod.muni.il/media/16495077/%D7%AA%D7%9E%D7%95%D7%A0%D7%95%D7%AA-%D7%90%D7%95%D7%95%D7%99%D7%A8-%D7%9E%D7%99%D7%99%D7%A7-%D7%90%D7%93%D7%A8%D7%99-53.jpg",
    optimalConditions: {
      optimalSwellDirections: [180, 220],
      coastlineDirection: 270,
      windShelter: {
        N: "partial",
        NE: "full",
      },
    },
  },
  {
    name: "ניצנים",
    lat: 31.74508167590466,
    lng: 34.60026661380782,
    image:
      "https://scontent.fsdv2-1.fna.fbcdn.net/v/t1.6435-9/86970221_861961024246103_8071923139094773760_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=86c6b0&_nc_ohc=_1ZKJdiPKhEQ7kNvwEium12&_nc_oc=AdkESf5VofA-x5LLVwJ7Ou5iwGXX5hmugs9PgKNj-LYP222MaEV7D9MQNOIJFkXFPsw&_nc_zt=23&_nc_ht=scontent.fsdv2-1.fna&_nc_gid=mxS6zyhYQmL_mmaIsQG9Mw&oh=00_AfPkrp-a8KsPqvR9IvqCx4M1pb_5lacLvmbt8bXccwdPbQ&oe=686C0005",
    optimalConditions: {
      optimalSwellDirections: [190, 230],
      coastlineDirection: 280,
      windShelter: {
        NW: "partial",
        W: "full",
      },
    },
  },
  {
    name: "אשקלון, דלילה",
    lat: 31.67828848931909,
    lng: 34.553989449671946,
    image:
      "https://ynet-pic1.yit.co.il/picserver5/wcm_upload/2022/06/21/BJE71oZJ5c/20220621_102152.jpg",
    optimalConditions: {
      optimalSwellDirections: [170, 210],
      coastlineDirection: 260,
      windShelter: {
        SW: "full",
      },
    },
  },
  {
    name: "תל אביב, חוף הילטון",
    lat: 32.079899,
    lng: 34.787588,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/57/Hilton_Beach_Tel_Aviv.jpg",
  },
  {
    name: "תל אביב, חוף המרבי",
    lat: 32.051,
    lng: 34.747,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/a4/Maravi_Beach_Tel_Aviv.jpg",
  },
  {
    name: "תל אביב, חוף דולפינריום",
    lat: 32.0892,
    lng: 34.7824,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/0a/Dolphinarium_Beach.jpg",
  },

  {
    name: "חיפה, חוף בת גלים (Backdoor)",
    lat: 32.02394786679634,
    lng: 34.73921728398227,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/7/73/Bat_Galim_Haifa.jpg",
  },
  {
    name: "בת ים",
    lat: 32.0465,
    lng: 34.7572,
    image:
      "https://www.ourtripapp.com/wp-content/uploads/2023/03/big_e5c48954507c7bb854c77442759de729.jpg",
  },
  {
    name: "מכמורת",
    lat: 32.40704135644245,
    lng: 34.867655753317344,
    image:
      "https://familytrips.co.il/wp-content/uploads/elementor/thumbs/WhatsApp-Image-2022-07-06-at-10.41.19-qa7uxw4ygh5qydngrafhh0qos9ibdxq1scjnnpsq00.jpeg",
  },
  {
    name: "קיסריה, ארובות (Arubot)",
    lat: 32.51305476470064,
    lng: 34.8955653808597,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/%D7%A7%D7%99%D7%A1%D7%A8%D7%99%D7%94_%D7%94%D7%A2%D7%AA%D7%99%D7%A7%D7%A8%D7%95%D7%AA.jpg/1280px-%D7%A7%D7%99%D7%A1%D7%A8%D7%99%D7%94_%D7%94%D7%A2%D7%AA%D7%99%D7%A7%D7%A8%D7%95%D7%AA.jpg",
  },
];
