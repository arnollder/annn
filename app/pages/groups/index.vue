<script setup lang="ts">
import type { DayKey } from '~/data/groups'
import { dayLabels, dayOrder, groups } from '~/data/groups'

useSeoMeta({
  title: 'Группы и расписание',
  description: 'Расписание собраний групп Анонимных Наркоманов в Нижнем Новгороде и области.'
})

const q = ref('')
const dayFilter = ref<DayKey | 'all'>('all')
const placeFilter = ref<'all' | 'city' | 'oblast' | 'online'>('all')

const map: DayKey[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
const today = map[new Date().getDay()]!

const filtered = computed(() => {
  const query = q.value.trim().toLowerCase()
  return groups.filter((g) => {
    if (dayFilter.value !== 'all' && !g.schedule[dayFilter.value]) return false
    if (placeFilter.value === 'online' && !g.online) return false
    if (placeFilter.value === 'city' && (g.online || g.city !== 'Нижний Новгород')) return false
    if (placeFilter.value === 'oblast' && (g.online || g.city === 'Нижний Новгород' || g.city === 'Online')) return false
    if (!query) return true
    return [g.name, g.city, g.address || ''].join(' ').toLowerCase().includes(query)
  })
})

const dayItems = [
  { label: 'Все дни', value: 'all' as const },
  ...dayOrder.map(d => ({
    label: d === today ? `${dayLabels[d]} · сегодня` : dayLabels[d],
    value: d
  }))
]

const placeItems = [
  { label: 'Везде', value: 'all' as const },
  { label: 'Город', value: 'city' as const },
  { label: 'Область', value: 'oblast' as const },
  { label: 'Online', value: 'online' as const }
]
</script>

<template>
  <div>
    <section class="border-b border-volga-900/10 py-14 dark:border-white/10">
      <UContainer>
        <p class="text-[12px] font-semibold uppercase tracking-[0.22em] text-ember-700">
          {{ groups.length }} групп · Нижний и область
        </p>
        <h1 class="font-display nn-ink mt-3 max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Группы и расписание
        </h1>
        <p class="mt-4 max-w-xl text-lg text-volga-700 dark:text-volga-300">
          Адрес и как пройти — на странице группы. Фильтруй по дню или городу.
        </p>

        <div class="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center">
          <UInput
            v-model="q"
            icon="i-lucide-search"
            placeholder="Название, город, улица…"
            size="lg"
            class="w-full lg:max-w-sm"
          />
          <USelect
            v-model="dayFilter"
            :items="dayItems"
            value-key="value"
            size="lg"
            class="w-full lg:w-48"
          />
          <USelect
            v-model="placeFilter"
            :items="placeItems"
            value-key="value"
            size="lg"
            class="w-full lg:w-44"
          />
        </div>
      </UContainer>
    </section>

    <UContainer class="py-6 sm:py-8">
      <p class="mb-2 text-sm text-volga-500">
        Найдено: {{ filtered.length }}
      </p>
      <div class="max-w-3xl">
        <GroupCard
          v-for="group in filtered"
          :key="group.slug"
          :group="group"
        />
      </div>
      <div
        v-if="!filtered.length"
        class="border-y border-dashed border-volga-900/15 py-16 text-center"
      >
        <p class="text-volga-600">
          Ничего не нашлось. Сбрось фильтры или позвони на инфолинию.
        </p>
        <UButton
          class="mt-4"
          label="Сбросить"
          variant="soft"
          @click="q = ''; dayFilter = 'all'; placeFilter = 'all'"
        />
      </div>
    </UContainer>
  </div>
</template>
