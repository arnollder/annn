<script setup lang="ts">
import type { DayKey, Group } from '~/data/groups'
import { dayLabels, dayOrder } from '~/data/groups'

defineProps<{
  group: Group
  highlightDay?: DayKey | null
}>()
</script>

<template>
  <div
    class="flex gap-0.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:overflow-visible"
    role="list"
    aria-label="Расписание по дням"
  >
    <div
      v-for="day in dayOrder"
      :key="day"
      role="listitem"
      class="min-w-[2.6rem] flex-1 px-1 py-1.5 text-center sm:min-w-10"
      :class="group.schedule[day]
        ? (highlightDay === day
          ? 'rounded-md bg-ember-600 text-white'
          : 'rounded-md bg-volga-950/[0.04] text-volga-900 dark:bg-white/[0.07] dark:text-volga-100')
        : 'text-volga-400/55'"
    >
      <div class="text-[10px] font-medium uppercase tracking-[0.12em] opacity-75">
        {{ dayLabels[day] }}
      </div>
      <div class="mt-0.5 text-xs font-semibold tabular-nums leading-none">
        {{ group.schedule[day] || '·' }}
      </div>
    </div>
  </div>
</template>
