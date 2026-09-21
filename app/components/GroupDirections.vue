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

const active = ref(0)

watch(photos, () => {
  active.value = 0
})

const activeSrc = computed(() => photos.value[active.value] || null)

function selectPhoto(i: number) {
  active.value = i
}

function step(delta: number) {
  const n = photos.value.length
  if (!n) {
    return
  }
  active.value = (active.value + delta + n) % n
}

const showBlock = computed(() =>
  Boolean(
    props.group.howToFind
    || props.group.address
    || props.group.mapEmbed
    || photos.value.length
  )
)

const showMediaRow = computed(() => Boolean(mapSrc.value || photos.value.length))
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
      v-if="showMediaRow"
      class="grid gap-4 lg:grid-cols-5 lg:items-stretch lg:gap-12"
    >
      <!-- карта: ширина как инфолиния, высота = весь блок галереи -->
      <div
        v-if="mapSrc"
        class="flex min-w-0 flex-col lg:col-span-2"
      >
        <div class="flex h-full min-h-64 flex-col overflow-hidden rounded-xl border border-volga-900/10 dark:border-white/10 sm:min-h-72">
          <iframe
            :src="mapSrc"
            class="block min-h-64 w-full flex-1 bg-volga-100 dark:bg-volga-900 sm:min-h-72"
            title="Карта"
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
          />
          <div class="flex shrink-0 flex-wrap gap-x-4 gap-y-2 border-t border-volga-900/10 bg-white/60 px-3 py-2.5 text-sm dark:border-white/10 dark:bg-volga-950/40">
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
      </div>

      <!-- галерея: крупный кадр + нумерованные превью -->
      <div
        v-if="photos.length && activeSrc"
        class="flex min-w-0 flex-col gap-3"
        :class="mapSrc ? 'lg:col-span-3' : 'lg:col-span-5'"
      >
        <div class="relative overflow-hidden rounded-xl border border-volga-900/10 bg-volga-100 dark:border-white/10 dark:bg-volga-900">
          <a
            :href="activeSrc"
            target="_blank"
            rel="noopener"
            class="relative block cursor-pointer"
          >
            <img
              :src="activeSrc"
              :alt="`Как пройти: шаг ${active + 1}`"
              class="aspect-[16/10] h-64 w-full object-cover sm:h-72 sm:aspect-auto"
              loading="lazy"
            >
            <span
              class="pointer-events-none absolute left-3 top-3 flex items-center gap-2 rounded-lg bg-volga-950/75 px-2.5 py-1.5 font-display text-sm font-semibold text-white backdrop-blur-sm"
            >
              <span class="tabular-nums">{{ active + 1 }}</span>
              <span class="text-white/50">/</span>
              <span class="tabular-nums text-white/70">{{ photos.length }}</span>
            </span>
          </a>

          <template v-if="photos.length > 1">
            <button
              type="button"
              class="absolute left-2 top-1/2 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-volga-950/55 text-white backdrop-blur-sm transition hover:bg-volga-950/80"
              aria-label="Предыдущее фото"
              @click="step(-1)"
            >
              <UIcon
                name="i-lucide-chevron-left"
                class="size-5"
              />
            </button>
            <button
              type="button"
              class="absolute right-2 top-1/2 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-volga-950/55 text-white backdrop-blur-sm transition hover:bg-volga-950/80"
              aria-label="Следующее фото"
              @click="step(1)"
            >
              <UIcon
                name="i-lucide-chevron-right"
                class="size-5"
              />
            </button>
          </template>
        </div>

        <div
          v-if="photos.length > 1"
          class="flex gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <button
            v-for="(src, i) in photos"
            :key="src"
            type="button"
            class="relative h-16 w-20 shrink-0 cursor-pointer overflow-hidden rounded-lg border transition sm:h-[4.25rem] sm:w-[5.5rem]"
            :class="i === active
              ? 'border-ember-500 ring-2 ring-ember-500/35'
              : 'border-volga-900/10 opacity-75 hover:opacity-100 dark:border-white/10'"
            :aria-label="`Шаг ${i + 1}`"
            :aria-current="i === active ? 'true' : undefined"
            @click="selectPhoto(i)"
          >
            <img
              :src="src"
              alt=""
              class="h-full w-full object-cover"
              loading="lazy"
            >
            <span
              class="absolute left-1 top-1 flex size-5 items-center justify-center rounded bg-volga-950/75 font-display text-[10px] font-semibold tabular-nums text-white"
            >
              {{ i + 1 }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
