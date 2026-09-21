export default defineTask({
  meta: {
    name: 'jft:refresh',
    description: 'Парсит ежедневное размышление (прогрев 00–06 МСК)'
  },
  async run() {
    if (!isJftWarmWindow()) {
      return {
        result: {
          skipped: true,
          reason: 'outside warm window (only 00:00–05:59 MSK)',
          hour: moscowHour(),
          day: moscowDay()
        }
      }
    }

    const jft = await getJft({ force: true })
    return {
      result: {
        skipped: false,
        day: jft.day,
        title: jft.title,
        date: jft.date,
        fetchedAt: jft.fetchedAt
      }
    }
  }
})
