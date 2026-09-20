<script setup lang="ts">
import { formatEventDate, upcomingEvents } from '~/data/events'
import { getGroup } from '~/data/groups'

useSeoMeta({
  title: 'Календарь мероприятий',
  description: 'Ближайшие события сообщества Анонимные Наркоманы в Нижнем Новгороде.'
})

const events = upcomingEvents(20)
</script>

<template>
  <div>
    <section class="border-b border-volga-900/10 py-14 dark:border-white/10">
      <UContainer>
        <p class="text-[12px] font-semibold uppercase tracking-[0.22em] text-ember-700">
          Сообщество
        </p>
        <h1 class="font-display nn-ink mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Календарь
        </h1>
        <p class="mt-4 max-w-xl text-lg text-volga-700 dark:text-volga-300">
          Рабочие и открытые собрания, спикерские встречи, литературные вечера.
        </p>
      </UContainer>
    </section>

    <UContainer class="py-8">
      <ol class="mx-auto max-w-2xl">
        <li
          v-for="event in events"
          :key="event.id"
          class="border-b border-volga-900/10 py-6 first:pt-2 dark:border-white/10"
        >
          <NuxtLink
            :to="event.group ? `/groups/${event.group}` : '#'"
            class="group block"
          >
            <p class="text-sm font-medium text-ember-700">
              {{ formatEventDate(event.date) }} · {{ event.start }}–{{ event.end }}
            </p>
            <h2 class="font-display mt-1 text-xl font-semibold tracking-tight nn-ink transition group-hover:text-ember-700 dark:group-hover:text-ember-300">
              {{ event.title }}
            </h2>
            <p
              v-if="event.group && getGroup(event.group)"
              class="mt-1 text-sm text-volga-500"
            >
              Группа «{{ getGroup(event.group)?.name }}»
            </p>
          </NuxtLink>
        </li>
      </ol>

      <p
        v-if="!events.length"
        class="py-16 text-center text-volga-500"
      >
        Сейчас в календаре пусто — загляни в расписание групп.
      </p>
    </UContainer>
  </div>
</template>
