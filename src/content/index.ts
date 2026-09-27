import { articles } from './articles'
import { news } from './news'
import { works } from './works'

// The single seam between the pages and their data. When apps/backend serves
// content, replace these lookups with fetches; the pages stay the same.

const byDateDesc = <T extends { publishedAt: string }>(a: T, b: T) => b.publishedAt.localeCompare(a.publishedAt)

export const allArticles = () => [...articles].sort(byDateDesc)
export const findArticle = (slug: string) => articles.find((a) => a.slug === slug)

export const allNews = () => [...news].sort(byDateDesc)

export const allWorks = () => [...works].sort(byDateDesc)
export const findWork = (slug: string) => works.find((w) => w.slug === slug)

/** 2026-10-03 → 10.03 */
export const shortDate = (iso: string) => iso.slice(5).replace('-', '.')
/** 2026-10-03 → 2026.10.03 */
export const longDate = (iso: string) => iso.replaceAll('-', '.')
