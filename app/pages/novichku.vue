<script setup lang="ts">
import { site } from '~/data/site'

useSeoMeta({
  title: 'Новичку',
  description: 'Первый раз в АН? Что ожидать на собрании, как прийти и куда позвонить в Нижнем Новгороде.'
})

const steps = [
  {
    title: 'Позвони или напиши',
    text: 'Инфолиния подскажет время и адрес. Если звонить страшно — есть Telegram-бот.'
  },
  {
    title: 'Приди как есть',
    text: 'Не надо готовиться и «выглядеть нормально». Единственное условие — желание прекратить употребление.'
  },
  {
    title: 'Послушай и побудь',
    text: 'На собрании делятся опытом. Можно молчать. Можно говорить. Как тебе спокойнее.'
  },
  {
    title: 'Вернись ещё раз',
    text: 'Программа работает, если ей пользоваться. В городе и области есть утренние, дневные, вечерние и ночные группы.'
  }
]
</script>

<template>
  <div>
    <section class="relative overflow-hidden border-b border-volga-900/10">
      <div class="nn-hero-sky absolute inset-0 opacity-55" />
      <UContainer class="relative py-20 sm:py-24">
        <p class="text-[12px] font-semibold uppercase tracking-[0.22em] nn-ink-soft">
          Первый шаг
        </p>
        <h1 class="font-display nn-ink mt-3 max-w-[12ch] text-4xl font-semibold tracking-tight sm:text-6xl">
          Тебе можно просто прийти
        </h1>
        <p class="mt-5 max-w-xl text-lg leading-relaxed nn-ink-soft">
          Если наркотики стали проблемой — ты не один. В Нижнем и области есть место на сегодня.
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <UButton
            :to="site.phone.href"
            size="xl"
            icon="i-lucide-phone"
            :label="site.phone.display"
          />
          <UButton
            to="/groups"
            size="xl"
            color="neutral"
            variant="outline"
            class="nn-surface nn-ink border-current/20"
            label="Смотреть группы"
          />
        </div>
      </UContainer>
    </section>

    <UContainer class="py-16">
      <ol class="mx-auto max-w-2xl space-y-0">
        <li
          v-for="(step, i) in steps"
          :key="step.title"
          class="border-t border-volga-900/10 py-8 first:border-t-0 dark:border-white/10"
        >
          <p class="font-display text-sm font-semibold text-ember-700">
            {{ String(i + 1).padStart(2, '0') }}
          </p>
          <h2 class="font-display mt-2 text-2xl font-semibold tracking-tight nn-ink">
            {{ step.title }}
          </h2>
          <p class="mt-3 text-lg leading-relaxed text-volga-700 dark:text-volga-300">
            {{ step.text }}
          </p>
        </li>
      </ol>

      <div class="mx-auto mt-8 max-w-2xl border-t border-volga-900/10 pt-12 dark:border-white/10">
        <h2 class="font-display text-2xl font-semibold tracking-tight nn-ink">
          Что такое программа АН
        </h2>
        <div class="mt-5 space-y-4 text-lg leading-relaxed text-volga-700 dark:text-volga-300">
          <p>
            АН — некоммерческое сообщество мужчин и женщин, для которых наркотики стали серьёзной проблемой.
            Мы выздоравливающие зависимые, которые регулярно собираются, чтобы помогать друг другу оставаться чистыми.
          </p>
          <p>
            В АН нет обязательств и взносов. Мы не связаны с политическими, религиозными или правоохранительными группами.
          </p>
          <p class="font-medium nn-ink">
            Принципы простые — и они работают.
          </p>
        </div>
      </div>
    </UContainer>
  </div>
</template>
