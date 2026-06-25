<script setup lang="ts">
import { computed, ref } from 'vue'

type Specificity = [number, number, number, number]

interface SelectorPart {
  text: string
  specificity: Specificity
  description: string
}

interface SelectorTask {
  selector: string
  parts: SelectorPart[]
  specificity: Specificity
}

withDefaults(defineProps<{
  compact?: boolean
}>(), {
  compact: false,
})

const elementParts: SelectorPart[] = [
  { text: 'article', specificity: [0, 0, 0, 1], description: 'элемент article' },
  { text: 'button', specificity: [0, 0, 0, 1], description: 'элемент button' },
  { text: 'form', specificity: [0, 0, 0, 1], description: 'элемент form' },
  { text: 'input', specificity: [0, 0, 0, 1], description: 'элемент input' },
  { text: 'li', specificity: [0, 0, 0, 1], description: 'элемент li' },
  { text: 'nav', specificity: [0, 0, 0, 1], description: 'элемент nav' },
  { text: 'section', specificity: [0, 0, 0, 1], description: 'элемент section' },
  { text: 'span', specificity: [0, 0, 0, 1], description: 'элемент span' },
]

const idParts: SelectorPart[] = [
  { text: '#app', specificity: [0, 1, 0, 0], description: 'ID #app' },
  { text: '#main', specificity: [0, 1, 0, 0], description: 'ID #main' },
  { text: '#modal', specificity: [0, 1, 0, 0], description: 'ID #modal' },
  { text: '#nav', specificity: [0, 1, 0, 0], description: 'ID #nav' },
]

const classParts: SelectorPart[] = [
  { text: '.active', specificity: [0, 0, 1, 0], description: 'класс .active' },
  { text: '.button', specificity: [0, 0, 1, 0], description: 'класс .button' },
  { text: '.card', specificity: [0, 0, 1, 0], description: 'класс .card' },
  { text: '.error', specificity: [0, 0, 1, 0], description: 'класс .error' },
  { text: '.primary', specificity: [0, 0, 1, 0], description: 'класс .primary' },
  { text: '.selected', specificity: [0, 0, 1, 0], description: 'класс .selected' },
]

const attributeParts: SelectorPart[] = [
  { text: '[aria-expanded="true"]', specificity: [0, 0, 1, 0], description: 'атрибут [aria-expanded="true"]' },
  { text: '[data-state="open"]', specificity: [0, 0, 1, 0], description: 'атрибут [data-state="open"]' },
  { text: '[disabled]', specificity: [0, 0, 1, 0], description: 'атрибут [disabled]' },
  { text: '[href^="https"]', specificity: [0, 0, 1, 0], description: 'атрибут [href^="https"]' },
  { text: '[type="button"]', specificity: [0, 0, 1, 0], description: 'атрибут [type="button"]' },
]

const pseudoClassParts: SelectorPart[] = [
  { text: ':checked', specificity: [0, 0, 1, 0], description: 'псевдокласс :checked' },
  { text: ':disabled', specificity: [0, 0, 1, 0], description: 'псевдокласс :disabled' },
  { text: ':first-child', specificity: [0, 0, 1, 0], description: 'псевдокласс :first-child' },
  { text: ':focus-visible', specificity: [0, 0, 1, 0], description: 'псевдокласс :focus-visible' },
  { text: ':hover', specificity: [0, 0, 1, 0], description: 'псевдокласс :hover' },
  { text: ':nth-child(2n+1)', specificity: [0, 0, 1, 0], description: 'псевдокласс :nth-child()' },
]

const pseudoElementParts: SelectorPart[] = [
  { text: '::after', specificity: [0, 0, 0, 1], description: 'псевдоэлемент ::after' },
  { text: '::before', specificity: [0, 0, 0, 1], description: 'псевдоэлемент ::before' },
  { text: '::marker', specificity: [0, 0, 0, 1], description: 'псевдоэлемент ::marker' },
  { text: '::placeholder', specificity: [0, 0, 0, 1], description: 'псевдоэлемент ::placeholder' },
]

const specialPseudoParts: SelectorPart[] = [
  {
    text: ':not(.hidden)',
    specificity: [0, 0, 1, 0],
    description: ':not() сам не добавляет вес, считается .hidden',
  },
  {
    text: ':is(button, .button, #submit)',
    specificity: [0, 1, 0, 0],
    description: ':is() берет вес самого специфичного селектора внутри: #submit',
  },
  {
    text: ':has(> img.cover)',
    specificity: [0, 0, 1, 1],
    description: ':has() сам не добавляет вес, считается img.cover',
  },
  {
    text: ':where(#sidebar, .widget)',
    specificity: [0, 0, 0, 0],
    description: ':where() всегда дает 0',
  },
]

const userAnswer = ref('')
const isAnswerChecked = ref(false)

function randomItem<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)]
}

function chance(value: number) {
  return Math.random() < value
}

const addSpecificity = (left: Specificity, right: Specificity): Specificity => [
  left[0] + right[0],
  left[1] + right[1],
  left[2] + right[2],
  left[3] + right[3],
]

function createCompoundSelector(allowPseudoElement: boolean) {
  const parts: SelectorPart[] = []

  if (chance(0.85)) parts.push(randomItem(elementParts))
  if (chance(0.25)) parts.push(randomItem(idParts))

  const classCount = Math.floor(Math.random() * 3)
  for (let index = 0; index < classCount; index++) {
    parts.push(randomItem(classParts))
  }

  if (chance(0.45)) parts.push(randomItem(attributeParts))
  if (chance(0.45)) parts.push(randomItem(pseudoClassParts))
  if (chance(0.25)) parts.push(randomItem(specialPseudoParts))
  if (allowPseudoElement && chance(0.35)) parts.push(randomItem(pseudoElementParts))

  if (parts.length === 0) parts.push(randomItem(classParts))

  return {
    selector: parts.map((part) => part.text).join(''),
    parts,
  }
}

function createSelectorTask(): SelectorTask {
  const firstCompound = createCompoundSelector(false)
  const shouldAddSecondCompound = chance(0.7)
  const secondCompound = shouldAddSecondCompound ? createCompoundSelector(true) : null
  const combinator = randomItem([' ', ' > ', ' + ', ' ~ '])
  const parts = secondCompound ? [...firstCompound.parts, ...secondCompound.parts] : firstCompound.parts
  const specificity = parts.reduce<Specificity>(
    (total, part) => addSpecificity(total, part.specificity),
    [0, 0, 0, 0],
  )

  return {
    selector: secondCompound ? `${firstCompound.selector}${combinator}${secondCompound.selector}` : firstCompound.selector,
    parts,
    specificity,
  }
}

function parseSpecificity(value: string): Specificity | null {
  const numbers = value
    .trim()
    .replace(/[()]/g, '')
    .replace(/\s+/g, ',')
    .split(/[,;]+/)
    .filter(Boolean)
    .map(Number)

  if (numbers.length !== 4 || numbers.some((number) => Number.isNaN(number))) return null

  return numbers as Specificity
}

function formatSpecificity(specificity: Specificity) {
  return specificity.join(',')
}

const currentTask = ref<SelectorTask>(createSelectorTask())

const correctAnswer = computed(() => formatSpecificity(currentTask.value.specificity))
const parsedAnswer = computed(() => parseSpecificity(userAnswer.value))
const hasAnswer = computed(() => userAnswer.value.trim().length > 0)
const isCorrect = computed(() => {
  if (!parsedAnswer.value) return false

  return parsedAnswer.value.every((value, index) => value === currentTask.value.specificity[index])
})

const resultText = computed(() => {
  if (!hasAnswer.value || !isAnswerChecked.value) return ''
  if (!parsedAnswer.value) return 'Введите четыре числа в формате 0,1,2,3.'
  if (isCorrect.value) return `Правильно: ${correctAnswer.value}.`

  return `Неправильно. Правильный ответ: ${correctAnswer.value}.`
})

function generateNextSelector() {
  currentTask.value = createSelectorTask()
  userAnswer.value = ''
  isAnswerChecked.value = false
}

function checkAnswer() {
  isAnswerChecked.value = true
}

function resetCheckStatus() {
  isAnswerChecked.value = false
}
</script>

<template>
  <v-card variant="outlined" class="specificity-trainer">
    <v-card-title class="d-flex align-center flex-wrap ga-2">
      <v-icon icon="mdi-target-variant" />
      Тренажер специфичности
    </v-card-title>

    <v-card-text>
      <p v-if="!compact" class="text-body-2 text-medium-emphasis mb-4">
        Посчитайте специфичность случайного CSS-селектора и введите ответ в формате
        <code>a,b,c,d</code>.
      </p>

      <div class="selector-preview mb-4">
        <code>{{ currentTask.selector }}</code>
      </div>

      <v-row align="start">
        <v-col cols="12">
          <v-text-field
            v-model="userAnswer"
            label="Специфичность"
            placeholder="0,1,2,3"
            clearable
            @keydown.enter="checkAnswer"
            @update:model-value="resetCheckStatus"
          />
        </v-col>

        <v-col cols="12" class="pt-0">
          <div class="trainer-actions">
            <v-btn
              color="success"
              variant="elevated"
              prepend-icon="mdi-check"
              :disabled="!hasAnswer"
              @click="checkAnswer"
            >
              Проверить
            </v-btn>

            <v-btn
              color="primary"
              variant="tonal"
              prepend-icon="mdi-refresh"
              @click="generateNextSelector"
            >
              Новый селектор
            </v-btn>
          </div>
        </v-col>
      </v-row>

      <v-alert
        v-if="isAnswerChecked && hasAnswer"
        :type="isCorrect ? 'success' : 'error'"
        variant="tonal"
        density="compact"
        class="mb-4"
      >
        {{ resultText }}
      </v-alert>

      <v-expansion-panels v-if="isAnswerChecked && hasAnswer" variant="accordion">
        <v-expansion-panel title="Разбор селектора">
          <v-expansion-panel-text>
            <ul class="pl-4 mb-0">
              <li
                v-for="(part, index) in currentTask.parts"
                :key="`${part.text}-${index}`"
                class="mb-1"
              >
                <code>{{ part.text }}</code> — {{ part.description }}:
                <code>{{ formatSpecificity(part.specificity) }}</code>
              </li>
            </ul>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.specificity-trainer {
  border-radius: 8px;
}

.trainer-actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.trainer-actions :deep(.v-btn) {
  height: 44px;
  min-width: 0;
  white-space: nowrap;
}

.selector-preview {
  background: #282a36;
  border-radius: 8px;
  overflow-x: auto;
  padding: 18px 20px;
}

.selector-preview code {
  background: transparent;
  color: #f8f8f2;
  font-size: 1rem;
  padding: 0;
  white-space: nowrap;
}

@media (max-width: 599px) {
  .trainer-actions {
    grid-template-columns: 1fr;
  }

  .trainer-actions :deep(.v-btn) {
    justify-content: center;
    padding-inline: 16px;
  }
}
</style>
