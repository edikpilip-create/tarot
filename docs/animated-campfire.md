# Animated Campfire Documentation

## 1. Общее описание

Анимированный костёр реализован как canvas-overlay поверх фонового изображения в секции `section split-section`.

Фон секции находится в CSS как изображение без переднего костра. Поверх него добавлены атмосферные gradient-overlay, отдельный CSS glow и canvas-компонент `AnimatedCampfire`, который рисует пламя, искры и дым частицами.

Важная идея: `.section` / `.split-section` остаются внешней границей обрезки, а сам canvas внутри `.campfire-anchor` сделан больше anchor-области, чтобы искры и дым имели запас места внутри секции.

## 2. Карта файлов

| Файл | За что отвечает |
|---|---|
| `src/components/AnimatedCampfire.tsx` | React-компонент canvas-костра: частицы пламени, искры, дым, реакция на курсор, animation loop |
| `src/components/AnimatedCampfire.module.css` | CSS canvas-слоя: увеличенная область canvas, blend/filter, reduced motion |
| `src/components/home-page-client.tsx` | Импорт `AnimatedCampfire` и вставка `.campfire-glow` / `.campfire-anchor` внутрь `section split-section` |
| `src/app/globals.css` | Фон `split-section`, позиция и размер костра, glow, overlay, z-index, desktop/tablet/mobile правила |
| `public/media/toltec-fire-background-no-fire.png` | Фоновое изображение секции без переднего костра |

## 3. Как устроены слои

Порядок слоёв в секции:

1. Фоновое изображение: `url("/media/toltec-fire-background-no-fire.png")` в `.split-section`.
2. Атмосферные overlay: `background` слои самой `.split-section`, затем `.split-section::before` и `.split-section::after`.
3. Glow костра: `.campfire-glow`, `z-index: 1`.
4. Canvas-костёр: `.campfire-anchor`, `z-index: 2`, внутри него `AnimatedCampfire`.
5. Текстовый контент: элементы секции получают `position: relative`; текст визуально остаётся поверх фоновых слоёв.

`::after` имеет `z-index: 0`, glow имеет `z-index: 1`, canvas anchor имеет `z-index: 2`.

## 4. Где менять позицию костра

Позиция задаётся в `src/app/globals.css` внутри `.split-section`:

- `--campfire-x`: горизонтальная позиция.
- `--campfire-y`: вертикальная позиция основания.
- `--campfire-width`: визуальная ширина anchor-области.
- `--campfire-height`: визуальная высота anchor-области.

В текущем коде нет отдельной переменной `--campfire-size`; размер разделён на `--campfire-width` и `--campfire-height`.

Как менять:

- меньше `--campfire-x` = левее;
- больше `--campfire-x` = правее;
- меньше `--campfire-y` = выше;
- больше `--campfire-y` = ниже;
- больше `--campfire-width` / `--campfire-height` = крупнее область костра.

Для tablet позиция переопределяется в `@media (max-width: 980px)`. Для mobile canvas-костёр скрывается в `@media (max-width: 767px)`.

## 5. Где менять размер canvas-области

Размер увеличенной canvas-области задаётся в `src/components/AnimatedCampfire.module.css` в `.root`:

- `width: 180%`;
- `height: 155%`;
- `left: 50%`;
- `bottom: 0`;
- `transform: translateX(-50%)`.

В документации эту роль можно понимать как `campfireCanvasLayer`, но фактический CSS-класс сейчас называется `.root`, потому что это CSS Module.

Что делает настройка:

- больше `width` = больше места искрам по бокам;
- больше `height` = больше места искрам и дыму вверх;
- `bottom: 0` удерживает основание костра относительно нижней части anchor;
- `transform: translateX(-50%)` центрирует увеличенный canvas над anchor.

Не путать CSS-размеры canvas с `canvas.width` / `canvas.height` в TypeScript. CSS задаёт визуальную область, а `canvas.width` / `canvas.height` задают bitmap-разрешение под `devicePixelRatio`.

## 6. Где менять пламя

Пламя задаётся классом `FlameParticle` в `src/components/AnimatedCampfire.tsx`.

Главные параметры:

- `this.x = width / 2 + ...`: горизонтальная точка рождения и разброс по X.
- `this.y = height - fireBaseOffset`: вертикальная точка основания.
- `this.vx`: горизонтальная скорость.
- `this.vy`: скорость подъёма вверх. Более отрицательное значение = быстрее и выше.
- `this.baseRadius`: стартовый размер частицы.
- `this.radius`: текущий размер, уменьшается с жизнью частицы.
- `this.life`: жизнь частицы от `1` к `0`.
- `this.decay`: скорость затухания. Больше = короче и резче, меньше = дольше и мягче.
- `width` / `height` внутри `draw`: вытянутость языка пламени.

`fireBaseOffset` вверху файла поднимает или опускает внутреннюю точку основания огня внутри canvas:

- больше `fireBaseOffset` = пламя выше внутри canvas;
- меньше `fireBaseOffset` = пламя ниже.

## 7. Где менять искры

Искры задаются двумя классами:

- `SparkParticle`: регулярные искры от основания.
- `FlameTipSpark`: маленькие искры, появляющиеся у верхушки угасающих языков пламени.

Главные параметры:

- `maxSparks`: максимальное количество искр одновременно.
- `Math.random() < 0.4`: частота рождения обычных искр.
- `Math.random() < 0.2`: частота рождения искр от верхушек пламени.
- `this.vy`: скорость вверх.
- `this.vx`: разброс в стороны.
- `this.radius`: размер искры.
- `this.alpha`: прозрачность.
- `this.decay`: скорость исчезновения.
- `wind * 0.18` и `wind * 0.22`: сила влияния курсора/ветра на искры.

Чтобы сделать искры активнее, увеличивай вероятность рождения и/или `maxSparks`. Чтобы сделать спокойнее, уменьши эти значения.

## 8. Где менять дым

Дым задаётся классом `SmokeParticle`.

Главные параметры:

- `maxSmoke`: максимум частиц дыма одновременно.
- `Math.random() < 0.4`: частота рождения дыма от угасающего пламени.
- `this.radius`: стартовый размер дыма.
- `this.radius += 0.24`: скорость расширения.
- `this.vy`: скорость подъёма.
- `this.decay`: длительность жизни.
- `this.life * 0.1`: opacity дыма.
- `rgba(${density}, ${density}, ${density + 5}, ...)`: серый цвет дыма.
- `wind * 0.1`: сила влияния курсора/ветра.

Отдельного CSS blur для дыма нет: мягкость дыма создаётся прозрачностью и размером частиц.

## 9. Где менять цвета

Цвета задаются в нескольких местах:

- Внешнее пламя: `ctx.fillStyle = rgba(255, ${green}, ${blue}, ...)` в `FlameParticle.draw`.
- Внутреннее жёлтое ядро: `rgba(255, 235, 112, ...)` в `FlameParticle.draw`.
- Обычные искры: `rgba(255, ${this.green}, 50, ...)` в `SparkParticle.draw`.
- Искры верхушек: `rgba(255, ${this.green}, 40, ...)` в `FlameTipSpark.draw`.
- Дым: `rgba(${density}, ${density}, ${density + 5}, ...)` в `SmokeParticle.draw`.
- База костра: `gradient.addColorStop(...)` в `drawFireBase`.
- CSS glow: `.campfire-glow` в `src/app/globals.css`.
- Атмосферные overlay: `.split-section`, `.split-section::before`, `.split-section::after`.

Как менять характер огня:

- краснее: уменьшать зелёный канал (`green`) и усиливать красно-оранжевые `rgba(255, 80, 20, ...)`;
- желтее: увеличивать зелёный канал и яркость внутреннего ядра;
- мягче: уменьшать alpha, blur/contrast делать спокойнее;
- ярче: увеличивать alpha и glow opacity;
- темнее: уменьшать alpha и `--wisdom-bg-fire-glow`.

## 10. Где менять glow и блики

CSS glow задаётся в `src/app/globals.css`:

- `.campfire-glow`;
- `width` / `height`;
- `radial-gradient(...)`;
- `mix-blend-mode: screen`;
- `filter: blur(14px)`;
- `opacity: 0.9`.

Атмосферные блики и затемнения задаются переменными:

- `--wisdom-bg-fire-glow`;
- `--wisdom-bg-sunset-glow`;
- `--wisdom-bg-side-shadow`;
- `--wisdom-bg-bottom-vignette`.

Canvas-слой дополнительно имеет фильтр в `AnimatedCampfire.module.css`:

- `filter: blur(1.1px) contrast(1.28) saturate(1.08)`.

Чтобы ослабить glow, сначала уменьшай `opacity` у `.campfire-glow` и `--wisdom-bg-fire-glow`. Чтобы усилить, повышай их аккуратно.

## 11. Реакция на курсор

Реакция на курсор находится в `AnimatedCampfire.tsx`.

Как работает:

- `pointerScope = root.closest(".split-section") ?? root` выбирает область, где слушается движение курсора.
- `pointermove` вызывает `handlePointerMove`.
- `wind.target = clamp((pointerEvent.clientX - centerX) / 220, -2.2, 2.2)` рассчитывает силу ветра.
- `wind.current += (wind.target - wind.current) * 0.01` плавно догоняет целевое значение.
- `wind.target *= 0.985` постепенно возвращает ветер к нулю.
- Пламя, искры и дым получают `wind` в своих `update`.

Как менять:

- сильнее реакция: уменьшить делитель `220`, увеличить clamp `2.2`, увеличить множители `wind * ...` в частицах;
- слабее реакция: увеличить делитель `220`, уменьшить clamp, уменьшить множители `wind * ...`;
- полностью отключить: убрать обработчики `pointermove` / `pointerleave` или оставить `wind.target = 0`.

На устройствах с `pointer: coarse` реакция не применяется.

## 12. Desktop / Tablet / Mobile

Текущая стратегия:

- desktop: canvas-костёр включён;
- tablet до `980px`: canvas-костёр включён, но позиция и размер переопределены;
- mobile до `767px`: `.campfire-anchor` и `.campfire-glow` скрыты, остаётся только фоновое изображение секции.

Правила находятся в `src/app/globals.css`:

- `@media (max-width: 980px)`;
- `@media (max-width: 767px)`.

## 13. Reduced motion

Есть две защиты:

- В `AnimatedCampfire.tsx`: если `prefers-reduced-motion: reduce`, эффект не запускается.
- В `AnimatedCampfire.module.css`: при `prefers-reduced-motion: reduce` `.root` получает `display: none`.

Это важно для пользователей, которые отключили анимации на уровне системы.

## 14. Что безопасно менять

Обычно безопасно менять:

- `--campfire-x`, `--campfire-y`;
- `--campfire-width`, `--campfire-height`;
- `width` / `height` у `.root` в `AnimatedCampfire.module.css`;
- `opacity` и `filter` у `.campfire-glow`;
- цвета `rgba(...)`;
- `maxSparks`, `maxSmoke`, `maxFlames` в разумных пределах;
- частоту рождения искр/дыма;
- силу реакции на курсор;
- `fireBaseOffset` небольшими шагами.

## 15. Что менять опасно

Опасно менять без отдельной проверки:

- `devicePixelRatio`-логику;
- `ctx.setTransform`;
- `canvas.width` / `canvas.height` без понимания CSS-размеров;
- cleanup `requestAnimationFrame`;
- `ResizeObserver`;
- `z-index` без понимания порядка слоёв;
- `overflow` на `.section` / `.split-section`;
- mobile-стратегию;
- `pointer-events` у overlay-слоёв;
- `mix-blend-mode`, если не проверять на разных фонах.

## 16. Быстрые рецепты

### Как поднять костёр выше

В `src/app/globals.css` уменьши `--campfire-y`.

Если нужно поднять только внутреннее пламя внутри canvas, увеличь `fireBaseOffset` в `AnimatedCampfire.tsx`.

### Как сделать костёр больше

Увеличь `--campfire-width` и `--campfire-height` в `.split-section`.

### Как сделать пламя выше

В `FlameParticle` сделай `this.vy` более отрицательным и/или уменьши `this.decay`, чтобы частицы жили дольше.

### Как сделать искры активнее

Увеличь `maxSparks`, вероятность `Math.random() < 0.4` для `SparkParticle` или скорость `this.vy`.

### Как сделать glow слабее

Уменьши `opacity` у `.campfire-glow`, `--wisdom-bg-fire-glow` и/или alpha в radial-gradient.

### Как отключить курсорную реакцию

Самый простой способ: в `handlePointerMove` оставить `wind.target = 0` или убрать регистрацию `pointermove`.

### Как временно отключить весь костёр

В `home-page-client.tsx` временно убрать блок:

```tsx
<div className="campfire-anchor" aria-hidden="true">
  <AnimatedCampfire />
</div>
```

Также можно скрыть `.campfire-anchor` через CSS.

### Как проверить, не перекрывают ли огонь overlay-слои

В DevTools временно отключи:

- `.split-section::before`;
- `.split-section::after`;
- `.campfire-glow`.

Если canvas становится виднее, значит overlay/glow слишком сильные или z-index требует проверки.
