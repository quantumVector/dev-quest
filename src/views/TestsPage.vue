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
        </v-list>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
