<script setup lang="ts">
import LiveCodingCodeBlock from '@/components/live-coding/LiveCodingCodeBlock.vue'
import type { LiveCodingSolution } from '@/types/live-coding'

defineProps<{ solution: LiveCodingSolution }>()
</script>

<template>
  <div class="solution-content">
    <p v-for="note in solution.notes" :key="note" class="mb-4">{{ note }}</p>

    <section v-for="variant in solution.variants" :key="variant.title" class="solution-variant">
      <h3 class="text-h6 mb-3">{{ variant.title }}</h3>
      <LiveCodingCodeBlock :code="variant.code" :language="solution.language" />

      <ol class="pl-5 mt-4">
        <li v-for="step in variant.explanation" :key="step" class="mb-2">{{ step }}</li>
      </ol>

      <div class="complexity pa-4 mt-4 rounded-lg">
        <p class="mb-2"><strong>Время:</strong> {{ variant.timeComplexity }}</p>
        <p><strong>Память:</strong> {{ variant.spaceComplexity }}</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.solution-content {
  line-height: 1.7;
}

.solution-variant + .solution-variant {
  margin-top: 2rem;
}

.complexity {
  background: rgba(var(--v-theme-primary), 0.05);
}
</style>
