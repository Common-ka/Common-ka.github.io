// Данные витрины игр. Чтобы добавить игру, скопируй любой блок в списке games и поменяй поля.
// Как устроено каждое поле — в README.md, раздел «Как добавить игру».
window.SITE_GAMES = {
  // Строки блока «Сейчас» над карточками
  now: [
    { label: 'Сейчас', text: 'Cracker Hero вышла в Basic Launch на CrazyGames и проходит модерацию на Playgama.' },
    { label: 'В работе', text: 'Новая idle-игра о разрушении воксельных фигур. Название пока рабочее.' },
  ],

  // Карточки игр, сверху вниз
  games: [
    {
      id: 'cracker-hero',
      title: 'Cracker Hero',
      status: 'launch', // released — вышла, launch — запуск, dev — в разработке
      statusText: 'Basic Launch · CrazyGames',
      genre: '3D-аркада с физикой разрушения',
      hook: 'Оттягиваешь кубическую голову с мечом, запускаешь — и арена разлетается по блокам. Баффы усиливают удар, награды открывают новое оружие.',
      cover: {
        image: 'assets/img/covers/cracker-hero', // + -640.webp и -1280.webp
        alt: 'Обложка Cracker Hero: кубический поросёнок с мечом раскалывает деревянный блок, над ним урон 99999',
        position: 'left center',
      },
      links: [
        { label: '▶ CrazyGames', url: 'https://www.crazygames.com/game/cracker-hero', primary: true },
      ],
      soon: ['Скоро на Playgama'],
      stack: ['TypeScript', 'Babylon.js', 'Havok Physics', 'Vite'],
      how: {
        notes: [
          { title: 'Архитектура', text: 'RunController связывает урон, баффы, награды и прогрессию. Babylon/Havok изолированы за physics port; контакты обрабатываются после physics step. UI получает state snapshots.' },
          { title: 'AI-разработка', text: 'Задавал агентам task specs с ограниченным scope. Harness проверяет изменения, review фиксирует принятые checkpoints.' },
        ],
        extra: {
          title: 'Playable Ad',
          text: 'Отдельный рекламный билд: один запуск, три стадии разрушения, два выбора баффа и End Card.',
          facts: [
            { value: '3,95 МБ', text: 'один автономный HTML; lossless WebP и font subsets сократили его на 15,1%.' },
            { value: 'MRAID', text: 'adapter с обработкой lifecycle-событий, SDK mock testing.' },
            { value: 'HTML5', text: 'Pointer Events, portrait / landscape, пауза при потере видимости.' },
          ],
          link: { label: '▶ Демо рекламы', url: 'https://odd-waterfall-2773.daniil-132465-daniil.workers.dev/' },
          shots: [
            { src: 'assets/img/playable-hook.webp', w: 390, h: 700, alt: 'Playable Ad: запуск головы', caption: 'Hook' },
            { src: 'assets/img/playable-buff.webp', w: 390, h: 700, alt: 'Playable Ad: выбор баффа', caption: 'Buff' },
            { src: 'assets/img/playable-finale.webp', w: 372, h: 668, alt: 'Playable Ad: цепной финал', caption: 'Finale' },
          ],
        },
      },
    },

    {
      id: 'loose-change',
      title: 'Loose Change',
      status: 'released',
      statusText: 'Вышла · Playgama и Yandex Games',
      genre: 'Головоломка-сортировка · Cashier Simulator',
      hook: 'Переноси одинаковые стопки монет между ячейками: десять мелких превращаются в две крупнее. Новые монеты — по кнопке Deal.',
      rating: '★ 4,3 / 5 на Playgama · 96 оценок',
      cover: {
        image: 'assets/img/covers/loose-change',
        alt: 'Обложка Loose Change: Cashier Simulator — рука кладёт монету на поле с ячейками',
      },
      links: [
        { label: '▶ Playgama', url: 'https://playgama.com/game/loose-change-cashier-simulator', primary: true },
        { label: '▶ Яндекс Игры', url: 'https://yandex.ru/games/app/razmeniai-meloch-simuliator-kassira-540531?lang=ru' },
      ],
      stack: ['Unity', 'C#', 'WebGL', 'UI Toolkit'],
      how: {
        notes: [
          { title: 'Архитектура', text: 'C# models и controllers хранят состояние поля и правила ходов. UI Toolkit и views получают изменения через Event Bus. Saves, ads и pause вынесены в общий platform layer.' },
          { title: 'Процесс разработки', text: 'Ставил задачи AI-агентам, проверял код и игровые состояния, организовывал исправления. Подготовил WebGL-сборки и довёл игру до публикации на двух платформах.' },
        ],
        shots: [
          { src: 'assets/img/loose-change-board.webp', w: 716, h: 1273, alt: 'Игровое поле', caption: 'Игровое поле' },
          { src: 'assets/img/loose-change-anim.webp', w: 716, h: 1273, alt: 'Анимация слияния монет', caption: 'Слияние монет' },
        ],
      },
    },

    {
      id: 'voxel-idle',
      title: 'Новая игра',
      status: 'dev',
      statusText: 'В разработке',
      genre: 'Idle-разрушение · рабочее название скрыто',
      hook: 'Шарики разбивают воксельные фигуры — куб, сердце, дерево, машину — с настоящей физикой скола. Каждый снятый кусочек приносит монеты на новые шарики и улучшения.',
      cover: { placeholder: 'voxels' }, // обложки пока нет: рисуется воксельное сердце
      stack: ['Three.js', 'Rapier', 'TypeScript'],
    },
  ],
};
