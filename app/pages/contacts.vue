<script setup lang="ts">
import { site } from '~/data/site'

useSeoMeta({
  title: 'Контакты',
  description: 'Телефоны информационной линии АН Нижний Новгород и область, Telegram-бот.'
})

const channels = [
  {
    title: 'Информационная линия',
    value: site.phone.display,
    hint: site.phone.hours,
    href: site.phone.href
  },
  {
    title: 'Горячая линия',
    value: site.hotline.display,
    hint: site.hotline.hours,
    href: site.hotline.href
  },
  {
    title: 'Telegram-бот',
    value: '@NA52_bot',
    hint: 'Новичку, родственнику и участнику',
    href: site.telegramBot
  }
]
</script>

<template>
  <div>
    <section class="border-b border-volga-900/10 py-14 dark:border-white/10">
      <UContainer>
        <p class="text-[12px] font-semibold uppercase tracking-[0.22em] text-ember-700">
          {{ site.city }}
        </p>
        <h1 class="font-display nn-ink mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Контакты
        </h1>
        <p class="mt-4 max-w-xl text-lg text-volga-700 dark:text-volga-300">
          Позвони — подскажут группу, время и как дойти. Если не уверен, с чего начать — тоже звони.
        </p>
      </UContainer>
    </section>

    <UContainer class="py-10">
      <ul class="max-w-2xl">
        <li
          v-for="ch in channels"
          :key="ch.title"
          class="border-b border-volga-900/10 py-6 first:pt-0 dark:border-white/10"
        >
          <a
            :href="ch.href"
            target="_blank"
            rel="noopener"
            class="group block"
          >
            <p class="text-sm text-volga-500">
              {{ ch.title }}
            </p>
            <p class="font-display mt-1 text-2xl font-semibold tracking-tight nn-ink transition group-hover:text-ember-700 dark:group-hover:text-ember-300">
              {{ ch.value }}
            </p>
            <p class="mt-1 text-volga-600 dark:text-volga-300">
              {{ ch.hint }}
            </p>
          </a>
        </li>
      </ul>

      <div class="mt-12 max-w-2xl bg-volga-950 p-8 text-volga-100 sm:p-10">
        <h2 class="font-display text-2xl font-semibold tracking-tight text-white">
          Нужна группа прямо сейчас?
        </h2>
        <p class="mt-3 max-w-md text-volga-200">
          Открой расписание — там фильтр по дню и городу. Или напиши боту.
        </p>
        <div class="mt-6 flex flex-wrap gap-3">
          <UButton
            to="/groups"
            size="lg"
            label="Расписание групп"
          />
          <UButton
            to="/novichku"
            size="lg"
            color="neutral"
            variant="outline"
            class="border-volga-600 text-volga-50"
            label="Я новичок"
          />
        </div>
      </div>
    </UContainer>
  </div>
</template>
