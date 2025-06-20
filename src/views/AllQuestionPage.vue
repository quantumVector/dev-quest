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
          <v-list-item to="/css/specificity">
            <v-list-item-title>5. Специфичность селекторов в CSS</v-list-item-title>
          </v-list-item>
          <v-list-item to="/css/style-isolation">
            <v-list-item-title>6. Какие проблемы решает изоляция стилей в CSS?</v-list-item-title>
          </v-list-item>
          <v-list-item to="/css/isolation-methods">
            <v-list-item-title>7. Какие методы или подходы можно использовать для изоляции стилей в CSS?</v-list-item-title>
          </v-list-item>
          <v-list-item to="/css/scoped-selectors">
            <v-list-item-title>8. Как работает использование селекторов с областью видимости (scoped selectors) для изоляции стилей?</v-list-item-title>
          </v-list-item>
          <v-list-item to="/css/isolation-libs">
            <v-list-item-title>9. Какие инструменты или библиотеки помогают в реализации изоляции стилей в CSS?</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
