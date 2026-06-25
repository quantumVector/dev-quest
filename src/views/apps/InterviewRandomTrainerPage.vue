<script setup lang="ts">
import InterviewRandomTrainer from '@/components/apps/InterviewRandomTrainer.vue'
</script>

<template>
  <v-row justify="center">
    <v-col cols="12" md="10" lg="8">
      <h1 class="text-h4 font-weight-bold mb-3">Тренажер собеседований</h1>
      <p class="text-body-1 text-medium-emphasis mb-6">
        Отвечайте на случайные вопросы из базы собеседований и открывайте ответ, когда готовы
        свериться.
      </p>

      <InterviewRandomTrainer />
    </v-col>
  </v-row>
</template>
