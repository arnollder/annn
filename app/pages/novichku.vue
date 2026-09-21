<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui'
import { beginnerFaq, beginnerIntro } from '~/data/beginner'
import { site } from '~/data/site'

useSeoMeta({
  title: 'Новичку',
  description: 'Первый раз в АН? Что ожидать на собрании, кто такие зависимые и как устроена программа Анонимных Наркоманов в Нижнем Новгороде.'
})

const items = beginnerFaq.map((faq): AccordionItem & { paragraphs: string[] } => ({
  label: faq.label,
  value: faq.value,
  paragraphs: faq.paragraphs
}))
</script>

<template>
  <div>
    <section class="relative overflow-hidden border-b border-volga-900/10">
      <div class="nn-hero-sky absolute inset-0 opacity-55" />
      <UContainer class="relative py-16 sm:py-20">
        <p class="text-[12px] font-semibold uppercase tracking-[0.22em] nn-ink-soft">
          Первый шаг
        </p>
        <h1 class="font-display nn-ink mt-3 max-w-[16ch] text-4xl font-semibold tracking-tight sm:text-5xl">
          {{ beginnerIntro.title }}
        </h1>
        <p class="mt-4 max-w-2xl text-lg leading-relaxed nn-ink-soft">
          {{ beginnerIntro.lead }}
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <UButton
            :to="site.phone.href"
            size="xl"
            icon="i-lucide-phone"
            :label="site.phone.display"
          />
          <UButton
            to="/groups"
            size="xl"
            color="neutral"
            variant="outline"
            class="nn-surface nn-ink border-current/20"
            label="Расписание собраний"
          />
        </div>
      </UContainer>
    </section>

    <UContainer class="space-y-12 py-12 sm:py-16">
      <div class="mx-auto max-w-3xl space-y-4 text-lg leading-relaxed text-volga-700 dark:text-volga-300">
        <p
          v-for="(p, i) in beginnerIntro.paragraphs"
          :key="i"
        >
          {{ p }}
        </p>
      </div>

      <div class="mx-auto max-w-3xl border-y border-volga-900/10 py-8 dark:border-white/10">
        <p class="font-display text-xl font-semibold leading-snug tracking-tight nn-ink sm:text-2xl">
          {{ beginnerIntro.membership }}
        </p>
        <div class="mt-5 space-y-4 leading-relaxed text-volga-700 dark:text-volga-300">
          <p
            v-for="(p, i) in beginnerIntro.invitation"
            :key="i"
          >
            {{ p }}
          </p>
        </div>
      </div>

      <div class="mx-auto max-w-3xl">
        <h2 class="font-display text-2xl font-semibold tracking-tight nn-ink">
          Частые вопросы
        </h2>
        <p class="mt-2 text-volga-600 dark:text-volga-300">
          Открой раздел — или просто приходи на собрание и спроси сам.
        </p>

        <UAccordion
          type="multiple"
          :items="items"
          :ui="{
            root: 'mt-6',
            item: 'border-b border-volga-900/10 dark:border-white/10',
            trigger: 'py-4 text-left font-display text-lg font-semibold tracking-tight nn-ink',
            body: 'pb-5 text-base leading-relaxed text-volga-700 dark:text-volga-300'
          }"
        >
          <template #body="{ item }">
            <div class="space-y-3">
              <p
                v-for="(p, i) in (item as typeof items[number]).paragraphs"
                :key="i"
              >
                {{ p }}
              </p>
            </div>
          </template>
        </UAccordion>
      </div>
    </UContainer>
  </div>
</template>
