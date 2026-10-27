export type TokenCandidate = {
  text: string
  probability: number
  next?: TokenNode
}

export type TokenNode = { candidates: TokenCandidate[] }

const end: TokenNode = { candidates: [{ text: '.', probability: 1 }] }

const continuations = (variants: [string, string, number][]): TokenNode => ({
  candidates: variants.map(([text, ending, probability]) => ({
    text,
    probability,
    next: { candidates: [{ text: ending, probability: 1, next: end }] },
  })),
})

export const tokenScenarios: { id: string; prefix: string; root: TokenNode }[] = [
  {
    id: 'writing',
    prefix: 'Сегодня я буду писать',
    root: {
      candidates: [
        {
          text: ' код',
          probability: 0.55,
          next: continuations([
            [' на', ' TypeScript', 0.6],
            [' для', ' проекта', 0.3],
            [' с', ' командой', 0.1],
          ]),
        },
        {
          text: ' статью',
          probability: 0.25,
          next: continuations([
            [' про', ' разработку', 0.6],
            [' для', ' блога', 0.3],
            [' вместе', ' с редактором', 0.1],
          ]),
        },
        {
          text: ' письмо',
          probability: 0.15,
          next: continuations([
            [' для', ' коллеги', 0.6],
            [' про', ' встречу', 0.3],
            [' вместе', ' с командой', 0.1],
          ]),
        },
        {
          text: ' стихи',
          probability: 0.05,
          next: continuations([
            [' про', ' осень', 0.6],
            [' для', ' друга', 0.3],
            [' вместе', ' с автором', 0.1],
          ]),
        },
      ],
    },
  },
  {
    id: 'opening',
    prefix: 'После работы я открою',
    root: {
      candidates: [
        {
          text: ' редактор',
          probability: 0.55,
          next: continuations([
            [' для', ' проекта', 0.6],
            [' с', ' новым файлом', 0.3],
            [' прямо', ' в браузере', 0.1],
          ]),
        },
        {
          text: ' книгу',
          probability: 0.25,
          next: continuations([
            [' про', ' космос', 0.6],
            [' с', ' рассказами', 0.3],
            [' вместе', ' с другом', 0.1],
          ]),
        },
        {
          text: ' почту',
          probability: 0.15,
          next: continuations([
            [' на', ' ноутбуке', 0.6],
            [' для', ' проверки писем', 0.3],
            [' прямо', ' в браузере', 0.1],
          ]),
        },
        {
          text: ' игру',
          probability: 0.05,
          next: continuations([
            [' на', ' телефоне', 0.6],
            [' вместе', ' с друзьями', 0.3],
            [' прямо', ' в браузере', 0.1],
          ]),
        },
      ],
    },
  },
]

// softmax(log(p) / T): apply temperature to the illustrative base distribution.
export function withTemperature(candidates: TokenCandidate[], temperature: number) {
  const weights = candidates.map((candidate) => candidate.probability ** (1 / temperature))
  const total = weights.reduce((sum, weight) => sum + weight, 0)
  return candidates.map((candidate, index) => ({
    ...candidate,
    probability: weights[index] / total,
  }))
}

export function sampleCandidate(candidates: TokenCandidate[], random = Math.random()) {
  let cumulative = 0
  return (
    candidates.find((candidate) => {
      cumulative += candidate.probability
      return random < cumulative
    }) ?? candidates[candidates.length - 1]
  )
}
