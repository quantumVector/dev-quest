<script setup lang="ts">
import CssSpecificityTrainer from '@/components/apps/CssSpecificityTrainer.vue'
</script>

<template>
  <v-row justify="center">
    <v-col cols="12" md="10" lg="8">
      <h1 class="text-h4 font-weight-bold mb-3">Калькулятор специфичности CSS</h1>
      <p class="text-body-1 text-medium-emphasis mb-6">
        Считайте специфичность случайных селекторов и сразу сверяйте ответ с разбором.
      </p>

      <CssSpecificityTrainer />
    </v-col>
  </v-row>
</template>
