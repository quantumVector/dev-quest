import assert from 'node:assert/strict'
import { after, before, test } from 'node:test'
import { createServer } from 'vite'
import { effectScope, nextTick, ref } from 'vue'
import vue from '@vitejs/plugin-vue'
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import {
  htmlSources,
  cssSources,
  readLegacyArticle,
  readRenderedHtml,
} from './helpers/article-content.mjs'

import { javascriptSources } from './helpers/javascript-sources.mjs'
import { webApiSources } from './helpers/web-api-sources.mjs'
import { typescriptSources } from './helpers/typescript-sources.mjs'
import { reactSources } from './helpers/react-sources.mjs'
import { webSources } from './helpers/web-sources.mjs'
import { testingSources } from './helpers/testing-sources.mjs'
import { patternsSources } from './helpers/patterns-sources.mjs'
import { dockerSources } from './helpers/docker-sources.mjs'
import { remainingSources } from './helpers/remaining-sources.mjs'
import { readLegacyCatalog } from './helpers/legacy-catalog.mjs'

let server, api, schema, markdown, resources, renderer, section, titleRenderer, vuetify
before(async () => {
  server = await createServer({
    configFile: false,
    logLevel: 'error',
    plugins: [vue()],
    resolve: { alias: { '@': new URL('../../../', import.meta.url).pathname + 'src' } },
    ssr: { noExternal: ['vuetify'] },
    server: { middlewareMode: true, hmr: false, ws: false, watch: null },
    optimizeDeps: { noDiscovery: true, include: [] },
  })
  ;[api, schema, markdown, resources] = await Promise.all([
    server.ssrLoadModule('/src/v2/api/articles.ts'),
    server.ssrLoadModule('/src/v2/types/article.schema.ts'),
    server.ssrLoadModule('/src/v2/utils/markdown.ts'),
    server.ssrLoadModule('/src/v2/composables/useAsyncResource.ts'),
  ])
  // Tests stay local even when the developer has configured a real API in .env.local.
  api = { ...api, articlesApi: api.createArticlesApi(api.mockArticlesSource) }
  const [rendererModule, sectionModule, titleModule, framework, components] = await Promise.all([
    server.ssrLoadModule('/src/v2/components/ArticleRenderer.vue'),
    server.ssrLoadModule('/src/v2/components/ArticleSection.vue'),
    server.ssrLoadModule('/src/v2/components/ArticleTitle.vue'),
    server.ssrLoadModule('vuetify'),
    server.ssrLoadModule('vuetify/components'),
  ])
  renderer = rendererModule.default
  section = sectionModule.default
  titleRenderer = titleModule.default
  vuetify = () =>
    framework.createVuetify({
      ssr: true,
      components,
      // Compare all answer content during SSR without changing the initial browser state.
      defaults: { VExpansionPanels: { eager: true }, VWindowItem: { eager: true } },
    })
})
after(async () => {
  await server?.close()
})

test('every catalog entry resolves to a valid, matching article with independently loaded content', async () => {
  const catalog = await api.articlesApi.getCatalog()
  assert.equal(catalog.articles.length, 125)
  assert.deepEqual(
    catalog.articles
      .filter((article) => article.categoryId === 'html')
      .map((article) => article.id),
    ['what-is-html', 'semantic-html', 'accessibility', 'responsive-image'],
  )
  assert.deepEqual(
    catalog.articles.filter((article) => article.categoryId === 'css').map((article) => article.id),
    cssSources.map((article) => article.id),
  )
  assert.deepEqual(
    catalog.articles
      .filter((article) => article.categoryId === 'javascript')
      .map((article) => ({ id: article.id, legacyPath: article.legacyPath })),
    javascriptSources.map(({ id, legacyPath }) => ({ id, legacyPath })),
  )
  assert.deepEqual(
    catalog.articles
      .filter((article) => article.categoryId === 'web-api')
      .map((article) => ({ id: article.id, legacyPath: article.legacyPath })),
    webApiSources.map(({ id, legacyPath }) => ({ id, legacyPath })),
  )
  assert.deepEqual(
    catalog.articles
      .filter((article) => article.categoryId === 'typescript')
      .map((article) => ({ id: article.id, legacyPath: article.legacyPath })),
    typescriptSources.map(({ id, legacyPath }) => ({ id, legacyPath })),
  )
  assert.deepEqual(
    catalog.articles
      .filter((article) => article.categoryId === 'react')
      .map((article) => ({ id: article.id, legacyPath: article.legacyPath })),
    reactSources.map(({ id, legacyPath }) => ({ id, legacyPath })),
  )
  assert.deepEqual(
    catalog.articles
      .filter((article) => article.categoryId === 'web')
      .map((article) => ({ id: article.id, legacyPath: article.legacyPath })),
    webSources.map(({ id, legacyPath }) => ({ id, legacyPath })),
  )
  for (const [categoryId, sources] of [
    ['testing', testingSources],
    ['patterns', patternsSources],
    ['docker', dockerSources],
    ...['ops', 'optimization', 'tanstack-query', 'jotai'].map((topic) => [
      topic,
      remainingSources.filter((source) => source.topic === topic),
    ]),
  ]) {
    assert.deepEqual(
      catalog.articles
        .filter((article) => article.categoryId === categoryId)
        .map((article) => ({ id: article.id, legacyPath: article.legacyPath })),
      sources.map(({ id, legacyPath }) => ({ id, legacyPath })),
    )
  }
  for (const summary of catalog.articles) {
    const article = await api.articlesApi.getArticle(summary.id)
    assert.equal(article.title, summary.title)
    assert.equal(article.categoryId, summary.categoryId)
    assert.ok(article.sections.length > 0)
  }
  const first = await api.articlesApi.getArticle('semantic-html')
  first.sections[0].title = 'Changed by consumer'
  const second = await api.articlesApi.getArticle('semantic-html')
  assert.notEqual(second.sections[0].title, first.sections[0].title)
})

test('v2 covers every non-AI home article once and in original category order', async () => {
  const original = readLegacyCatalog()
  const urls = original.flatMap((category) => category.urls)
  const catalog = await api.articlesApi.getCatalog()
  assert.equal(urls.length, 123)
  assert.equal(new Set(urls).size, urls.length)
  assert.deepEqual(
    catalog.articles.filter((article) => article.legacyPath).map((article) => article.legacyPath),
    urls,
  )
  assert.deepEqual(
    catalog.categories
      .filter((category) => !['ai-basics', 'preview'].includes(category.id))
      .map((category) => category.title),
    original.map((category) => category.title),
  )
  assert.deepEqual(
    catalog.categories
      .filter((category) => category.id === 'ai-basics')
      .map((category) => category.title),
    ['Основы ИИ и локальное использование'],
  )
  assert.deepEqual(
    catalog.articles.filter((article) => !article.legacyPath).map((article) => article.id),
    ['llm-introduction', 'block-showcase'],
  )
})

test('examples exercise every block type, all registered widgets, and raw code imports', async () => {
  const types = new Set(),
    widgets = new Set(),
    codes = []
  function walk(value) {
    if (Array.isArray(value)) {
      value.forEach(walk)
      return
    }
    if (!value || typeof value !== 'object') return
    if (value.type) types.add(value.type)
    if (value.type === 'widget') widgets.add(value.name)
    if (value.type === 'code') codes.push(value.code)
    Object.values(value).forEach(walk)
  }
  for (const summary of (await api.articlesApi.getCatalog()).articles) {
    walk(await api.articlesApi.getArticle(summary.id))
  }
  assert.deepEqual(
    [...types].sort(),
    [
      'accordion',
      'callout',
      'cards',
      'code',
      'prose',
      'progress',
      'list',
      'inline-code',
      'line-break',
      'heading',
      'tags',
      'resources',
      'steps',
      'table',
      'tabs',
      'timeline',
      'widget',
    ].sort(),
  )
  assert.deepEqual([...widgets].sort(), ['css-specificity', 'css-units', 'testing-pyramid'])
  assert.ok(codes.some((code) => /^<!doctype html>/i.test(code)))
})

test('missing articles return an explicit 404', async () => {
  await assert.rejects(
    api.articlesApi.getArticle('does-not-exist'),
    (error) => error.status === 404,
  )
})

test('invalid versions, unknown blocks, empty containers and duplicate section IDs are rejected', async () => {
  const article = await api.articlesApi.getArticle('semantic-html')
  const malformed = [
    { ...article, schemaVersion: 2 },
    {
      ...article,
      sections: [
        { id: 'example', title: 'Example', blocks: [{ id: 'unknown', type: 'future-block' }] },
      ],
    },
    { ...article, sections: [] },
    { ...article, sections: [article.sections[0], article.sections[0]] },
    {
      ...article,
      sections: [
        { id: 'example', title: 'Example', blocks: [{ id: 'empty', type: 'tabs', items: [] }] },
      ],
    },
  ]
  for (const value of malformed)
    assert.throws(() => schema.parseArticle(value), schema.ArticleDataError)
})

test('nested table cells and widget properties are validated, including excessive recursion', async () => {
  const article = await api.articlesApi.getArticle('semantic-html')
  const withBlock = (block) => ({
    ...article,
    sections: [{ id: 'example', title: 'Example', blocks: [block] }],
  })
  const invalidBlocks = [
    {
      id: 'table',
      type: 'table',
      columns: [{ id: 'one', label: 'One' }],
      rows: [{ id: 'row', cells: [] }],
    },
    {
      id: 'table',
      type: 'table',
      columns: [{ id: 'one', label: 'One' }],
      rows: [{ id: 'row', cells: [[{ id: 'prose', type: 'prose', markdown: 42 }]] }],
    },
    { id: 'widget', type: 'widget', name: 'arbitrary-component' },
    { id: 'widget', type: 'widget', name: 'css-units', props: { compact: 'yes' } },
    {
      id: 'widget',
      type: 'widget',
      name: 'testing-pyramid',
      props: { levels: [{ id: 'one', label: 'One', percent: 101 }] },
    },
  ]
  let nested = { id: 'text', type: 'prose', markdown: 'Leaf' }
  for (let index = 0; index < 25; index++)
    nested = { id: 'nested', type: 'callout', tone: 'info', blocks: [nested] }
  invalidBlocks.push(nested)
  for (const block of invalidBlocks)
    assert.throws(() => schema.parseArticle(withBlock(block)), schema.ArticleDataError)
})

test('catalog references, resource URLs and legacy paths are checked', async () => {
  const catalog = await api.articlesApi.getCatalog()
  assert.throws(() => schema.parseCatalog({ ...catalog, categories: [] }), schema.ArticleDataError)
  const article = await api.articlesApi.getArticle('semantic-html')
  assert.throws(
    () => schema.parseArticle({ ...article, legacyPath: '//example.com' }),
    schema.ArticleDataError,
  )
  for (const url of ['javascript:alert(1)', '//example.com', '/\\example.com']) {
    const sections = [
      {
        id: 'links',
        title: 'Links',
        blocks: [{ id: 'resources', type: 'resources', items: [{ id: 'one', label: 'One', url }] }],
      },
    ]
    assert.throws(() => schema.parseArticle({ ...article, sections }), schema.ArticleDataError)
  }
})

test('introductory content and the additional HTML block variants are validated', async () => {
  const article = await api.articlesApi.getArticle('what-is-html')
  for (const intro of [
    'not an array',
    [{ id: 'heading', type: 'heading', level: 2, text: 'Title' }],
  ]) {
    assert.throws(() => schema.parseArticle({ ...article, intro }), schema.ArticleDataError)
  }
  for (const titleMarkdown of ['', 42])
    assert.throws(() => schema.parseArticle({ ...article, titleMarkdown }), schema.ArticleDataError)
  const invalidBlocks = [
    { id: 'tags', type: 'tags', items: [] },
    { id: 'tags', type: 'tags', items: ['Valid', 42] },
    { id: 'heading', type: 'heading', level: 4, text: '' },
    { id: 'callout', type: 'callout', tone: 'info', label: 42, blocks: [] },
    { id: 'cards', type: 'cards', items: [{ id: 'card', title: '', blocks: [] }] },
    {
      id: 'cards',
      type: 'cards',
      columns: 1,
      items: [{ id: 'card', title: 'Title', headingLevel: 5, blocks: [] }],
    },
    {
      id: 'table',
      type: 'table',
      columns: [{ id: 'first', label: 'First' }, { id: 'second' }],
      rows: [],
    },
  ]
  for (const block of invalidBlocks) {
    assert.throws(
      () => schema.parseArticle({ ...article, intro: [block] }),
      schema.ArticleDataError,
    )
  }
})

test('API rejects an article for another ID and an aborted in-flight response', async () => {
  const article = await api.articlesApi.getArticle('semantic-html')
  const wrongSource = { getArticle: async () => article, getCatalog: async () => ({}) }
  await assert.rejects(
    api.createArticlesApi(wrongSource).getArticle('other'),
    (error) => error.status === 502,
  )
  const controller = new AbortController()
  let resolve
  const delayed = api.createArticlesApi({
    ...wrongSource,
    getArticle: () =>
      new Promise((done) => {
        resolve = done
      }),
  })
  const pending = delayed.getArticle(article.id, controller.signal)
  controller.abort()
  resolve(article)
  await assert.rejects(pending, (error) => error.name === 'AbortError')
  await assert.rejects(
    api.articlesApi.getCatalog(controller.signal),
    (error) => error.name === 'AbortError',
  )
})

test('JavaScript container variants reject malformed data and survive JSON transport', async () => {
  const article = await api.articlesApi.getArticle('js-context')
  assert.deepEqual(schema.parseArticle(JSON.parse(JSON.stringify(article))), article)
  const invalid = [
    { id: 'list', type: 'list', items: [] },
    { id: 'list', type: 'list', ordered: 'yes', items: [{ id: 'item', blocks: [] }] },
    { id: 'list', type: 'list', items: [{ id: 'item', blocks: ['invalid'] }] },
    { id: 'inline-code', type: 'inline-code', lines: [42] },
    { id: 'inline-code', type: 'inline-code', lines: [] },
    {
      id: 'steps',
      type: 'steps',
      showTitle: 'no',
      items: [{ id: 'step', title: 'Step', blocks: [] }],
    },
    ...['', 42, null, ['Reset']].map((restartLabel) => ({
      id: 'steps',
      type: 'steps',
      restartLabel,
      items: [{ id: 'step', title: 'Step', blocks: [] }],
    })),
    { id: 'timeline', type: 'timeline', items: [{ id: 'event', title: '', blocks: [] }] },
    { id: 'timeline', type: 'timeline', items: [{ id: 'event', blocks: ['invalid'] }] },
    { id: 'cards', type: 'cards', columns: 5, items: [{ id: 'card', blocks: [] }] },
  ]
  for (const block of invalid) {
    assert.throws(
      () => schema.parseArticle({ ...article, intro: [block] }),
      schema.ArticleDataError,
    )
  }
})

test('HTTP adapter encodes IDs, passes cancellation and reports server errors without mock fallback', async () => {
  const controller = new AbortController()
  let requested
  const source = api.createHttpArticlesSource('/api/v2/', async (url, options) => {
    requested = { url, options }
    return Response.json({ ok: true })
  })
  await source.getArticle('name/with space', controller.signal)
  assert.equal(requested.url, '/api/v2/articles/name%2Fwith%20space')
  assert.equal(requested.options.signal, controller.signal)
  for (const status of [404, 500]) {
    const failing = api.createHttpArticlesSource(
      '/api/v2',
      async () => new Response(null, { status }),
    )
    await assert.rejects(failing.getArticle('example'), (error) => error.status === status)
  }
})

test('WebAPI sequence and percentage blocks validate API data before rendering', async () => {
  const article = await api.articlesApi.getArticle('web-api-request-animation-frame')
  assert.deepEqual(schema.parseArticle(JSON.parse(JSON.stringify(article))), article)
  const invalid = [
    ...[-1, 101, NaN, Infinity, '50'].map((value) => ({
      id: 'progress',
      type: 'progress',
      value,
      label: 'CPU',
    })),
    { id: 'progress', type: 'progress', value: 50, label: '' },
    { id: 'progress', type: 'progress', value: 50, label: 'CPU', tone: 'unknown' },
    { id: 'progress', type: 'progress', value: 50, label: 'CPU', tone: ['info'] },
    {
      id: 'steps',
      type: 'steps',
      mode: 'unknown',
      items: [{ id: 'step', title: 'Step', blocks: [] }],
    },
    {
      id: 'steps',
      type: 'steps',
      mode: ['sequence'],
      items: [{ id: 'step', title: 'Step', blocks: [] }],
    },
  ]
  for (const block of invalid)
    assert.throws(
      () => schema.parseArticle({ ...article, intro: [block] }),
      schema.ArticleDataError,
    )
})

test('rendered code is read as literal text when examples contain Vue or Go interpolation', () => {
  const profile = readRenderedHtml(
    '<pre><code>{{ size.width }} &lt;div&gt; {{ layout }} {{.State.Health.Status}}</code></pre>',
  )
  assert.deepEqual(profile.code, ['{{ size.width }} <div> {{ layout }} {{.State.Health.Status}}'])
})

test('allowlisted inline markers preserve formatting and keep other HTML escaped', () => {
  for (const tag of ['u', 'kbd']) {
    const html = markdown.renderProse(
      `<${tag}>**Текст** и \`код\`</${tag}> <${tag} onclick="alert(1)">не тег</${tag}> <script>alert(1)</script>`,
    )
    assert.match(html, new RegExp(`<${tag}><strong>Текст</strong> и <code>код</code></${tag}>`))
    assert.doesNotMatch(html, new RegExp(`<script|<${tag} onclick`))
    assert.match(html, new RegExp(`&lt;${tag} onclick=`))
    assert.match(
      markdown.renderInlineProse(`<${tag}>без закрытия`),
      new RegExp(`&lt;${tag}&gt;без закрытия`),
    )
  }
  assert.match(
    markdown.renderInlineProse('`<kbd>literal</kbd>`'),
    /<code>&lt;kbd&gt;literal&lt;\/kbd&gt;<\/code>/,
  )
})

test('prose renders formatting while escaping raw HTML and blocking executable links', () => {
  const html = markdown.renderProse(
    '**Bold** and `inline`\n\n- Item\n\n<script>alert(1)</script>\n\n[bad](javascript:alert(1))',
  )
  assert.match(html, /<strong>Bold<\/strong>/)
  assert.match(html, /<code>inline<\/code>/)
  assert.match(html, /<li>Item<\/li>/)
  assert.match(html, /&lt;script&gt;/)
  assert.doesNotMatch(html, /<script|href="javascript:/)
})

test('accordion titles keep inline formatting without accepting raw HTML', () => {
  const title = markdown.renderInlineProse('**Вопрос** про `@scope` <script>alert(1)</script>')
  assert.match(title, /<strong>Вопрос<\/strong>/)
  assert.match(title, /<code>@scope<\/code>/)
  assert.match(title, /&lt;script&gt;/)
  assert.doesNotMatch(title, /<script|<p>/)
})

test('migrated CSS articles retain both original trainers in compact mode', async () => {
  const widgets = []
  function walk(value) {
    if (!value || typeof value !== 'object') return
    if (value.type === 'widget') widgets.push({ name: value.name, props: value.props })
    Object.values(value).forEach(walk)
  }
  for (const source of cssSources) walk(await api.articlesApi.getArticle(source.id))
  assert.deepEqual(widgets, [
    { name: 'css-specificity', props: { compact: true } },
    { name: 'css-units', props: { compact: true } },
  ])
})

test('route changes discard old responses and retry reloads the current article', async () => {
  const key = ref('first'),
    requests = [],
    scope = effectScope()
  const resource = scope.run(() =>
    resources.useAsyncResource((signal) => {
      const id = key.value
      return new Promise((resolve) => {
        requests.push({ id, signal, resolve })
      })
    }),
  )
  try {
    key.value = 'second'
    await nextTick()
    assert.equal(requests[0].signal.aborted, true)
    requests[1].resolve('Second article')
    await new Promise(setImmediate)
    requests[0].resolve('Obsolete first article')
    await new Promise(setImmediate)
    assert.equal(resource.data.value, 'Second article')
    assert.equal(resource.loading.value, false)
    resource.retry()
    await nextTick()
    assert.equal(requests[2].id, 'second')
    assert.equal(resource.loading.value, true)
    requests[2].resolve('Retried article')
    await new Promise(setImmediate)
    assert.equal(resource.data.value, 'Retried article')
  } finally {
    scope.stop()
  }
})

for (const source of [
  ...htmlSources.map((item) => ({ ...item, topic: 'html' })),
  ...cssSources.map((item) => ({ ...item, topic: 'css' })),
  ...javascriptSources.map((item) => ({ ...item, topic: 'js' })),
  ...webApiSources.map((item) => ({ ...item, topic: 'web-api' })),
  ...typescriptSources.map((item) => ({ ...item, topic: 'ts' })),
  ...reactSources.map((item) => ({ ...item, topic: 'react' })),
  ...webSources.map((item) => ({ ...item, topic: 'web' })),
  ...testingSources.map((item) => ({ ...item, topic: 'testing' })),
  ...patternsSources.map((item) => ({ ...item, topic: 'patterns' })),
  ...dockerSources.map((item) => ({ ...item, topic: 'docker' })),
  ...remainingSources,
]) {
  test(`${source.topic.toUpperCase()} migration preserves all rendered content and exact code: ${source.id}`, async () => {
    const original = readLegacyArticle(source.topic, source.file)
    const article = await api.articlesApi.getArticle(source.id)
    const app = createSSRApp({
      render: () =>
        h('article', [
          h(titleRenderer, { title: article.title, markdown: article.titleMarkdown }),
          h(renderer, { blocks: article.intro }),
          ...article.sections.map((item) =>
            h(
              section,
              { id: item.id, title: item.title },
              {
                default: () => h(renderer, { blocks: item.blocks }),
              },
            ),
          ),
        ]),
    })
    app.use(vuetify())
    const migrated = readRenderedHtml(await renderToString(app))
    assert.equal(original.code.length, source.codeCount)
    assert.equal(original.tables.length, source.tableCount)
    assert.deepEqual(
      migrated.code,
      original.code,
      'Code must match character for character, in source order',
    )
    if (migrated.text !== original.text) {
      let index = 0
      while (migrated.text[index] === original.text[index] && index < original.text.length) index++
      assert.fail(
        `Text differs at ${index}:\nOriginal: ${original.text.slice(Math.max(0, index - 50), index + 100)}\nMigrated: ${migrated.text.slice(Math.max(0, index - 50), index + 100)}`,
      )
    }
    for (const key of [
      'headings',
      'inlineCode',
      'tables',
      'lists',
      'links',
      'emphasis',
      'tags',
      'breaks',
      'widgets',
      'navigation',
      'progress',
      'keyboard',
      'pyramids',
    ]) {
      assert.deepEqual(migrated[key], original[key], `${source.id}: ${key} must stay unchanged`)
    }
  })
}
