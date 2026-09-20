<script setup lang="ts">
import { site } from '~/data/site'

useSeoMeta({
  title: 'Проект «Феникс»',
  description: 'Помощь в посещении собраний АН зависимым с ограниченными возможностями в Нижнем Новгороде.'
})
</script>

<template>
  <div>
    <section class="border-b border-volga-900/10 py-14 dark:border-white/10">
      <UContainer>
        <p class="text-[12px] font-semibold uppercase tracking-[0.22em] nn-ink-soft">
          Доступность
        </p>
        <h1 class="font-display nn-ink mt-3 max-w-[14ch] text-4xl font-semibold tracking-tight sm:text-5xl">
          Проект «Феникс»
        </h1>
        <p class="mt-5 max-w-2xl text-lg leading-relaxed nn-ink-soft">
          Мы оказываем помощь в посещении собраний АН зависимым с ограниченными возможностями.
        </p>
      </UContainer>
    </section>

    <UContainer class="py-14">
      <div class="mx-auto max-w-2xl space-y-8 text-lg leading-relaxed text-volga-700 dark:text-volga-300">
        <p>
          Группа «АНтей» — пока единственная группа на местности, которую можно посетить
          зависимым с ограниченными возможностями.
        </p>
        <p class="font-medium nn-ink">
          Если нужна помощь добраться или сориентироваться — напиши или позвони.
        </p>

        <div class="space-y-4 border-t border-volga-900/10 pt-8 dark:border-white/10">
          <p class="text-[12px] font-semibold uppercase tracking-[0.2em] text-ember-700 dark:text-ember-300">
            Связь
          </p>
          <a
            :href="site.phone.href"
            class="nn-link-line nn-ink block text-xl font-semibold"
          >
            {{ site.phone.display }}
            <span class="mt-1 block text-sm font-normal nn-ink-soft">телефон и WhatsApp</span>
          </a>
          <a
            :href="site.feniks.email"
            class="nn-link-line nn-ink block text-xl font-semibold"
          >
            {{ site.feniks.emailDisplay }}
          </a>
        </div>

        <div class="flex flex-wrap gap-3 pt-2">
          <UButton
            to="/groups/antey"
            size="lg"
            label="Группа «АНтей»"
          />
          <UButton
            to="/groups"
            size="lg"
            color="neutral"
            variant="outline"
            label="Все группы"
          />
        </div>
      </div>
    </UContainer>
  </div>
</template>
