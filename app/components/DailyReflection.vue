<script setup lang="ts">
import { site } from '~/data/site'

interface Jft {
  title: string
  date: string
  quote: string
  quoteSource: string
  body: string
  source: string
  day?: string
  fetchedAt?: string
}

const { data, pending, error } = await useFetch<Jft>('/api/jft', {
  key: 'jft-today',
  default: () => null
})

const justToday = computed(() => {
  const body = data.value?.body || ''
  const marker = /ТОЛЬКО СЕГОДНЯ:\s*/i
  const idx = body.search(marker)
  if (idx === -1) {
    return { text: body, action: '' }
  }
  return {
    text: body.slice(0, idx).trim(),
    action: body.slice(idx).replace(marker, '').trim()
  }
})
</script>

<template>
  <div class="nn-jft flex w-full flex-col">
    <div class="flex shrink-0 items-baseline justify-between gap-3 px-0.5 pb-1.5 pt-1.5 sm:px-2">
      <h2 class="font-display nn-ink text-base font-semibold tracking-tight sm:text-lg">
        Ежедневные размышления
      </h2>
      <a
        :href="site.reflections.url"
        target="_blank"
        rel="noopener"
        class="nn-link-line shrink-0 text-xs font-medium text-volga-600 dark:text-volga-300"
      >
        Открыть →
      </a>
    </div>

    <div class="nn-jft-frame flex flex-col overflow-hidden rounded-xl border border-volga-900/12 bg-white/80 shadow-sm dark:border-white/10 dark:bg-volga-950/50">
      <div
        v-if="pending && !data"
        class="flex flex-1 items-center justify-center px-5 text-sm nn-ink-soft"
      >
        Загружаю…
      </div>

      <div
        v-else-if="error && !data"
        class="flex flex-1 flex-col justify-center gap-3 px-5 py-6"
      >
        <p class="text-sm leading-relaxed nn-ink-soft">
          Сейчас не удалось подтянуть текст. Открой на сайте АН России.
        </p>
        <a
          :href="site.reflections.url"
          target="_blank"
          rel="noopener"
          class="nn-link-line text-sm font-semibold text-ember-700"
        >
          na-russia.org/eg →
        </a>
      </div>

      <article
        v-else-if="data"
        class="nn-jft-scroll flex flex-col px-5 py-5 sm:px-6"
      >
        <p
          v-if="data.date"
          class="text-[11px] font-semibold uppercase tracking-[0.16em] text-ember-700 dark:text-ember-300"
        >
          {{ data.date }}
        </p>
        <h3 class="font-display nn-ink mt-1.5 text-xl font-semibold leading-tight tracking-tight sm:text-2xl">
          {{ data.title }}
        </h3>

        <blockquote
          v-if="data.quote"
          class="mt-4 border-l-2 border-ember-500/70 pl-3 text-[0.98rem] leading-relaxed italic nn-ink-soft sm:text-[1.05rem]"
        >
          {{ data.quote }}
          <cite
            v-if="data.quoteSource"
            class="mt-1.5 block text-xs not-italic text-volga-500"
          >
            {{ data.quoteSource }}
          </cite>
        </blockquote>

        <div class="mt-4 space-y-3 text-[0.95rem] leading-relaxed text-volga-700 dark:text-volga-300 sm:text-[1.02rem] sm:leading-[1.65]">
          <p
            v-for="(p, i) in justToday.text.split(/\n+/).filter(Boolean)"
            :key="i"
          >
            {{ p }}
          </p>
          <p
            v-if="justToday.action"
            class="font-semibold nn-ink"
          >
            <span class="text-ember-700 dark:text-ember-300">Только сегодня:</span>
            {{ justToday.action }}
          </p>
        </div>
      </article>
    </div>
  </div>
</template>
