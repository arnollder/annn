<script setup lang="ts">
import { formatEventDate, upcomingEvents } from '~/data/events'
import { resourceLinks, site } from '~/data/site'

useSeoMeta({
  title: 'Анонимные Наркоманы · Нижний Новгород',
  description: 'Расписание групп АН в Нижнем Новгороде и области. Помощь, собрания, календарь мероприятий.'
})

const events = upcomingEvents(4)
</script>

<template>
  <div>
    <!-- Один кадр: бренд → фраза → CTA → атмосфера Нижнего -->
    <section class="relative -mt-[var(--nn-header-offset)] min-h-[min(94dvh,880px)] overflow-hidden pt-[var(--nn-header-offset)]">
      <div class="nn-hero-sky absolute inset-0" />
      <div class="pointer-events-none absolute left-[-8%] top-[12%] h-56 w-56 rounded-full bg-white/25 dark:bg-white/5" />
      <div class="pointer-events-none absolute right-[-5%] top-[8%] h-64 w-64 rounded-full bg-[#f5ebe2]/20 dark:bg-ember-500/10" />
      <KremlinSilhouette />

      <UContainer class="relative z-10 flex min-h-[min(94dvh,880px)] flex-col justify-start pt-16 pb-[42vh] sm:pt-24 sm:pb-[38vh]">
        <p class="nn-rise nn-ink-soft font-display text-[13px] font-semibold uppercase tracking-[0.28em]">
          {{ site.shortName }}
        </p>
        <h1 class="nn-rise nn-rise-1 nn-ink mt-3 max-w-[14ch] font-display text-[clamp(2.75rem,8vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
          Анонимные Наркоманы
        </h1>
        <p class="nn-rise nn-rise-2 nn-ink-soft mt-6 max-w-md text-lg leading-relaxed sm:text-xl">
          Жизнь без наркотиков возможна — и ты не один.
        </p>
        <div class="nn-rise nn-rise-3 mt-9 flex flex-wrap items-center gap-3">
          <UButton
            to="/groups"
            size="xl"
            label="Найти собрание"
          />
          <UButton
            to="/novichku"
            size="xl"
            color="neutral"
            variant="outline"
            class="nn-surface nn-ink border-current/20 hover:opacity-90"
            label="Я здесь впервые"
          />
        </div>
        <a
          :href="site.phone.href"
          class="nn-rise nn-rise-4 nn-link-line nn-ink-soft mt-8 inline-flex w-fit items-center gap-2 text-sm font-medium"
        >
          <UIcon
            name="i-lucide-phone"
            class="size-4"
          />
          {{ site.phone.display }} · {{ site.phone.hours }}
        </a>
      </UContainer>
    </section>

    <!-- Расписание с башнями по бокам + медитация снизу (ширина = хедер) -->
    <section class="relative z-20 border-y border-volga-900/10 bg-[var(--nn-paper)] dark:border-white/10">
      <UContainer class="max-w-7xl py-3 sm:py-4">
        <!-- ряд расписания: фланги только на lg -->
        <div class="flex items-stretch gap-0 lg:gap-4">
          <div class="hidden min-w-0 flex-1 basis-0 self-stretch lg:block">
            <KremlinFlank
              side="left"
              class="h-full min-h-full"
            />
          </div>

          <div class="mx-auto w-full shrink-0 lg:w-auto">
            <WeekSchedule />
          </div>

          <div class="hidden min-w-0 flex-1 basis-0 self-stretch lg:block">
            <KremlinFlank
              side="right"
              class="h-full min-h-full"
            />
          </div>
        </div>

        <!-- медитация на всю ширину хедера -->
        <div class="mt-6 lg:mt-8">
          <DailyReflection />
        </div>
      </UContainer>
    </section>

    <!-- Письмо, не «фичи в карточках» -->
    <section class="py-24">
      <UContainer>
        <div class="mx-auto max-w-2xl">
          <p class="text-[12px] font-semibold uppercase tracking-[0.22em] text-ember-700">
            Если ты читаешь это
          </p>
          <h2 class="font-display nn-ink mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Можно просто прийти.
            Ничего объяснять не нужно.
          </h2>
          <div class="mt-8 space-y-5 text-lg leading-relaxed text-volga-700 dark:text-volga-300">
            <p>
              АН — сообщество людей, для которых наркотики стали серьёзной проблемой.
              Мы собираемся, чтобы помогать друг другу оставаться чистыми.
            </p>
            <p>
              Единственное условие — желание прекратить употребление.
              Без взносов, без обязательств, без политики и религии.
            </p>
            <p class="font-medium nn-ink">
              Программа простая. И она работает.
            </p>
          </div>
          <NuxtLink
            to="/novichku"
            class="nn-link-line mt-8 inline-flex items-center gap-2 text-base font-semibold text-ember-700"
          >
            Что ждать на первом собрании
            <UIcon
              name="i-lucide-arrow-right"
              class="size-4"
            />
          </NuxtLink>
        </div>
      </UContainer>
    </section>

    <!-- Ресурсы со старого сайта -->
    <section class="py-20">
      <UContainer>
        <p class="text-[12px] font-semibold uppercase tracking-[0.22em] text-ember-700 dark:text-ember-300">
          Рядом с расписанием
        </p>
        <h2 class="font-display nn-ink mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Радио и Феникс
        </h2>
        <ul class="mt-10 divide-y divide-volga-900/10 border-y border-volga-900/10 dark:divide-white/10 dark:border-white/10">
          <li
            v-for="item in resourceLinks"
            :key="item.title"
          >
            <NuxtLink
              :to="item.to"
              :target="item.external ? '_blank' : undefined"
              :external="item.external"
              class="group flex items-start gap-4 py-6 transition sm:items-center sm:gap-6"
            >
              <span class="flex size-11 shrink-0 items-center justify-center rounded-full bg-volga-950 text-ember-300 dark:bg-white/10">
                <UIcon
                  :name="item.icon"
                  class="size-5"
                />
              </span>
              <span class="min-w-0 flex-1">
                <span class="font-display block text-xl font-semibold tracking-tight nn-ink transition group-hover:text-ember-700 dark:group-hover:text-ember-300">
                  {{ item.title }}
                </span>
                <span class="mt-1 block text-base leading-relaxed nn-ink-soft">
                  {{ item.text }}
                </span>
              </span>
              <UIcon
                :name="item.external ? 'i-lucide-arrow-up-right' : 'i-lucide-arrow-right'"
                class="mt-1 size-4 shrink-0 text-volga-400 transition group-hover:translate-x-0.5 group-hover:text-ember-600"
              />
            </NuxtLink>
          </li>
        </ul>
      </UContainer>
    </section>

    <!-- События + бот — одна полоса -->
    <section class="border-y border-volga-900/10 nn-surface py-20 dark:border-white/10">
      <UContainer>
        <div class="grid gap-16 lg:grid-cols-2">
          <div>
            <p class="text-[12px] font-semibold uppercase tracking-[0.22em] text-ember-700 dark:text-ember-300">
              Скоро
            </p>
            <h2 class="font-display nn-ink mt-3 text-3xl font-semibold tracking-tight">
              Ближайшие события
            </h2>
            <ul class="mt-8 space-y-0">
              <li
                v-for="event in events"
                :key="event.id"
                class="border-t border-volga-900/10 py-4 first:border-t-0 dark:border-white/10"
              >
                <NuxtLink
                  :to="event.group ? `/groups/${event.group}` : '/calendar'"
                  class="group block"
                >
                  <p class="text-sm text-ember-700 dark:text-ember-300">
                    {{ formatEventDate(event.date) }} · {{ event.start }}
                  </p>
                  <p class="mt-1 font-medium nn-ink transition group-hover:text-ember-600 dark:group-hover:text-ember-300">
                    {{ event.title }}
                  </p>
                </NuxtLink>
              </li>
            </ul>
            <NuxtLink
              to="/calendar"
              class="nn-link-line mt-6 inline-block text-sm font-semibold text-volga-700"
            >
              Весь календарь →
            </NuxtLink>
          </div>

          <div class="flex flex-col justify-between rounded-2xl bg-gradient-to-br from-volga-900 to-volga-950 p-8 text-volga-50 sm:p-10">
            <div>
              <p class="text-[12px] font-semibold uppercase tracking-[0.22em] text-ember-300">
                В кармане
              </p>
              <h3 class="font-display mt-3 text-3xl font-semibold tracking-tight text-white">
                Напиши боту,<br>если страшно звонить
              </h3>
              <p class="mt-4 max-w-sm leading-relaxed text-volga-200">
                @NA52_bot — для новичка, родственника и участника. Спокойно, без лишних вопросов.
              </p>
            </div>
            <UButton
              :to="site.telegramBot"
              target="_blank"
              size="xl"
              class="mt-8 self-start"
              label="Открыть @NA52_bot"
              trailing-icon="i-lucide-arrow-up-right"
            />
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>
