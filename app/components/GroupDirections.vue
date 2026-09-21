<script setup lang="ts">
import type { Group } from '~/data/groups'

const props = defineProps<{
  group: Group
}>()

const mapSrc = computed(() => {
  if (props.group.mapEmbed) {
    return props.group.mapEmbed
  }
  if (!props.group.address) {
    return null
  }
  const q = encodeURIComponent(props.group.address)
  return `https://yandex.ru/map-widget/v1/?text=${q}&z=16`
})

const yandexMapsUrl = computed(() => {
  if (!props.group.address) {
    return null
  }
  return `https://yandex.ru/maps/?text=${encodeURIComponent(props.group.address)}`
})

const twoGisUrl = computed(() => {
  if (!props.group.address) {
    return null
  }
  return `https://2gis.ru/search/${encodeURIComponent(props.group.address)}`
})

const photos = computed(() => props.group.photos?.filter(Boolean) ?? [])

const showBlock = computed(() =>
  Boolean(
    props.group.howToFind
    || props.group.address
    || props.group.mapEmbed
    || photos.value.length
  )
)
</script>

<template>
  <div
    v-if="showBlock"
    class="space-y-5"
  >
    <h2 class="font-display text-xl font-semibold tracking-tight">
      Как пройти на группу
    </h2>

    <p
      v-if="group.howToFind"
      class="leading-relaxed text-volga-700 dark:text-volga-300"
    >
      {{ group.howToFind }}
    </p>

    <div
      v-if="mapSrc"
      class="overflow-hidden rounded-xl border border-volga-900/10 dark:border-white/10"
    >
      <iframe
        :src="mapSrc"
        class="block h-64 w-full bg-volga-100 dark:bg-volga-900 sm:h-72"
        title="Карта"
        loading="lazy"
        allowfullscreen
        referrerpolicy="no-referrer-when-downgrade"
      />
      <div class="flex flex-wrap gap-x-4 gap-y-2 border-t border-volga-900/10 bg-white/60 px-3 py-2.5 text-sm dark:border-white/10 dark:bg-volga-950/40">
        <a
          v-if="yandexMapsUrl"
          :href="yandexMapsUrl"
          target="_blank"
          rel="noopener"
          class="nn-link-line font-medium text-ember-700 dark:text-ember-300"
        >
          Яндекс.Карты →
        </a>
        <a
          v-if="twoGisUrl"
          :href="twoGisUrl"
          target="_blank"
          rel="noopener"
          class="nn-link-line font-medium text-volga-600 dark:text-volga-300"
        >
          2ГИС →
        </a>
      </div>
    </div>

    <div
      v-if="photos.length"
      class="grid gap-2 sm:grid-cols-2"
    >
      <a
        v-for="(src, i) in photos"
        :key="src"
        :href="src"
        target="_blank"
        rel="noopener"
        class="group relative block overflow-hidden rounded-xl border border-volga-900/10 bg-volga-100 dark:border-white/10 dark:bg-volga-900"
      >
        <span
          class="pointer-events-none absolute left-2 top-2 z-10 flex size-7 items-center justify-center rounded-md bg-volga-950/80 font-display text-sm font-semibold tabular-nums text-white shadow-sm backdrop-blur-sm dark:bg-black/70"
          aria-hidden="true"
        >
          {{ i + 1 }}
        </span>
        <img
          :src="src"
          :alt="`Как пройти: шаг ${i + 1}`"
          class="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        >
      </a>
    </div>
  </div>
</template>
