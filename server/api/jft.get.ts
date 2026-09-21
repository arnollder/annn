export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const force = query.refresh === '1' || query.refresh === 'true'

  const jft = await getJft({ force })

  // Клиенту можно кэшировать до конца московского дня — но лучше коротко
  setHeader(event, 'cache-control', 'public, max-age=300, stale-while-revalidate=3600')

  return jft
})
