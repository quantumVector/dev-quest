import MarkdownIt from 'markdown-it'

// One parser for all prose blocks. Headings and code belong to dedicated article blocks.
const parser = new MarkdownIt({ html: false, linkify: false, typographer: false }).disable([
  'heading',
  'lheading',
  'fence',
  'code',
  'image',
  'table',
  'hr',
])

// Exact formatting markers only; other HTML tags and attributes stay escaped.
for (const tag of ['u', 'kbd']) {
  const opening = `<${tag}>`,
    closing = `</${tag}>`
  parser.inline.ruler.before('html_inline', tag, (state, silent) => {
    if (
      !state.src.startsWith(opening, state.pos) ||
      state.level >= (state.md.options.maxNesting ?? 20)
    )
      return false
    const end = state.src.indexOf(closing, state.pos + opening.length)
    if (end < 0 || end + closing.length > state.posMax) return false
    if (!silent) {
      const max = state.posMax
      state.push(`${tag}_open`, tag, 1)
      state.pos += opening.length
      state.posMax = end
      state.md.inline.tokenize(state)
      state.posMax = max
      state.push(`${tag}_close`, tag, -1)
    }
    state.pos = end + closing.length
    return true
  })
}

export function renderProse(source: string): string {
  return parser.render(source)
}

export function renderInlineProse(source: string): string {
  return parser.renderInline(source)
}
