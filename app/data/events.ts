export interface EventItem {
  id: string
  title: string
  date: string
  start: string
  end: string
  group?: string
}

export const events: EventItem[] = [
  {
    id: '1',
    title: 'Литературный вечер на группе Антей',
    date: '2026-09-20',
    start: '18:00',
    end: '19:00',
    group: 'antey'
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
    group: 'antey'
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
    group: 'vybor'
  }
]

export function upcomingEvents(limit = 8) {
  const today = new Date().toISOString().slice(0, 10)
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
