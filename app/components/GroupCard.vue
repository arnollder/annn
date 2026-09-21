<script setup lang="ts">
import type { DayKey, Group } from '~/data/groups'
import { dayLabels, dayOrder } from '~/data/groups'

const props = defineProps<{
  group: Group
  highlightDay?: DayKey | null
}>()

const map: DayKey[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
const today = computed(() => props.highlightDay ?? map[new Date().getDay()]!)

const meetingCount = computed(() =>
  dayOrder.filter(d => props.group.schedule[d]).length
)

const placeLine = computed(() => {
  if (props.group.online) return 'Online'
  return props.group.city
})

const thumb = computed(() => props.group.photos?.[0])
</script>

<template>
  <NuxtLink
    :to="`/groups/${group.slug}`"
    class="group relative flex gap-4 border-b border-volga-900/10 py-6 transition first:pt-1 last:border-b-0 hover:bg-white/35 dark:border-white/10 dark:hover:bg-white/[0.03] sm:gap-5 sm:px-1"
  >
    <div
      v-if="thumb"
      class="relative hidden size-[4.5rem] shrink-0 overflow-hidden rounded-lg sm:block sm:size-20"
    >
      <img
        :src="thumb"
        :alt="group.name"
        class="size-full object-cover transition duration-500 group-hover:scale-[1.04]"
        loading="lazy"
      >
    </div>

    <div class="min-w-0 flex-1">
      <div class="flex items-start justify-between gap-3">
        <div class="min-w-0">
          <p class="text-[11px] font-semibold uppercase tracking-[0.16em] text-volga-500">
            {{ placeLine }}
            <span
              v-if="meetingCount"
              class="text-volga-400"
            > · {{ meetingCount }} {{ meetingCount === 1 ? 'день' : meetingCount < 5 ? 'дня' : 'дней' }}</span>
          </p>
          <h3 class="font-display mt-1.5 text-xl font-semibold tracking-tight nn-ink transition group-hover:text-ember-700 dark:group-hover:text-ember-300 sm:text-[1.35rem]">
            {{ group.name }}
          </h3>
          <p
            v-if="group.address"
            class="mt-1.5 line-clamp-2 text-sm leading-snug text-volga-600 dark:text-volga-300"
          >
            {{ group.address }}
          </p>
        </div>
        <UIcon
          name="i-lucide-arrow-up-right"
          class="mt-1 size-4 shrink-0 text-volga-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ember-600"
        />
      </div>

      <div class="mt-4">
        <ScheduleStrip
          :group="group"
          :highlight-day="today"
        />
      </div>
    </div>
  </NuxtLink>
</template>
