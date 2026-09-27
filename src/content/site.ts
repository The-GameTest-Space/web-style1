export const SITE = {
  name: 'The Game Test Space',
  nameZh: '遊戲測試的地方',
  tagline: 'ONE BUTTON IS ALWAYS RECORDING',
  issue: { volume: '01', label: '2026 年 10 月號', date: '2026.10' },
  /** Public Discord invite. Every join button on the site opens it; null sends them to the About page. */
  discordInvite: 'https://discord.gg/yXfKQpAPN' as string | null,
  /** Everything under src/content is sample copy until real content arrives. */
  sample: true,
}

export const KIND_LABEL = {
  'cover-story': '封面故事',
  review: '試玩評測',
  column: '專欄',
  feature: '特集',
} as const

export const WORK_KIND_LABEL = {
  game: '獨立遊戲 / Demo',
  video: '影片 / 直播',
  mod: 'MOD / 地圖 / 關卡',
  art: '美術 / 同人創作',
} as const

export const NEWS_TAG_LABEL = {
  community: '社群',
  release: '上架',
  event: '活動',
  stream: '直播',
} as const
