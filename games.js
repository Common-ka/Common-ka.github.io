// Game showcase data. To add a game, copy any block in the `games` list and change the fields.
// Text fields are either a plain string (same in both languages) or { ru: '…', en: '…' }.
// Every field is described in README.md, section "Adding a game".
window.SITE_GAMES = {
  // Rows of the "Now" block above the cards
  now: [
    {
      label: { ru: 'Сейчас', en: 'Now' },
      text: {
        ru: 'Cracker Hero вышла в Basic Launch на CrazyGames и проходит модерацию на Playgama.',
        en: 'Cracker Hero is in Basic Launch on CrazyGames and in review on Playgama.',
      },
    },
    {
      label: { ru: 'В работе', en: 'In progress' },
      text: {
        ru: 'Новая idle-игра о разрушении воксельных фигур. Название пока рабочее.',
        en: 'A new idle game about smashing voxel figures. The title is a working one for now.',
      },
    },
  ],

  // Game cards, top to bottom
  games: [
    {
      id: 'cracker-hero',
      title: 'Cracker Hero',
      status: 'launch', // released, launch or dev
      statusText: 'Basic Launch · CrazyGames',
      genre: { ru: '3D-аркада с физикой разрушения', en: '3D arcade with destruction physics' },
      hook: {
        ru: 'Оттягиваешь кубическую голову с мечом, запускаешь — и арена разлетается по блокам. Баффы усиливают удар, награды открывают новое оружие.',
        en: 'Pull back a cube head with a sword, let go — and the arena shatters block by block. Buffs power up your hits, rewards unlock new weapons.',
      },
      cover: {
        image: 'assets/img/covers/cracker-hero', // + -640.webp and -1280.webp
        alt: {
          ru: 'Обложка Cracker Hero: кубический поросёнок с мечом раскалывает деревянный блок, над ним урон 99999',
          en: 'Cracker Hero cover: a cube pig with a sword splits a wooden block, 99999 damage above it',
        },
        position: 'left center',
      },
      links: [
        { label: '▶ CrazyGames', url: 'https://www.crazygames.com/game/cracker-hero', primary: true },
      ],
      soon: [{ ru: 'Скоро на Playgama', en: 'Coming to Playgama' }],
      stack: ['TypeScript', 'Babylon.js', 'Havok Physics', 'Vite'],
      how: {
        notes: [
          {
            title: { ru: 'Архитектура', en: 'Architecture' },
            text: {
              ru: 'RunController связывает урон, баффы, награды и прогрессию. Babylon/Havok изолированы за physics port; контакты обрабатываются после physics step. UI получает state snapshots.',
              en: 'RunController ties together damage, buffs, rewards and progression. Babylon/Havok sit behind a physics port; contacts are handled after the physics step. The UI receives state snapshots.',
            },
          },
          {
            title: { ru: 'AI-разработка', en: 'AI-driven development' },
            text: {
              ru: 'Задавал агентам task specs с ограниченным scope. Harness проверяет изменения, review фиксирует принятые checkpoints.',
              en: 'I gave agents task specs with a limited scope. A harness verifies every change; reviews lock in accepted checkpoints.',
            },
          },
        ],
        extra: {
          title: 'Playable Ad',
          text: {
            ru: 'Отдельный рекламный билд: один запуск, три стадии разрушения, два выбора баффа и End Card.',
            en: 'A separate ad build: one launch, three destruction stages, two buff picks and an End Card.',
          },
          facts: [
            {
              value: { ru: '3,95 МБ', en: '3.95 MB' },
              text: {
                ru: 'один автономный HTML; lossless WebP и font subsets сократили его на 15,1%.',
                en: 'a single self-contained HTML; lossless WebP and font subsets cut it by 15.1%.',
              },
            },
            {
              value: 'MRAID',
              text: {
                ru: 'adapter с обработкой lifecycle-событий, SDK mock testing.',
                en: 'adapter handling lifecycle events, tested against an SDK mock.',
              },
            },
            {
              value: 'HTML5',
              text: {
                ru: 'Pointer Events, portrait / landscape, пауза при потере видимости.',
                en: 'Pointer Events, portrait / landscape, pauses when hidden.',
              },
            },
          ],
          link: { label: { ru: '▶ Демо рекламы', en: '▶ Ad demo' }, url: 'https://odd-waterfall-2773.daniil-132465-daniil.workers.dev/' },
          shots: [
            { src: 'assets/img/playable-hook.webp', w: 390, h: 700, alt: { ru: 'Playable Ad: запуск головы', en: 'Playable Ad: launching the head' }, caption: 'Hook' },
            { src: 'assets/img/playable-buff.webp', w: 390, h: 700, alt: { ru: 'Playable Ad: выбор баффа', en: 'Playable Ad: picking a buff' }, caption: 'Buff' },
            { src: 'assets/img/playable-finale.webp', w: 372, h: 668, alt: { ru: 'Playable Ad: цепной финал', en: 'Playable Ad: chain-reaction finale' }, caption: 'Finale' },
          ],
        },
      },
    },

    {
      id: 'loose-change',
      title: 'Loose Change',
      status: 'released',
      statusText: { ru: 'Вышла · Playgama и Yandex Games', en: 'Released · Playgama and Yandex Games' },
      genre: { ru: 'Головоломка-сортировка · Cashier Simulator', en: 'Sorting puzzle · Cashier Simulator' },
      hook: {
        ru: 'Переноси одинаковые стопки монет между ячейками: десять мелких превращаются в две крупнее. Новые монеты — по кнопке Deal.',
        en: 'Move matching stacks of coins between slots: ten small coins merge into two bigger ones. New coins arrive with the Deal button.',
      },
      rating: { ru: '★ 4,3 / 5 на Playgama · 96 оценок', en: '★ 4.3 / 5 on Playgama · 96 ratings' },
      cover: {
        image: 'assets/img/covers/loose-change',
        alt: {
          ru: 'Обложка Loose Change: Cashier Simulator — рука кладёт монету на поле с ячейками',
          en: 'Loose Change: Cashier Simulator cover — a hand places a coin on a board of slots',
        },
      },
      links: [
        { label: '▶ Playgama', url: 'https://playgama.com/game/loose-change-cashier-simulator', primary: true },
        { label: { ru: '▶ Яндекс Игры', en: '▶ Yandex Games' }, url: 'https://yandex.ru/games/app/razmeniai-meloch-simuliator-kassira-540531?lang=ru' },
      ],
      stack: ['Unity', 'C#', 'WebGL', 'UI Toolkit'],
      how: {
        notes: [
          {
            title: { ru: 'Архитектура', en: 'Architecture' },
            text: {
              ru: 'C# models и controllers хранят состояние поля и правила ходов. UI Toolkit и views получают изменения через Event Bus. Saves, ads и pause вынесены в общий platform layer.',
              en: 'C# models and controllers hold the board state and move rules. UI Toolkit views receive changes through an Event Bus. Saves, ads and pause live in a shared platform layer.',
            },
          },
          {
            title: { ru: 'Процесс разработки', en: 'Development process' },
            text: {
              ru: 'Ставил задачи AI-агентам, проверял код и игровые состояния, организовывал исправления. Подготовил WebGL-сборки и довёл игру до публикации на двух платформах.',
              en: 'I set tasks for AI agents, reviewed the code and game states, and organised fixes. I prepared the WebGL builds and shipped the game on two platforms.',
            },
          },
        ],
        shots: [
          { src: 'assets/img/loose-change-board.webp', w: 716, h: 1273, alt: { ru: 'Игровое поле', en: 'Game board' }, caption: { ru: 'Игровое поле', en: 'Game board' } },
          { src: 'assets/img/loose-change-anim.webp', w: 716, h: 1273, alt: { ru: 'Анимация слияния монет', en: 'Coin merge animation' }, caption: { ru: 'Слияние монет', en: 'Coin merge' } },
        ],
      },
    },

    {
      id: 'voxel-idle',
      title: { ru: 'Новая игра', en: 'New game' },
      status: 'dev',
      statusText: { ru: 'В разработке', en: 'In development' },
      genre: { ru: 'Idle-разрушение · рабочее название скрыто', en: 'Idle destruction · working title under wraps' },
      hook: {
        ru: 'Шарики разбивают воксельные фигуры — куб, сердце, дерево, машину — с настоящей физикой скола. Каждый снятый кусочек приносит монеты на новые шарики и улучшения.',
        en: 'Balls smash voxel figures — a cube, a heart, a tree, a car — with real chipping physics. Every chunk knocked off earns coins for new balls and upgrades.',
      },
      cover: { placeholder: 'voxels' }, // no cover yet: a voxel heart is drawn instead
      stack: ['Three.js', 'Rapier', 'TypeScript'],
    },
  ],
};
