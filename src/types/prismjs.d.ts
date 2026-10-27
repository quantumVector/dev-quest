// The Prism API used for code examples in this application.
declare module 'prismjs' {
  export interface Grammar {
    [token: string]: RegExp | TokenDefinition | (RegExp | TokenDefinition)[] | Grammar
  }

  export interface TokenDefinition {
    pattern: RegExp
    lookbehind?: boolean
    greedy?: boolean
    alias?: string | string[]
    inside?: Grammar
  }

  const Prism: {
    languages: Record<string, Grammar>
    highlight(text: string, grammar: Grammar, language: string): string
  }

  export default Prism
}
