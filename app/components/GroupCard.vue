<script setup lang="ts">
import type { Group } from '~/data/groups'

defineProps<{
  group: Group
}>()
</script>

<template>
  <NuxtLink
    :to="`/groups/${group.slug}`"
    class="group block border-b border-volga-900/10 py-6 transition first:pt-0 hover:bg-white/40 dark:border-white/10 dark:hover:bg-white/5 sm:px-2"
  >
    <div class="flex items-start justify-between gap-4">
      <div class="min-w-0">
        <h3 class="font-display text-xl font-semibold tracking-tight nn-ink transition group-hover:text-ember-700 dark:group-hover:text-ember-300">
          {{ group.name }}
        </h3>
        <p class="mt-1 text-sm text-volga-600 dark:text-volga-300">
          <template v-if="group.online">Online</template>
          <template v-else>{{ group.city }}</template>
          <template v-if="group.address">
            <span class="text-volga-400"> · </span>{{ group.address }}
          </template>
        </p>
      </div>
      <UIcon
        name="i-lucide-arrow-up-right"
        class="mt-1 size-4 shrink-0 text-volga-400 transition group-hover:text-ember-600"
      />
    </div>
    <div class="mt-4">
      <ScheduleStrip :group="group" />
    </div>
  </NuxtLink>
</template>
