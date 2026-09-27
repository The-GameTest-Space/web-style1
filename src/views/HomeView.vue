<script setup lang="ts">
import Words from '@/components/Words.vue'
import { computed } from 'vue'
import { allArticles, allNews, allWorks, shortDate } from '@/content'
import { KIND_LABEL, WORK_KIND_LABEL } from '@/content/site'
import CoverArt from '@/components/CoverArt.vue'
import Viewfinder from '@/components/Viewfinder.vue'
import JoinButton from '@/components/JoinButton.vue'
import SectionHead from '@/components/SectionHead.vue'
import NewsEntry from '@/components/NewsEntry.vue'
import CrossReview from '@/components/CrossReview.vue'

const articles = allArticles()
const coverStory = computed(() => articles.find((a) => a.kind === 'cover-story') ?? articles[0]!)
const review = computed(() => articles.find((a) => a.kind === 'review'))
const reviewScores = computed(() => {
  const block = review.value?.body.find((b) => b.type === 'review')
  return block && block.type === 'review' ? block.reviewers : []
})
// Break a headline after its full-width colon so the second line never strands two characters.
const coverTitle = computed(() => {
  const t = coverStory.value.title
  const i = t.indexOf('：')
  return i > 0 ? [t.slice(0, i + 1), t.slice(i + 1)] : [t]
})
const reviewTotal = computed(() => reviewScores.value.reduce((s, r) => s + r.score, 0))
const moreArticles = computed(() =>
  articles.filter((a) => a.id !== coverStory.value.id && a.id !== review.value?.id),
)

const news = allNews()
const liveNews = computed(() => news.find((n) => n.live))
const restNews = computed(() => news.filter((n) => !n.live).slice(0, 6))

const works = allWorks()
const leadWork = computed(() => works.find((w) => w.featured) ?? works[0]!)
const sideWorks = computed(() => works.filter((w) => w.id !== leadWork.value.id).slice(0, 3))
</script>

<template>
  <div class="home">
    <!-- Cover -->
    <section class="page cover" aria-labelledby="cover-title">
      <div class="cover__plate">
        <p v-if="coverStory.coverWord" class="cover__word" aria-hidden="true">
          <span class="cover__word-ink">{{ coverStory.coverWord }}</span>
          <span class="cover__word-paper">{{ coverStory.coverWord }}</span>
        </p>
        <RouterLink :to="`/articles/${coverStory.slug}`" class="cover__link">
          <Viewfinder rec-at="bl">
            <CoverArt :cover="coverStory.cover" :ratio="2" :grain="96" />
          </Viewfinder>
          <div class="cover__story">
            <h2 id="cover-title" class="cover__title">
              <span v-for="(part, i) in coverTitle" :key="i" class="cover__title-part"><Words :text="part" /></span>
            </h2>
            <p class="cover__byline mono">P.08 · {{ KIND_LABEL[coverStory.kind] }} · 文 {{ coverStory.author.handle }}</p>
          </div>
        </RouterLink>
        <ul class="cover__lines" aria-label="本期重點">
          <li v-if="review">
            <RouterLink :to="`/articles/${review.slug}`">
              <b>《最後一班捷運》交叉評測 <span class="mono">{{ reviewTotal }}/{{ reviewScores.length * 10 }}</span></b>
              <span class="mono">P.12</span>
            </RouterLink>
          </li>
          <li>
            <a href="#works">
              <b>成員主打《{{ leadWork.title }}》</b>
              <span class="mono">P.16</span>
            </a>
          </li>
          <li v-if="liveNews">
            <a href="#news" class="cover__line-live">
              <b><i aria-hidden="true" />直播中：{{ liveNews.title.split('：')[0] }}</b>
              <span class="mono">P.04</span>
            </a>
          </li>
        </ul>
      </div>

      <aside class="cover__side">
        <div id="hotline" class="hotline on-ink">
          <p class="hotline__lede">
            <strong>遊戲測試的地方</strong>是一個 Discord 社群。玩遊戲、測遊戲、做遊戲的人，在這裡交換文章、新聞，還有自己做出來的東西。
          </p>
          <JoinButton tone="paper" />
        </div>

        <nav class="toc" aria-labelledby="toc-title">
          <h2 id="toc-title" class="toc__title">本期目錄</h2>
          <ol>
            <li>
              <a href="#news" class="toc__row">
                <span class="toc__page mono">04</span>
                <span class="toc__text">新聞快報<small>{{ news.length }} 則社群與作品消息</small></span>
              </a>
            </li>
            <li>
              <RouterLink :to="`/articles/${coverStory.slug}`" class="toc__row">
                <span class="toc__page mono">08</span>
                <span class="toc__text">《燈籠夜行》開發者訪談<small>封面故事</small></span>
              </RouterLink>
            </li>
            <li v-if="review">
              <RouterLink :to="`/articles/${review.slug}`" class="toc__row">
                <span class="toc__page mono">12</span>
                <span class="toc__text">《最後一班捷運》交叉評測<small>試玩評測</small></span>
              </RouterLink>
            </li>
            <li>
              <a href="#works" class="toc__row">
                <span class="toc__page mono">16</span>
                <span class="toc__text">成員作品<small>本期收錄 {{ works.length }} 件</small></span>
              </a>
            </li>
            <li>
              <a href="#submit" class="toc__row">
                <span class="toc__page mono">24</span>
                <span class="toc__text">讀者專線<small>投稿你的作品</small></span>
              </a>
            </li>
          </ol>
        </nav>
      </aside>
    </section>

    <!-- News -->
    <section id="news" class="page block" aria-labelledby="news-title">
      <SectionHead id="news-title" title="新聞快報" latin="News" page="04" />
      <div class="news">
        <div class="news__lead">
          <NewsEntry v-if="liveNews" :item="liveNews" lead />
          <RouterLink to="/news" class="more">全部 {{ news.length }} 則新聞</RouterLink>
        </div>
        <div class="news__cols">
          <NewsEntry v-for="n in restNews" :key="n.id" :item="n" />
        </div>
      </div>
    </section>

    <!-- Review spread -->
    <section v-if="review" class="page block" aria-labelledby="review-head">
      <SectionHead id="review-head" title="試玩評測" latin="Review" page="12" />
      <div class="spread">
        <RouterLink :to="`/articles/${review.slug}`" class="spread__art" tabindex="-1" aria-hidden="true">
          <Viewfinder focus-from="#review-title-link">
            <CoverArt :cover="review.cover" :ratio="16 / 10" :grain="100" />
          </Viewfinder>
        </RouterLink>
        <div class="spread__text">
          <h3 class="spread__title">
            <RouterLink id="review-title-link" :to="`/articles/${review.slug}`"><Words :text="review.title" /></RouterLink>
          </h3>
          <p class="spread__dek">{{ review.dek }}</p>
          <p class="byline mono">文 {{ review.author.handle }} · {{ shortDate(review.publishedAt) }} · {{ review.readMinutes }} 分鐘</p>
          <CrossReview :reviewers="reviewScores" compact />
        </div>
      </div>

      <ul class="shelf" aria-label="更多專題">
        <li v-for="a in moreArticles" :key="a.id">
          <RouterLink :to="`/articles/${a.slug}`" class="shelf__item">
            <CoverArt :cover="a.cover" :ratio="4 / 3" :grain="72" />
            <div>
              <h3 class="shelf__title"><Words :text="a.title" /></h3>
              <p class="shelf__kind">{{ KIND_LABEL[a.kind] }} · <span class="mono">{{ a.readMinutes }} 分鐘</span></p>
            </div>
          </RouterLink>
        </li>
      </ul>
      <RouterLink to="/articles" class="more">所有專題</RouterLink>
    </section>

    <!-- Member works: the ink spread -->
    <section id="works" class="mw on-ink" aria-labelledby="works-title">
      <div class="page">
        <SectionHead id="works-title" title="成員作品" latin="Made by members" page="16" tone="ink">
          <p class="mw__intro">成員做的東西，跟新聞印得一樣大。遊戲、影片、MOD、美術，都在這裡。</p>
        </SectionHead>

        <div class="mw__grid">
          <RouterLink :to="`/showcase/${leadWork.slug}`" class="mw__art" tabindex="-1" aria-hidden="true">
            <Viewfinder :live="leadWork.status === 'live'" focus-from="#lead-work-link">
              <CoverArt :cover="leadWork.cover" :ratio="4 / 3" :grain="108" />
            </Viewfinder>
          </RouterLink>

          <div class="mw__lead">
            <h3 class="mw__title">
              <RouterLink id="lead-work-link" :to="`/showcase/${leadWork.slug}`"><Words :text="leadWork.title" /></RouterLink>
            </h3>
            <p v-if="leadWork.subtitle" class="mw__sub" lang="en">{{ leadWork.subtitle }}</p>
            <p class="mw__blurb">{{ leadWork.blurb }}</p>
            <p class="mw__desc">{{ leadWork.description[0] }}</p>
            <p class="mw__by">
              {{ WORK_KIND_LABEL[leadWork.kind] }} · <span class="mono">{{ leadWork.creator.handle }} · {{ leadWork.meta }}</span>
            </p>
          </div>

          <ol class="mw__list" aria-label="更多成員作品">
            <li v-for="w in sideWorks" :key="w.id">
              <RouterLink :to="`/showcase/${w.slug}`" class="mw__row">
                <Viewfinder :live="w.status === 'live'" class="mw__thumb">
                  <CoverArt :cover="w.cover" :ratio="3 / 4" :grain="72" />
                </Viewfinder>
                <div>
                  <h3 class="mw__row-title"><Words :text="w.title" /></h3>
                  <p class="mw__row-meta">
                    <b v-if="w.status" class="mw__status">{{ w.status === 'live' ? '直播中' : 'NEW' }}</b>
                    {{ WORK_KIND_LABEL[w.kind] }} · <span class="mono">{{ w.creator.handle }}</span>
                  </p>
                  <p class="mw__row-blurb">{{ w.blurb }}</p>
                </div>
              </RouterLink>
            </li>
          </ol>
        </div>
        <RouterLink to="/showcase" class="more">看全部 {{ works.length }} 件作品</RouterLink>
      </div>
    </section>

    <!-- Reader hotline -->
    <section id="submit" class="page submit" aria-labelledby="submit-head">
      <SectionHead id="submit-head" title="讀者專線" latin="Submit" page="24" />
      <div class="submit__grid">
        <p class="submit__big">你做的遊戲，<br />下一期可能就是封面。</p>
        <div class="submit__body">
          <p>做了一款 Demo、剪了一支影片、蓋了一張地圖，或畫了一張同人？帶到 Discord 給大家看。我們會把成員作品整理成下一期的內容。</p>
          <ul class="submit__kinds">
            <li>獨立遊戲 / Demo</li>
            <li>影片 / 直播</li>
            <li>MOD / 地圖 / 關卡</li>
            <li>美術 / 同人創作</li>
          </ul>
          <div class="submit__actions">
            <JoinButton size="lg" />
            <RouterLink to="/about" class="submit__how">投稿方式與社群介紹</RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.block {
  margin-top: clamp(72px, 9vw, 140px);
}

/* ---------- Cover ---------- */
.cover {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--col-gap);
  padding-top: clamp(40px, 4.6vw, 60px);
}
.cover__plate {
  grid-column: 1 / span 8;
  position: relative;
}
.cover__link {
  display: block;
  text-decoration: none;
}
/* The one word that wins, printed in two inks: ink on the paper above the plate, paper on the plate. */
.cover__word {
  position: absolute;
  left: 0.1em;
  top: -0.36em;
  z-index: 4;
  margin: 0;
  font-family: var(--font-cjk);
  font-weight: 900;
  font-size: clamp(5.5rem, 12.5vw, 12rem);
  line-height: 1;
  letter-spacing: -0.02em;
  pointer-events: none;
}
.cover__word span {
  display: block;
}
.cover__word-ink {
  color: var(--ink);
  clip-path: inset(0 0 0.64em 0);
}
.cover__word-paper {
  position: absolute;
  inset: 0;
  color: var(--paper);
  clip-path: inset(0.36em 0 0 0);
}
.cover__story {
  position: relative;
  z-index: 3;
  padding: 16px 20px 18px;
  background: var(--ink);
  color: var(--paper);
}
.cover__title {
  font-family: var(--font-cjk);
  font-weight: 900;
  font-size: clamp(1.375rem, 2.3vw, 2rem);
  line-height: 1.35;
}
.cover__title-part {
  display: inline-block;
}
.cover__byline {
  margin-top: 6px;
  font-size: 12px;
  font-weight: 700;
  color: var(--on-ink-mute);
}
.cover__link:hover .cover__title {
  text-decoration: underline;
  text-decoration-thickness: 3px;
  text-underline-offset: 0.18em;
}
/* Cover lines: the issue's other headlines, printed on the plate edge */
.cover__lines {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 5;
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  justify-items: end;
  gap: 6px;
  max-width: 46%;
}
.cover__lines a {
  display: flex;
  align-items: baseline;
  gap: 10px;
  padding: 6px 10px 7px 12px;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-cjk);
  font-size: 0.9375rem;
  line-height: 1.4;
  text-decoration: none;
  transition: transform var(--t-snap) var(--ease-snap);
}
.cover__lines a:hover {
  transform: translateX(-4px);
}
.cover__lines b {
  font-weight: 900;
}
.cover__lines .mono {
  font-size: 11px;
  font-weight: 700;
  color: var(--ink-mute);
}
.cover__lines b .mono {
  font-size: 0.85em;
  color: var(--ink);
}
.cover__line-live i {
  display: inline-block;
  width: 9px;
  height: 9px;
  margin-right: 6px;
  border-radius: 50%;
  background: var(--rec);
  vertical-align: 0.05em;
}

.cover__side {
  grid-column: 9 / span 4;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.hotline {
  background: var(--ink);
  color: var(--on-ink);
  padding: 22px 22px 24px;
  display: grid;
  gap: 18px;
}
.hotline__lede {
  font-family: var(--font-cjk);
  font-size: 1.0625rem;
  line-height: 1.75;
  color: var(--on-ink-mute);
}
.hotline__lede strong {
  color: var(--on-ink);
  font-weight: 900;
}
.hotline :deep(.join) {
  justify-self: start;
}

.toc__title {
  font-family: var(--font-cjk);
  font-size: 1.25rem;
  font-weight: 900;
  letter-spacing: 0.2em;
  padding-bottom: 8px;
  border-bottom: 4px solid var(--ink);
}
.toc ol {
  list-style: none;
  margin: 0;
  padding: 0;
}
.toc__row {
  display: grid;
  grid-template-columns: 3.2rem 1fr;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid var(--rule);
  text-decoration: none;
}
.toc__row > * {
  transition: transform var(--t-snap) var(--ease-snap);
}
.toc__row:hover > * {
  transform: translateX(6px);
}
.toc__page {
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.04em;
}
.toc__text {
  font-family: var(--font-cjk);
  font-weight: 700;
  line-height: 1.45;
}
.toc__text small {
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: var(--ink-mute);
  letter-spacing: 0.08em;
}

/* ---------- News ---------- */
.news {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--col-gap);
  margin-top: 28px;
}
.news__lead {
  grid-column: 1 / span 4;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.news__cols {
  grid-column: 5 / span 8;
  columns: 2;
  column-gap: calc(var(--col-gap) * 2);
  column-rule: 1px solid var(--rule);
}
.news__cols > * {
  break-inside: avoid;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--rule-soft);
}

.more {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
  font-family: var(--font-cjk);
  font-weight: 900;
  text-decoration: none;
  border-bottom: 3px solid currentColor;
  padding-bottom: 2px;
}
.more::after {
  content: '';
  width: 0.55em;
  height: 0.55em;
  border-top: 3px solid currentColor;
  border-right: 3px solid currentColor;
  transform: rotate(45deg);
  transition: transform var(--t-snap) var(--ease-snap);
}
.more:hover::after {
  transform: translateX(4px) rotate(45deg);
}
.news__lead .more {
  margin-top: 0;
  align-self: flex-start;
}

/* ---------- Review spread ---------- */
.spread {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--col-gap);
  margin-top: 28px;
  align-items: start;
}
.spread__art {
  grid-column: 1 / span 7;
  display: block;
}
.spread__text {
  grid-column: 8 / span 5;
  display: grid;
  gap: 16px;
}
.spread__title {
  font-family: var(--font-cjk);
  font-size: clamp(1.75rem, 3.2vw, 2.875rem);
  line-height: 1.25;
}
.spread__title a {
  text-decoration: none;
}
.spread__title a:hover {
  text-decoration: underline;
  text-decoration-thickness: 3px;
}
.spread__dek {
  font-family: var(--font-cjk);
  font-size: 1.0625rem;
  line-height: 1.8;
  color: var(--ink-soft);
}
.byline {
  font-size: 12px;
  color: var(--ink-mute);
}

.shelf {
  list-style: none;
  margin: 40px 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 4px solid var(--ink);
}
.shelf li + li {
  border-left: 1px solid var(--rule);
}
.shelf__item {
  display: grid;
  grid-template-columns: 38% 1fr;
  gap: 14px;
  padding: 18px var(--col-gap) 18px 0;
  text-decoration: none;
}
.shelf li + li .shelf__item {
  padding-left: var(--col-gap);
}
.shelf__title {
  font-family: var(--font-cjk);
  font-size: 1.0625rem;
  line-height: 1.45;
}
.shelf__kind {
  margin-top: 6px;
  font-family: var(--font-cjk);
  font-size: 12px;
  font-weight: 700;
  color: var(--ink-mute);
}
.shelf__item:hover .shelf__title {
  text-decoration: underline;
}

/* ---------- Member works: ink spread ---------- */
.mw {
  margin-top: clamp(72px, 9vw, 140px);
  padding-block: clamp(48px, 6vw, 88px);
  background: var(--ink);
  color: var(--on-ink);
}
.mw__intro {
  font-family: var(--font-cjk);
  font-size: 1.0625rem;
  color: var(--on-ink-mute);
  margin-top: 6px;
}
.mw__grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 28px var(--col-gap);
  margin-top: 32px;
  align-items: start;
}
.mw__art {
  grid-column: 1 / span 8;
  grid-row: span 2;
  display: block;
}
.mw__lead {
  grid-column: 9 / span 4;
  font-family: var(--font-cjk);
}
.mw__title {
  font-family: var(--font-cjk);
  font-size: clamp(2rem, 3.7vw, 3.5rem);
  line-height: 1.12;
}
.mw__title a {
  text-decoration: none;
}
.mw__title a:hover {
  text-decoration: underline;
  text-decoration-thickness: 4px;
  text-underline-offset: 0.14em;
}
.mw__sub {
  margin-top: 8px;
  font-family: var(--font-latin);
  font-stretch: 75%;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--on-ink-mute);
}
.mw__blurb {
  margin-top: 16px;
  font-weight: 900;
  font-size: 1.25rem;
  line-height: 1.55;
}
.mw__desc {
  margin-top: 10px;
  color: var(--on-ink-mute);
  line-height: 1.8;
}
.mw__by {
  margin-top: 14px;
  padding-top: 10px;
  border-top: 1px solid var(--ink-rule);
  font-size: 13px;
  font-weight: 700;
  color: var(--on-ink-mute);
}
.mw__list {
  grid-column: 9 / span 4;
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 4px solid var(--on-ink);
}
.mw__row {
  display: grid;
  grid-template-columns: 76px 1fr;
  gap: 14px;
  padding: 14px 0;
  border-bottom: 1px solid var(--ink-rule);
  text-decoration: none;
  font-family: var(--font-cjk);
}
.mw__thumb :deep(.vf__rec) {
  display: none;
}
.mw__thumb :deep(.vf__frame) {
  --in: 4px;
  --w: 2px;
}
.mw__row-title {
  font-family: var(--font-cjk);
  font-size: 1.1875rem;
  line-height: 1.35;
}
.mw__row:hover .mw__row-title {
  text-decoration: underline;
}
.mw__row-meta {
  margin-top: 4px;
  font-size: 12px;
  font-weight: 700;
  color: var(--on-ink-mute);
}
.mw__status {
  margin-right: 6px;
  padding: 0 5px;
  background: var(--rec);
  color: var(--ink);
  font-weight: 900;
}
.mw__row-blurb {
  margin-top: 6px;
  font-size: 0.875rem;
  line-height: 1.65;
  color: var(--on-ink-mute);
}

/* ---------- Submit ---------- */
.submit {
  margin-top: clamp(72px, 9vw, 140px);
}
.submit__grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--col-gap);
  margin-top: 36px;
}
.submit__big {
  grid-column: 1 / span 7;
  font-family: var(--font-cjk);
  font-weight: 900;
  font-size: clamp(2.25rem, 5vw, 4.75rem);
  line-height: 1.15;
}
.submit__body {
  grid-column: 8 / span 5;
  font-family: var(--font-cjk);
  color: var(--ink-soft);
  font-size: 1.0625rem;
  display: grid;
  gap: 20px;
  align-content: start;
}
.submit__kinds {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid var(--rule);
}
.submit__kinds li {
  padding: 10px 0;
  border-bottom: 1px solid var(--rule);
  color: var(--ink);
  font-weight: 700;
}
.submit__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px 24px;
}
.submit__how {
  color: var(--ink);
  font-weight: 700;
}

/* ---------- Responsive ---------- */
@media (max-width: 1100px) {
  .cover__plate {
    grid-column: 1 / -1;
  }
  .cover__side {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
  .mw__art {
    grid-column: 1 / -1;
    grid-row: auto;
  }
  .mw__lead {
    grid-column: 1 / span 6;
  }
  .mw__list {
    grid-column: 7 / span 6;
  }
}
@media (max-width: 900px) {
  .news__lead,
  .news__cols,
  .spread__art,
  .spread__text,
  .submit__big,
  .submit__body,
  .mw__lead,
  .mw__list {
    grid-column: 1 / -1;
  }
  .shelf {
    grid-template-columns: 1fr;
  }
  .shelf li + li {
    border-left: 0;
    border-top: 1px solid var(--rule);
  }
  .shelf li + li .shelf__item {
    padding-left: 0;
  }
}
@media (max-width: 640px) {
  .cover__side {
    grid-template-columns: 1fr;
  }
  .cover__lines {
    display: none;
  }
  .news__cols {
    columns: 1;
  }
  .submit__kinds {
    grid-template-columns: 1fr;
  }
}
</style>
