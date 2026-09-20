<script setup lang="ts">
import { getGroup, dayLabels, dayOrder } from '~/data/groups'
import { site } from '~/data/site'

const route = useRoute()
const group = computed(() => getGroup(String(route.params.slug)))

if (!group.value) {
  throw createError({ statusCode: 404, statusMessage: 'Группа не найдена' })
}

useSeoMeta({
  title: `${group.value.name} · ${group.value.city}`,
  description: `Собрания группы «${group.value.name}» (${group.value.city}). Расписание и адрес.`
})

const map = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const
const today = map[new Date().getDay()]!
</script>

<template>
  <div v-if="group">
    <section class="border-b border-volga-900/10 py-12 dark:border-white/10">
      <UContainer>
        <NuxtLink
          to="/groups"
          class="nn-link-line mb-6 inline-flex items-center gap-2 text-sm text-volga-600"
        >
          <UIcon
            name="i-lucide-arrow-left"
            class="size-4"
          />
          Все группы
        </NuxtLink>
        <p class="text-[12px] font-semibold uppercase tracking-[0.22em] text-ember-700">
          {{ group.city }}
          <span v-if="group.online"> · Online</span>
        </p>
        <h1 class="font-display nn-ink mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          {{ group.name }}
        </h1>
      </UContainer>
    </section>

    <UContainer class="py-10">
      <div class="grid gap-12 lg:grid-cols-5">
        <div class="space-y-10 lg:col-span-3">
          <div>
            <h2 class="font-display text-xl font-semibold tracking-tight">
              Расписание
            </h2>
            <div class="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <div
                v-for="day in dayOrder"
                :key="day"
                class="px-3 py-3 text-center"
                :class="group.schedule[day]
                  ? (today === day ? 'bg-ember-600 text-white' : 'bg-volga-950/5 nn-ink dark:bg-white/10')
                  : 'text-volga-400'"
              >
                <div class="text-[11px] uppercase tracking-wider opacity-70">
                  {{ dayLabels[day] }}
                </div>
                <div class="mt-1 font-display text-lg font-semibold tabular-nums">
                  {{ group.schedule[day] || '·' }}
                </div>
              </div>
            </div>
          </div>

          <div v-if="group.notes?.length">
            <h2 class="font-display text-xl font-semibold tracking-tight">
              Важно знать
            </h2>
            <ul class="mt-4 space-y-3 text-volga-700 dark:text-volga-300">
              <li
                v-for="(note, i) in group.notes"
                :key="i"
                class="flex gap-3"
              >
                <span class="mt-2 size-1.5 shrink-0 rounded-full bg-ember-500" />
                <span>{{ note }}</span>
              </li>
            </ul>
          </div>
        </div>

        <aside class="space-y-8 lg:col-span-2">
          <div>
            <h2 class="font-display text-xl font-semibold tracking-tight">
              Место
            </h2>
            <p
              v-if="group.address"
              class="mt-3 leading-relaxed text-volga-700 dark:text-volga-300"
            >
              {{ group.address }}
            </p>
            <p
              v-if="group.howToFind"
              class="mt-3 text-sm leading-relaxed text-volga-500"
            >
              {{ group.howToFind }}
            </p>
            <p
              v-if="group.online && group.zoom"
              class="mt-3 space-y-1 text-volga-700 dark:text-volga-300"
            >
              <span class="block">Zoom: {{ group.zoom.id }}</span>
              <span class="block">Пароль: {{ group.zoom.password }}</span>
            </p>
            <p
              v-if="!group.address && !group.online && !group.howToFind"
              class="mt-3 text-volga-500"
            >
              Уточни адрес по телефону информационной линии.
            </p>
          </div>

          <div class="bg-volga-950 p-6 text-volga-50 sm:p-7">
            <p class="text-[12px] font-semibold uppercase tracking-[0.18em] text-ember-300">
              Информационная линия
            </p>
            <a
              :href="site.phone.href"
              class="mt-3 block font-display text-2xl font-semibold text-white hover:text-ember-300"
            >
              {{ site.phone.display }}
            </a>
            <p class="mt-1 text-sm text-volga-300">
              {{ site.phone.hours }}
            </p>
            <UButton
              :to="site.telegramBot"
              target="_blank"
              icon="i-simple-icons-telegram"
              label="Telegram-бот"
              class="mt-5"
            />
          </div>
        </aside>
      </div>
    </UContainer>
  </div>
</template>
