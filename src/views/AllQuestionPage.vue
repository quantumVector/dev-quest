<script setup lang="ts">

</script>

<template>
  <v-expansion-panels variant="accordion">
    <v-expansion-panel title="HTML">
      <v-expansion-panel-text>
        <v-list>
          <v-list-item to="/html/what-is-html">
            <v-list-item-title>1. Что такое HTML и для чего он нужен?</v-list-item-title>
          </v-list-item>
          <v-list-item to="/html/semantic-html">
            <v-list-item-title>2. Что такое семантическая вёрстка?</v-list-item-title>
          </v-list-item>
          <v-list-item to="/html/accessibility">
            <v-list-item-title>3. Доступность в Web</v-list-item-title>
          </v-list-item>
          <v-list-item to="/html/responsive-image">
            <v-list-item-title>4. Как эффективно сделать адаптивное изображение в HTML?</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel title="CSS">
      <v-expansion-panel-text>
        <v-list>
          <v-list-subheader>Специфичность селекторов</v-list-subheader>
          <v-list-item to="/css/specificity">
            <v-list-item-title>1.1. Специфичность селекторов в CSS</v-list-item-title>
          </v-list-item>
          <v-list-subheader>Изоляция стилей</v-list-subheader>
          <v-list-item to="/css/style-isolation">
            <v-list-item-title>2.1. Какие проблемы решает изоляция стилей в CSS?</v-list-item-title>
          </v-list-item>
          <v-list-item to="/css/isolation-methods">
            <v-list-item-title>2.2. Какие методы или подходы можно использовать для изоляции стилей в CSS?</v-list-item-title>
          </v-list-item>
          <v-list-item to="/css/scoped-selectors">
            <v-list-item-title>2.3. Как работает использование селекторов с областью видимости (scoped selectors) для изоляции стилей?</v-list-item-title>
          </v-list-item>
          <v-list-item to="/css/isolation-libs">
            <v-list-item-title>2.4. Какие инструменты или библиотеки помогают в реализации изоляции стилей в CSS?</v-list-item-title>
          </v-list-item>
          <v-list-item to="/css/isolation-perfomance">
            <v-list-item-title>2.5. Как изоляция стилей влияет на производительность и сопровождаемость кода?</v-list-item-title>
          </v-list-item>
          <v-list-item to="/css/component-architecture">
            <v-list-item-title>2.6. Как изоляция стилей в CSS связана с компонентной архитектурой / WebComponents?</v-list-item-title>
          </v-list-item>
          <v-list-item to="/css/isolation-migration">
            <v-list-item-title>2.7. Как можно применить изоляцию стилей в проекте, который уже использует глобальные стили?</v-list-item-title>
          </v-list-item>
          <v-list-subheader>Единицы измерения</v-list-subheader>
          <v-list-item to="/css/relative-units">
            <v-list-item-title>3.1. Зачем нужны относительные единицы измерения? Какие плюсы и минусы видишь при использовании относительных единиц?</v-list-item-title>
          </v-list-item>
          <v-list-subheader>Flex/Grid</v-list-subheader>
          <v-list-item to="/css/flex-vs-grid">
            <v-list-item-title>4.1. В каких ситуациях лучше использовать Flex или Grid, в каких они не могут заменить друг друга?</v-list-item-title>
          </v-list-item>
          <v-list-subheader>Трансформации</v-list-subheader>
          <v-list-item to="/css/transformations">
            <v-list-item-title>5.1. Какие виды трансформаций можно применять в CSS и для чего они используются?</v-list-item-title>
          </v-list-item>
          <v-list-item to="/css/animatable-properties">
            <v-list-item-title>5.2. Какие свойства CSS можно анимировать с помощью трансформаций?</v-list-item-title>
          </v-list-item>
          <v-list-item to="/css/optimized-transform-animations">
            <v-list-item-title>5.3. Как можно оптимизировать анимации с использованием трансформаций для улучшения производительности?</v-list-item-title>
          </v-list-item>
          <v-list-item to="/css/hardware-acceleration">
            <v-list-item-title>5.4. Как использование аппаратного ускорения (hardware acceleration) может влиять на анимации с помощью трансформаций?</v-list-item-title>
          </v-list-item>
          <v-list-item to="/css/smooth-transform-animations">
            <v-list-item-title>5.5. Какие техники или подходы могут помочь достичь плавных и эффективных анимаций с использованием трансформаций?</v-list-item-title>
          </v-list-item>
          <v-list-subheader>CSS-In-JS</v-list-subheader>
          <v-list-item to="/css/css-in-js">
            <v-list-item-title>6.1. Какие техники или подходы могут помочь достичь плавных и эффективных анимаций с использованием трансформаций?</v-list-item-title>
          </v-list-item>
          <v-list-item to="/css/css-in-js-approaches">
            <v-list-item-title>6.2. Различия подходов к созданию и изменению стилей  в разных css-in-js библиотеках.</v-list-item-title>
          </v-list-item>
          <v-list-item to="/css/runtime-vs-pre-compile">
            <v-list-item-title>6.3. Что стоит выбирать и от чего отталкиваться. Runtime и pre-compile.</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel title="JavaScript">
      <v-expansion-panel-text>
        <v-list>
          <v-list-subheader>Функции</v-list-subheader>
          <v-list-item to="/js/functions">
            <v-list-item-title>1.1. Что такое функции?</v-list-item-title>
          </v-list-item>
          <v-list-item to="/js/types-of-functions">
            <v-list-item-title>1.2. Какие функции есть в JS?</v-list-item-title>
          </v-list-item>
          <v-list-item to="/js/functions-types">
            <v-list-item-title>1.3. Разница между FunctionDeclaration, FunctionExpression, ArrowFunction</v-list-item-title>
          </v-list-item>
          <v-list-subheader>Замыкания</v-list-subheader>
          <v-list-item to="/js/closures">
            <v-list-item-title>2.1. Что такое замыкание?</v-list-item-title>
          </v-list-item>
          <v-list-item to="/js/lexical-environment">
            <v-list-item-title>2.2. Лексическое окружение (LexicalEnvironment) переменной?</v-list-item-title>
          </v-list-item>
          <v-list-item to="/js/lexical-environment-moment">
            <v-list-item-title>2.3. В какой момент создаётся лексическое окружение функции (в момент создания или выполнения)?</v-list-item-title>
          </v-list-item>
          <v-list-subheader>Поднятие (Hoisting)</v-list-subheader>
          <v-list-item to="/js/hoisting">
            <v-list-item-title>3.1. Какие конструкции всплывают в JS?</v-list-item-title>
          </v-list-item>
          <v-list-item to="/js/hoisting-var-const-let">
            <v-list-item-title>3.2. Можем ли мы обращаться к переменной var до её определения в коде, можем ли это сделать для const, var?</v-list-item-title>
          </v-list-item>
          <v-list-subheader>Асинхронность</v-list-subheader>
          <v-list-item to="/async/async-js">
            <v-list-item-title>4.1. Для чего нам нужна асинхронность?</v-list-item-title>
          </v-list-item>
          <v-list-item to="/async/promises">
            <v-list-item-title>4.2. Как осуществлялась работы до введения промисов. Какие состояния есть у промисов?</v-list-item-title>
          </v-list-item>
          <v-list-item to="/async/promise-collections">
            <v-list-item-title>4.3. Как вызвать итерируемую коллекцию промисов сразу</v-list-item-title>
          </v-list-item>
          <v-list-item to="/async/race-any-all-settled">
            <v-list-item-title>4.4. Promise.race/any/allSettled</v-list-item-title>
          </v-list-item>
          <v-list-subheader>Event Loop</v-list-subheader>
          <v-list-item to="/event-loop/event-loop">
            <v-list-item-title>5.1. Как работает Event Loop в JavaScript?</v-list-item-title>
          </v-list-item>
          <v-list-item to="/event-loop/event-loop-req-animation-frame">
            <v-list-item-title>5.2. requestAnimationFrame и Event Loop</v-list-item-title>
          </v-list-item>
          <v-list-subheader>Context</v-list-subheader>
          <v-list-item to="/context/context">
            <v-list-item-title>6.1. Что такое контекст?</v-list-item-title>
          </v-list-item>
          <v-list-item to="/context/this">
            <v-list-item-title>6.2. Ключевое слово this</v-list-item-title>
          </v-list-item>
          <v-list-item to="/context/context-binding">
            <v-list-item-title>6.3. Способы привязки контекста (call, bind, apply)</v-list-item-title>
          </v-list-item>
          <v-list-item to="/context/partial-bind">
            <v-list-item-title>6.4. Частичное применение и bind()</v-list-item-title>
          </v-list-item>
          <v-list-subheader>Prototype</v-list-subheader>
          <v-list-item to="/prototype/prototype">
            <v-list-item-title>7.1. Что такое prototype?</v-list-item-title>
          </v-list-item>
          <v-list-item to="/prototype/proto-vs-prototype">
            <v-list-item-title>7.2. Разницам между __proto__ и prototype?</v-list-item-title>
          </v-list-item>
          <v-list-item to="/prototype/global-prototypes-problems">
            <v-list-item-title>7.3. Проблемы использования прототипов у глобальных объектов</v-list-item-title>
          </v-list-item>
          <v-list-subheader>Symbol</v-list-subheader>
          <v-list-item to="/symbol/symbol">
            <v-list-item-title>8.1. Symbol: уникальные идентификаторы</v-list-item-title>
          </v-list-item>
          <v-list-item to="/symbol/global-and-system-symbol">
            <v-list-item-title>8.2. Глобальный реестр символов и системные символы</v-list-item-title>
          </v-list-item>
          <v-list-subheader>Object Flags Descriptors Get Set</v-list-subheader>
          <v-list-item to="/descriptor/object-flags-descriptors">
            <v-list-item-title>
              9.1. Какие есть флаги у свойств объектов (writable, enumerable, configurable)
            </v-list-item-title>
          </v-list-item>
          <v-list-item to="/descriptor/object-flags-descriptors-changes">
            <v-list-item-title>
              9.2. Получение дескриптора. Изменение флага
            </v-list-item-title>
          </v-list-item>
          <v-list-subheader>Итерируемые Конструкции</v-list-subheader>
          <v-list-item to="/iterators-and-generators/iterators-and-generators">
            <v-list-item-title>
              10. Iterators, Generators, Async Iterators/Generators
            </v-list-item-title>
          </v-list-item>
          <v-list-subheader>WebComponents</v-list-subheader>
          <v-list-item to="/web-components/web-components">
            <v-list-item-title>
              11.1 Templates, Shadow DOM
            </v-list-item-title>
          </v-list-item>
          <v-list-item to="/web-components/web-components-second">
            <v-list-item-title>
              11.2 customEvents, customElements
            </v-list-item-title>
          </v-list-item>
          <v-list-subheader>Системы Модулей</v-list-subheader>
          <v-list-item to="/module-systems/module-systems">
            <v-list-item-title>
              12. Какие системы модулей в JS известны? В чём между ними разница?
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel title="Docker">
      <v-expansion-panel-text>
        <v-list>
          <v-list-item to="/docker/docker">
            <v-list-item-title>1. Что такое docker? Что такое образ и контейнер и чем отличаются?</v-list-item-title>
          </v-list-item>
          <v-list-item to="/docker/dockerfile">
            <v-list-item-title>2. Что такое Dockerfile, контекст сборки и зачем нужен .dockerignore?</v-list-item-title>
          </v-list-item>
          <v-list-item to="/docker/layers-and-cache">
            <v-list-item-title>3. Слои, кэш и оптимизация сборки</v-list-item-title>
          </v-list-item>
          <v-list-item to="/docker/run-cmd-entrypoint">
            <v-list-item-title>4. RUN vs CMD vs ENTRYPOINT</v-list-item-title>
          </v-list-item>
          <v-list-item to="/docker/multi-stage">
            <v-list-item-title>5. Multi-stage Docker builds: React SPA vs Next.js SSR</v-list-item-title>
          </v-list-item>
          <v-list-item to="/docker/env-arg">
            <v-list-item-title>6. ENV vs ARG в Docker и переменные в React</v-list-item-title>
          </v-list-item>
          <v-list-item to="/docker/networks-and-ports">
            <v-list-item-title>7. EXPOSE vs -p, типы сетей Docker: bridge, host</v-list-item-title>
          </v-list-item>
          <v-list-item to="/docker/volumes-vs-bind-mounts">
            <v-list-item-title>8. Docker Volume vs Bind Mount + Hot Reload в разработке</v-list-item-title>
          </v-list-item>
          <v-list-item to="/docker/nginx-spa">
            <v-list-item-title>9. Nginx для SPA: зачем try_files $uri /index.html</v-list-item-title>
          </v-list-item>
          <v-list-item to="/docker/debugging">
            <v-list-item-title>10. Отладка Docker: логи, exec и healthcheck</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
