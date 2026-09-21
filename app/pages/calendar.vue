<script setup lang="ts">
import type { EventItem } from '~/data/events'
import {
  addDays,
  startOfWeek,
  toIsoDate,
  weekDays,
  weekRangeLabel
} from '~/data/events'
import { getGroup } from '~/data/groups'

useSeoMeta({
  title: 'Календарь мероприятий',
  description: 'События сообщества Анонимные Наркоманы в Нижнем Новгороде — по неделям.'
})

const weekOffset = ref(0)

const weekStart = computed(() =>
  addDays(startOfWeek(new Date()), weekOffset.value * 7)
)

const days = computed(() => weekDays(weekStart.value))

const rangeLabel = computed(() => weekRangeLabel(weekStart.value))

const todayIso = toIsoDate(new Date())

const weekKey = computed(() => toIsoDate(weekStart.value))

const flyerOpen = ref(false)
const activeEvent = ref<EventItem | null>(null)

function prevWeek() {
  weekOffset.value -= 1
}

function nextWeek() {
  weekOffset.value += 1
}

function goToday() {
  weekOffset.value = 0
}

function openFlyer(event: EventItem) {
  if (!event.flyer) return
  activeEvent.value = event
  flyerOpen.value = true
}

function onFlyerOpenChange(open: boolean) {
  flyerOpen.value = open
  if (!open) activeEvent.value = null
}
</script>

<template>
  <div>
    <section class="relative overflow-hidden border-b border-volga-900/10 dark:border-white/10">
      <div class="nn-hero-sky absolute inset-0 opacity-40" />
      <UContainer class="relative py-12 sm:py-16">
        <p class="text-[12px] font-semibold uppercase tracking-[0.22em] text-ember-700">
          Сообщество
        </p>
        <div class="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 class="font-display nn-ink text-4xl font-semibold tracking-tight sm:text-5xl">
              Календарь
            </h1>
            <p class="mt-3 max-w-md text-base leading-relaxed nn-ink-soft sm:text-lg">
              Неделя целиком. Нажми на событие — откроется флаер.
            </p>
          </div>
          <UButton
            v-if="weekOffset !== 0"
            label="К этой неделе"
            color="neutral"
            variant="outline"
            class="nn-surface border-current/15"
            @click="goToday"
          />
        </div>
      </UContainer>
    </section>

    <UContainer class="py-8 sm:py-12">
      <!-- Переключатель недели: сверху, ровно на любой ширине -->
      <div class="mb-8 flex items-center justify-between gap-3 sm:mb-10 sm:justify-center sm:gap-6">
        <button
          type="button"
          class="flex size-11 shrink-0 items-center justify-center rounded-full text-volga-600 transition hover:bg-volga-900/5 hover:text-ember-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-500/40 dark:text-volga-300 dark:hover:bg-white/5 dark:hover:text-ember-300"
          aria-label="Предыдущая неделя"
          @click="prevWeek"
        >
          <UIcon
            name="i-lucide-chevron-left"
            class="size-6"
          />
        </button>

        <p
          :key="weekKey"
          class="nn-rise min-w-0 flex-1 text-center font-display text-sm font-semibold tracking-tight nn-ink sm:flex-none sm:text-lg"
        >
          {{ rangeLabel }}
        </p>

        <button
          type="button"
          class="flex size-11 shrink-0 items-center justify-center rounded-full text-volga-600 transition hover:bg-volga-900/5 hover:text-ember-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-500/40 dark:text-volga-300 dark:hover:bg-white/5 dark:hover:text-ember-300"
          aria-label="Следующая неделя"
          @click="nextWeek"
        >
          <UIcon
            name="i-lucide-chevron-right"
            class="size-6"
          />
        </button>
      </div>

      <!--
        mobile: вертикальный список (дата слева / события справа)
        lg+: горизонтальная неделя
      -->
      <ol
        :key="weekKey"
        class="nn-rise divide-y divide-volga-900/10 dark:divide-white/10 lg:grid lg:grid-cols-7 lg:divide-x lg:divide-y-0"
      >
        <li
          v-for="day in days"
          :key="day.iso"
          class="relative flex gap-4 py-5 first:pt-0 last:pb-0 lg:flex-col lg:gap-0 lg:px-2.5 lg:py-0 xl:px-3"
          :class="day.iso === todayIso ? 'nn-cal-today pl-3 lg:pl-2.5 xl:pl-3' : ''"
        >
          <header class="w-[6.75rem] shrink-0 pt-0.5 lg:w-auto lg:pb-4 lg:pt-3 lg:text-center">
            <p
              class="font-display text-[11px] font-semibold uppercase tracking-[0.14em]"
              :class="day.iso === todayIso
                ? 'text-ember-700 dark:text-ember-300'
                : 'text-volga-500'"
            >
              {{ day.weekday }}
            </p>
            <time
              :datetime="day.iso"
              class="mt-1.5 block font-display text-base font-semibold leading-none tracking-tight tabular-nums nn-ink lg:mt-2.5 lg:text-[0.95rem]"
            >
              {{ day.dateLabel }}
            </time>
          </header>

          <div class="min-w-0 flex-1 lg:text-center">
            <ul
              v-if="day.events.length"
              class="space-y-4 lg:pb-4"
            >
              <li
                v-for="event in day.events"
                :key="event.id"
              >
                <p class="text-[11px] font-semibold tabular-nums text-ember-700 dark:text-ember-300">
                  {{ event.start }}–{{ event.end }}
                </p>

                <button
                  v-if="event.flyer"
                  type="button"
                  class="group mt-1 w-full cursor-pointer text-left lg:text-center"
                  @click="openFlyer(event)"
                >
                  <h3 class="font-display text-[15px] font-semibold leading-snug tracking-tight nn-ink transition group-hover:text-ember-700 dark:group-hover:text-ember-300 lg:text-[13px]">
                    {{ event.title }}
                  </h3>
                  <span class="mt-1 block text-[11px] font-medium text-ember-700 dark:text-ember-300">
                    Открыть флаер
                  </span>
                </button>
                <h3
                  v-else
                  class="font-display mt-1 text-[15px] font-semibold leading-snug tracking-tight nn-ink lg:text-[13px]"
                >
                  {{ event.title }}
                </h3>

                <NuxtLink
                  v-if="event.group && getGroup(event.group)"
                  :to="`/groups/${event.group}`"
                  class="mt-1 inline-block text-sm leading-snug text-volga-500 transition hover:text-ember-700 dark:hover:text-ember-300 lg:text-[11px]"
                >
                  {{ getGroup(event.group)?.name }}
                </NuxtLink>
              </li>
            </ul>

            <p
              v-else
              class="pt-1 text-sm text-volga-400 lg:pt-2 lg:text-xs lg:text-volga-400/80"
            >
              Нет событий
            </p>
          </div>
        </li>
      </ol>
    </UContainer>

    <UModal
      :open="flyerOpen"
      :ui="{
        overlay: 'bg-volga-950/35 backdrop-blur-xl dark:bg-black/50',
        content: 'w-[min(96vw,32rem)] max-w-none bg-transparent p-0 shadow-none ring-0 divide-y-0 sm:w-auto sm:max-w-[min(92vw,28rem)]'
      }"
      :close="false"
      @update:open="onFlyerOpenChange"
    >
      <template #content>
        <div
          v-if="activeEvent?.flyer"
          class="relative outline-none"
        >
          <img
            :src="activeEvent.flyer"
            :alt="activeEvent.title"
            class="h-auto w-full max-h-[min(88dvh,960px)] rounded-xl object-contain shadow-[0_24px_80px_-20px_rgb(0_0_0_/0.55)]"
          >
          <div class="mt-3 text-center">
            <p class="font-display text-sm font-medium text-white/90 drop-shadow">
              {{ activeEvent.title }}
            </p>
            <NuxtLink
              v-if="activeEvent.group && getGroup(activeEvent.group)"
              :to="`/groups/${activeEvent.group}`"
              class="mt-1.5 inline-block text-sm text-ember-200 transition hover:text-white"
              @click="onFlyerOpenChange(false)"
            >
              Группа «{{ getGroup(activeEvent.group)?.name }}»
            </NuxtLink>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>

<style scoped>
.nn-cal-today::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.35rem;
  bottom: 0.35rem;
  width: 2px;
  border-radius: 999px;
  background: #a35535;
}

@media (min-width: 1024px) {
  .nn-cal-today::before {
    left: 18%;
    right: 18%;
    top: 0;
    bottom: auto;
    width: auto;
    height: 2px;
  }
}
</style>
