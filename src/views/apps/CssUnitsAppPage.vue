<script setup lang="ts">
import CssUnitsPlayground from '@/components/apps/CssUnitsPlayground.vue'
</script>

<template>
  <v-row justify="center">
    <v-col cols="12" md="11" lg="9">
      <h1 class="text-h4 font-weight-bold mb-3">Лаборатория относительных размеров</h1>
      <p class="text-body-1 text-medium-emphasis mb-6">
        Интерактивная демонстрация того, как браузер вычисляет <code>rem</code>, <code>em</code>,
        <code>clamp()</code> и <code>ch</code>.
      </p>

      <CssUnitsPlayground />
    </v-col>
  </v-row>
</template>
