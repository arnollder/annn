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
  { label: 'Все', value: 'all' as const },
  ...dayOrder.map(d => ({
    label: d === today ? `${dayLabels[d]}*` : dayLabels[d],
    value: d
  }))
]

const placeItems = [
  { label: 'Везде', value: 'all' as const },
  { label: 'Город', value: 'city' as const },
  { label: 'Область', value: 'oblast' as const },
  { label: 'Online', value: 'online' as const }
]

function resetFilters() {
  q.value = ''
  dayFilter.value = 'all'
  placeFilter.value = 'all'
}
</script>

<template>
  <div>
    <section class="relative overflow-hidden border-b border-volga-900/10 dark:border-white/10">
      <div class="nn-hero-sky absolute inset-0 opacity-40" />
      <UContainer class="relative py-12 sm:py-16">
        <p class="text-[12px] font-semibold uppercase tracking-[0.22em] text-ember-700">
          {{ groups.length }} групп · Нижний и область
        </p>
        <h1 class="font-display nn-ink mt-3 max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Группы и расписание
        </h1>
        <p class="mt-4 max-w-xl text-lg leading-relaxed nn-ink-soft">
          Адрес и как пройти — на странице группы. Фильтруй по дню или месту.
        </p>

        <div class="mt-8 max-w-xl">
          <UInput
            v-model="q"
            icon="i-lucide-search"
            placeholder="Название, город, улица…"
            size="lg"
            class="w-full"
          />
        </div>

        <div class="mt-6 space-y-4">
          <div>
            <p class="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-volga-500">
              День
            </p>
            <div class="flex flex-wrap gap-x-1 gap-y-1">
              <button
                v-for="item in dayItems"
                :key="item.value"
                type="button"
                class="rounded-md px-2.5 py-1.5 text-sm font-medium transition"
                :class="dayFilter === item.value
                  ? 'bg-ember-600 text-white'
                  : 'text-volga-600 hover:bg-volga-900/5 hover:text-volga-900 dark:text-volga-300 dark:hover:bg-white/5 dark:hover:text-white'"
                @click="dayFilter = item.value"
              >
                {{ item.label }}
              </button>
            </div>
          </div>

          <div>
            <p class="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-volga-500">
              Место
            </p>
            <div class="flex flex-wrap gap-x-1 gap-y-1">
              <button
                v-for="item in placeItems"
                :key="item.value"
                type="button"
                class="rounded-md px-2.5 py-1.5 text-sm font-medium transition"
                :class="placeFilter === item.value
                  ? 'bg-volga-900 text-white dark:bg-white dark:text-volga-950'
                  : 'text-volga-600 hover:bg-volga-900/5 hover:text-volga-900 dark:text-volga-300 dark:hover:bg-white/5 dark:hover:text-white'"
                @click="placeFilter = item.value"
              >
                {{ item.label }}
              </button>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <UContainer class="py-8 sm:py-10">
      <p class="mb-5 text-sm text-volga-500">
        <template v-if="filtered.length === groups.length">
          Все {{ groups.length }} групп
        </template>
        <template v-else>
          Найдено {{ filtered.length }} из {{ groups.length }}
        </template>
      </p>

      <div
        v-if="filtered.length"
        class="mx-auto max-w-3xl"
      >
        <GroupCard
          v-for="group in filtered"
          :key="group.slug"
          :group="group"
          :highlight-day="dayFilter === 'all' ? today : dayFilter"
        />
      </div>

      <div
        v-else
        class="border-y border-dashed border-volga-900/15 py-16 text-center"
      >
        <p class="text-volga-600 dark:text-volga-300">
          Ничего не нашлось. Сбрось фильтры или позвони на инфолинию.
        </p>
        <UButton
          class="mt-4"
          label="Сбросить"
          variant="soft"
          @click="resetFilters"
        />
      </div>
    </UContainer>
  </div>
</template>
