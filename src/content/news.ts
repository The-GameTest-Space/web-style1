import type { NewsItem } from './types'

// Sample content. All events and titles are fictional.
export const news: NewsItem[] = [
  {
    id: 'n-008',
    tag: 'stream',
    title: '《最後一班捷運》作者正在直播開發：今晚加第二條路線',
    body: '@月台 現在在 #直播 頻道邊做邊聊，預計加入從中途站下車的新結局。可以直接進語音頻道一起看。',
    publishedAt: '2026-10-04',
    live: true,
  },
  {
    id: 'n-007',
    tag: 'event',
    title: '第一屆社群 Game Jam 主題公布：「只剩一個按鈕」',
    body: '報名到 10 月 18 日，時間 72 小時，一個人或最多三人一組都可以。作品會在下一期刊出，並在測試夜輪流試玩。',
    publishedAt: '2026-10-03',
  },
  {
    id: 'n-006',
    tag: 'release',
    title: '《燈籠夜行》Demo 0.47 版上線，新增第 3 關',
    body: '這一版加入可重新點燃的燈籠與攤販火柴。作者表示這是根據上個月測試夜的回饋改的。',
    publishedAt: '2026-10-02',
  },
  {
    id: 'n-005',
    tag: 'community',
    title: '#作品展示 頻道改版：投稿可以直接附上試玩連結',
    body: '在頻道發文時附上 itch.io 或 Steam 頁面，機器人會自動整理成卡片，編輯部每月從中挑選刊出。',
    publishedAt: '2026-09-29',
  },
  {
    id: 'n-004',
    tag: 'release',
    title: '「九份」地圖 MOD 更新：夜間模式與新的階梯捷徑',
    body: '@山城 的九份地圖第二版加入夜間光照，老街階梯多了一條只有在下雨天會開的捷徑。',
    publishedAt: '2026-09-27',
  },
  {
    id: 'n-003',
    tag: 'event',
    title: '十月測試夜時間表出爐：每週五晚上九點',
    body: '想讓大家試玩你的作品？在 #測試夜報名 留言作品名稱與下載連結，每晚最多排四款。',
    publishedAt: '2026-09-25',
  },
  {
    id: 'n-002',
    tag: 'community',
    title: '新頻道 #美術交流 開放，同人與截圖藝術都歡迎',
    body: '這個頻道給畫圖、做像素、修截圖的人。每週日會挑一張放上首頁。',
    publishedAt: '2026-09-22',
  },
  {
    id: 'n-001',
    tag: 'release',
    title: '《迴轉壽司防衛戰》登上 itch.io 新作榜第九名',
    body: '成員 @鮭魚 的塔防小品上架三天，在 itch.io 的策略類新作榜排到第九。恭喜。',
    publishedAt: '2026-09-18',
  },
]
