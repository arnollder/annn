# АННН — Анонимные Наркоманы, Нижний Новгород

Современный сайт сообщества на **Nuxt 4** + **Nuxt UI 4**.

## Запуск

```bash
pnpm install
pnpm dev
```

Прод (живой Nitro, не чистая статика):

```bash
pnpm build
pnpm start   # node .output/server/index.mjs
```

Ежедневник: `GET /api/jft` — парсит na-russia.org, кэш в `.data` на московский день.
Прогрев без system crontab: Nitro `jft:refresh` каждый час, парсит только 00:00–05:59 МСК.

## Разделы

- `/` — главная
- `/groups` — группы и фильтры по расписанию
- `/groups/[slug]` — страница группы
- `/novichku` — для новичка
- `/calendar` — календарь
- `/contacts` — контакты
- `/feniks` — проект «Феникс»

Данные групп: `app/data/groups.ts`.
