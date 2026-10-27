<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { sampleCandidate, tokenScenarios, withTemperature } from '@/data/token-sampling'
import type { TokenCandidate, TokenNode } from '@/data/token-sampling'

const scenarioId = ref(tokenScenarios[0].id)
const scenario = computed(() => tokenScenarios.find((item) => item.id === scenarioId.value)!)
const temperature = ref(1)
const node = ref<TokenNode | undefined>(scenario.value.root)
const choices = ref<TokenCandidate[]>([])
const candidates = computed(() => withTemperature(node.value?.candidates ?? [], temperature.value))
const complete = computed(() => !node.value)
const sentence = computed(
  () => scenario.value.prefix + choices.value.map((item) => item.text).join(''),
)
const percentage = (value: number) =>
  value > 0 && value < 0.001 ? '<0.1%' : `${(value * 100).toFixed(1)}%`

function reset() {
  choices.value = []
  node.value = scenario.value.root
}

function step() {
  if (complete.value) return
  const choice = sampleCandidate(candidates.value)
  choices.value.push(choice)
  node.value = choice.next
}

function finish() {
  while (!complete.value) step()
}

watch(scenarioId, reset)
</script>

<template>
  <aside class="token-demo" aria-label="Учебный симулятор генерации текста">
    <p class="text-overline text-primary mb-1">Попробуй прямо здесь</p>
    <h3 class="text-h6 font-weight-bold mb-3">Как растёт ответ</h3>
    <p class="text-body-2 mb-5">
      Меняй temperature и добавляй продолжение по одному шагу. Посмотри, как меняются шансы
      кандидатов, затем собери фразу несколько раз.
    </p>

    <label for="token-scenario" class="control-label">Начало фразы</label>
    <select id="token-scenario" v-model="scenarioId" class="scenario-select mb-5">
      <option v-for="item in tokenScenarios" :key="item.id" :value="item.id">
        {{ item.prefix }}…
      </option>
    </select>

    <div class="temperature-heading">
      <label for="token-temperature" class="control-label">Temperature</label>
      <output for="token-temperature">{{ temperature.toFixed(1) }}</output>
    </div>
    <input
      id="token-temperature"
      v-model.number="temperature"
      class="temperature-slider"
      type="range"
      min="0.2"
      max="1.8"
      step="0.1"
      aria-describedby="temperature-help"
    />
    <p id="temperature-help" class="text-body-2 text-medium-emphasis mb-5">
      Ниже — сильнее преимущество лидера. Выше — больше шансов у остальных. Уже выбранные фрагменты
      не меняются.
    </p>

    <p class="control-label mb-2">{{ complete ? 'Фраза готова' : 'Текст на текущем шаге' }}</p>
    <p class="generated-text" aria-live="polite" aria-atomic="true">
      {{ sentence }}<span v-if="!complete" aria-hidden="true" class="text-primary">▍</span>
    </p>

    <div class="candidate-area">
      <template v-if="!complete">
        <p class="text-subtitle-2 mb-3">Кандидаты следующего шага</p>
        <ul class="candidate-list">
          <li v-for="candidate in candidates" :key="candidate.text" class="candidate">
            <div class="candidate-heading">
              <span>{{ candidate.text.trim() }}</span>
              <span>{{ percentage(candidate.probability) }}</span>
            </div>
            <div class="probability-track" aria-hidden="true">
              <div class="probability-fill" :style="{ width: `${candidate.probability * 100}%` }" />
            </div>
          </li>
        </ul>
      </template>
      <p v-else class="text-body-2">
        Начни заново с той же температурой. Фраза может измениться, потому что выбор случайный. Если
        продолжение совпало, это тоже возможно.
      </p>
    </div>

    <div class="demo-actions">
      <v-btn color="primary" variant="flat" :disabled="complete" @click="step">Ещё один шаг</v-btn>
      <v-btn variant="tonal" :disabled="complete" @click="finish">Собрать фразу</v-btn>
      <v-btn variant="text" :disabled="!choices.length" @click="reset">Начать заново</v-btn>
    </div>

    <ol v-if="choices.length" class="choice-history text-body-2 mt-4" aria-label="История выбора">
      <li v-for="(choice, index) in choices" :key="index">
        «{{ choice.text.trim() }}» — {{ percentage(choice.probability) }} на момент выбора
      </li>
    </ol>

    <p class="demo-note text-body-2 text-medium-emphasis mt-5">
      Это учебная схема с заранее заданными вариантами и вероятностями. Для наглядности шаги
      показывают слова и короткие фрагменты; реальный токенизатор может делить их иначе. Настоящая
      LLM вычисляет вероятности нейронной сетью по доступному контексту.
    </p>
  </aside>
</template>

<style scoped>
.token-demo {
  padding: clamp(16px, 4vw, 28px);
  margin-top: 24px;
  border: 1px solid rgba(var(--v-theme-primary), 0.25);
  border-radius: 16px;
  background: rgba(var(--v-theme-primary), 0.04);
}

.control-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
}

.scenario-select {
  display: block;
  width: 100%;
  padding: 12px;
  margin-top: 8px;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 8px;
  color: rgb(var(--v-theme-on-surface));
  background: rgb(var(--v-theme-surface));
  font: inherit;
  font-size: 0.875rem;
}

.temperature-heading,
.candidate-heading {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.temperature-heading output,
.candidate-heading span:last-child {
  font-variant-numeric: tabular-nums;
}

.temperature-slider {
  display: block;
  width: 100%;
  height: 36px;
  accent-color: rgb(var(--v-theme-primary));
  cursor: pointer;
}

.scenario-select:focus-visible,
.temperature-slider:focus-visible {
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: 4px;
}

.generated-text {
  min-height: 100px;
  padding: 16px;
  border-radius: 8px;
  background: rgb(var(--v-theme-surface));
  font-size: 1.125rem;
}

.candidate-area {
  margin-block: 20px;
}

.candidate-list {
  list-style: none;
  padding: 0;
}

.candidate + .candidate {
  margin-top: 12px;
}

.candidate-heading {
  font-size: 0.875rem;
  margin-bottom: 4px;
}

.probability-track {
  height: 8px;
  border-radius: 4px;
  background: rgba(var(--v-theme-primary), 0.1);
  overflow: hidden;
}

.probability-fill {
  height: 100%;
  background: rgb(var(--v-theme-primary));
}

.demo-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.choice-history {
  padding-left: 1.5rem;
}

.demo-note {
  padding-top: 16px;
  border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}
</style>
