<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { navItems, site } from '~/data/site'

const items = computed<NavigationMenuItem[]>(() =>
  navItems.map(item => ({
    label: item.label,
    to: item.to
  }))
)

const title = 'Анонимные Наркоманы · Нижний Новгород'
const description = 'Группы АН в Нижнем Новгороде и области. Бесплатная программа выздоровления. Расписание собраний, календарь и помощь новичку.'

useHead({
  htmlAttrs: { lang: 'ru' },
  link: [{ rel: 'icon', href: '/favicon.ico' }]
})

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterCard: 'summary_large_image'
})

const route = useRoute()
const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 12
}

const headerSolid = computed(() => route.path !== '/' || scrolled.value)

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

watch(() => route.path, () => {
  nextTick(onScroll)
})
</script>

<template>
  <UApp>
    <header
      class="nn-header sticky top-0 z-40"
      :class="{ 'is-solid': headerSolid }"
    >
      <div>
        <UContainer class="flex items-center justify-between gap-4 py-2 text-[13px]">
          <p class="hidden nn-ink-soft sm:block">
            {{ site.city }}
          </p>
          <PhoneBar compact />
        </UContainer>
      </div>

      <UHeader
        :ui="{
          root: 'bg-transparent ring-0 border-0',
          container: 'max-w-7xl'
        }"
      >
        <template #left>
          <NuxtLink
            to="/"
            class="group flex items-center gap-3 rounded-md py-1 pe-2 focus-visible:outline-3 outline-ember-500/30"
          >
            <AppLogo class="size-9 shrink-0 transition group-hover:scale-[1.03]" />
            <span class="font-display text-xl font-semibold tracking-tight nn-ink sm:text-[1.35rem]">
              {{ site.name }}
            </span>
          </NuxtLink>
        </template>

        <UNavigationMenu
          :items="items"
          class="hidden lg:flex"
          :ui="{
            link: 'text-volga-700 dark:text-volga-200'
          }"
        />

        <template #right>
          <UColorModeButton />
          <UButton
            :to="site.phone.href"
            icon="i-lucide-phone"
            label="Позвонить"
            class="hidden sm:inline-flex"
          />
        </template>

        <template #body>
          <UNavigationMenu
            :items="items"
            orientation="vertical"
            class="-mx-2.5"
          />
          <div class="mt-4 border-t border-default pt-4">
            <PhoneBar />
            <UButton
              :to="site.telegramBot"
              target="_blank"
              icon="i-simple-icons-telegram"
              label="Telegram-бот"
              color="secondary"
              variant="soft"
              class="mt-3 w-full"
            />
          </div>
        </template>
      </UHeader>
    </header>

    <UMain>
      <NuxtPage />
    </UMain>

    <footer class="relative mt-20 overflow-hidden bg-volga-950 text-volga-100">
      <div class="pointer-events-none absolute inset-0 opacity-40">
        <div class="nn-river-band absolute inset-0" />
      </div>
      <div class="relative">
        <UContainer class="relative py-14">
          <div class="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <p class="font-display text-3xl font-semibold tracking-tight text-white">
                {{ site.name }}
              </p>
              <p class="mt-4 max-w-md text-base leading-relaxed text-volga-200/90">
                Здесь можно начать заново — без осуждения и без обязательств.
                Мы рядом, в Нижнем и области.
              </p>
            </div>

            <div>
              <p class="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-ember-300">
                Разделы
              </p>
              <ul class="space-y-2.5 text-volga-200">
                <li
                  v-for="item in navItems"
                  :key="item.to"
                >
                  <NuxtLink
                    :to="item.to"
                    class="nn-link-line"
                  >
                    {{ item.label }}
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <div>
              <p class="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-ember-300">
                Связь
              </p>
              <PhoneBar class="flex-col items-start text-volga-100" />
              <ul class="mt-5 space-y-2.5 text-sm text-volga-300">
                <li>
                  <a
                    :href="site.radio.url"
                    target="_blank"
                    rel="noopener"
                    class="nn-link-line"
                  >Радио АН</a>
                </li>
                <li>
                  <NuxtLink
                    to="/feniks"
                    class="nn-link-line"
                  >Проект «Феникс»</NuxtLink>
                </li>
                <li>
                  <a
                    :href="site.reflections.url"
                    target="_blank"
                    rel="noopener"
                    class="nn-link-line"
                  >Ежедневные размышления</a>
                </li>
              </ul>
              <UButton
                :to="site.telegramBot"
                target="_blank"
                icon="i-simple-icons-telegram"
                label="@NA52_bot"
                color="neutral"
                variant="outline"
                class="mt-5 border-volga-600 text-volga-100 hover:bg-volga-900"
              />
            </div>
          </div>

          <div class="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-volga-400 sm:flex-row sm:justify-between">
            <p>© {{ new Date().getFullYear() }} Анонимные Наркоманы ® · Нижний Новгород</p>
            <p>АН не связано с политикой, религией и правоохранительными органами.</p>
          </div>
        </UContainer>
      </div>
    </footer>
  </UApp>
</template>
