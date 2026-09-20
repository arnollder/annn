<script setup lang="ts">
import type { DayKey, Group } from '~/data/groups'
import { dayLabels, dayOrder } from '~/data/groups'

defineProps<{
  group: Group
  highlightDay?: DayKey | null
}>()
</script>

<template>
  <div class="flex flex-wrap gap-1">
    <div
      v-for="day in dayOrder"
      :key="day"
      class="min-w-10 px-1.5 py-1 text-center"
      :class="group.schedule[day]
        ? (highlightDay === day
          ? 'bg-ember-600 text-white'
          : 'bg-volga-950/5 text-volga-900 dark:bg-white/10 dark:text-volga-100')
        : 'text-volga-400/70'"
    >
      <div class="text-[10px] font-medium uppercase tracking-wider opacity-70">
        {{ dayLabels[day] }}
      </div>
      <div class="text-xs font-semibold tabular-nums">
        {{ group.schedule[day] || '·' }}
      </div>
    </div>
  </div>
</template>
