<script setup lang="ts">
import type { DayKey, Group } from '~/data/groups'
import { dayLabels, dayOrder, groups } from '~/data/groups'

const today = computed<DayKey>(() => {
  const map: DayKey[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
  return map[new Date().getDay()]!
})

const rowCount = groups.length

function label(group: Group) {
  if (group.online) return group.name
  if (group.city === 'Нижний Новгород') return group.name
  return `${group.name} (${group.city})`
}

function mobileLabel(group: Group) {
  return group.name
}
</script>

<template>
  <div
    class="nn-week flex w-full max-w-full flex-col lg:w-fit"
    :style="{ '--nn-week-rows': rowCount }"
  >
    <div class="flex shrink-0 items-baseline justify-between gap-3 px-0.5 pb-2 pt-1 sm:px-2">
      <h2 class="font-display nn-ink text-base font-semibold tracking-tight sm:text-lg">
        Расписание групп
      </h2>
      <NuxtLink
        to="/groups"
        class="nn-link-line shrink-0 text-xs font-medium text-volga-600 dark:text-volga-300"
      >
        Подробнее →
      </NuxtLink>
    </div>

    <div class="nn-week-frame w-full overflow-x-auto rounded-xl border border-volga-900/12 bg-white/70 shadow-sm dark:border-white/10 dark:bg-volga-950/40">
      <table class="nn-week-table w-full border-collapse text-left lg:w-max">
        <thead>
          <tr>
            <th class="nn-week-name sticky left-0 z-20 bg-[#f4f7f9] text-center text-[0.7em] font-semibold uppercase tracking-[0.08em] text-volga-500 dark:bg-volga-950 dark:text-volga-400">
              Группы
            </th>
            <th
              v-for="day in dayOrder"
              :key="day"
              class="nn-week-day text-center text-[0.85em] font-semibold tracking-wide"
              :class="day === today
                ? 'bg-ember-600 text-white'
                : 'bg-[#f4f7f9] text-volga-600 dark:bg-volga-950 dark:text-volga-300'"
            >
              {{ dayLabels[day] }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(group, i) in groups"
            :key="group.slug"
            class="nn-week-row"
            :class="i % 2 === 0 ? 'nn-week-odd' : 'nn-week-even'"
          >
            <th
              class="nn-week-name sticky left-0 z-10 text-left font-medium"
              :class="i % 2 === 0 ? 'nn-week-odd-sticky' : 'nn-week-even-sticky'"
            >
              <NuxtLink
                :to="`/groups/${group.slug}`"
                class="nn-ink block truncate hover:text-ember-700 dark:hover:text-ember-300"
                :title="label(group)"
              >
                <span class="lg:hidden">{{ mobileLabel(group) }}</span>
                <span class="hidden lg:inline">{{ label(group) }}</span>
              </NuxtLink>
            </th>
            <td
              v-for="day in dayOrder"
              :key="day"
              class="nn-week-cell text-center tabular-nums"
              :class="day === today ? 'bg-ember-500/12 dark:bg-ember-500/20' : ''"
            >
              <NuxtLink
                v-if="group.schedule[day]"
                :to="`/groups/${group.slug}`"
                class="nn-week-time inline-block font-semibold leading-none tracking-tight"
                :class="day === today
                  ? 'rounded bg-ember-600 px-0.5 text-white'
                  : 'nn-ink'"
              >
                {{ group.schedule[day] }}
              </NuxtLink>
              <span
                v-else
                class="text-volga-400/50 dark:text-volga-500/45"
              >·</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.nn-week-table {
  table-layout: fixed;
  font-variant-numeric: tabular-nums;
  /* мобилка: читаемый размер, высота по контенту */
  font-size: 12.5px;
  line-height: 1.2;
}

.nn-week-table thead th {
  padding: 0.45em 0.2em;
  vertical-align: middle;
  white-space: nowrap;
  border-bottom: 1px solid rgb(26 37 44 / 0.12);
}

.dark .nn-week-table thead th {
  border-bottom-color: rgb(255 255 255 / 0.12);
}

.nn-week-table tbody th,
.nn-week-table tbody td {
  padding: 0.4em 0.15em;
  vertical-align: middle;
  white-space: nowrap;
  border-bottom: 1px solid rgb(26 37 44 / 0.07);
}

.dark .nn-week-table tbody th,
.dark .nn-week-table tbody td {
  border-bottom-color: rgb(255 255 255 / 0.07);
}

.nn-week-table tbody tr:last-child th,
.nn-week-table tbody tr:last-child td {
  border-bottom: 0;
}

.nn-week-name {
  width: 34%;
  min-width: 6.5rem;
  max-width: 9.5rem;
  padding-left: 0.5em !important;
  padding-right: 0.35em !important;
}

.nn-week-day,
.nn-week-cell {
  width: calc(66% / 7);
  min-width: 2.4rem;
}

.nn-week-time {
  letter-spacing: -0.02em;
  font-size: 1em;
}

/* ПК: компактная таблица, без принудительной высоты экрана */
@media (min-width: 1024px) {
  .nn-week-table {
    font-size: 12px;
    line-height: 1.1;
  }

  .nn-week-table thead th {
    padding: 0.35em 0.35em;
  }

  .nn-week-table tbody th,
  .nn-week-table tbody td {
    padding: 0.28em 0.35em;
  }

  .nn-week-name {
    width: 13.5rem;
    min-width: 13.5rem;
    max-width: 13.5rem;
  }

  .nn-week-day,
  .nn-week-cell {
    width: 2.9rem;
    min-width: 2.9rem;
    max-width: 2.9rem;
  }
}

.nn-week-odd {
  background: rgb(26 37 44 / 0.035);
}

.dark .nn-week-odd {
  background: rgb(255 255 255 / 0.035);
}

.nn-week-even-sticky {
  background: rgb(255 255 255 / 0.95);
}

.nn-week-odd-sticky {
  background: #eef2f5;
}

.dark .nn-week-even-sticky {
  background: rgb(20 28 34 / 0.97);
}

.dark .nn-week-odd-sticky {
  background: rgb(26 35 42 / 0.98);
}
</style>
