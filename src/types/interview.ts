export interface InterviewQuestion {
  id: number
  question: string
  answer: string
  difficulty?: 'junior' | 'middle' | 'senior'
  tags?: string[]
}
