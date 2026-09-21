export interface EventItem {
  id: string
  title: string
  date: string
  start: string
  end: string
  group?: string
  /** Путь к флаеру в /public, если есть */
  flyer?: string
}

export const events: EventItem[] = [
  {
    id: '1',
    title: 'Литературный вечер на группе Антей',
    date: '2026-09-20',
    start: '18:00',
    end: '19:00',
    group: 'antey',
    flyer: '/events/antey-lit.jpg'
  },
  {
    id: '2',
    title: 'Рабочее собрание группы «Новая»',
    date: '2026-09-20',
    start: '18:30',
    end: '19:30',
    group: 'novaya'
  },
  {
    id: '3',
    title: 'Открытые собрания группы Исток по вторникам',
    date: '2026-09-22',
    start: '20:15',
    end: '21:15',
    group: 'istok'
  },
  {
    id: '4',
    title: 'Спикерская встреча на группе «Антей» — Дарья',
    date: '2026-09-24',
    start: '19:00',
    end: '20:15',
    group: 'antey',
    flyer: '/events/antey-speaker-24-09-2026.png'
  },
  {
    id: '5',
    title: 'Рабочее собрание группы Old School',
    date: '2026-09-24',
    start: '20:15',
    end: '21:00',
    group: 'old-school'
  },
  {
    id: '6',
    title: 'Рабочее собрание группы Выбор',
    date: '2026-09-24',
    start: '20:15',
    end: '21:15',
    group: 'vybor'
  },
  {
    id: '7',
    title: 'Рабочее собрание группы Искра (Арзамас)',
    date: '2026-09-26',
    start: '18:00',
    end: '19:00',
    group: 'iskra'
  },
  {
    id: '8',
    title: 'Рабочее собрание группы Южная',
    date: '2026-09-26',
    start: '18:30',
    end: '19:30',
    group: 'yuzhnaya'
  },
  {
    id: '9',
    title: 'Литературный вечер на группе Выбор',
    date: '2026-09-26',
    start: '20:15',
    end: '21:30',
    group: 'vybor',
    flyer: '/events/vybor-lit.jpg'
  },
  {
    id: '10',
    title: 'Рабочее собрание подкомитета по больницам и учреждениям (БУ)',
    date: '2026-09-27',
    start: '12:00',
    end: '14:00',
    group: 'vybor'
  },
  {
    id: '11',
    title: 'Рабочее собрание группы «Белый день»',
    date: '2026-09-27',
    start: '16:00',
    end: '17:00',
    group: 'belyy-den'
  },
  {
    id: '12',
    title: 'Рабочее собрание группы «Исток»',
    date: '2026-09-27',
    start: '20:15',
    end: '21:15',
    group: 'istok'
  },
  {
    id: '13',
    title: 'Рабочее собрание группы Канатка',
    date: '2026-09-28',
    start: '18:00',
    end: '19:00',
    group: 'kanatka'
  },
  {
    id: '14',
    title: 'Открытые собрания группы Исток по вторникам',
    date: '2026-09-29',
    start: '20:15',
    end: '21:15',
    group: 'istok'
  }
]

const weekdayLong = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'] as const

/** Понедельник недели, в которую входит date (локальная полночь). */
export function startOfWeek(date: Date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  return d
}

export function addDays(date: Date, days: number) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  d.setDate(d.getDate() + days)
  return d
}

export function toIsoDate(date: Date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function formatDdMmYyyy(iso: string) {
  const [y, m, d] = iso.split('-')
  return `${d}.${m}.${y}`
}

export function weekdayName(iso: string) {
  const d = new Date(`${iso}T12:00:00`)
  return weekdayLong[d.getDay()]!
}

export function weekDays(weekStart: Date) {
  return Array.from({ length: 7 }, (_, i) => {
    const date = addDays(weekStart, i)
    const iso = toIsoDate(date)
    return {
      iso,
      weekday: weekdayName(iso),
      dateLabel: formatDdMmYyyy(iso),
      events: events
        .filter(e => e.date === iso)
        .sort((a, b) => a.start.localeCompare(b.start))
    }
  })
}

export function weekRangeLabel(weekStart: Date) {
  const end = addDays(weekStart, 6)
  return `${formatDdMmYyyy(toIsoDate(weekStart))} — ${formatDdMmYyyy(toIsoDate(end))}`
}

export function upcomingEvents(limit = 8) {
  const today = toIsoDate(new Date())
  return events
    .filter(e => e.date >= today)
    .sort((a, b) => `${a.date}${a.start}`.localeCompare(`${b.date}${b.start}`))
    .slice(0, limit)
}

export function formatEventDate(iso: string) {
  const d = new Date(`${iso}T12:00:00`)
  return d.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    weekday: 'short'
  })
}
