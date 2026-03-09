<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-css.js'
import 'prismjs/components/prism-javascript.js'

const snippetTransformTypes = `
/* 2D трансформации */
.card {
  transform: translateY(-10px) scale(1.02) rotate(2deg);
  transition: transform 0.3s ease;
}

/* 3D трансформации — нужен контекст */
.flip-container {
  perspective: 1000px;
}
.flip-card {
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
}
.flip-card:hover {
  transform: rotateY(180deg);
}
.flip-card-back {
  transform: rotateY(180deg);
  backface-visibility: hidden;
}
`

const snippetAnimatable = `
/* ✅ Анимируемые свойства — плавный переход */
.box {
  transform: scale(1);
  transform-origin: top left;
  perspective: 1000px;
  perspective-origin: 50% 50%;
  transition: transform 0.3s ease, perspective 0.3s ease;
}
.box:hover {
  transform: scale(1.2) rotate(10deg);
  perspective: 600px;
}

/* ❌ Неанимируемые — мгновенный переход, transition бессмысленен */
.non-animatable {
  transform-style: flat;
  backface-visibility: visible;
  transition: transform-style 0.3s; /* не сработает */
}
.non-animatable:hover {
  transform-style: preserve-3d;    /* резкий скачок */
  backface-visibility: hidden;     /* резкий скачок */
}
`

const snippetGPU = `
/* ❌ Медленно — вызывает Layout + Paint + Composite на CPU */
.slow {
  transition: left 0.3s ease, width 0.3s ease, background 0.3s ease;
}

/* ✅ Быстро — только Composite на GPU */
.fast {
  will-change: transform;
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.fast:hover {
  transform: translate3d(100px, 0, 0) scale(1.1);
  opacity: 0.9;
}

/* Управление will-change через JS — включаем только перед анимацией */
/* element.style.willChange = 'transform';          */
/* element.addEventListener('transitionend', () => {*/
/*   element.style.willChange = 'auto';             */
/* });                                              */
`

const snippetOptimization = `
/* Intersection Observer — анимируем только видимые элементы */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      el.style.willChange = 'transform, opacity';
      el.style.transform = 'translateY(0)';
      el.style.opacity = '1';

      el.addEventListener('transitionend', () => {
        el.style.willChange = 'auto'; /* освобождаем GPU память */
      }, { once: true });

      observer.unobserve(el);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.lazy-animate').forEach(el => {
  el.style.transform = 'translateY(40px)';
  el.style.opacity = '0';
  el.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
  observer.observe(el);
});
`

const snippetA11y = `
/* Уважаем системные настройки пользователя */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Hover-эффекты только для устройств с точным указателем */
@media (hover: hover) and (pointer: fine) {
  .card:hover {
    transform: translateY(-8px) scale(1.02);
  }
}

/* CSS Containment — изолируем влияние анимации на соседние элементы */
.animation-container {
  contain: layout style paint;
}
`

const h1 = ref('')
const h2 = ref('')
const h3 = ref('')
const h4 = ref('')
const h5 = ref('')

onMounted(() => {
  h1.value = Prism.highlight(snippetTransformTypes, Prism.languages.css, 'css')
  h2.value = Prism.highlight(snippetAnimatable, Prism.languages.css, 'css')
  h3.value = Prism.highlight(snippetGPU, Prism.languages.css, 'css')
  h4.value = Prism.highlight(snippetOptimization, Prism.languages.javascript, 'javascript')
  h5.value = Prism.highlight(snippetA11y, Prism.languages.css, 'css')
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">

            <h1 class="text-h4 font-weight-bold mb-6">
              CSS трансформации: виды, анимируемость, GPU-ускорение и оптимизация
            </h1>

            <p class="font-weight-regular mb-8">
              CSS-трансформации — один из ключевых инструментов современного фронтенда. Они позволяют
              перемещать, вращать, масштабировать и искажать элементы без влияния на поток документа,
              а при правильном применении обеспечивают плавные 60fps-анимации даже на слабых устройствах.
              В этой статье разберём всё: от видов трансформаций до тонкостей GPU-ускорения и доступности.
            </p>

            <!-- 1. Виды трансформаций -->
            <h2 class="text-h5 font-weight-bold mb-3">Виды трансформаций</h2>

            <p class="font-weight-regular mb-4">
              Все трансформации задаются через единственное свойство <code>transform</code>, которое
              принимает одну или несколько функций через пробел. Важно: порядок функций имеет значение —
              каждая следующая применяется к результату предыдущей, поэтому
              <code>translateX(100px) rotate(45deg)</code> и <code>rotate(45deg) translateX(100px)</code>
              дают разный визуальный результат.
            </p>

            <v-table density="comfortable" class="mb-6">
              <thead>
              <tr>
                <th class="font-weight-bold">Тип</th>
                <th class="font-weight-bold">Основные функции</th>
                <th class="font-weight-bold">Типичное применение</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>Translate</b></td>
                <td class="pt-2 pb-2"><code>translateX/Y/Z()</code>, <code>translate()</code>, <code>translate3d()</code></td>
                <td class="pt-2 pb-2">Плавное перемещение, hover-смещения, слайдеры</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Rotate</b></td>
                <td class="pt-2 pb-2"><code>rotate()</code>, <code>rotateX/Y/Z()</code>, <code>rotate3d()</code></td>
                <td class="pt-2 pb-2">Спиннеры, flip-карточки, иконки раскрытия меню</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Scale</b></td>
                <td class="pt-2 pb-2"><code>scale()</code>, <code>scaleX/Y/Z()</code>, <code>scale3d()</code></td>
                <td class="pt-2 pb-2">Zoom-эффекты, нажатие кнопок, акцентирование</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Skew</b></td>
                <td class="pt-2 pb-2"><code>skewX/Y()</code>, <code>skew()</code></td>
                <td class="pt-2 pb-2">Декоративные наклоны, параллелограммы</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Matrix</b></td>
                <td class="pt-2 pb-2"><code>matrix()</code>, <code>matrix3d()</code></td>
                <td class="pt-2 pb-2">Математически точные комбинированные трансформации</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Perspective</b></td>
                <td class="pt-2 pb-2"><code>perspective()</code></td>
                <td class="pt-2 pb-2">Создание глубины для 3D-дочерних элементов</td>
              </tr>
              </tbody>
            </v-table>

            <p class="font-weight-regular mb-4">
              Для 3D-трансформаций необходимо создать трёхмерный контекст. Это делается двумя способами:
              свойство <code>perspective</code> на родителе задаёт расстояние от наблюдателя до плоскости Z=0,
              а <code>transform-style: preserve-3d</code> позволяет дочерним элементам существовать
              в трёхмерном пространстве родителя, а не быть спроецированными на плоскость. Без этих
              двух свойств 3D-функции вроде <code>rotateY()</code> работают некорректно или вовсе не видны.
            </p>

            <p class="font-weight-regular mb-4">
              Свойство <code>transform-origin</code> определяет точку, относительно которой применяется
              трансформация. По умолчанию это центр элемента (<code>50% 50%</code>). Изменение origin
              кардинально меняет визуальный результат: вращение с <code>transform-origin: top left</code>
              будет выглядеть как «распахивание двери», а не «вращение на месте». В 3D у свойства есть
              третья координата Z.
            </p>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="h1"></code></pre>

            <!-- 2. Анимируемые свойства -->
            <h2 class="text-h5 font-weight-bold mb-3">Какие свойства трансформаций можно анимировать</h2>

            <p class="font-weight-regular mb-4">
              Не все свойства из семейства трансформаций поддерживают плавную интерполяцию. Браузер
              умеет плавно переходить между двумя состояниями только тогда, когда значения можно
              математически интерполировать — то есть вычислить промежуточные состояния. Свойства,
              принимающие только ключевые слова (<code>flat</code> / <code>preserve-3d</code>,
              <code>visible</code> / <code>hidden</code>), интерполировать невозможно, поэтому
              transition на них игнорируется.
            </p>

            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="success" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-3">✅ Анимируемые</h3>
                  <ul class="pl-4">
                    <li class="mb-2">
                      <code>transform</code> — интерполируется как матрица; браузер находит
                      промежуточные значения для каждой функции
                    </li>
                    <li class="mb-2">
                      <code>transform-origin</code> — координаты интерполируются независимо,
                      создавая эффект «плавающей оси»
                    </li>
                    <li class="mb-2">
                      <code>perspective</code> — числовое значение в px, легко интерполируется;
                      позволяет динамически менять «выпуклость» 3D-сцены
                    </li>
                    <li>
                      <code>perspective-origin</code> — координаты точки наблюдателя интерполируются
                      как числа
                    </li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="error" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-3">❌ Неанимируемые</h3>
                  <ul class="pl-4">
                    <li class="mb-2">
                      <code>transform-style</code> — переключает между <code>flat</code>
                      и <code>preserve-3d</code>; переход мгновенный
                    </li>
                    <li class="mb-2">
                      <code>backface-visibility</code> — переключает между <code>visible</code>
                      и <code>hidden</code>; переход мгновенный
                    </li>
                    <li>
                      <code>will-change</code> — служебная подсказка браузеру, не визуальное
                      свойство; анимация бессмысленна
                    </li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <v-alert type="warning" class="mb-4">
              <v-alert-title>Важная особенность transform</v-alert-title>
              Нельзя анимировать отдельные функции внутри <code>transform</code> с разными таймингами.
              Всё, что записано в одном свойстве, анимируется как единое целое. Если нужны независимые
              тайминги для translateX и rotate — используйте вложенные элементы, каждый со своим
              <code>transition: transform</code>.
            </v-alert>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="h2"></code></pre>

            <!-- 3. GPU-ускорение -->
            <h2 class="text-h5 font-weight-bold mb-3">Аппаратное ускорение и композитные слои</h2>

            <p class="font-weight-regular mb-4">
              Браузер рендерит страницу в три этапа: <b>Layout</b> (вычисление позиций и размеров),
              <b>Paint</b> (растеризация пикселей) и <b>Composite</b> (склейка слоёв на GPU).
              Анимация свойств вроде <code>left</code>, <code>width</code> или <code>background</code>
              запускает весь конвейер с самого начала — это дорого. Анимация <code>transform</code>
              и <code>opacity</code> пропускает Layout и Paint и работает только на этапе Composite,
              который выполняется на GPU в отдельном потоке, не блокируя главный.
            </p>

            <p class="font-weight-regular mb-4">
              Чтобы элемент обрабатывался на GPU, браузер должен вынести его в отдельный
              <b>композитный слой</b>. Это происходит автоматически при наличии 3D-трансформаций,
              <code>opacity &lt; 1</code>, <code>filter</code>, <code>position: fixed</code>.
              Принудительно создать слой можно через <code>will-change: transform</code> (современный
              стандартный способ) или старый хак <code>transform: translateZ(0)</code> /
              <code>translate3d(0,0,0)</code>.
            </p>

            <v-alert type="warning" class="mb-4">
              <v-alert-title>Layer explosion</v-alert-title>
              Каждый композитный слой потребляет GPU-память. Если навесить
              <code>will-change: transform</code> на все элементы подряд, это может привести к
              исчерпанию памяти и падению производительности — особенно на мобильных устройствах.
              Создавайте слои только для активно анимируемых элементов и удаляйте
              <code>will-change</code> после завершения анимации.
            </v-alert>

            <v-table density="comfortable" class="mb-6">
              <thead>
              <tr>
                <th class="font-weight-bold">Свойство</th>
                <th class="font-weight-bold">GPU-ускорение</th>
                <th class="font-weight-bold">Этапы рендеринга</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><code>transform</code></td>
                <td class="pt-2 pb-2"><v-chip color="success" size="small">✅ Полное</v-chip></td>
                <td class="pt-2 pb-2">Только Composite</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>opacity</code></td>
                <td class="pt-2 pb-2"><v-chip color="success" size="small">✅ Полное</v-chip></td>
                <td class="pt-2 pb-2">Только Composite</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>filter</code></td>
                <td class="pt-2 pb-2"><v-chip color="success" size="small">✅ Полное</v-chip></td>
                <td class="pt-2 pb-2">Composite (иногда + Paint)</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>background-color</code></td>
                <td class="pt-2 pb-2"><v-chip color="warning" size="small">⚠️ Нет</v-chip></td>
                <td class="pt-2 pb-2">Paint + Composite</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>left / top</code></td>
                <td class="pt-2 pb-2"><v-chip color="error" size="small">❌ Нет</v-chip></td>
                <td class="pt-2 pb-2">Layout + Paint + Composite</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>width / height</code></td>
                <td class="pt-2 pb-2"><v-chip color="error" size="small">❌ Нет</v-chip></td>
                <td class="pt-2 pb-2">Layout + Paint + Composite</td>
              </tr>
              </tbody>
            </v-table>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="h3"></code></pre>

            <!-- 4. Оптимизация -->
            <h2 class="text-h5 font-weight-bold mb-3">Оптимизация анимаций</h2>

            <p class="font-weight-regular mb-4">
              Даже при использовании <code>transform</code> анимации можно организовать неэффективно.
              Разберём ключевые техники.
            </p>

            <p class="font-weight-regular mb-2"><b>will-change</b></p>
            <p class="font-weight-regular mb-4">
              Это подсказка браузеру: «этот элемент скоро изменится». Браузер может заранее вынести
              элемент на GPU-слой и подготовить оптимизации. Добавляйте его непосредственно перед
              анимацией (например, на <code>:hover</code> родителя или через JS) и удаляйте сразу
              после завершения, слушая событие <code>transitionend</code>.
            </p>

            <p class="font-weight-regular mb-2"><b>requestAnimationFrame</b></p>
            <p class="font-weight-regular mb-4">
              Для JS-анимаций всегда используйте <code>requestAnimationFrame</code>. Он синхронизирует
              обновления с частотой обновления экрана (обычно 60 Гц) и не блокирует главный поток.
              Важно батчить все изменения стилей внутри одного колбэка — не читайте вычисленные
              стили и сразу не пишите новые в одном кадре, это вызывает принудительный reflow
              (т.н. layout thrashing).
            </p>

            <p class="font-weight-regular mb-2"><b>CSS Containment</b></p>
            <p class="font-weight-regular mb-4">
              Свойство <code>contain: layout style paint</code> изолирует элемент от остальной страницы:
              браузер знает, что изменения внутри контейнера не влияют на внешние элементы, и не
              пересчитывает их. Для анимированных списков и карточек это даёт ощутимый прирост
              производительности.
            </p>

            <p class="font-weight-regular mb-2"><b>Intersection Observer для ленивых анимаций</b></p>
            <p class="font-weight-regular mb-4">
              Не имеет смысла держать <code>will-change</code> на элементах, которые пользователь
              ещё не видит. Intersection Observer позволяет включать анимацию только в момент попадания
              элемента в viewport и сразу отключать GPU-слой после завершения перехода.
            </p>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="h4"></code></pre>

            <!-- 5. Доступность -->
            <h2 class="text-h5 font-weight-bold mb-3">Доступность и адаптивность</h2>

            <p class="font-weight-regular mb-4">
              У части пользователей есть вестибулярные нарушения, при которых движущиеся объекты
              на экране вызывают физический дискомфорт или тошноту. Операционные системы предоставляют
              системную настройку «Уменьшить движение», которую браузер транслирует через медиазапрос
              <code>prefers-reduced-motion: reduce</code>. Это не опция — это требование к доступному
              интерфейсу: при включённой настройке анимации должны либо отключаться, либо заменяться
              мгновенными переходами.
            </p>

            <p class="font-weight-regular mb-4">
              Также стоит разграничивать hover-эффекты: на сенсорных экранах состояние <code>:hover</code>
              ведёт себя непредсказуемо. Медиазапрос <code>(hover: hover) and (pointer: fine)</code>
              позволяет применять эффекты наведения только на устройствах с точным указателем —
              то есть там, где пользователь действительно может навести курсор.
            </p>

            <p class="font-weight-regular mb-4">
              CSS Containment, помимо оптимизации, полезен и для изоляции анимаций: он гарантирует,
              что анимированный элемент не спровоцирует нежелательные сдвиги соседних элементов.
            </p>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="h5"></code></pre>

            <!-- 6. Вопросы -->
            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>

            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Почему transform быстрее, чем изменение left/top?</p>
                <p class="font-weight-regular ma-0">
                  Потому что <code>transform</code> обрабатывается только на этапе Composite — на GPU,
                  в отдельном потоке. Изменение <code>left</code> / <code>top</code> запускает полный
                  конвейер: Layout → Paint → Composite на CPU, что блокирует главный поток и вызывает
                  просадки FPS.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можно ли анимировать translateX и rotate с разными таймингами?</p>
                <p class="font-weight-regular ma-0">
                  Напрямую — нет. Всё, что записано в <code>transform</code> одного элемента,
                  анимируется единым transition. Для независимых таймингов нужны вложенные элементы:
                  внешний анимирует translate, внутренний — rotate, каждый со своим
                  <code>transition: transform</code>.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чём разница между will-change и translateZ(0)?</p>
                <p class="font-weight-regular ma-0">
                  Оба создают композитный слой, но <code>will-change</code> — семантичный современный
                  стандарт: он описывает намерение, а не взламывает поведение. <code>translateZ(0)</code>
                  — хак, который работает через побочный эффект 3D-контекста. На практике сегодня
                  предпочтителен <code>will-change</code>.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое layer explosion и как его избежать?</p>
                <p class="font-weight-regular ma-0">
                  Это ситуация, когда на странице создаётся слишком много GPU-слоёв, что исчерпывает
                  видеопамять и парадоксально ухудшает производительность. Решение: добавлять
                  <code>will-change</code> только непосредственно перед анимацией и удалять его сразу
                  после через <code>transitionend</code> / <code>animationend</code>.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Влияет ли порядок функций в transform на результат?</p>
                <p class="font-weight-regular ma-0">
                  Да, критически. Трансформации применяются справа налево в системе координат.
                  <code>translate(100px, 0) rotate(45deg)</code> — сначала сдвиг, потом поворот
                  в исходной системе координат. <code>rotate(45deg) translate(100px, 0)</code> —
                  сдвиг на 100px по уже повёрнутой оси X, что даёт совершенно другое положение.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Почему transform-style и backface-visibility нельзя анимировать?</p>
                <p class="font-weight-regular ma-0">
                  Эти свойства принимают только ключевые слова без промежуточных значений.
                  Браузер не может интерполировать между <code>flat</code> и <code>preserve-3d</code>
                  — нет математической операции для «50% между ними». Поэтому transition игнорируется,
                  и переход происходит мгновенно.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как проверить GPU-слои в DevTools?</p>
                <p class="font-weight-regular ma-0">
                  В Chrome DevTools: вкладка Rendering → включить «Layer borders» (синие рамки —
                  плиточные слои, оранжевые — композитные). Вкладка Layers даёт полноценный 3D-обзор
                  всех слоёв страницы с информацией о причине создания каждого. В Performance tab
                  видно GPU Activity во время записи.
                </p>
              </li>
            </ol>

            <!-- Итог -->
            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>

            <v-card class="pa-4 mb-6" color="info" variant="tonal">
              <p class="font-weight-bold mb-2">Ключевые выводы</p>
              <ul class="pl-4 mb-0">
                <li class="mb-1">Анимируйте только <code>transform</code> и <code>opacity</code> — они работают на GPU и не вызывают Layout/Paint</li>
                <li class="mb-1">Из связанных свойств анимируемы: <code>transform</code>, <code>transform-origin</code>, <code>perspective</code>, <code>perspective-origin</code></li>
                <li class="mb-1">Неанимируемы: <code>transform-style</code>, <code>backface-visibility</code>, <code>will-change</code></li>
                <li class="mb-1">Порядок функций в <code>transform</code> определяет визуальный результат</li>
                <li class="mb-1">Создавайте GPU-слои через <code>will-change</code> только перед анимацией и удаляйте после</li>
                <li class="mb-1">Изолируйте анимации через <code>contain: layout style paint</code></li>
                <li>Всегда поддерживайте <code>prefers-reduced-motion</code> и разграничивайте hover для touch-устройств</li>
              </ul>
            </v-card>

            <div class="d-flex gap-2 justify-end">
              <v-btn
                color="second"
                size="small"
                variant="elevated"
                href="https://web.dev/animations-guide/"
                target="_blank">
                Web.dev Animations Guide
              </v-btn>
              <v-btn
                color="second"
                size="small"
                variant="elevated"
                href="https://csstriggers.com/"
                target="_blank">
                CSS Triggers Reference
              </v-btn>
            </div>

          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
