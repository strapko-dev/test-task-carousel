# DiveSea — NFT Carousel

Интерфейс маркетплейса NFT с бесконечной каруселью, построенный на Next.js.

## Стек технологий

- **Framework:** Next.js 14 (App Router)
- **State Management:** Redux Toolkit
- **Styling:** SCSS Modules
- **Animations:** Framer Motion
- **Language:** TypeScript
- **API:** CoinGecko NFT List

## Структура проекта

```
src/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout (Header + Footer)
│   ├── page.tsx                # Главная страница с каруселью
│   └── page.module.scss
├── components/
│   ├── Header/                 # Фиксированный хедер с мобильным меню
│   ├── Footer/                 # Футер с навигацией
│   ├── NftCard/                # Карточка NFT (таймер, бид, изображение)
│   ├── NftCarousel/            # Виртуализированная бесконечная карусель
│   ├── icons/                  # SVG-иконки как React-компоненты
│   └── providers/              # Redux Provider
├── store/
│   ├── features/
│   │   └── nftsSlice.ts        # Async thunk для CoinGecko API
│   ├── store.ts
│   └── hooks.ts                # Типизированные useAppDispatch / useAppSelector
├── lib/
│   └── utils.ts                # Утилиты (форматирование таймера и т.д.)
├── styles/
│   ├── _variables.scss
│   ├── _mixins.scss
│   └── globals.scss
└── data/
    └── nfts.ts                 # Моковые данные (fallback)
```

## Запуск локально

### Требования

- Node.js ≥ 18
- npm ≥ 9

### Установка и запуск

```bash
# Клонировать репозиторий
git clone https://github.com/strapko-dev/test-task-carousel.git
cd test-task-carousel

# Установить зависимости
npm install

# Запустить dev-сервер
npm run dev
```

Открыть [http://localhost:3000](http://localhost:3000) в браузере.

### Production-сборка

```bash
npm run build
npm run start
```

## Запуск в Docker

### Требования

- Docker ≥ 20

### Сборка и запуск

```bash
# Собрать образ
docker build -t divesea .

# Запустить контейнер
docker run -p 3000:3000 divesea
```

Открыть [http://localhost:3000](http://localhost:3000) в браузере.

## Скрипты

| Команда         | Описание                  |
| --------------- | ------------------------- |
| `npm run dev`   | Dev-сервер с hot reload   |
| `npm run build` | Production-сборка         |
| `npm run start` | Запуск production-сервера |
| `npm run lint`  | Линтинг (ESLint)          |

## Адаптивность

- **≤ 768px** — мобильная версия (бургер-меню, карточки в колонку)
- **769px – 1920px** — десктоп, контент центрирован, боковые поля расширяются
- **1921px – 3839px (2K)** — контент масштабируется (`zoom: 1.334`)
- **≥ 3840px (4K)** — контент масштабируется (`zoom: 2`)
