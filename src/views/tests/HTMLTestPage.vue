<script setup lang="ts">
import { ref, computed } from 'vue'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const questions: Question[] = [
  {
    id: 1,
    question: "Что такое HTML и для чего он нужен?",
    options: [
      "Язык программирования для создания веб-приложений",
      "Язык разметки для структурирования содержимого веб-страниц",
      "База данных для хранения информации о сайте",
      "Инструмент для стилизации веб-страниц"
    ],
    correctAnswer: 1,
    explanation: "HTML (HyperText Markup Language) — это язык разметки, который используется для структурирования и представления содержимого веб-страниц."
  },
  {
    id: 2,
    question: "Что такое семантическая вёрстка?",
    options: [
      "Использование CSS для красивого оформления",
      "Применение JavaScript для интерактивности",
      "Использование HTML-тегов по их смысловому назначению",
      "Создание адаптивного дизайна"
    ],
    correctAnswer: 2,
    explanation: "Семантическая вёрстка — это подход к созданию HTML-кода, при котором теги используются в соответствии с их смысловым назначением, а не только для визуального оформления."
  },
  {
    id: 3,
    question: "Какой из следующих принципов НЕ относится к веб-доступности?",
    options: [
      "Воспринимаемость (Perceivable)",
      "Управляемость (Operable)",
      "Масштабируемость (Scalable)",
      "Понятность (Understandable)"
    ],
    correctAnswer: 2,
    explanation: "Основные принципы веб-доступности (WCAG): Воспринимаемость, Управляемость, Понятность и Надёжность. Масштабируемость не является одним из основных принципов доступности."
  },
  {
    id: 4,
    question: "Какой HTML-элемент лучше всего подходит для создания адаптивных изображений?",
    options: [
      "<img> с атрибутом src",
      "<picture> с элементами <source>",
      "<div> с background-image",
      "<canvas> для рисования изображения"
    ],
    correctAnswer: 1,
    explanation: "Элемент <picture> с дочерними элементами <source> позволяет указать разные изображения для разных условий (размер экрана, плотность пикселей и т.д.), что делает его идеальным для адаптивных изображений."
  }
]

const currentQuestionIndex = ref(0)
const selectedAnswers = ref<number[]>(new Array(questions.length).fill(-1))
const showResults = ref(false)

const currentQuestion = computed(() => questions[currentQuestionIndex.value])
const isLastQuestion = computed(() => currentQuestionIndex.value === questions.length - 1)
const score = computed(() => {
  return selectedAnswers.value.reduce((acc, answer, index) => {
    return acc + (answer === questions[index].correctAnswer ? 1 : 0)
  }, 0)
})

const selectAnswer = (optionIndex: number) => {
  selectedAnswers.value[currentQuestionIndex.value] = optionIndex
}

const nextQuestion = () => {
  if (currentQuestionIndex.value < questions.length - 1) {
    currentQuestionIndex.value++
  }
}

const prevQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
  }
}

const finishTest = () => {
  showResults.value = true
}

const restartTest = () => {
  currentQuestionIndex.value = 0
  selectedAnswers.value = new Array(questions.length).fill(-1)
  showResults.value = false
}

const getScoreColor = (score: number) => {
  if (score >= 3) return 'success'
  if (score >= 2) return 'warning'
  return 'error'
}
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="text-h4 text-center pa-6">
            Тест по HTML (вопросы 1-4)
          </v-card-title>

          <!-- Результаты теста -->
          <div v-if="showResults">
            <v-card-text class="text-center">
              <v-chip
                :color="getScoreColor(score)"
                size="x-large"
                class="mb-4"
              >
                Результат: {{ score }}/{{ questions.length }}
              </v-chip>

              <v-progress-linear
                :model-value="(score / questions.length) * 100"
                :color="getScoreColor(score)"
                height="20"
                class="mb-4"
              >
                <strong>{{ Math.round((score / questions.length) * 100) }}%</strong>
              </v-progress-linear>
            </v-card-text>

            <!-- Подробные результаты -->
            <v-expansion-panels class="ma-4">
              <v-expansion-panel
                v-for="(question, index) in questions"
                :key="question.id"
                :title="`Вопрос ${index + 1}`"
              >
                <v-expansion-panel-text>
                  <div class="mb-3">
                    <strong>{{ question.question }}</strong>
                  </div>

                  <v-list density="compact">
                    <v-list-item
                      v-for="(option, optionIndex) in question.options"
                      :key="optionIndex"
                      class="pa-2"
                    >
                      <template v-slot:prepend>
                        <v-icon
                          v-if="optionIndex === question.correctAnswer"
                          color="success"
                          icon="mdi-check-circle"
                        />
                        <v-icon
                          v-else-if="optionIndex === selectedAnswers[index] && selectedAnswers[index] !== question.correctAnswer"
                          color="error"
                          icon="mdi-close-circle"
                        />
                        <v-icon
                          v-else
                          color="grey"
                          icon="mdi-circle-outline"
                        />
                      </template>

                      <v-list-item-title
                        :class="{
                          'text-success': optionIndex === question.correctAnswer,
                          'text-error': optionIndex === selectedAnswers[index] && selectedAnswers[index] !== question.correctAnswer
                        }"
                      >
                        {{ option }}
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>

                  <v-alert
                    type="info"
                    class="mt-3"
                    variant="tonal"
                  >
                    <strong>Объяснение:</strong> {{ question.explanation }}
                  </v-alert>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>

            <v-card-actions class="justify-center pa-6">
              <v-btn
                color="primary"
                size="large"
                @click="restartTest"
              >
                Пройти тест заново
              </v-btn>
            </v-card-actions>
          </div>

          <!-- Прохождение теста -->
          <div v-else>
            <v-card-text>
              <!-- Прогресс -->
              <div class="mb-6">
                <div class="d-flex justify-space-between align-center mb-2">
                  <span class="text-subtitle-1">
                    Вопрос {{ currentQuestionIndex + 1 }} из {{ questions.length }}
                  </span>
                  <span class="text-subtitle-2 text-medium-emphasis">
                    {{ Math.round(((currentQuestionIndex + 1) / questions.length) * 100) }}%
                  </span>
                </div>
                <v-progress-linear
                  :model-value="((currentQuestionIndex + 1) / questions.length) * 100"
                  color="primary"
                  height="8"
                />
              </div>

              <!-- Вопрос -->
              <v-card
                variant="outlined"
                class="mb-6"
              >
                <v-card-text>
                  <h3 class="text-h6 mb-4">
                    {{ currentQuestion.question }}
                  </h3>

                  <v-radio-group
                    :model-value="selectedAnswers[currentQuestionIndex]"
                    @update:model-value="selectAnswer"
                  >
                    <v-radio
                      v-for="(option, index) in currentQuestion.options"
                      :key="index"
                      :label="option"
                      :value="index"
                      class="mb-2"
                    />
                  </v-radio-group>
                </v-card-text>
              </v-card>
            </v-card-text>

            <!-- Навигация -->
            <v-card-actions class="justify-space-between pa-6">
              <v-btn
                variant="outlined"
                :disabled="currentQuestionIndex === 0"
                @click="prevQuestion"
              >
                <v-icon start icon="mdi-chevron-left" />
                Назад
              </v-btn>

              <div class="d-flex gap-2">
                <v-btn
                  v-if="!isLastQuestion"
                  color="primary"
                  :disabled="selectedAnswers[currentQuestionIndex] === -1"
                  @click="nextQuestion"
                >
                  Далее
                  <v-icon end icon="mdi-chevron-right" />
                </v-btn>

                <v-btn
                  v-else
                  color="success"
                  :disabled="selectedAnswers.some(answer => answer === -1)"
                  @click="finishTest"
                >
                  Завершить тест
                  <v-icon end icon="mdi-check" />
                </v-btn>
              </div>
            </v-card-actions>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-card {
  min-height: 500px;
}
</style>
