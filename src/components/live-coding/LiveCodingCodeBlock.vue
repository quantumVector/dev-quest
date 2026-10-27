<script setup lang="ts">
import { computed } from 'vue'
import Prism from 'prismjs'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-typescript.js'
import 'prismjs/components/prism-jsx.js'
import 'prismjs/components/prism-tsx.js'
import 'prismjs/themes/prism-tomorrow.css'
import type { LiveCodingLanguage } from '@/types/live-coding'

const props = withDefaults(
  defineProps<{
    code: string
    language?: LiveCodingLanguage
  }>(),
  { language: 'javascript' },
)

const highlightedCode = computed(() =>
  Prism.highlight(props.code, Prism.languages[props.language], props.language),
)
</script>

<template>
  <pre
    class="live-coding-code"
    :class="`language-${language}`"
    tabindex="0"
    aria-label="Пример кода"
  ><code :class="`language-${language}`" v-html="highlightedCode"></code></pre>
</template>

<style scoped>
.live-coding-code {
  max-width: 100%;
  margin: 0;
  padding: 1rem;
  overflow-x: auto;
  border-radius: 8px;
  background: #282a36;
  font-size: 0.875rem;
  line-height: 1.7;
  tab-size: 2;
}

.live-coding-code code {
  padding: 0;
  background: transparent;
  color: #f8f8f2;
}

.live-coding-code:focus-visible {
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: 3px;
}
</style>
