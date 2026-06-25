<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { cssInterviewQuestions } from '@/data/interview/css-interview'
import { htmlInterviewQuestions } from '@/data/interview/html-interview'
import { jotaiPracticeInterviewQuestions } from '@/data/interview/jotai-practice-interview'
import { jsInterviewQuestions } from '@/data/interview/js-interview'
import { reactInterviewQuestions } from '@/data/interview/react-interview'
import { tanstackSsrNextInterviewQuestions } from '@/data/interview/tanstack-ssr-next-interview'
import { testingInterviewQuestions } from '@/data/interview/testing-interview'
import { tsInterviewQuestions } from '@/data/interview/ts-interview'
import { webAPIInterviewQuestions } from '@/data/interview/web-api-interview'
import { webInterviewQuestions } from '@/data/interview/web-interview'
import type { InterviewQuestion } from '@/types/interview'

type Difficulty = NonNullable<InterviewQuestion['difficulty']>

interface InterviewTopic {
  title: string
  value: string
  color: string
  questions: InterviewQuestion[]
}

interface TrainerQuestion extends InterviewQuestion {
  topicTitle: string
  topicValue: string
  topicColor: string
  uid: string
}

const topics: InterviewTopic[] = [
  {
    title: 'HTML',
    value: 'html',
    color: 'orange',
    questions: htmlInterviewQuestions,
  },
  {
    title: 'CSS',
    value: 'css',
    color: 'blue',
    questions: cssInterviewQuestions,
  },
  {
    title: 'TypeScript',
    value: 'typescript',
    color: 'blue-darken-1',
    questions: tsInterviewQuestions,
  },
  {
    title: 'JavaScript',
    value: 'javascript',
    color: 'yellow-darken-2',
    questions: jsInterviewQuestions,
  },
  {
    title: 'React',
    value: 'react',
    color: 'cyan',
    questions: reactInterviewQuestions,
  },
  {
    title: 'Web',
    value: 'web',
    color: 'green',
    questions: webInterviewQuestions,
  },
  {
    title: 'Web API',
    value: 'web-api',
    color: 'green-darken-1',
    questions: webAPIInterviewQuestions,
  },
  {
    title: 'Testing',
    value: 'testing',
    color: 'deep-purple',
    questions: testingInterviewQuestions,
  },
  {
    title: 'TanStack Query SSR',
    value: 'tanstack-query',
    color: 'teal',
    questions: tanstackSsrNextInterviewQuestions,
  },
  {
    title: 'Jotai',
    value: 'jotai',
    color: 'lime-darken-3',
    questions: jotaiPracticeInterviewQuestions,
  },
]

const difficultyItems: { title: string; value: Difficulty; color: string }[] = [
  { title: 'Junior', value: 'junior', color: 'success' },
  { title: 'Middle', value: 'middle', color: 'warning' },
  { title: 'Senior', value: 'senior', color: 'error' },
]

const topicItems = [
  { title: 'Все темы', value: 'all' },
  ...topics.map((topic) => ({
    title: topic.title,
    value: topic.value,
  })),
]

const allQuestions = topics.flatMap<TrainerQuestion>((topic) =>
  topic.questions.map((question) => ({
    ...question,
    topicTitle: topic.title,
    topicValue: topic.value,
    topicColor: topic.color,
    uid: `${topic.value}-${question.id}`,
  })),
)

const selectedTopic = ref('all')
const selectedDifficulties = ref<Difficulty[]>([])
const searchQuery = ref('')
const currentQuestion = ref<TrainerQuestion | null>(null)
const answerPanels = ref<string[]>([])

const filteredQuestions = computed(() => {
  const normalizedQuery = searchQuery.value.trim().toLowerCase()

  return allQuestions.filter((question) => {
    const matchesTopic =
      selectedTopic.value === 'all' || question.topicValue === selectedTopic.value
    const matchesDifficulty =
      selectedDifficulties.value.length === 0 ||
      (question.difficulty && selectedDifficulties.value.includes(question.difficulty))
    const matchesSearch =
      !normalizedQuery ||
      question.question.toLowerCase().includes(normalizedQuery) ||
      question.tags?.some((tag) => tag.toLowerCase().includes(normalizedQuery))

    return matchesTopic && matchesDifficulty && matchesSearch
  })
})

const currentQuestionIndex = computed(() => {
  if (!currentQuestion.value) return 0

  const index = filteredQuestions.value.findIndex(
    (question) => question.uid === currentQuestion.value?.uid,
  )

  return index === -1 ? 0 : index + 1
})

const totalQuestionsCount = computed(() => allQuestions.length)

const selectedTopicTitle = computed(() => {
  if (selectedTopic.value === 'all') return 'Все темы'

  return topics.find((topic) => topic.value === selectedTopic.value)?.title ?? 'Все темы'
})

function getDifficultyColor(difficulty?: Difficulty) {
  return difficultyItems.find((item) => item.value === difficulty)?.color ?? 'primary'
}

function getDifficultyTitle(difficulty?: Difficulty) {
  return difficultyItems.find((item) => item.value === difficulty)?.title ?? ''
}

function getRandomQuestion(excludedUid?: string) {
  const questions = filteredQuestions.value
  if (questions.length === 0) return null
  if (questions.length === 1) return questions[0]

  const availableQuestions = excludedUid
    ? questions.filter((question) => question.uid !== excludedUid)
    : questions

  return availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
}

function pickRandomQuestion() {
  currentQuestion.value = getRandomQuestion(currentQuestion.value?.uid)
  answerPanels.value = []
}

function resetFilters() {
  selectedTopic.value = 'all'
  selectedDifficulties.value = []
  searchQuery.value = ''
}

watch(
  filteredQuestions,
  () => {
    currentQuestion.value = getRandomQuestion()
    answerPanels.value = []
  },
  { immediate: true },
)
</script>

<template>
  <v-card variant="outlined" class="interview-trainer">
    <v-card-title class="d-flex align-center flex-wrap ga-2">
      <v-icon icon="mdi-forum-outline" />
      Тренажер собеседований
    </v-card-title>

    <v-card-text>
      <v-row class="mb-2" align="start">
        <v-col cols="12" md="4">
          <v-select
            v-model="selectedTopic"
            :items="topicItems"
            label="Тема"
            density="comfortable"
            hide-details
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            v-model="selectedDifficulties"
            :items="difficultyItems"
            label="Уровень"
            placeholder="Все уровни"
            density="comfortable"
            multiple
            chips
            closable-chips
            hide-details
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="searchQuery"
            label="Поиск"
            placeholder="Вопрос или тег"
            prepend-inner-icon="mdi-magnify"
            density="comfortable"
            clearable
            hide-details
          />
        </v-col>
      </v-row>

      <div class="trainer-summary mb-4">
        <div>
          <div class="text-caption text-medium-emphasis">Выборка</div>
          <div class="text-body-2 font-weight-medium">
            {{ filteredQuestions.length }} из {{ totalQuestionsCount }} вопросов
          </div>
        </div>

        <div>
          <div class="text-caption text-medium-emphasis">Тема</div>
          <div class="text-body-2 font-weight-medium">{{ selectedTopicTitle }}</div>
        </div>

        <v-btn
          variant="text"
          color="primary"
          prepend-icon="mdi-filter-remove-outline"
          @click="resetFilters"
        >
          Сбросить
        </v-btn>
      </div>

      <v-alert v-if="!currentQuestion" type="info" variant="tonal" class="mb-0">
        По выбранным фильтрам вопросов не нашлось.
      </v-alert>

      <div v-else>
        <v-card variant="tonal" class="question-card mb-4">
          <v-card-text>
            <div class="d-flex align-center flex-wrap ga-2 mb-4">
              <v-chip :color="currentQuestion.topicColor" size="small">
                {{ currentQuestion.topicTitle }}
              </v-chip>
              <v-chip
                v-if="currentQuestion.difficulty"
                :color="getDifficultyColor(currentQuestion.difficulty)"
                size="small"
                variant="flat"
              >
                {{ getDifficultyTitle(currentQuestion.difficulty) }}
              </v-chip>
              <v-chip size="small" variant="outlined">
                {{ currentQuestionIndex }} / {{ filteredQuestions.length }}
              </v-chip>
            </div>

            <h2 class="text-h5 font-weight-bold mb-0">
              {{ currentQuestion.question }}
            </h2>
          </v-card-text>
        </v-card>

        <v-expansion-panels v-model="answerPanels" multiple variant="accordion" class="mb-4">
          <v-expansion-panel value="answer">
            <v-expansion-panel-title> Показать ответ </v-expansion-panel-title>
            <v-expansion-panel-text>
              <div v-html="currentQuestion.answer" class="interview-answer"></div>

              <div v-if="currentQuestion.tags?.length" class="d-flex flex-wrap ga-2 mt-4">
                <v-chip
                  v-for="tag in currentQuestion.tags"
                  :key="tag"
                  size="x-small"
                  variant="outlined"
                >
                  {{ tag }}
                </v-chip>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>

        <div class="trainer-actions">
          <v-btn
            color="primary"
            variant="elevated"
            prepend-icon="mdi-shuffle-variant"
            @click="pickRandomQuestion"
          >
            Следующий вопрос
          </v-btn>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.interview-trainer {
  border-radius: 8px;
}

.trainer-summary {
  align-items: center;
  background: rgba(var(--v-theme-surface-variant), 0.28);
  border-radius: 8px;
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, minmax(0, 1fr)) auto;
  padding: 12px 16px;
}

.question-card {
  border-radius: 8px;
}

.trainer-actions {
  display: grid;
  grid-template-columns: minmax(0, 240px);
}

.trainer-actions :deep(.v-btn) {
  height: 44px;
  min-width: 0;
}

.interview-answer {
  line-height: 1.6;
}

.interview-answer :deep(h3) {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  margin-top: 1.5rem;
}

.interview-answer :deep(h4) {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  margin-top: 1rem;
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
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
  padding: 0.2rem 0.4rem;
}

.interview-answer :deep(pre) {
  background-color: rgba(var(--v-theme-surface-variant), 0.3);
  border-radius: 8px;
  margin: 1rem 0;
  overflow-x: auto;
  padding: 1rem;
}

.interview-answer :deep(blockquote) {
  background-color: rgba(var(--v-theme-surface-variant), 0.1);
  border-left: 4px solid rgb(var(--v-theme-primary));
  border-radius: 0 8px 8px 0;
  font-style: italic;
  margin: 1rem 0;
  padding: 1rem;
}

.interview-answer :deep(strong) {
  font-weight: 600;
}

@media (max-width: 599px) {
  .trainer-summary {
    grid-template-columns: 1fr;
  }

  .trainer-summary :deep(.v-btn) {
    justify-content: start;
  }

  .trainer-actions {
    grid-template-columns: 1fr;
  }
}
</style>
