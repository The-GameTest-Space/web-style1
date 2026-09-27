<script setup lang="ts">
import BrandMark from './BrandMark.vue'
import JoinButton from './JoinButton.vue'
import { SITE } from '@/content/site'
</script>

<template>
  <footer class="foot on-ink">
    <div class="page">
      <div class="foot__top">
        <RouterLink to="/" class="foot__brand" aria-label="回到封面">
          <BrandMark tone="paper" size="1em" />
          <span>The Game Test Space</span>
        </RouterLink>
        <JoinButton tone="paper" />
      </div>
      <p class="foot__tagline mono">{{ SITE.tagline }}</p>
      <div class="foot__grid">
        <nav aria-label="頁尾導覽">
          <RouterLink to="/news">新聞快報</RouterLink>
          <RouterLink to="/articles">專題</RouterLink>
          <RouterLink to="/showcase">成員作品</RouterLink>
          <RouterLink to="/about">關於與投稿</RouterLink>
        </nav>
        <p class="foot__about">
          {{ SITE.nameZh }}是一個 Discord 遊戲社群。我們分享遊戲文章與新聞，也把成員自己做的遊戲、影片、MOD 與美術拿出來給更多人看。
        </p>
        <p class="foot__meta mono">
          VOL.{{ SITE.issue.volume }} · {{ SITE.issue.date }}<br />
          <span v-if="SITE.sample">本期為示範刊，內容皆為虛構範例</span>
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.foot {
  background: var(--ink);
  color: var(--on-ink);
  padding-block: clamp(48px, 7vw, 96px) 40px;
  margin-top: clamp(64px, 9vw, 140px);
}
.foot__top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
.foot__brand {
  display: flex;
  align-items: center;
  gap: 0.3em;
  font-weight: 900;
  font-size: clamp(32px, 5.4vw, 84px);
  letter-spacing: -0.035em;
  line-height: 1;
  text-decoration: none;
}
.foot__tagline {
  margin-top: 28px;
  padding-block: 14px;
  border-block: 1px solid var(--ink-rule);
  font-size: clamp(11px, 1.4vw, 15px);
  font-weight: 700;
  letter-spacing: 0.5em;
  color: var(--on-ink-mute);
}
.foot__grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px var(--col-gap);
  margin-top: 32px;
}
.foot__grid nav {
  grid-column: span 3;
  display: grid;
  gap: 4px;
  font-family: var(--font-cjk);
  font-weight: 700;
}
.foot__grid nav a {
  text-decoration: none;
  width: fit-content;
}
.foot__grid nav a:hover {
  text-decoration: underline;
}
.foot__about {
  grid-column: span 6;
  font-family: var(--font-cjk);
  color: var(--on-ink-mute);
  max-width: 36em;
}
.foot__meta {
  grid-column: span 3;
  font-size: 12px;
  color: var(--on-ink-mute);
  text-align: right;
}
.foot__meta span {
  font-family: var(--font-cjk);
}
/* Where the page already ends on the reader hotline, the footer does not ask again */
:global(main:has(#submit) + .foot .foot__top .join) {
  display: none;
}
@media (max-width: 760px) {
  .foot__grid nav,
  .foot__about,
  .foot__meta {
    grid-column: 1 / -1;
    text-align: left;
  }
}
</style>
