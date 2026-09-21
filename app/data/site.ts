export const site = {
  name: 'Анонимные Наркоманы',
  city: 'Нижний Новгород и область',
  slogan: 'Жизнь без наркотиков возможна',
  phone: {
    display: '+7 (906) 35-35-039',
    href: 'tel:+79063535039',
    hours: 'с 7:00 до 22:00'
  },
  hotline: {
    display: '8-800-101-42-12',
    href: 'tel:88001014212',
    hours: 'круглосуточно'
  },
  telegramBot: 'https://t.me/NA52_bot',
  social: {
    telegram: 'https://t.me/NA52_bot',
    vk: 'https://vk.com/narcotics_anonymous_52',
    email: 'mailto:annn52@mail.ru'
  },
  radio: {
    url: 'https://radio-na.ru/',
    stream: 'https://c2.radioboss.fm/stream/543'
  },
  reflections: {
    url: 'https://na-russia.org/eg'
  },
  feniks: {
    email: 'mailto:fenix.an52@gmail.com',
    emailDisplay: 'fenix.an52@gmail.com'
  }
} as const

export const navItems = [
  { label: 'Главная', to: '/' },
  { label: 'Новичку', to: '/novichku' },
  { label: 'Группы', to: '/groups' },
  { label: 'Комитеты', to: '/komitety' },
  { label: 'Календарь', to: '/calendar' },
  { label: 'Контакты', to: '/contacts' }
] as const

export const resourceLinks = [
  {
    title: 'Радио АН',
    text: 'Эфир 24/7 — опыт, сила и надежда.',
    to: 'https://radio-na.ru/',
    external: true,
    icon: 'i-lucide-radio'
  },
  {
    title: 'Проект «Феникс»',
    text: 'Помощь на собраниях людям с ограниченными возможностями.',
    to: '/feniks',
    external: false,
    icon: 'i-lucide-heart-handshake'
  }
] as const
