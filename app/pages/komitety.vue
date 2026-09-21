<script setup lang="ts">
import { committees, committeesIntro, committeeRoles } from '~/data/committees'

useSeoMeta({
  title: 'Комитеты',
  description: 'Органы обслуживания АН Нижнего Новгорода и области: МКО, ПСО, БУ, Литком, РС и другие служения.'
})
</script>

<template>
  <div>
    <section class="border-b border-volga-900/10 py-12 dark:border-white/10">
      <UContainer>
        <p class="text-[12px] font-semibold uppercase tracking-[0.22em] text-ember-700">
          Органы обслуживания
        </p>
        <h1 class="font-display nn-ink mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Комитеты
        </h1>
        <p class="mt-4 max-w-2xl text-lg leading-relaxed text-volga-700 dark:text-volga-300">
          Как устроена местность АН в Нижнем и области — и куда можно прийти послужить.
        </p>
      </UContainer>
    </section>

    <UContainer class="space-y-14 py-10">
      <div class="mx-auto max-w-3xl space-y-4 text-lg leading-relaxed text-volga-700 dark:text-volga-300">
        <p
          v-for="(p, i) in committeesIntro"
          :key="i"
        >
          {{ p }}
        </p>
      </div>

      <div class="space-y-6">
        <article
          v-for="c in committees"
          :id="c.slug"
          :key="c.slug"
          class="scroll-mt-28 border-t border-volga-900/10 pt-8 dark:border-white/10"
        >
          <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span class="font-display text-sm font-semibold tracking-wide text-ember-700 dark:text-ember-300">
              {{ c.abbr }}
            </span>
            <h2 class="font-display text-2xl font-semibold tracking-tight nn-ink">
              {{ c.name }}
            </h2>
          </div>
          <p
            v-if="c.meetings"
            class="mt-3 text-sm font-medium text-volga-600 dark:text-volga-300"
          >
            {{ c.meetings }}
          </p>
          <div class="mt-4 max-w-3xl space-y-3 leading-relaxed text-volga-700 dark:text-volga-300">
            <p
              v-for="(p, i) in c.text"
              :key="i"
            >
              {{ p }}
            </p>
          </div>
        </article>
      </div>

      <section class="border-t border-volga-900/10 pt-10 dark:border-white/10">
        <h2 class="font-display text-2xl font-semibold tracking-tight nn-ink">
          Служения в структуре МКО
        </h2>
        <p class="mt-3 max-w-2xl text-volga-600 dark:text-volga-300">
          Краткие роли — чтобы было понятно, кто за что отвечает. Актуальные свободные служения уточняй на рабочих собраниях комитетов.
        </p>
        <ul class="mt-8 grid gap-6 sm:grid-cols-2">
          <li
            v-for="role in committeeRoles"
            :key="role.title"
          >
            <h3 class="font-display text-lg font-semibold tracking-tight nn-ink">
              {{ role.title }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-volga-700 dark:text-volga-300">
              {{ role.text }}
            </p>
          </li>
        </ul>
      </section>
    </UContainer>
  </div>
</template>
