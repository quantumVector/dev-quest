<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { aiDevelopmentQuestions } from '@/data/ai-development-questions'
</script>

<template>
  <v-container class="pb-0">
    <div class="d-flex flex-wrap ga-2">
      <v-btn to="/tests" variant="text" prepend-icon="mdi-arrow-left">Все тесты</v-btn>
      <v-btn to="/?section=ai-development" variant="text">Повторить материалы AI</v-btn>
    </div>
  </v-container>
  <UniversalTestPage
    :questions="aiDevelopmentQuestions"
    title="Тест: AI-ассистированная разработка"
    :description="`${aiDevelopmentQuestions.length} вопросов по всему разделу: устройство LLM, фреймворк 4D, работа с Codex, процессы и автоматизация.`"
    :show-topic-breakdown="true"
  />
</template>
