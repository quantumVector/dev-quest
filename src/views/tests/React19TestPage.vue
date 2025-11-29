<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { react19Questions } from '@/data/react-19-questions'
</script>

<template>
  <UniversalTestPage
    :questions="react19Questions"
    title="Тест по React 19"
    description="50 вопросов по темам: React Compiler, Actions и useActionState, useOptimistic, use() хук, ref как проп, улучшения гидратации, Document Metadata, обработка ошибок, Context, новые возможности"
    :show-topic-breakdown="true"
  />
</template>
