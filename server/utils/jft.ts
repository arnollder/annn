export interface Jft {
  title: string
  date: string
  quote: string
  quoteSource: string
  body: string
  source: string
  /** YYYY-MM-DD по Москве — ключ свежести */
  day: string
  fetchedAt: string
}

const SOURCE_URL = 'https://na-russia.org/meditation-today'
const SOURCE_PAGE = 'https://na-russia.org/eg'
const STORAGE_KEY = 'jft:latest'

function stripTags(html: string) {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&laquo;/g, '«')
    .replace(/&raquo;/g, '»')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

/** Календарный день в Europe/Moscow (YYYY-MM-DD). */
export function moscowDay(d = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Moscow',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(d)
}

/** Час 0–23 в Europe/Moscow. */
export function moscowHour(d = new Date()) {
  return Number(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Moscow',
      hour: 'numeric',
      hourCycle: 'h23'
    }).format(d)
  )
}

/** Прогрев кэша: первые 6 часов московских суток (00:00–05:59). */
export function isJftWarmWindow(d = new Date()) {
  return moscowHour(d) < 6
}

export async function fetchJftFromSource(): Promise<Jft> {
  const res = await fetch(SOURCE_URL, {
    headers: {
      'user-agent': 'ANNN-site/1.0',
      accept: 'text/html'
    }
  })

  if (!res.ok) {
    throw createError({
      statusCode: 502,
      statusMessage: `Не удалось загрузить размышление (${res.status})`
    })
  }

  const html = await res.text()

  const title = html.match(/font-bold">([^<]+)<\/div>\s*<div[^>]*data-qa="meditation-date"/)?.[1]?.trim()
    || html.match(/\\?"title\\?":\\?"([^"\\]+)/)?.[1]
    || 'Только сегодня'

  const date = html.match(/data-qa="meditation-date">([^<]+)/)?.[1]?.trim() || ''

  const quote = html.match(/class="text-md italic">([^<]+)/)?.[1]?.trim()
    || html.match(/\\?"quote\\?":\\?"((?:\\.|[^"\\])*)/)?.[1]?.replace(/\\"/g, '"')
    || ''

  const quoteSource = html.match(/class="text-md italic">[^<]+<\/div><\/div><div><div class="text-md text-secondary-blue[^"]*"[^>]*>([^<]+)/)?.[1]?.trim()
    || ''

  const bodyMatch = html.match(/class="text-md mt-8">([\s\S]*?)<\/div><\/div><\/div><div class="mt-4 flex justify-end"/)
    || html.match(/class="text-md mt-8">([\s\S]*?)<\/div>/)

  let body = stripTags(bodyMatch?.[1] || '')

  if (quoteSource && body.startsWith(quoteSource)) {
    body = body.slice(quoteSource.length).replace(/^\s*v\s*/i, '').trim()
  }

  if (!body && !quote) {
    throw createError({
      statusCode: 502,
      statusMessage: 'Размышление пришло пустым — разметка источника могла измениться'
    })
  }

  const day = moscowDay()

  return {
    title,
    date,
    quote,
    quoteSource,
    body,
    source: SOURCE_PAGE,
    day,
    fetchedAt: new Date().toISOString()
  }
}

function storage() {
  return useStorage('data')
}

export async function readCachedJft(): Promise<Jft | null> {
  const cached = await storage().getItem<Jft>(STORAGE_KEY)
  if (!cached?.day || !cached.title) {
    return null
  }
  return cached
}

/**
 * Актуальная медитация: кэш за сегодня (МСК) или свежий парсинг.
 * force — всегда тянуть источник (task / ручной refresh).
 */
export async function getJft(opts: { force?: boolean } = {}): Promise<Jft> {
  const today = moscowDay()

  if (!opts.force) {
    const cached = await readCachedJft()
    if (cached?.day === today) {
      return cached
    }
  }

  const fresh = await fetchJftFromSource()
  await storage().setItem(STORAGE_KEY, fresh)
  return fresh
}
