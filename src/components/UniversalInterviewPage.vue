<script setup lang="ts">
import { ref } from 'vue'

interface InterviewQuestion {
  id: number
  question: string
  answer: string
  difficulty?: 'junior' | 'middle' | 'senior'
  tags?: string[]
}

interface Props {
  questions: InterviewQuestion[]
  title: string
  description: string
  showDifficulty?: boolean
  showTags?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showDifficulty: true,
  showTags: false
})

const expandedPanels = ref<number[]>([])

const getDifficultyColor = (difficulty?: string) => {
  switch (difficulty) {
    case 'junior':
      return 'success'
    case 'middle':
      return 'warning'
    case 'senior':
      return 'error'
    default:
      return 'primary'
  }
}

const getDifficultyText = (difficulty?: string) => {
  switch (difficulty) {
    case 'junior':
      return 'Junior'
    case 'middle':
      return 'Middle'
    case 'senior':
      return 'Senior'
    default:
      return ''
  }
}

const expandAll = () => {
  expandedPanels.value = props.questions.map(q => q.id)
}

const collapseAll = () => {
  expandedPanels.value = []
}
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card>
          <v-card-title class="text-h4 text-center pa-6">
            {{ title }}
            <div class="text-subtitle-1 text-medium-emphasis mt-2">
              {{ description }}
            </div>
          </v-card-title>

          <v-card-text>
            <!-- Статистика и управление -->
            <div class="mb-6">
              <v-row align="center" class="mb-4">
                <v-col cols="12" sm="6">
                  <div class="text-h6">
                    Всего вопросов: {{ questions.length }}
                  </div>
                  <div v-if="showDifficulty" class="mt-2">
                    <v-chip
                      v-for="difficulty in ['junior', 'middle', 'senior']"
                      :key="difficulty"
                      :color="getDifficultyColor(difficulty)"
                      size="small"
                      class="mr-2"
                    >
                      {{ getDifficultyText(difficulty) }}:
                      {{ questions.filter(q => q.difficulty === difficulty).length }}
                    </v-chip>
                  </div>
                </v-col>
                <v-col cols="12" sm="6" class="text-right">
                  <v-btn
                    variant="outlined"
                    size="small"
                    class="mr-2"
                    @click="expandAll"
                  >
                    Развернуть все
                  </v-btn>
                  <v-btn
                    variant="outlined"
                    size="small"
                    @click="collapseAll"
                  >
                    Свернуть все
                  </v-btn>
                </v-col>
              </v-row>
            </div>

            <!-- Вопросы -->
            <v-expansion-panels
              v-model="expandedPanels"
              multiple
              variant="accordion"
            >
              <v-expansion-panel
                v-for="question in questions"
                :key="question.id"
                :value="question.id"
              >
                <v-expansion-panel-title>
                  <div class="d-flex align-center justify-space-between w-100">
                    <div class="flex-grow-1">
                      <div class="text-subtitle-1 font-weight-medium">
                        {{ question.question }}
                      </div>
                    </div>
                    <div class="ml-4 d-flex align-center">
                      <v-chip
                        v-if="showDifficulty && question.difficulty"
                        :color="getDifficultyColor(question.difficulty)"
                        size="small"
                        class="mr-2"
                      >
                        {{ getDifficultyText(question.difficulty) }}
                      </v-chip>
                      <div v-if="showTags && question.tags" class="d-flex gap-1">
                        <v-chip
                          v-for="tag in question.tags"
                          :key="tag"
                          size="x-small"
                          variant="outlined"
                        >
                          {{ tag }}
                        </v-chip>
                      </div>
                    </div>
                  </div>
                </v-expansion-panel-title>

                <v-expansion-panel-text>
                  <v-card variant="outlined">
                    <v-card-text>
                      <div v-html="question.answer" class="interview-answer"></div>
                    </v-card-text>
                  </v-card>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.interview-answer {
  line-height: 1.6;
}

.interview-answer :deep(h3) {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
}

.interview-answer :deep(h4) {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
}

.interview-answer :deep(p) {
  margin-bottom: 1rem;
}

.interview-answer :deep(ul),
.interview-answer :deep(ol) {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.interview-answer :deep(li) {
  margin-bottom: 0.25rem;
}

.interview-answer :deep(code) {
  background-color: rgba(var(--v-theme-surface-variant), 0.3);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

.interview-answer :deep(pre) {
  background-color: rgba(var(--v-theme-surface-variant), 0.3);
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1rem 0;
}

.interview-answer :deep(blockquote) {
  border-left: 4px solid rgb(var(--v-theme-primary));
  padding-left: 1rem;
  margin: 1rem 0;
  font-style: italic;
  background-color: rgba(var(--v-theme-surface-variant), 0.1);
  padding: 1rem;
  border-radius: 0 8px 8px 0;
}

.interview-answer :deep(strong) {
  font-weight: 600;
}
</style>
