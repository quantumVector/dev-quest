<script setup lang="ts">

</script>

<template>
  <v-expansion-panels variant="accordion">
    <v-expansion-panel title="HTML">
      <v-expansion-panel-text>
        <v-list>
          <v-list-item to="/html/html-test">
            <v-list-item-title>1. HTML</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel title="CSS">
      <v-expansion-panel-text>
        <v-list>
          <v-list-item to="/css/css-test">
            <v-list-item-title>1. Специфичность селекторов</v-list-item-title>
          </v-list-item>
          <v-list-item to="/css/isolation-test">
            <v-list-item-title>2. Изоляция стилей</v-list-item-title>
          </v-list-item>
          <v-list-item to="/css/relative-units-test">
            <v-list-item-title>3. Относительные единицы измерения</v-list-item-title>
          </v-list-item>
          <v-list-item to="/css/flex-vs-grid-test">
            <v-list-item-title>4. Flex/Grid</v-list-item-title>
          </v-list-item>
          <v-list-item to="/css/transformations-test">
            <v-list-item-title>5. Трансформации</v-list-item-title>
          </v-list-item>
          <v-list-item to="/css/css-in-js-test">
            <v-list-item-title>6. CSS-in-JS</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel title="JavaScript">
      <v-expansion-panel-text>
        <v-list>
          <v-list-item to="/js/functions-test">
            <v-list-item-title>1. Функции</v-list-item-title>
          </v-list-item>
          <v-list-item to="/js/closures-test">
            <v-list-item-title>2. Замыкания</v-list-item-title>
          </v-list-item>
          <v-list-item to="/js/hoisting-test">
            <v-list-item-title>3. Hoisting</v-list-item-title>
          </v-list-item>
          <v-list-item to="/js/async-test">
            <v-list-item-title>4. Асинхронность</v-list-item-title>
          </v-list-item>
          <v-list-item to="/js/event-loop-test">
            <v-list-item-title>5. Event Loop</v-list-item-title>
          </v-list-item>
          <v-list-item to="/js/context-test">
            <v-list-item-title>6. Контекст выполнения</v-list-item-title>
          </v-list-item>
          <v-list-item to="/js/prototype-test">
            <v-list-item-title>7. Prototype</v-list-item-title>
          </v-list-item>
          <v-list-item to="/js/symbol-test">
            <v-list-item-title>8. Symbol</v-list-item-title>
          </v-list-item>
          <v-list-item to="/js/descriptors-test">
            <v-list-item-title>9. Дескрипторы свойств объектов</v-list-item-title>
          </v-list-item>
          <v-list-item to="/js/iterators-test">
            <v-list-item-title>10. Итераторы и Генераторы</v-list-item-title>
          </v-list-item>
          <v-list-item to="/js/module-systems-test">
            <v-list-item-title>11. Системы Модулей</v-list-item-title>
          </v-list-item>
          <v-list-item to="/js/regexp-test">
            <v-list-item-title>12. RegExp</v-list-item-title>
          </v-list-item>
          <v-list-item to="/js/dom-events-test">
            <v-list-item-title>13. События DOM</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel title="WebAPI">
      <v-expansion-panel-text>
        <v-list>
          <v-list-item to="/web-api-test/blob-and-file">
            <v-list-item-title>1. Blob и File</v-list-item-title>
          </v-list-item>
          <v-list-item to="/web-api-test/fetch-xhr">
            <v-list-item-title>2. Fetch API vs XMLHttpRequest</v-list-item-title>
          </v-list-item>
          <v-list-item to="/web-api-test/server-connection">
            <v-list-item-title>3. Поддержание соединения с сервером</v-list-item-title>
          </v-list-item>
          <v-list-item to="/web-api-test/intersection-observer">
            <v-list-item-title>4. IntersectionObserver</v-list-item-title>
          </v-list-item>
          <v-list-item to="/web-api-test/resize-observer">
            <v-list-item-title>5. ResizeObserver</v-list-item-title>
          </v-list-item>
          <v-list-item to="/web-api-test/mutation-observer">
            <v-list-item-title>6. MutationObserver</v-list-item-title>
          </v-list-item>
          <v-list-item to="/web-api-test/storage">
            <v-list-item-title>7. Web Storage API</v-list-item-title>
          </v-list-item>
          <v-list-item to="/web-api-test/web-api-raf-questions">
            <v-list-item-title>8. RequestAnimationFrame</v-list-item-title>
          </v-list-item>
          <v-list-item to="/web-api-test/performance-observer">
            <v-list-item-title>9. PerformanceObserver</v-list-item-title>
          </v-list-item>
          <v-list-item to="/web-api-test/web-workers">
            <v-list-item-title>10. Web Workers</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel title="TypeScript">
      <v-expansion-panel-text>
        <v-list>
          <v-list-item to="/typescript/pros-cons-test">
            <v-list-item-title>1. TypeScript: Плюсы и минусы</v-list-item-title>
          </v-list-item>
          <v-list-item to="/typescript/types-test">
            <v-list-item-title>2. Типы данных</v-list-item-title>
          </v-list-item>
          <v-list-item to="/typescript/interfaces-types-test">
            <v-list-item-title>3. Interfaces/Types</v-list-item-title>
          </v-list-item>
          <v-list-item to="/typescript/ts-narrowing-test">
            <v-list-item-title>4. Сужение типов</v-list-item-title>
          </v-list-item>
          <v-list-item to="/typescript/type-casting-test">
            <v-list-item-title>5. Приведение типов (Type Casting)</v-list-item-title>
          </v-list-item>
          <v-list-item to="/typescript/generics-test">
            <v-list-item-title>6. Generics</v-list-item-title>
          </v-list-item>
          <v-list-item to="/typescript/mapped-types-test">
            <v-list-item-title>7. Mapped Types</v-list-item-title>
          </v-list-item>
          <v-list-item to="/typescript/conditional-types-test">
            <v-list-item-title>8. Conditional Types</v-list-item-title>
          </v-list-item>
          <v-list-item to="/typescript/infer-types-test">
            <v-list-item-title>9. Infer Types</v-list-item-title>
          </v-list-item>
          <v-list-item to="/typescript/classes-decorators-test">
            <v-list-item-title>10. Классы и Декораторы</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel title="React">
      <v-expansion-panel-text>
        <v-list>
          <v-list-item to="/react/react-intro-test">
            <v-list-item-title>1. React</v-list-item-title>
          </v-list-item>
          <v-list-item to="/react/virtual-dom-test">
            <v-list-item-title>2. Virtual DOM</v-list-item-title>
          </v-list-item>
          <v-list-item to="/react/jsx-test">
            <v-list-item-title>3. JSX</v-list-item-title>
          </v-list-item>
          <v-list-item to="/react/react-events-test">
            <v-list-item-title>4. Events</v-list-item-title>
          </v-list-item>
          <v-list-item to="/react/ref-forwardref-test">
            <v-list-item-title>5. Ref и ForwardRef</v-list-item-title>
          </v-list-item>
          <v-list-item to="/react/memo-callback-test">
            <v-list-item-title>6. useMemo и useCallback</v-list-item-title>
          </v-list-item>
          <v-list-item to="/react/use-effect-flow-test">
            <v-list-item-title>7. useEffect Flow</v-list-item-title>
          </v-list-item>
          <v-list-item to="/react/rerender-causes-test">
            <v-list-item-title>8. Причины ререндеров</v-list-item-title>
          </v-list-item>
          <v-list-item to="/react/rerender-causes-test">
            <v-list-item-title>9. Оптимизация рендеринга</v-list-item-title>
          </v-list-item>
          <v-list-item to="/react/react-18-test">
            <v-list-item-title>10. React 18</v-list-item-title>
          </v-list-item>
          <v-list-item to="/react/react-19-test">
            <v-list-item-title>11. React 19</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel title="Web">
      <v-expansion-panel-text>
        <v-list>
          <v-list-item to="/web/http-test">
            <v-list-item-title>1. HTTP</v-list-item-title>
          </v-list-item>
          <v-list-item to="/web/cookie-test">
            <v-list-item-title>2. Cookie</v-list-item-title>
          </v-list-item>
          <v-list-item to="/web/cors-test">
            <v-list-item-title>3. CORS</v-list-item-title>
          </v-list-item>
          <v-list-item to="/web/xss-csrf-test">
            <v-list-item-title>4. XSS и CSRF</v-list-item-title>
          </v-list-item>
          <v-list-item to="/web/jwt-test">
            <v-list-item-title>5. JWT</v-list-item-title>
          </v-list-item>
          <v-list-item to="/web/oauth-test">
            <v-list-item-title>6. OAuth</v-list-item-title>
          </v-list-item>
          <v-list-item to="/web/sso-test">
            <v-list-item-title>7. SSO</v-list-item-title>
          </v-list-item>
          <v-list-item to="/web/web-vitals-test">
            <v-list-item-title>8. Web Vitals</v-list-item-title>
          </v-list-item>
          <v-list-item to="/web/web-chrome-test">
            <v-list-item-title>9. ChromeDevTools</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
