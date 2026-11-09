import type { Article, ArticleBlock, ArticleCatalog, ArticleSummary } from './article'

export class ArticleDataError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ArticleDataError'
  }
}

type ObjectValue = Record<string, unknown>
const object = (value: unknown): value is ObjectValue =>
  typeof value === 'object' && value !== null && !Array.isArray(value)
const text = (value: unknown): value is string => typeof value === 'string'
const nonEmpty = (value: unknown): value is string => text(value) && value.trim().length > 0
const optionalText = (value: unknown) => value === undefined || text(value)
const optionalBoolean = (value: unknown) => value === undefined || typeof value === 'boolean'
const id = (value: unknown): value is string =>
  text(value) && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)

function uniqueItems(value: unknown, check: (item: unknown) => boolean): value is ObjectValue[] {
  if (!Array.isArray(value)) return false
  const ids = new Set<string>()
  return value.every((item) => {
    if (!object(item) || !id(item.id) || ids.has(item.id) || !check(item)) return false
    ids.add(item.id)
    return true
  })
}

function safeLink(value: unknown): value is string {
  return text(value) && /^(https?:\/\/[^\s]+|\/(?!\/)[^\s\\]*|#[^\s]*)$/.test(value)
}

function summary(value: unknown): value is ArticleSummary {
  return (
    object(value) &&
    id(value.id) &&
    id(value.categoryId) &&
    nonEmpty(value.title) &&
    text(value.description) &&
    Array.isArray(value.tags) &&
    value.tags.every(nonEmpty) &&
    (value.legacyPath === undefined ||
      (text(value.legacyPath) && /^\/(?!\/)[^\s\\]*$/.test(value.legacyPath)))
  )
}

function blocks(value: unknown, depth: number): boolean {
  // Bound recursion for malformed API responses, including circular local objects.
  return depth <= 20 && uniqueItems(value, (item) => block(item, depth + 1))
}

function items(value: unknown, depth: number): boolean {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    uniqueItems(value, (item) => object(item) && nonEmpty(item.title) && blocks(item.blocks, depth))
  )
}

function block(value: unknown, depth: number): value is ArticleBlock {
  if (!object(value) || !id(value.id)) return false
  switch (value.type) {
    case 'prose':
      return text(value.markdown)
    case 'line-break':
      return true
    case 'inline-code':
      return Array.isArray(value.lines) && value.lines.length > 0 && value.lines.every(text)
    case 'list':
      return (
        optionalBoolean(value.ordered) &&
        Array.isArray(value.items) &&
        value.items.length > 0 &&
        uniqueItems(value.items, (item) => object(item) && blocks(item.blocks, depth))
      )
    case 'heading':
      return (value.level === 3 || value.level === 4) && nonEmpty(value.text)
    case 'tags':
      return Array.isArray(value.items) && value.items.length > 0 && value.items.every(nonEmpty)
    case 'code':
      return (
        nonEmpty(value.language) &&
        text(value.code) &&
        optionalText(value.filename) &&
        optionalText(value.caption)
      )
    case 'table': {
      if (!Array.isArray(value.columns) || value.columns.length === 0) return false
      const columnCount = value.columns.length
      return (
        optionalText(value.caption) &&
        uniqueItems(
          value.columns,
          (column) => object(column) && (column.label === undefined || nonEmpty(column.label)),
        ) &&
        (value.columns.every((column) => column.label === undefined) ||
          value.columns.every((column) => nonEmpty(column.label))) &&
        uniqueItems(
          value.rows,
          (row) =>
            object(row) &&
            Array.isArray(row.cells) &&
            row.cells.length === columnCount &&
            row.cells.every((cell) => blocks(cell, depth)),
        )
      )
    }
    case 'callout':
      return (
        ['info', 'success', 'warning', 'error'].includes(String(value.tone)) &&
        optionalText(value.label) &&
        optionalText(value.title) &&
        blocks(value.blocks, depth)
      )
    case 'cards':
      return (
        (value.columns === undefined ||
          value.columns === 1 ||
          value.columns === 2 ||
          value.columns === 3 ||
          value.columns === 4) &&
        Array.isArray(value.items) &&
        value.items.length > 0 &&
        uniqueItems(
          value.items,
          (item) =>
            object(item) &&
            (item.title === undefined || nonEmpty(item.title)) &&
            blocks(item.blocks, depth) &&
            (item.headingLevel === undefined || item.headingLevel === 3 || item.headingLevel === 4),
        )
      )
    case 'accordion':
      return optionalBoolean(value.multiple) && items(value.items, depth)
    case 'tabs':
      return items(value.items, depth)
    case 'steps':
      return (
        (value.mode === undefined || value.mode === 'interactive' || value.mode === 'sequence') &&
        optionalBoolean(value.showTitle) &&
        (value.restartLabel === undefined || nonEmpty(value.restartLabel)) &&
        items(value.items, depth)
      )
    case 'progress':
      return (
        typeof value.value === 'number' &&
        Number.isFinite(value.value) &&
        value.value >= 0 &&
        value.value <= 100 &&
        nonEmpty(value.label) &&
        (value.tone === undefined ||
          (text(value.tone) && ['info', 'success', 'warning', 'error'].includes(value.tone)))
      )
    case 'timeline':
      return (
        Array.isArray(value.items) &&
        value.items.length > 0 &&
        uniqueItems(
          value.items,
          (item) =>
            object(item) &&
            (item.title === undefined || nonEmpty(item.title)) &&
            blocks(item.blocks, depth),
        )
      )
    case 'resources':
      return uniqueItems(
        value.items,
        (item) =>
          object(item) &&
          nonEmpty(item.label) &&
          safeLink(item.url) &&
          optionalText(item.description),
      )
    case 'widget':
      if (value.name === 'testing-pyramid') {
        return (
          object(value.props) &&
          Array.isArray(value.props.levels) &&
          value.props.levels.length > 0 &&
          value.props.levels.length <= 6 &&
          uniqueItems(
            value.props.levels,
            (level) =>
              object(level) &&
              nonEmpty(level.label) &&
              typeof level.percent === 'number' &&
              Number.isFinite(level.percent) &&
              level.percent >= 0 &&
              level.percent <= 100,
          )
        )
      }
      return (
        ['css-specificity', 'css-units'].includes(String(value.name)) &&
        (value.props === undefined || (object(value.props) && optionalBoolean(value.props.compact)))
      )
    default:
      return false
  }
}

export function parseArticle(value: unknown): Article {
  if (
    !summary(value) ||
    !object(value) ||
    value.schemaVersion !== 1 ||
    (value.titleMarkdown !== undefined && !nonEmpty(value.titleMarkdown)) ||
    (value.intro !== undefined && !blocks(value.intro, 0)) ||
    !items(value.sections, 0)
  ) {
    throw new ArticleDataError(
      'Статья имеет неподдерживаемый формат или содержит некорректные блоки.',
    )
  }
  return value as unknown as Article
}

export function parseCatalog(value: unknown): ArticleCatalog {
  if (
    !object(value) ||
    value.schemaVersion !== 1 ||
    !uniqueItems(
      value.categories,
      (category) => object(category) && nonEmpty(category.title) && text(category.description),
    ) ||
    !uniqueItems(value.articles, summary)
  ) {
    throw new ArticleDataError('Каталог статей имеет неподдерживаемый формат.')
  }
  const categoryIds = new Set(value.categories.map((category) => category.id))
  if (!value.articles.every((article) => categoryIds.has(article.categoryId))) {
    throw new ArticleDataError('В каталоге указана неизвестная категория.')
  }
  return value as unknown as ArticleCatalog
}
