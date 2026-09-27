import { http, HttpResponse } from 'msw'
import { allArticles, allNews, allWorks } from '@/content'

// Dev-only mirror of the content modules in the API shape apps/backend is
// expected to serve. The static build renders from src/content directly.
export const handlers = [
  http.get('/api/health', () => HttpResponse.json({ status: 'ok' })),
  http.get('/api/articles', () => HttpResponse.json(allArticles())),
  http.get('/api/news', () => HttpResponse.json(allNews())),
  http.get('/api/works', () => HttpResponse.json(allWorks())),
]
