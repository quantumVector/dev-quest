<script setup lang="ts">
import { liveCodingCatalog } from '@/data/live-coding/catalog'
import { liveCodingDifficulties, liveCodingLanguages } from '@/types/live-coding'

const availableCount = liveCodingCatalog.filter((task) => task.available).length
</script>

<template>
  <v-row justify="center">
    <v-col cols="12" md="10" lg="8">
      <header class="mb-8">
        <div class="text-overline text-primary mb-2">Практика · самостоятельно</div>
        <h1 class="text-h4 font-weight-bold mb-3">Frontend Live Coding</h1>
        <p class="text-body-1 text-medium-emphasis mb-4">
          Выберите задачу и попробуйте решить её в своём редакторе. Если застрянете, откройте
          подсказку, а затем сравните свой подход с полным решением.
        </p>
        <p class="text-body-2 text-medium-emphasis mb-4">
          Задачи с пометкой «Скоро» появятся постепенно. Их условия и решения ещё готовятся.
        </p>
        <div class="d-flex flex-wrap ga-2">
          <v-chip size="small" variant="tonal">Задач: {{ liveCodingCatalog.length }}</v-chip>
          <v-chip size="small" color="success" variant="tonal">
            Доступно: {{ availableCount }}
          </v-chip>
          <v-chip size="small" variant="tonal">
            Скоро: {{ liveCodingCatalog.length - availableCount }}
          </v-chip>
          <v-chip size="small" variant="outlined">JS для алгоритмов · TS/TSX для React</v-chip>
        </div>
      </header>

      <v-list
        tag="nav"
        role="navigation"
        class="task-list pa-0"
        aria-label="Задачи Frontend Live Coding"
      >
        <v-list-item
          v-for="task in liveCodingCatalog"
          :key="task.slug"
          :to="
            task.available
              ? { name: 'frontend-live-coding-task', params: { slug: task.slug } }
              : undefined
          "
          :link="task.available"
          :aria-disabled="!task.available || undefined"
          class="task-item pa-4 mb-3 rounded-lg"
          lines="three"
        >
          <template #prepend>
            <v-avatar color="primary" variant="tonal" size="40" class="task-number">
              {{ task.id }}
            </v-avatar>
          </template>

          <v-list-item-title class="task-title text-subtitle-1 font-weight-bold mb-2">
            {{ task.title }}
          </v-list-item-title>
          <p class="text-body-2 text-medium-emphasis mb-3">{{ task.summary }}</p>
          <div class="d-flex flex-wrap ga-2">
            <v-chip v-if="!task.available" size="x-small" color="secondary" variant="tonal">
              Скоро
            </v-chip>
            <v-chip :color="liveCodingDifficulties[task.difficulty].color" size="x-small">
              {{ liveCodingDifficulties[task.difficulty].label }}
            </v-chip>
            <v-chip size="x-small" variant="outlined">
              {{ liveCodingLanguages[task.language] }}
            </v-chip>
            <v-chip v-if="task.hasTypeScriptSolution" size="x-small" variant="outlined">
              + TypeScript
            </v-chip>
            <v-chip v-for="tag in task.tags" :key="tag" size="x-small" variant="text">
              {{ tag }}
            </v-chip>
          </div>

          <template #append>
            <v-icon
              :icon="task.available ? 'mdi-chevron-right' : 'mdi-clock-outline'"
              color="medium-emphasis"
              aria-hidden="true"
            />
          </template>
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
</template>

<style scoped>
.task-list {
  background: transparent;
}

.task-item {
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  background: rgb(var(--v-theme-surface));
}

.task-title {
  white-space: normal;
}

.task-number {
  align-self: start;
}
</style>
