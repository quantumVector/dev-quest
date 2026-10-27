<script setup lang="ts">
import { computed, ref } from 'vue'

withDefaults(
  defineProps<{
    compact?: boolean
  }>(),
  {
    compact: false,
  },
)

type UnitTab = 'rem' | 'em' | 'clamp' | 'ch'

const activeTab = ref<UnitTab>('rem')

const rootFontSize = ref(16)
const remValue = ref(1.5)
const remResult = computed(() => rootFontSize.value * remValue.value)
const fixedPxSize = 24

const emBaseSize = ref(16)
const emMultiplier = ref(1.2)
const emLevels = ref(3)
const emSizes = computed(() =>
  Array.from(
    { length: emLevels.value },
    (_, index) => emBaseSize.value * emMultiplier.value ** (index + 1),
  ),
)

const clampViewport = ref(900)
const clampMin = ref(24)
const clampFluidVw = ref(4)
const clampMax = ref(48)
const clampPreferred = computed(() => (clampViewport.value * clampFluidVw.value) / 100)
const clampResult = computed(() =>
  Math.min(clampMax.value, Math.max(clampMin.value, clampPreferred.value)),
)
const clampPhase = computed(() => {
  if (clampPreferred.value <= clampMin.value) return 'работает минимум'
  if (clampPreferred.value >= clampMax.value) return 'работает максимум'
  return 'размер плавно меняется'
})

const chValue = ref(30)
const chFont = ref('monospace')
const chText = ref('0123456789 — ширина ch зависит от символа 0')
const chFonts = [
  { title: 'Monospace', value: 'monospace' },
  { title: 'Arial', value: 'Arial, sans-serif' },
  { title: 'Georgia', value: 'Georgia, serif' },
]

function formatPixels(value: number) {
  return `${Number(value.toFixed(2))}px`
}

function resetCurrentTab() {
  if (activeTab.value === 'rem') {
    rootFontSize.value = 16
    remValue.value = 1.5
  }

  if (activeTab.value === 'em') {
    emBaseSize.value = 16
    emMultiplier.value = 1.2
    emLevels.value = 3
  }

  if (activeTab.value === 'clamp') {
    clampViewport.value = 900
    clampMin.value = 24
    clampFluidVw.value = 4
    clampMax.value = 48
  }

  if (activeTab.value === 'ch') {
    chValue.value = 30
    chFont.value = 'monospace'
    chText.value = '0123456789 — ширина ch зависит от символа 0'
  }
}
</script>

<template>
  <v-card
    variant="outlined"
    class="units-playground"
    :class="{ 'units-playground--compact': compact }"
  >
    <v-card-title class="playground-title">
      <span class="d-flex align-center ga-2">
        <v-icon icon="mdi-ruler-square" />
        Лаборатория относительных размеров
      </span>

      <v-btn
        icon="mdi-restore"
        variant="text"
        size="small"
        aria-label="Сбросить значения"
        title="Сбросить значения"
        @click="resetCurrentTab"
      />
    </v-card-title>

    <v-card-text>
      <p v-if="!compact" class="text-body-2 text-medium-emphasis mb-4">
        Меняйте параметры и наблюдайте, откуда браузер получает итоговый размер.
      </p>

      <v-tabs v-model="activeTab" color="primary" grow class="units-tabs mb-5">
        <v-tab value="rem">rem</v-tab>
        <v-tab value="em">em</v-tab>
        <v-tab value="clamp">clamp()</v-tab>
        <v-tab value="ch">ch</v-tab>
      </v-tabs>

      <v-window v-model="activeTab">
        <v-window-item value="rem">
          <div class="playground-layout">
            <div class="controls">
              <div>
                <div class="control-label">
                  <span>Корневой размер</span>
                  <code>{{ rootFontSize }}px</code>
                </div>
                <v-slider v-model="rootFontSize" :min="12" :max="24" :step="1" hide-details />
              </div>

              <div>
                <div class="control-label">
                  <span>Размер элемента</span>
                  <code>{{ remValue }}rem</code>
                </div>
                <v-slider v-model="remValue" :min="0.75" :max="3" :step="0.25" hide-details />
              </div>

              <v-alert type="info" variant="tonal" density="compact">
                <code
                  >{{ remValue }}rem × {{ rootFontSize }}px = {{ formatPixels(remResult) }}</code
                >
              </v-alert>
            </div>

            <div class="preview-stage">
              <div class="root-marker">html: {{ rootFontSize }}px</div>
              <div class="rem-comparison">
                <div class="sample-card sample-card--primary">
                  <span class="sample-caption">{{ remValue }}rem</span>
                  <strong :style="{ fontSize: `${remResult}px` }">Масштабируется</strong>
                </div>
                <div class="sample-card">
                  <span class="sample-caption">{{ fixedPxSize }}px</span>
                  <strong :style="{ fontSize: `${fixedPxSize}px` }">Фиксированный px</strong>
                </div>
              </div>
              <p class="preview-hint">
                Оба элемента сейчас равны. Измените корневой размер: изменится только модель
                <code>rem</code>.
              </p>
            </div>
          </div>
        </v-window-item>

        <v-window-item value="em">
          <div class="playground-layout">
            <div class="controls">
              <div>
                <div class="control-label">
                  <span>Базовый размер</span>
                  <code>{{ emBaseSize }}px</code>
                </div>
                <v-slider v-model="emBaseSize" :min="12" :max="20" :step="1" hide-details />
              </div>

              <div>
                <div class="control-label">
                  <span>На каждом уровне</span>
                  <code>{{ emMultiplier }}em</code>
                </div>
                <v-slider v-model="emMultiplier" :min="1" :max="1.5" :step="0.05" hide-details />
              </div>

              <div>
                <div class="control-label">
                  <span>Вложенность</span>
                  <code>{{ emLevels }}</code>
                </div>
                <v-slider v-model="emLevels" :min="1" :max="4" :step="1" hide-details />
              </div>

              <v-alert type="warning" variant="tonal" density="compact">
                Последний уровень:
                <code
                  >{{ emBaseSize }} × {{ emMultiplier }}<sup>{{ emLevels }}</sup> =
                  {{ formatPixels(emSizes[emSizes.length - 1] ?? 0) }}</code
                >
              </v-alert>
            </div>

            <div class="preview-stage">
              <div class="em-tree" :style="{ fontSize: `${emBaseSize}px` }">
                <div
                  v-for="(size, index) in emSizes"
                  :key="index"
                  class="em-level"
                  :style="{
                    fontSize: `${size}px`,
                    marginLeft: `${index * 12}px`,
                  }"
                >
                  <span>Уровень {{ index + 1 }}</span>
                  <code>{{ formatPixels(size) }}</code>
                </div>
              </div>
              <p class="preview-hint">
                Каждый вложенный элемент берет размер уже вычисленного родителя — поэтому значение
                накапливается.
              </p>
            </div>
          </div>
        </v-window-item>

        <v-window-item value="clamp">
          <div class="playground-layout">
            <div class="controls">
              <div>
                <div class="control-label">
                  <span>Ширина viewport</span>
                  <code>{{ clampViewport }}px</code>
                </div>
                <v-slider v-model="clampViewport" :min="320" :max="1600" :step="10" hide-details />
              </div>

              <div class="clamp-fields">
                <v-text-field
                  v-model.number="clampMin"
                  label="Минимум, px"
                  type="number"
                  density="compact"
                />
                <v-text-field
                  v-model.number="clampFluidVw"
                  label="Плавное, vw"
                  type="number"
                  density="compact"
                />
                <v-text-field
                  v-model.number="clampMax"
                  label="Максимум, px"
                  type="number"
                  density="compact"
                />
              </div>

              <v-alert type="success" variant="tonal" density="compact">
                <code>clamp({{ clampMin }}px, {{ clampFluidVw }}vw, {{ clampMax }}px)</code>
                → <b>{{ formatPixels(clampResult) }}</b>
              </v-alert>
            </div>

            <div class="preview-stage clamp-preview">
              <div class="viewport-ruler">
                <span>0</span>
                <strong>{{ clampViewport }}px</strong>
                <span>{{ clampViewport }}</span>
              </div>
              <div class="viewport-frame">
                <h3 :style="{ fontSize: `${clampResult}px` }">Плавный заголовок</h3>
                <span class="phase-badge">{{ clampPhase }}</span>
              </div>
              <div class="clamp-math">
                {{ clampFluidVw }}% от {{ clampViewport }}px = {{ formatPixels(clampPreferred) }}
              </div>
            </div>
          </div>
        </v-window-item>

        <v-window-item value="ch">
          <div class="playground-layout">
            <div class="controls">
              <div>
                <div class="control-label">
                  <span>Ширина контейнера</span>
                  <code>{{ chValue }}ch</code>
                </div>
                <v-slider v-model="chValue" :min="10" :max="60" :step="1" hide-details />
              </div>

              <v-select
                v-model="chFont"
                :items="chFonts"
                label="Шрифт"
                density="compact"
                hide-details
              />

              <v-textarea
                v-model="chText"
                label="Текст для проверки"
                rows="3"
                density="compact"
                hide-details
              />

              <v-alert type="info" variant="tonal" density="compact">
                <code>1ch</code> равен ширине символа <code>0</code> в выбранном шрифте, а не ширине
                любого символа.
              </v-alert>
            </div>

            <div class="preview-stage ch-preview">
              <div class="ch-measure" :style="{ width: `${chValue}ch`, fontFamily: chFont }">
                <div class="ch-zero-row" aria-hidden="true">
                  <span v-for="index in Math.min(chValue, 40)" :key="index">0</span>
                </div>
                <p>{{ chText }}</p>
              </div>
              <p class="preview-hint">
                Строка из нулей совпадает с мерой <code>ch</code>, а обычный текст может занимать
                другое число символов.
              </p>
            </div>
          </div>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.units-playground {
  border-radius: 12px;
}

.playground-title {
  align-items: center;
  display: flex;
  justify-content: space-between;
  white-space: normal;
}

.units-tabs {
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.playground-layout {
  display: grid;
  gap: 24px;
  grid-template-columns: minmax(240px, 0.8fr) minmax(0, 1.2fr);
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.control-label {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2px;
}

.preview-stage {
  background:
    linear-gradient(rgba(var(--v-theme-primary), 0.04), rgba(var(--v-theme-primary), 0.04)),
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 23px,
      rgba(var(--v-border-color), 0.1) 24px
    );
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 10px;
  min-height: 280px;
  overflow: hidden;
  padding: 20px;
}

.root-marker,
.phase-badge {
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 999px;
  color: rgb(var(--v-theme-primary));
  display: inline-flex;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 9px;
}

.rem-comparison {
  align-items: stretch;
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: 16px;
}

.sample-card {
  align-items: center;
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  justify-content: center;
  min-height: 150px;
  overflow: hidden;
  padding: 14px;
  text-align: center;
}

.sample-card--primary {
  border-color: rgba(var(--v-theme-primary), 0.55);
}

.sample-card strong {
  line-height: 1.1;
}

.sample-caption {
  color: rgb(var(--v-theme-primary));
  font-family: monospace;
  font-size: 0.75rem;
}

.preview-hint {
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
  font-size: 0.8rem;
  margin: 16px 0 0;
}

.em-tree {
  background: rgba(var(--v-theme-primary), 0.06);
  border: 1px dashed rgba(var(--v-theme-primary), 0.5);
  border-radius: 8px;
  padding: 12px;
}

.em-level {
  align-items: center;
  background: rgba(var(--v-theme-primary), 0.07);
  border: 1px solid rgba(var(--v-theme-primary), 0.22);
  border-radius: 7px;
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  min-height: 44px;
  padding: 8px 10px;
}

.em-level code {
  flex: none;
  font-size: 0.7rem;
}

.clamp-fields {
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.clamp-preview {
  display: flex;
  flex-direction: column;
}

.viewport-ruler {
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
  display: flex;
  font-size: 0.7rem;
  justify-content: space-between;
  margin-bottom: 5px;
}

.viewport-frame {
  align-items: center;
  background: rgb(var(--v-theme-surface));
  border: 2px solid rgba(var(--v-theme-primary), 0.45);
  border-radius: 8px;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  min-height: 170px;
  padding: 20px;
  text-align: center;
}

.viewport-frame h3 {
  line-height: 1.05;
  margin-bottom: 16px;
  transition: font-size 150ms ease;
}

.clamp-math {
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
  font-family: monospace;
  font-size: 0.75rem;
  margin-top: 12px;
  text-align: center;
}

.ch-preview {
  overflow-x: auto;
}

.ch-measure {
  background: rgb(var(--v-theme-surface));
  border-inline: 2px solid rgb(var(--v-theme-primary));
  max-width: 100%;
  min-height: 150px;
  overflow-wrap: break-word;
  padding: 12px 0;
}

.ch-zero-row {
  color: rgb(var(--v-theme-primary));
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
}

.ch-measure p {
  border-top: 1px dashed rgba(var(--v-border-color), var(--v-border-opacity));
  margin: 8px 0 0;
  padding-top: 8px;
}

.units-playground--compact .preview-stage {
  min-height: 240px;
}

@media (max-width: 900px) {
  .playground-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .playground-title {
    font-size: 1rem;
  }

  .units-tabs :deep(.v-tab) {
    min-width: 0;
    padding-inline: 8px;
  }

  .rem-comparison,
  .clamp-fields {
    grid-template-columns: 1fr;
  }

  .preview-stage {
    min-height: 220px;
    padding: 14px;
  }
}
</style>
