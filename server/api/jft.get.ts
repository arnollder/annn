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

export default defineEventHandler(async () => {
  const res = await fetch('https://na-russia.org/meditation-today', {
    headers: {
      'user-agent': 'ANNN-site/1.0',
      accept: 'text/html'
    }
  })

  if (!res.ok) {
    throw createError({ statusCode: 502, statusMessage: 'Не удалось загрузить размышление' })
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

  return {
    title,
    date,
    quote,
    quoteSource,
    body,
    source: 'https://na-russia.org/eg'
  }
})
