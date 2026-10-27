<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import LiveCodingCodeBlock from '@/components/live-coding/LiveCodingCodeBlock.vue'
import LiveCodingSolution from '@/components/live-coding/LiveCodingSolution.vue'
import { liveCodingTasks } from '@/data/live-coding/tasks'
import { liveCodingDifficulties, liveCodingLanguages } from '@/types/live-coding'

const route = useRoute()
const taskIndex = computed(() =>
  liveCodingTasks.findIndex((task) => task.slug === route.params.slug),
)
const task = computed(() => liveCodingTasks[taskIndex.value])
const previousTask = computed(() => liveCodingTasks[taskIndex.value - 1])
const nextTask = computed(() => liveCodingTasks[taskIndex.value + 1])
const expandedPanels = ref<string[]>([])

watch(
  () => route.params.slug,
  () => {
    expandedPanels.value = []
  },
)
</script>

<template>
  <v-row justify="center">
    <v-col cols="12" md="10" lg="8" class="task-column">
      <v-btn
        :to="{ name: 'frontend-live-coding' }"
        variant="text"
        prepend-icon="mdi-arrow-left"
        class="mb-6"
      >
        Все задачи
      </v-btn>

      <article v-if="task" :key="task.slug" class="task-content">
        <header class="mb-6">
          <div class="d-flex flex-wrap align-center ga-2 mb-3">
            <span class="text-overline mr-2">Задача {{ task.id }}</span>
            <v-chip :color="liveCodingDifficulties[task.difficulty].color" size="small">
              {{ liveCodingDifficulties[task.difficulty].label }}
            </v-chip>
            <v-chip size="small" variant="outlined">
              {{ liveCodingLanguages[task.solution.language] }}
            </v-chip>
            <v-chip v-for="tag in task.tags" :key="tag" size="small" variant="text">
              {{ tag }}
            </v-chip>
          </div>
          <h1 class="text-h4 font-weight-bold mb-4">{{ task.title }}</h1>
          <p class="text-body-1">{{ task.description }}</p>
        </header>

        <section class="mb-6" aria-labelledby="requirements-title">
          <h2 id="requirements-title" class="text-h6 mb-3">Условия</h2>
          <ul class="pl-5">
            <li v-for="requirement in task.requirements" :key="requirement" class="mb-2">
              {{ requirement }}
            </li>
          </ul>
        </section>

        <section class="mb-6" aria-labelledby="examples-title">
          <h2 id="examples-title" class="text-h6 mb-3">Примеры</h2>
          <div v-for="example in task.examples" :key="example.code" class="mb-3">
            <LiveCodingCodeBlock :code="example.code" :language="task.solution.language" />
            <p v-if="example.explanation" class="text-body-2 text-medium-emphasis mt-2">
              {{ example.explanation }}
            </p>
          </div>
        </section>

        <section class="mb-8" aria-labelledby="starter-title">
          <h2 id="starter-title" class="text-h6 mb-3">С чего начать</h2>
          <LiveCodingCodeBlock :code="task.starterCode" :language="task.solution.language" />
          <p class="text-body-2 text-medium-emphasis mt-3">
            Напишите решение в своём редакторе и проверьте его на примерах. Подсказка и разбор —
            ниже.
          </p>
        </section>

        <v-expansion-panels v-model="expandedPanels" multiple variant="accordion">
          <v-expansion-panel value="hint">
            <v-expansion-panel-title class="font-weight-medium">
              <v-icon icon="mdi-lightbulb-outline" size="20" class="mr-3" aria-hidden="true" />
              Подсказка
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <ul class="pl-5 pt-2">
                <li v-for="hint in task.hints" :key="hint" class="mb-2">{{ hint }}</li>
              </ul>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel value="solution">
            <v-expansion-panel-title class="font-weight-medium">
              <v-icon icon="mdi-code-braces" size="20" class="mr-3" aria-hidden="true" />
              Решение на {{ liveCodingLanguages[task.solution.language] }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <LiveCodingSolution :solution="task.solution" />
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel v-if="task.typescriptSolution" value="typescript">
            <v-expansion-panel-title class="font-weight-medium">
              <v-icon icon="mdi-language-typescript" size="20" class="mr-3" aria-hidden="true" />
              Вариант на TypeScript
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <LiveCodingSolution :solution="task.typescriptSolution" />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>

        <nav
          class="d-flex flex-wrap justify-space-between ga-3 mt-8"
          aria-label="Переход между задачами"
        >
          <v-btn
            v-if="previousTask"
            :to="{ name: 'frontend-live-coding-task', params: { slug: previousTask.slug } }"
            variant="outlined"
            prepend-icon="mdi-arrow-left"
          >
            Предыдущая задача
          </v-btn>
          <v-btn
            v-if="nextTask"
            :to="{ name: 'frontend-live-coding-task', params: { slug: nextTask.slug } }"
            color="primary"
            variant="tonal"
            append-icon="mdi-arrow-right"
            class="ml-auto"
          >
            Следующая задача
          </v-btn>
        </nav>
      </article>

      <v-alert v-else type="info" variant="tonal" title="Задача не найдена">
        Проверьте адрес или вернитесь к списку задач по ссылке выше.
      </v-alert>
    </v-col>
  </v-row>
</template>

<style scoped>
.task-column {
  min-width: 0;
}

.task-content {
  line-height: 1.7;
  overflow-wrap: anywhere;
}

.task-content :deep(.v-expansion-panel-text__wrapper) {
  min-width: 0;
}

@media (max-width: 599px) {
  .task-content :deep(.v-expansion-panel-text__wrapper) {
    padding: 8px 12px 16px;
  }
}
</style>
