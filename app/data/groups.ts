export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'

export const dayLabels: Record<DayKey, string> = {
  mon: 'Пн',
  tue: 'Вт',
  wed: 'Ср',
  thu: 'Чт',
  fri: 'Пт',
  sat: 'Сб',
  sun: 'Вс'
}

export const dayOrder: DayKey[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

export interface Group {
  slug: string
  name: string
  city: string
  address?: string
  howToFind?: string
  /** Фото «как пройти»: пути из /public или внешние URL */
  photos?: string[]
  /** Готовый iframe карты со старого сайта (Яндекс constructor / Google) */
  mapEmbed?: string
  online?: boolean
  zoom?: { id: string, password: string, url?: string }
  schedule: Partial<Record<DayKey, string>>
  notes?: string[]
  tags?: string[]
}

export const groups: Group[] = [
  {
    slug: 'na-beregu',
    name: 'NA берегу',
    city: 'Заволжье',
    address: 'г. Заволжье, пр. Дзержинского 3в, вход слева от стоматологии «Дентал Эсте», 2 этаж',
    photos: ["/groups/na-beregu/1.jpg"],
    mapEmbed: "https://yandex.ru/map-widget/v1/?um=constructor%3Ada5c0ca127ca1be976fee9ed7beb486f07e7c4eacd1d931c743949e77ed1e57b&source=constructor",
    schedule: { tue: '19:00', sun: '19:00' },
    tags: ['область']
  },
  {
    slug: 'novaya',
    name: 'NовAя',
    city: 'Нижний Новгород',
    address: 'Нижегородская обл., г. Нижний Новгород, пр. Гагарина, 69',
    photos: ["/groups/novaya/1.jpg", "/groups/novaya/2.jpg", "/groups/novaya/3.jpg", "/groups/novaya/4.jpg", "/groups/novaya/5.jpg"],
    mapEmbed: "https://yandex.ru/map-widget/v1/?um=constructor%3A5cb2f716d03048db04de7ca27de6fb38bf524d55096e6c9ed1d72d6cd8cf3b83&source=constructor",
    schedule: {
      mon: '20:00', tue: '20:00', wed: '20:00', thu: '20:00',
      fri: '20:00', sat: '20:00', sun: '20:00'
    },
    notes: [
      'Рабочие собрания — каждое второе воскресенье месяца в 18:30',
      'Открытые собрания — каждое последнее воскресенье месяца в 20:00'
    ],
    tags: ['ежедневно', 'город']
  },
  {
    slug: 'old-school',
    name: 'Old School',
    city: 'Нижний Новгород',
    address: 'г. Нижний Новгород, ул. Октябрьской революции, 39',
    photos: ["/groups/old-school/1.jpg", "/groups/old-school/2.jpg", "/groups/old-school/3.jpg", "/groups/old-school/4.jpg"],
    mapEmbed: "https://yandex.ru/map-widget/v1/?um=constructor%3A10e72fedad5ba3fddd398cac7d7112545fc0ee187dbff80024a6e45f4f209a1c&source=constructor",
    schedule: {
      mon: '19:00', tue: '19:00', wed: '19:00', thu: '19:00', fri: '19:00'
    },
    notes: [
      'Четверг — дополнительная тема «Духовные принципы на каждый день»',
      'Открытые собрания — в первый вторник месяца',
      'Рабочие собрания — каждый последний четверг месяца в 20:15',
      'Работает проект «Отметка»'
    ],
    tags: ['город']
  },
  {
    slug: 'antey',
    name: 'АНтей',
    city: 'Нижний Новгород',
    address: "Нижний Новгород ул. Канавинская 2а офис №5",
    photos: ["/groups/antey/1.jpg", "/groups/antey/2.jpg", "/groups/antey/3.jpg", "/groups/antey/4.jpg"],
    mapEmbed: "https://yandex.ru/map-widget/v1/?um=constructor%3A599297d7d447eb0f2c4a02c88372dccc3802e466ff7507557b62e60c06a78c41&source=constructor",
    schedule: {
      mon: '19:00', tue: '19:00', wed: '18:30', thu: '19:00',
      fri: '19:00', sat: '17:00', sun: '17:00'
    },
    notes: [
      'Первая среда месяца — собрание с 18:30',
      'Рабочее собрание — каждая первая среда месяца в 19:30',
      'Открытые собрания — каждое воскресенье в 17:00',
      'По субботам — чайное собрание',
      'Работает проект «Отметка»'
    ],
    tags: ['город']
  },
  {
    slug: 'belyy-den',
    name: 'Белый день',
    city: 'Нижний Новгород',
    photos: ["/groups/belyy-den/1.jpg", "/groups/belyy-den/2.jpg", "/groups/belyy-den/3.jpg", "/groups/belyy-den/4.jpg"],
    mapEmbed: "https://yandex.ru/map-widget/v1/?um=constructor%3Ab3d10d622dfc95f3d6c3cd3bd24cf94aaa013a70b2e8ab3dc1ea29c18c7ba387&source=constructor",
    schedule: {
      tue: '15:00', wed: '15:00', thu: '15:00',
      fri: '15:00', sat: '15:00', sun: '15:00'
    },
    notes: [
      'Открытое собрание — каждую вторую субботу месяца в 15:00',
      'Рабочее собрание — в последнее воскресенье месяца в 16:15'
    ],
    tags: ['дневная', 'город']
  },
  {
    slug: 'vecher-online',
    name: 'Вечер Online',
    city: 'Online',
    online: true,
    zoom: {
      id: '941 518 2891',
      password: '270017'
    },
    schedule: {
      mon: '19:30', tue: '19:30', wed: '19:30', thu: '19:30',
      fri: '19:30', sat: '18:00', sun: '18:00'
    },
    tags: ['online']
  },
  {
    slug: 'vozrozhdenie',
    name: 'Возрождение',
    city: 'Городец',
    address: 'г. Городец, ул. Кооперативный съезд, д. 6',
    photos: ["/groups/vozrozhdenie/1.jpg", "/groups/vozrozhdenie/2.jpg"],
    mapEmbed: "https://yandex.ru/map-widget/v1/?um=constructor%3Abe0ee732b855ddc36cfe17e01a8b943dc4f17f904342bafb37759472f5ccf346&source=constructor",
    schedule: { wed: '19:00', sat: '19:00' },
    notes: [
      'Открытые собрания — последняя суббота месяца',
      'Рабочие собрания — каждый первый понедельник месяца в 20:00'
    ],
    tags: ['область']
  },
  {
    slug: 'vybor',
    name: 'Выбор',
    city: 'Нижний Новгород',
    address: "Нижний Новгород, Ванеева 15/34",
    photos: ["/groups/vybor/1.jpg", "/groups/vybor/2.jpg", "/groups/vybor/3.jpg", "/groups/vybor/4.jpg"],
    mapEmbed: "https://yandex.ru/map-widget/v1/?um=constructor%3Abfb1c6f92c14be62001370e6030d47ff521495afec557b282d944ecf9d354d7f&source=constructor",
    schedule: {
      mon: '19:00', tue: '19:00', wed: '19:00', thu: '19:00',
      fri: '19:00', sat: '19:00', sun: '19:00'
    },
    tags: ['ежедневно', 'город']
  },
  {
    slug: 'dvenashka',
    name: 'Двенашка',
    city: 'Нижний Новгород',
    address: 'Нижний Новгород, ул. Большая Печерская, 39',
    photos: ["/groups/dvenashka/1.jpg", "/groups/dvenashka/2.jpg", "/groups/dvenashka/3.jpg", "/groups/dvenashka/4.jpg", "/groups/dvenashka/5.jpg", "/groups/dvenashka/6.jpg", "/groups/dvenashka/7.jpg"],
    mapEmbed: "https://yandex.ru/map-widget/v1/?um=constructor%3A1ba638af1ae71cfe67da1de6428d10bc51e40327cf651083a119a9b410465a51&source=constructor",
    schedule: {
      mon: '12:00', tue: '12:00', wed: '12:00', thu: '12:00',
      fri: '12:00', sat: '12:00', sun: '13:30'
    },
    notes: [
      'Рабочие собрания — каждую вторую пятницу месяца в 13:15'
    ],
    tags: ['дневная', 'город']
  },
  {
    slug: 'iskra',
    name: 'Искра',
    city: 'Арзамас',
    photos: ["/groups/iskra/1.jpg", "/groups/iskra/2.jpg", "/groups/iskra/3.jpg"],
    mapEmbed: "https://yandex.ru/map-widget/v1/?um=constructor%3Ab7d4c1871119d00760402e5c2cf07becaa743b9692971b21b5e5b97c3b573ea3&source=constructor",
    schedule: {
      mon: '19:00', wed: '19:00', fri: '19:00', sat: '19:00'
    },
    tags: ['область']
  },
  {
    slug: 'istok',
    name: 'Исток',
    city: 'Нижний Новгород',
    address: 'Нижний Новгород, Нижне-Волжская набережная, 7/2, 3 этаж, комната 8',
    mapEmbed: "https://yandex.ru/map-widget/v1/?um=constructor%3A2bd9c6c8ec718a75fc44cb710b2b87f5d70e9d293fccc57b9542c198c77da990&source=constructor",
    schedule: {
      mon: '20:45', tue: '20:15', wed: '20:00', thu: '20:45',
      fri: '20:00', sat: '18:00', sun: '18:00'
    },
    notes: [
      'Открытое собрание — каждый вторник в 20:15',
      'Рабочее собрание — последнее воскресенье месяца в 19:15',
      'Работает проект «Отметка»'
    ],
    tags: ['город']
  },
  {
    slug: 'istok-midnight',
    name: 'Исток Midnight',
    city: 'Нижний Новгород',
    address: 'Нижний Новгород, Нижне-Волжская набережная, 7/2, 3 этаж, комната 8',
    mapEmbed: "https://yandex.ru/map-widget/v1/?um=constructor%3A2bd9c6c8ec718a75fc44cb710b2b87f5d70e9d293fccc57b9542c198c77da990&source=constructor",
    schedule: { fri: '22:00', sat: '22:00' },
    notes: [
      'Рабочее собрание — последнее воскресенье месяца в 19:15'
    ],
    tags: ['ночная', 'город']
  },
  {
    slug: 'kanatka',
    name: 'Канатка',
    city: 'Бор',
    address: 'г. Бор, ул. Ленина, д. 84, офис 317 (3 этаж)',
    mapEmbed: "https://yandex.ru/map-widget/v1/?um=constructor%3A98d9bc8079a0de85b6f98b61be185f018fcab1de3ee3ce9cc289a4f6ac63aeed&source=constructor",
    schedule: { mon: '19:00', fri: '19:00' },
    notes: ['Все собрания группы открытые'],
    tags: ['область']
  },
  {
    slug: 'kuba',
    name: 'Куба',
    city: 'Нижний Новгород',
    address: 'Нижний Новгород, проспект Ленина 16Б, 5 этаж, комната 506/3',
    photos: ["/groups/kuba/1.jpg"],
    schedule: {
      mon: '20:00', tue: '20:00', wed: '20:00', thu: '20:00',
      fri: '20:00', sat: '20:00', sun: '20:00'
    },
    notes: [
      'Рабочее собрание — каждое 1-е воскресенье месяца в 18:30',
      'Каждое воскресенье — открытое собрание',
      'По средам — тематические собрания',
      'Работает проект «Отметка»'
    ],
    tags: ['ежедневно', 'город']
  },
  {
    slug: 'meteor',
    name: 'Метеор',
    city: 'Нижний Новгород',
    address: "Нижний Новгород, Сормовское шоссе, 24ц",
    howToFind: 'Центральный вход. Вахтёру ничего говорить не нужно. Как зашли — сразу налево в коридор, по левой стороне последняя дверь с логотипом АН.',
    photos: ["https://i.postimg.cc/Xq8Lm9g8/photo-2025-02-07-19-52-42.jpg", "https://i.postimg.cc/gcDKYqvy/photo-2022-12-23-19-11-28.jpg", "https://i.postimg.cc/QM1pvp8T/photo-2022-12-23-19-11-31.jpg"],
    schedule: {
      mon: '20:00', wed: '19:00', thu: '19:00',
      fri: '19:00', sat: '18:00', sun: '18:00'
    },
    notes: [
      'Рабочие собрания — каждое первое воскресенье месяца в 19:15'
    ],
    tags: ['город']
  },
  {
    slug: 'nadezhda',
    name: 'Надежда',
    city: 'Кстово',
    address: "Кстово, пер. Шохина, 41",
    photos: ["/groups/nadezhda/1.jpg", "/groups/nadezhda/2.jpg", "/groups/nadezhda/3.jpg"],
    mapEmbed: "https://yandex.ru/map-widget/v1/?um=constructor%3A7830b8b5c2182b0d6157ab1a1b2d85e3e56ce7ab1e9de5804ccf3dd4163cca50&source=constructor",
    schedule: {
      mon: '19:00', wed: '19:00', fri: '19:00', sun: '19:00'
    },
    tags: ['область']
  },
  {
    slug: 'nachalo',
    name: 'НАчало',
    city: 'Муром',
    address: "Московская 14 вход в арку,ориентир на агентство недвижимости «нужные люди»",
    photos: ["/groups/nachalo/1.jpg", "/groups/nachalo/2.jpg"],
    mapEmbed: "https://www.google.com/maps/d/embed?mid=1Z3R_N2GG0-THKyHRCAHSGDMg9Wi_Lko&ehbc=2E312F",
    schedule: {
      tue: '19:00', wed: '19:00', fri: '19:00', sat: '19:00'
    },
    tags: ['область']
  },
  {
    slug: 'parus',
    name: 'Парус',
    city: 'Выкса',
    photos: ["/groups/parus/1.jpg", "/groups/parus/2.jpg"],
    mapEmbed: "https://www.google.com/maps/d/embed?mid=16j0zCE_bOxtmXkEWTlpQ1R0pexo",
    schedule: {
      mon: '19:00', tue: '20:15', wed: '19:00', thu: '20:15',
      fri: '19:00', sat: '19:00', sun: '19:00'
    },
    tags: ['область']
  },
  {
    slug: 'svoboda',
    name: 'Свобода',
    city: 'Кулебаки',
    address: 'г. Кулебаки, ул. Бунтарская, 52, здание библиотеки, 2 этаж',
    mapEmbed: "https://yandex.ru/map-widget/v1/?um=constructor%3Aad66c1a80176c62cb06db0b04ea90be8e1283a9672829e1760244f0325211d51&source=constructor",
    schedule: { sat: '17:00' },
    tags: ['область']
  },
  {
    slug: 'segodnya',
    name: 'Сегодня',
    city: 'Нижний Новгород',
    address: 'Нижний Новгород, ул. Большая Печерская, 39',
    photos: ["/groups/segodnya/1.jpg", "/groups/segodnya/2.jpg", "/groups/segodnya/3.jpg", "/groups/segodnya/4.jpg", "/groups/segodnya/5.jpg", "/groups/segodnya/6.jpg", "/groups/segodnya/7.jpg"],
    mapEmbed: "https://yandex.ru/map-widget/v1/?um=constructor%3A1ba638af1ae71cfe67da1de6428d10bc51e40327cf651083a119a9b410465a51&source=constructor",
    schedule: {
      mon: '20:00', wed: '20:00', thu: '20:00',
      fri: '20:00', sat: '20:00', sun: '20:00'
    },
    notes: [
      'Ежедневно в 20:00, кроме вторника',
      'Рабочие собрания — каждую вторую пятницу месяца в 21:00',
      'Открытые собрания — каждую среду'
    ],
    tags: ['город']
  },
  {
    slug: 'segodnya-nochyu',
    name: 'Сегодня Ночью',
    city: 'Нижний Новгород',
    address: 'Нижний Новгород, ул. Большая Печерская, 39',
    photos: ["/groups/segodnya-nochyu/1.jpg", "/groups/segodnya-nochyu/2.jpg", "/groups/segodnya-nochyu/3.jpg", "/groups/segodnya-nochyu/4.jpg", "/groups/segodnya-nochyu/5.jpg", "/groups/segodnya-nochyu/6.jpg", "/groups/segodnya-nochyu/7.jpg"],
    mapEmbed: "https://yandex.ru/map-widget/v1/?um=constructor%3A1ba638af1ae71cfe67da1de6428d10bc51e40327cf651083a119a9b410465a51&source=constructor",
    schedule: {
      mon: '23:00', tue: '23:00', wed: '23:00', thu: '23:00',
      fri: '23:00', sat: '23:00', sun: '23:00'
    },
    notes: ['Ночные собрания на группе «Сегодня». Всем добро пожаловать!'],
    tags: ['ночная', 'ежедневно', 'город']
  },
  {
    slug: 'utro-online',
    name: 'Утро Online',
    city: 'Online',
    online: true,
    schedule: {
      mon: '07:30', tue: '07:30', wed: '07:30', thu: '07:30',
      fri: '07:30', sat: '09:00', sun: '09:00'
    },
    tags: ['online', 'утренняя']
  },
  {
    slug: 'feniks',
    name: 'Феникс',
    city: 'Дзержинск',
    address: 'г. Дзержинск, ул. Октябрьская, 19, этаж 3, офис 311',
    photos: ["/groups/feniks/1.jpg", "/groups/feniks/2.jpg", "/groups/feniks/3.jpg", "/groups/feniks/4.jpg"],
    mapEmbed: "https://yandex.ru/map-widget/v1/?um=constructor%3A6470758eed0a19ac83a6d820d7208740dbe1985b84c46c6dbd70cf1384946749&source=constructor",
    schedule: {
      tue: '19:00', wed: '19:00', thu: '19:00',
      fri: '19:00', sat: '19:00', sun: '19:00'
    },
    tags: ['область']
  },
  {
    slug: 'feniks-night',
    name: 'Феникс Night',
    city: 'Дзержинск',
    address: 'г. Дзержинск, ул. Октябрьская, 19, этаж 3, офис 311. Код 38',
    photos: ["/groups/feniks-night/1.jpg", "/groups/feniks-night/2.jpg", "/groups/feniks-night/3.jpg", "/groups/feniks-night/4.jpg"],
    mapEmbed: "https://yandex.ru/map-widget/v1/?um=constructor%3A6470758eed0a19ac83a6d820d7208740dbe1985b84c46c6dbd70cf1384946749&source=constructor",
    schedule: { fri: '22:00' },
    notes: [
      'Рабочие собрания — во второй и четвёртый четверг месяца в 20:00',
      'Открытые собрания — в первое воскресенье месяца',
      'Работает проект «Отметка»'
    ],
    tags: ['ночная', 'область']
  },
  {
    slug: 'chistye',
    name: 'Чистые',
    city: 'Саров',
    photos: ["/groups/chistye/1.jpg", "/groups/chistye/2.jpg"],
    mapEmbed: "https://yandex.ru/map-widget/v1/?um=constructor%3Ac89ba834f459cd10306c0b5c53382abe587e0510fc6e0fff1118b5d0168f5235&source=constructor",
    schedule: { tue: '20:00', thu: '20:00', sat: '20:00' },
    tags: ['область']
  },
  {
    slug: 'yuzhnaya',
    name: 'ЮжNAя',
    city: 'Нижний Новгород',
    address: "Нижний Новгород ул. Янки Купалы 16а",
    photos: ["/groups/yuzhnaya/1.jpg"],
    mapEmbed: "https://yandex.ru/map-widget/v1/?um=constructor%3A98c7696060136d507fb5edcd9ca3b54d4bd03700e05ba43616689d72f4b77186&source=constructor",
    schedule: {
      mon: '20:00', tue: '20:00', wed: '20:00',
      fri: '20:00', sat: '20:00', sun: '20:00'
    },
    notes: [
      'Рабочее собрание — каждую последнюю субботу месяца в 18:30',
      'Открытые собрания — последнее воскресенье месяца в 20:00',
      'Первая суббота месяца — спикерский формат'
    ],
    tags: ['город']
  }
]

export function getGroup(slug: string) {
  return groups.find(g => g.slug === slug)
}

export function groupsMeetingOn(day: DayKey) {
  return groups.filter(g => Boolean(g.schedule[day]))
}

export function groupsMeetingToday() {
  const map: DayKey[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
  const day = map[new Date().getDay()]!
  return groupsMeetingOn(day).map(g => ({
    ...g,
    time: g.schedule[day]!
  })).sort((a, b) => a.time.localeCompare(b.time))
}
