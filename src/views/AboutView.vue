<script setup lang="ts">
import { SITE } from '@/content/site'
import BrandMark from '@/components/BrandMark.vue'
import JoinButton from '@/components/JoinButton.vue'
import SectionHead from '@/components/SectionHead.vue'

const submitList = [
  { what: '作品名稱', note: '中英文都可以，有副標也一起附上' },
  { what: '一句話介紹', note: '二十字以內，讓人一眼知道它在做什麼' },
  { what: '兩三張截圖或封面', note: '直式或橫式都可以，越清楚越好' },
  { what: '連結', note: 'itch.io、Steam、影片、下載頁，擇一或多個' },
]
</script>

<template>
  <div class="page ab">
    <SectionHead title="關於與投稿" latin="About" page="24" level="h1" />

    <section class="ab__lead" aria-label="社群介紹">
      <BrandMark class="ab__mark" size="100%" />
      <div>
        <p class="ab__big">
          {{ SITE.nameZh }}是一個 Discord 遊戲社群。
        </p>
        <p class="ab__p">
          我們在這裡分享遊戲相關的文章與新聞，聊正在玩的遊戲；也把成員自己做的東西拿出來給更多人看：獨立遊戲與 Demo、影片與直播、MOD 與關卡、美術與同人創作。這個網站就是社群的刊物。
        </p>
        <p class="ab__p">
          Logo 是一個取景框，框住手把的四顆按鈕，其中一顆永遠亮著：<span class="mono ab__tag">{{ SITE.tagline }}</span>
        </p>
      </div>
    </section>

    <section id="join" class="ab__join on-ink" aria-labelledby="join-title">
      <div>
        <h2 id="join-title" class="ab__join-title">加入 Discord</h2>
        <p v-if="SITE.discordInvite" class="ab__join-p">點下按鈕就會打開 Discord 邀請頁。</p>
        <p v-else class="ab__join-p">公開邀請連結即將公布。如果你已經在社群裡，請直接到伺服器「{{ SITE.nameZh }} GameTestSpace」找我們。</p>
      </div>
      <JoinButton v-if="SITE.discordInvite" tone="paper" size="lg" />
      <p v-else class="ab__pending mono"><b aria-hidden="true" />INVITE · COMING SOON</p>
    </section>

    <section class="ab__submit" aria-labelledby="submit-title">
      <h2 id="submit-title" class="ab__h2">投稿你的作品</h2>
      <p class="ab__p">在 Discord 發表你的作品時，附上以下資料，編輯整理起來最快：</p>
      <ol class="ab__list">
        <li v-for="(s, i) in submitList" :key="s.what">
          <span class="ab__n mono">{{ String(i + 1).padStart(2, '0') }}</span>
          <span><strong>{{ s.what }}</strong>{{ s.note }}</span>
        </li>
      </ol>
    </section>
  </div>
</template>

<style scoped>
.ab {
  padding-top: clamp(32px, 5vw, 64px);
  font-family: var(--font-cjk);
}
.ab__lead {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--col-gap);
  margin-top: 40px;
  align-items: start;
}
.ab__mark {
  grid-column: 1 / span 3;
  max-width: 220px;
  height: auto;
  aspect-ratio: 1;
}
.ab__lead > div {
  grid-column: 5 / span 7;
}
.ab__big {
  font-weight: 900;
  font-size: clamp(1.75rem, 3.4vw, 3rem);
  line-height: 1.3;
}
.ab__p {
  margin-top: 18px;
  font-size: 1.125rem;
  line-height: 1.9;
  color: var(--ink-soft);
  max-width: 36em;
}
.ab__tag {
  display: inline-block;
  font-size: 0.8em;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: var(--ink);
}
.ab__join {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-top: clamp(48px, 7vw, 96px);
  padding: clamp(28px, 4vw, 48px);
  background: var(--ink);
  color: var(--on-ink);
}
.ab__join-title {
  font-family: var(--font-cjk);
  font-size: clamp(2rem, 4vw, 3.5rem);
}
.ab__join-p {
  margin-top: 8px;
  color: var(--on-ink-mute);
  max-width: 34em;
  font-size: 1.0625rem;
}
.ab__pending {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  border: 2px solid var(--ink-rule);
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: var(--on-ink-mute);
}
.ab__pending b {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--rec);
}
.ab__submit {
  margin-top: clamp(48px, 7vw, 96px);
  max-width: 52rem;
}
.ab__h2 {
  font-family: var(--font-cjk);
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  padding-bottom: 10px;
  border-bottom: 4px solid var(--ink);
}
.ab__list {
  list-style: none;
  margin: 24px 0 0;
  padding: 0;
}
.ab__list li {
  display: grid;
  grid-template-columns: 3.5rem 1fr;
  gap: 12px;
  align-items: baseline;
  padding: 16px 0;
  border-bottom: 1px solid var(--rule);
  font-size: 1.0625rem;
  color: var(--ink-soft);
}
.ab__list strong {
  display: block;
  color: var(--ink);
  font-weight: 900;
  font-size: 1.25rem;
}
.ab__n {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--ink);
}
.ab__note {
  margin-top: 20px;
  color: var(--ink-mute);
}
@media (max-width: 760px) {
  .ab__mark {
    grid-column: 1 / span 4;
  }
  .ab__lead > div {
    grid-column: 1 / -1;
  }
}
</style>
