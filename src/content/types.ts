// Shapes mirror what apps/backend is expected to serve later, so swapping the
// static modules for API calls only touches src/content/index.ts.

import type { SceneId } from '@/plates/scenes'

/** A cover is either a drawn sample plate or a real image the community uploads. */
export type Cover = { scene: SceneId; alt: string } | { src: string; alt: string }

export interface Person {
  name: string
  handle: string
}

export type ArticleKind = 'cover-story' | 'review' | 'column' | 'feature'

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'quote'; text: string; by?: string }
  | { type: 'figure'; cover: Cover; caption: string }
  | { type: 'review'; reviewers: { handle: string; score: number; line: string }[] }

export interface Article {
  id: string
  slug: string
  kind: ArticleKind
  title: string
  /** One-line summary under the title. */
  dek: string
  /** The single word that wins on a cover. */
  coverWord?: string
  author: Person
  publishedAt: string
  readMinutes: number
  cover: Cover
  body: Block[]
}

export type NewsTag = 'community' | 'release' | 'event' | 'stream'

export interface NewsItem {
  id: string
  tag: NewsTag
  title: string
  body: string
  publishedAt: string
  /** Happening right now; the only news state allowed to use signal orange. */
  live?: boolean
}

export type WorkKind = 'game' | 'video' | 'mod' | 'art'

export interface WorkLink {
  label: string
  url: string
}

export interface Work {
  id: string
  slug: string
  kind: WorkKind
  title: string
  /** Latin or secondary title. */
  subtitle?: string
  creator: Person
  blurb: string
  description: string[]
  tags: string[]
  cover: Cover
  links: WorkLink[]
  publishedAt: string
  /** Video length or build version, printed on the cover. */
  meta?: string
  /** The work the home page bills at cover scale. */
  featured?: boolean
  /** Landed this week or on air now: rendered with the REC orange. */
  status?: 'new' | 'live'
}
