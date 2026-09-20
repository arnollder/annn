<script setup lang="ts">
import { site } from '~/data/site'

defineProps<{
  compact?: boolean
}>()
</script>

<template>
  <div
    class="flex flex-wrap items-center gap-x-5 gap-y-2"
    :class="compact ? 'text-[13px]' : 'text-sm'"
  >
    <a
      :href="site.phone.href"
      class="nn-link-line inline-flex items-center gap-2 font-medium"
    >
      <UIcon
        name="i-lucide-phone"
        class="size-3.5 text-ember-600"
      />
      <span>{{ site.phone.display }}</span>
      <span class="font-normal opacity-60">{{ site.phone.hours }}</span>
    </a>
    <a
      :href="site.hotline.href"
      class="nn-link-line inline-flex items-center gap-2 font-medium"
    >
      <UIcon
        name="i-lucide-headset"
        class="size-3.5 text-volga-500"
      />
      <span>{{ site.hotline.display }}</span>
      <span class="font-normal opacity-60">{{ site.hotline.hours }}</span>
    </a>
  </div>
</template>
