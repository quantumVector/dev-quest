<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { webSSOQuestions } from '@/data/web-sso-questions'
</script>

<template>
  <UniversalTestPage
    :questions="webSSOQuestions"
    title="Тест по SSO (Single Sign-On)"
    description="50 вопросов по темам: Основы SSO, Процесс аутентификации, Авторизация, Преимущества для пользователей и владельцев, Безопасность, Реализация, Протоколы, Практические сценарии, Best Practices"
    :show-topic-breakdown="true"
  />
</template>
