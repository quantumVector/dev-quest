import type { ArticlesSource } from '../types/article'
import { parseArticle, parseCatalog } from '../types/article.schema'

export class ArticlesApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message)
    this.name = 'ArticlesApiError'
  }
}

export function createArticlesApi(source: ArticlesSource) {
  return {
    async getCatalog(signal?: AbortSignal) {
      signal?.throwIfAborted()
      const result = await source.getCatalog(signal)
      signal?.throwIfAborted()
      return parseCatalog(result)
    },
    async getArticle(id: string, signal?: AbortSignal) {
      signal?.throwIfAborted()
      const result = await source.getArticle(id, signal)
      signal?.throwIfAborted()
      const article = parseArticle(result)
      if (article.id !== id) throw new ArticlesApiError('API вернул другую статью.', 502)
      return article
    },
  }
}

export function createHttpArticlesSource(
  baseUrl: string,
  request: typeof fetch = fetch,
): ArticlesSource {
  const base = baseUrl.replace(/\/+$/, '')
  async function get(path: string, signal?: AbortSignal): Promise<unknown> {
    const response = await request(`${base}/${path}`, {
      signal,
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) {
      throw new ArticlesApiError(
        response.status === 404
          ? 'Статья не найдена.'
          : 'Не удалось получить данные. Попробуйте ещё раз.',
        response.status,
      )
    }
    return response.json()
  }
  return {
    getCatalog: (signal) => get('catalog', signal),
    getArticle: (id, signal) => get(`articles/${encodeURIComponent(id)}`, signal),
  }
}

const articleLoaders = import.meta.glob('../mocks/articles/*.ts')

export const mockArticlesSource: ArticlesSource = {
  async getCatalog() {
    const { default: catalog } = await import('../mocks/catalog')
    return structuredClone(catalog)
  },
  async getArticle(id) {
    const load = articleLoaders[`../mocks/articles/${id}.ts`]
    if (!load) throw new ArticlesApiError('Статья не найдена.', 404)
    const { default: article } = (await load()) as { default: unknown }
    return structuredClone(article)
  },
}

/** Set VITE_ARTICLES_API_URL to switch v2 to HTTP without changing page components. */
const apiBaseUrl = import.meta.env.VITE_ARTICLES_API_URL?.trim()
export const articlesApi = createArticlesApi(
  apiBaseUrl ? createHttpArticlesSource(apiBaseUrl) : mockArticlesSource,
)
