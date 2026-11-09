export type ArticleTone = 'info' | 'success' | 'warning' | 'error'

export interface ArticleItem {
  id: string
  title: string
  blocks: ArticleBlock[]
}

interface BlockBase {
  id: string
}

export interface ProseBlock extends BlockBase {
  type: 'prose'
  markdown: string
}

export interface HeadingBlock extends BlockBase {
  type: 'heading'
  level: 3 | 4
  text: string
}

export interface ListBlock extends BlockBase {
  type: 'list'
  ordered?: boolean
  items: { id: string; blocks: ArticleBlock[] }[]
}

export interface InlineCodeBlock extends BlockBase {
  type: 'inline-code'
  /** Segments separated by explicit line breaks. */
  lines: string[]
}

export interface LineBreakBlock extends BlockBase {
  type: 'line-break'
}

export interface TagsBlock extends BlockBase {
  type: 'tags'
  items: string[]
}

export interface CodeBlock extends BlockBase {
  type: 'code'
  language: string
  code: string
  filename?: string
  caption?: string
}

export interface TableBlock extends BlockBase {
  type: 'table'
  caption?: string
  /** Omit all labels for a table that has no header in the source content. */
  columns: { id: string; label?: string }[]
  rows: { id: string; cells: ArticleBlock[][] }[]
}

export interface CalloutBlock extends BlockBase {
  type: 'callout'
  tone: ArticleTone
  /** A note label that is not a document heading. */
  label?: string
  title?: string
  blocks: ArticleBlock[]
}

export interface CardsBlock extends BlockBase {
  type: 'cards'
  columns?: 1 | 2 | 3 | 4
  items: { id: string; title?: string; headingLevel?: 3 | 4; blocks: ArticleBlock[] }[]
}

export interface AccordionBlock extends BlockBase {
  type: 'accordion'
  multiple?: boolean
  /** Titles support inline Markdown, e.g. bold questions or inline code. */
  items: ArticleItem[]
}

export interface TabsBlock extends BlockBase {
  type: 'tabs'
  items: ArticleItem[]
}

export interface StepsBlock extends BlockBase {
  type: 'steps'
  /** A sequence shows all labels without controls or a selected panel. */
  mode?: 'interactive' | 'sequence'
  /** Hide the repeated title when the panel already contains its own heading. */
  showTitle?: boolean
  /** Offer a return to the first step after the final panel. */
  restartLabel?: string
  items: ArticleItem[]
}

export interface ProgressBlock extends BlockBase {
  type: 'progress'
  value: number
  /** Inline Markdown, rendered over the percentage bar. */
  label: string
  tone?: ArticleTone
}

export interface TimelineBlock extends BlockBase {
  type: 'timeline'
  items: { id: string; title?: string; blocks: ArticleBlock[] }[]
}

export interface ResourcesBlock extends BlockBase {
  type: 'resources'
  items: { id: string; label: string; url: string; description?: string }[]
}

export interface PyramidLevel {
  id: string
  label: string
  percent: number
}

export type WidgetBlock = BlockBase &
  (
    | {
        type: 'widget'
        name: 'css-specificity' | 'css-units'
        props?: { compact?: boolean }
      }
    | {
        type: 'widget'
        name: 'testing-pyramid'
        props: { levels: PyramidLevel[] }
      }
  )

export type ArticleBlock =
  | ProseBlock
  | ListBlock
  | InlineCodeBlock
  | LineBreakBlock
  | HeadingBlock
  | TagsBlock
  | CodeBlock
  | TableBlock
  | CalloutBlock
  | CardsBlock
  | AccordionBlock
  | TabsBlock
  | StepsBlock
  | ProgressBlock
  | TimelineBlock
  | ResourcesBlock
  | WidgetBlock

export interface ArticleSummary {
  id: string
  categoryId: string
  title: string
  description: string
  tags: string[]
  legacyPath?: string
}

export interface Article extends ArticleSummary {
  schemaVersion: 1
  /** Optional inline Markdown for the document title; catalog titles stay plain text. */
  titleMarkdown?: string
  /** Original introductory content, rendered instead of the catalog description. */
  intro?: ArticleBlock[]
  sections: ArticleItem[]
}

export interface ArticleCatalog {
  schemaVersion: 1
  categories: { id: string; title: string; description: string }[]
  articles: ArticleSummary[]
}

/** Transport returns unknown; articles.ts validates it before the UI receives data. */
export interface ArticlesSource {
  getCatalog(signal?: AbortSignal): Promise<unknown>
  getArticle(id: string, signal?: AbortSignal): Promise<unknown>
}
