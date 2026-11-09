<script setup lang="ts">
defineProps<{ loading: boolean; error: Error | null; notFound?: boolean }>()
defineEmits<{ retry: [] }>()
</script>

<template>
  <div v-if="loading" role="status" aria-live="polite" aria-busy="true">
    <p class="mb-4">Загрузка материалов…</p>
    <v-skeleton-loader type="heading, paragraph, paragraph" />
  </div>
  <div v-else-if="error" role="alert" class="article-surface">
    <h1>{{ notFound ? 'Статья не найдена' : 'Не удалось загрузить материалы' }}</h1>
    <p class="mb-6">{{ error.message }}</p>
    <div class="d-flex flex-wrap ga-3">
      <v-btn v-if="!notFound" variant="tonal" color="primary" @click="$emit('retry')"
        >Попробовать ещё раз</v-btn
      >
      <v-btn :to="{ name: 'home-v2' }" variant="text">К каталогу v2</v-btn>
    </div>
  </div>
</template>
