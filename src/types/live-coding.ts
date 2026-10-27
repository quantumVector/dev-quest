export type LiveCodingLanguage = 'javascript' | 'typescript' | 'tsx'

export type LiveCodingDifficulty = 'easy' | 'medium' | 'hard'

export interface LiveCodingSolutionVariant {
  title: string
  code: string
  explanation: string[]
  timeComplexity: string
  spaceComplexity: string
}

export interface LiveCodingSolution {
  language: LiveCodingLanguage
  notes?: string[]
  variants: LiveCodingSolutionVariant[]
}

export interface LiveCodingTask {
  id: number
  slug: string
  title: string
  summary: string
  difficulty: LiveCodingDifficulty
  tags: string[]
  description: string
  requirements: string[]
  examples: { code: string; explanation?: string }[]
  starterCode: string
  hints: string[]
  solution: LiveCodingSolution
  typescriptSolution?: LiveCodingSolution
}

export const liveCodingDifficulties = {
  easy: { label: 'Лёгкая', color: 'success' },
  medium: { label: 'Средняя', color: 'warning' },
  hard: { label: 'Сложная', color: 'error' },
} satisfies Record<LiveCodingDifficulty, { label: string; color: string }>

export const liveCodingLanguages = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  tsx: 'TypeScript / TSX',
} satisfies Record<LiveCodingLanguage, string>
