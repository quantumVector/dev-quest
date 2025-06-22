<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Question } from '@/types/question'

interface Props {
  questions: Question[]
  title: string
  description: string
  showTopicBreakdown?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showTopicBreakdown: true
})

const currentQuestionIndex = ref(0)
const selectedAnswers = ref<number[]>(new Array(props.questions.length).fill(-1))
const showResults = ref(false)

const currentQuestion = computed(() => props.questions[currentQuestionIndex.value])
const isLastQuestion = computed(() => currentQuestionIndex.value === props.questions.length - 1)
const score = computed(() => {
  return selectedAnswers.value.reduce((acc, answer, index) => {
    return acc + (answer === props.questions[index].correctAnswer ? 1 : 0)
  }, 0)
})

const topicScores = computed(() => {
  if (!props.showTopicBreakdown) return []

  const topics = [...new Set(props.questions.map(q => q.topic))]
  return topics.map(topic => {
    const topicQuestions = props.questions.filter(q => q.topic === topic)
    const topicAnswers = topicQuestions.map(q => selectedAnswers.value[q.id - 1])
    const correct = topicAnswers.reduce((acc, answer, index) => {
      return acc + (answer === topicQuestions[index].correctAnswer ? 1 : 0)
    }, 0)
    return {
      topic,
      correct,
      total: topicQuestions.length,
      percentage: Math.round((correct / topicQuestions.length) * 100)
    }
  })
})

const selectAnswer = (optionIndex: number) => {
  selectedAnswers.value[currentQuestionIndex.value] = optionIndex
}

const nextQuestion = () => {
  if (currentQuestionIndex.value < props.questions.length - 1) {
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
  selectedAnswers.value = new Array(props.questions.length).fill(-1)
  showResults.value = false
}

const getScoreColor = (score: number, total: number) => {
  const percentage = (score / total) * 100
  if (percentage >= 80) return 'success'
  if (percentage >= 60) return 'warning'
  return 'error'
}

const goToQuestion = (index: number) => {
  currentQuestionIndex.value = index
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

          <!-- Результаты теста -->
          <div v-if="showResults">
            <v-card-text class="text-center">
              <v-chip
                :color="getScoreColor(score, questions.length)"
                size="x-large"
                class="mb-4"
              >
                Общий результат: {{ score }}/{{ questions.length }}
              </v-chip>

              <v-progress-linear
                :model-value="(score / questions.length) * 100"
                :color="getScoreColor(score, questions.length)"
                height="20"
                class="mb-6"
              >
                <strong>{{ Math.round((score / questions.length) * 100) }}%</strong>
              </v-progress-linear>

              <!-- Результаты по темам -->
              <v-row v-if="showTopicBreakdown && topicScores.length > 1" class="mb-6">
                <v-col
                  v-for="topicScore in topicScores"
                  :key="topicScore.topic"
                  cols="12"
                  :sm="topicScores.length > 2 ? '6' : '12'"
                  :md="topicScores.length > 3 ? '3' : topicScores.length > 2 ? '4' : '6'"
                >
                  <v-card variant="outlined">
                    <v-card-text class="text-center">
                      <div class="text-h6 mb-2">{{ topicScore.topic }}</div>
                      <v-progress-circular
                        :model-value="topicScore.percentage"
                        :color="getScoreColor(topicScore.correct, topicScore.total)"
                        size="80"
                        width="8"
                      >
                        <strong>{{ topicScore.percentage }}%</strong>
                      </v-progress-circular>
                      <div class="text-body-2 text-medium-emphasis mt-2">
                        {{ topicScore.correct }}/{{ topicScore.total }}
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>

              <!-- Для тестов с одной темой -->
              <v-card v-else-if="!showTopicBreakdown || topicScores.length === 1" variant="outlined" class="mb-6">
                <v-card-text class="text-center">
                  <div class="text-h6 mb-2">{{ topicScores[0]?.topic || 'Результат' }}</div>
                  <v-progress-circular
                    :model-value="(score / questions.length) * 100"
                    :color="getScoreColor(score, questions.length)"
                    size="80"
                    width="8"
                  >
                    <strong>{{ Math.round((score / questions.length) * 100) }}%</strong>
                  </v-progress-circular>
                  <div class="text-body-2 text-medium-emphasis mt-2">
                    {{ score }}/{{ questions.length }}
                  </div>
                </v-card-text>
              </v-card>
            </v-card-text>

            <!-- Подробные результаты -->
            <v-expansion-panels class="ma-4">
              <v-expansion-panel
                v-for="(question, index) in questions"
                :key="question.id"
                :title="`Вопрос ${index + 1}${showTopicBreakdown ? ` (${question.topic})` : ''}`"
              >
                <v-expansion-panel-text>
                  <div class="mb-3">
                    <v-chip
                      :color="selectedAnswers[index] === question.correctAnswer ? 'success' : 'error'"
                      size="small"
                      class="mb-2"
                    >
                      {{ selectedAnswers[index] === question.correctAnswer ? 'Правильно' : 'Неправильно' }}
                    </v-chip>
                    <div><strong>{{ question.question }}</strong></div>
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

              <!-- Навигация по вопросам -->
              <div class="mb-6">
                <div class="text-subtitle-2 mb-3">Быстрая навигация:</div>
                <div class="d-flex flex-wrap gap-2">
                  <v-btn
                    v-for="(question, index) in questions"
                    :key="question.id"
                    :variant="index === currentQuestionIndex ? 'elevated' : 'outlined'"
                    :color="selectedAnswers[index] !== -1 ? 'success' : 'default'"
                    size="small"
                    @click="goToQuestion(index)"
                  >
                    {{ index + 1 }}
                  </v-btn>
                </div>
              </div>

              <!-- Вопрос -->
              <v-card
                variant="outlined"
                class="mb-6"
              >
                <v-card-text>
                  <v-chip
                    v-if="showTopicBreakdown"
                    color="primary"
                    size="small"
                    class="mb-3"
                  >
                    {{ currentQuestion.topic }}
                  </v-chip>

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

              <div class="text-center">
                <div class="text-body-2 text-medium-emphasis">
                  Отвечено: {{ selectedAnswers.filter(a => a !== -1).length }}/{{ questions.length }}
                </div>
              </div>

              <div class="d-flex gap-2">
                <v-btn
                  v-if="!isLastQuestion"
                  color="primary"
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
  min-height: 350px;
}
</style>
