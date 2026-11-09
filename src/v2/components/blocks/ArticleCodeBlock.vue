<script setup lang="ts">
import { computed } from 'vue'
import Prism from 'prismjs'
import 'prismjs/components/prism-markup.js'
import 'prismjs/components/prism-css.js'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-typescript.js'
import 'prismjs/components/prism-jsx.js'
import 'prismjs/components/prism-tsx.js'
import 'prismjs/components/prism-bash.js'
import 'prismjs/components/prism-json.js'
import 'prismjs/components/prism-yaml.js'
import 'prismjs/components/prism-docker.js'
import 'prismjs/components/prism-nginx.js'
import 'prismjs/components/prism-http.js'
import 'prismjs/components/prism-nix.js'
import type { CodeBlock } from '../../types/article'

const props = defineProps<{ block: CodeBlock }>()
const highlighted = computed(() => {
  const grammar = Object.prototype.hasOwnProperty.call(Prism.languages, props.block.language)
    ? Prism.languages[props.block.language]
    : undefined
  return grammar && typeof grammar === 'object'
    ? Prism.highlight(props.block.code, grammar, props.block.language)
    : null
})
</script>

<template>
  <figure class="article-code">
    <div class="article-code-header">
      <span>{{ block.filename || 'Пример кода' }}</span>
      <span class="article-code-language">{{ block.language }}</span>
    </div>
    <pre
      tabindex="0"
      :aria-label="block.filename || `Пример кода: ${block.language}`"
    ><code v-if="highlighted !== null" v-html="highlighted"></code><code v-else>{{ block.code }}</code></pre>
    <figcaption v-if="block.caption">{{ block.caption }}</figcaption>
  </figure>
</template>

<style scoped>
.article-code {
  margin: 0;
  min-width: 0;
  border-radius: var(--article-radius);
  overflow: hidden;
}
.article-code-header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 10px 18px;
  background: #252b38;
  color: #c8d0df;
  font-size: 0.8rem;
}
.article-code-language {
  color: #a6b4cf;
}
.article-code pre {
  margin: 0;
  max-width: 100%;
  padding: 20px;
  overflow-x: auto;
  background: #181e29;
  color: #e3e9f3;
  font-size: 0.875rem;
  line-height: 1.75;
  tab-size: 2;
}
.article-code pre:focus-visible {
  outline: 2px solid #9bbcff;
  outline-offset: -3px;
}
.article-code code {
  display: block;
  padding: 0;
  background: transparent;
  color: inherit;
  font-size: inherit;
}
.article-code figcaption {
  padding-top: 8px;
  color: var(--article-muted);
  font-size: 0.85rem;
}
.article-code :deep(.token.comment),
.article-code :deep(.token.prolog) {
  color: #9caac3;
}
.article-code :deep(.token.keyword),
.article-code :deep(.token.tag) {
  color: #c7a5ff;
}
.article-code :deep(.token.string),
.article-code :deep(.token.attr-value) {
  color: #a9dbad;
}
.article-code :deep(.token.function),
.article-code :deep(.token.class-name) {
  color: #8fc6ff;
}
.article-code :deep(.token.number),
.article-code :deep(.token.boolean) {
  color: #f1bf8b;
}
.article-code :deep(.token.operator),
.article-code :deep(.token.punctuation) {
  color: #d7e0ef;
  background: transparent;
}
.article-code :deep(.token.property),
.article-code :deep(.token.attr-name) {
  color: #f0cf88;
}
</style>
