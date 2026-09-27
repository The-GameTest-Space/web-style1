<script setup lang="ts">
import Words from '@/components/Words.vue'
import { computed, watchEffect } from 'vue'
import { allArticles, findArticle, longDate } from '@/content'
import { KIND_LABEL } from '@/content/site'
import CoverArt from '@/components/CoverArt.vue'
import Viewfinder from '@/components/Viewfinder.vue'
import CrossReview from '@/components/CrossReview.vue'
import JoinButton from '@/components/JoinButton.vue'
import NotFoundView from './NotFoundView.vue'

const props = defineProps<{ slug: string }>()
const article = computed(() => findArticle(props.slug))
const others = computed(() => allArticles().filter((a) => a.slug !== props.slug).slice(0, 3))

watchEffect(() => {
  if (article.value) document.title = `${article.value.title} · The Game Test Space`
})
</script>

<template>
  <NotFoundView v-if="!article" />
  <article v-else class="page art">
    <header class="art__head">
      <h1 class="art__title"><Words :text="article.title" /></h1>
      <p class="art__dek">{{ article.dek }}</p>
      <p class="art__byline mono">
        <RouterLink to="/articles" class="art__kind">{{ KIND_LABEL[article.kind] }}</RouterLink>
        <span>文 {{ article.author.name }} {{ article.author.handle }}</span>
        <time :datetime="article.publishedAt">{{ longDate(article.publishedAt) }}</time>
        <span>{{ article.readMinutes }} 分鐘</span>
      </p>
    </header>

    <Viewfinder class="art__cover">
      <CoverArt :cover="article.cover" :ratio="16 / 8" :grain="96" />
    </Viewfinder>

    <div class="art__grid">
      <div class="art__body">
        <template v-for="(b, i) in article.body" :key="i">
          <p v-if="b.type === 'p'" :class="{ 'art__first': i === 0 }">{{ b.text }}</p>
          <h2 v-else-if="b.type === 'h2'"><Words :text="b.text" /></h2>
          <blockquote v-else-if="b.type === 'quote'" class="art__quote">
            <p>{{ b.text }}</p>
            <cite v-if="b.by" class="mono">{{ b.by }}</cite>
          </blockquote>
          <figure v-else-if="b.type === 'figure'" class="art__figure">
            <CoverArt :cover="b.cover" :ratio="16 / 9" :grain="90" :variant="3" />
            <figcaption>{{ b.caption }}</figcaption>
          </figure>
          <CrossReview v-else-if="b.type === 'review'" class="art__review" :reviewers="b.reviewers" />
        </template>
        <p class="art__end" aria-hidden="true">■</p>
      </div>

      <aside class="art__aside">
        <div class="art__card on-ink">
          <p>想跟作者和其他玩家聊這篇？討論都在 Discord。</p>
          <JoinButton tone="paper" />
        </div>
      </aside>
    </div>

    <nav class="art__next" aria-labelledby="next-title">
      <h2 id="next-title" class="art__next-title">繼續讀</h2>
      <ul>
        <li v-for="a in others" :key="a.id">
          <RouterLink :to="`/articles/${a.slug}`">
            <CoverArt :cover="a.cover" :ratio="4 / 3" :grain="72" />
            <span class="art__next-kind">{{ KIND_LABEL[a.kind] }}</span>
            <span class="art__next-name"><Words :text="a.title" /></span>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </article>
</template>

<style scoped>
.art {
  padding-top: clamp(32px, 5vw, 64px);
}
.art__head {
  max-width: 58rem;
}
.art__kind {
  display: inline-block;
  padding: 0 8px;
  background: var(--ink);
  color: var(--paper);
  font-family: var(--font-cjk);
  font-weight: 900;
  font-size: 14px;
  letter-spacing: 0.12em;
  text-decoration: none;
}
.art__title {
  font-family: var(--font-cjk);
  font-size: clamp(2rem, 4.8vw, 4.25rem);
  line-height: 1.22;
  letter-spacing: 0.005em;
}
.art__dek {
  margin-top: 18px;
  font-family: var(--font-cjk);
  font-size: clamp(1.0625rem, 1.5vw, 1.3125rem);
  line-height: 1.75;
  color: var(--ink-soft);
  max-width: 40em;
}
.art__byline {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 20px;
  margin-top: 20px;
  padding-top: 12px;
  border-top: 1px solid var(--rule);
  font-size: 12px;
  color: var(--ink-mute);
}
.art__byline span:first-of-type {
  font-family: var(--font-cjk);
  font-weight: 700;
  color: var(--ink);
}
.art__cover {
  margin-top: 32px;
}

.art__grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--col-gap);
  margin-top: clamp(32px, 4vw, 56px);
}
.art__body {
  grid-column: 3 / span 7;
  font-family: var(--font-cjk);
  font-size: 1.125rem;
  line-height: 1.95;
  max-width: 38em;
}
.art__body > p + p {
  margin-top: 1.1em;
}
.art__first::first-letter {
  float: left;
  font-weight: 900;
  font-size: 3.4em;
  line-height: 1;
  margin: 0.08em 0.12em 0 0;
}
.art__body h2 {
  margin-top: 2.2em;
  margin-bottom: 0.6em;
  font-family: var(--font-cjk);
  font-size: 1.625rem;
  line-height: 1.35;
  padding-top: 12px;
  border-top: 4px solid var(--ink);
}
.art__quote {
  margin: 1.8em 0;
  padding: 20px 0;
  border-block: 4px solid var(--ink);
}
.art__quote p {
  font-weight: 900;
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  line-height: 1.45;
}
.art__quote cite {
  display: block;
  margin-top: 10px;
  font-style: normal;
  font-size: 13px;
  color: var(--ink-mute);
}
.art__figure {
  margin: 2em 0;
}
.art__figure figcaption {
  margin-top: 10px;
  font-size: 13px;
  line-height: 1.7;
  color: var(--ink-mute);
}
.art__review {
  margin: 2em 0;
}
.art__end {
  margin-top: 1.4em;
  font-size: 14px;
}
.art__aside {
  grid-column: 10 / span 3;
}
.art__card {
  position: sticky;
  top: 24px;
  background: var(--ink);
  color: var(--on-ink-mute);
  padding: 20px;
  display: grid;
  gap: 16px;
  font-family: var(--font-cjk);
  font-size: 0.9375rem;
  line-height: 1.7;
}
.art__card :deep(.join) {
  justify-self: start;
}

.art__next {
  margin-top: clamp(64px, 8vw, 120px);
}
.art__next-title {
  font-family: var(--font-cjk);
  font-size: 1.5rem;
  letter-spacing: 0.16em;
  padding-bottom: 10px;
  border-bottom: 4px solid var(--ink);
}
.art__next ul {
  list-style: none;
  margin: 24px 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--col-gap);
}
.art__next a {
  display: grid;
  gap: 6px;
  text-decoration: none;
  font-family: var(--font-cjk);
}
.art__next-kind {
  margin-top: 6px;
  font-size: 12px;
  font-weight: 700;
  color: var(--ink-mute);
}
.art__next-name {
  font-weight: 900;
  font-size: 1.125rem;
  line-height: 1.45;
}
.art__next a:hover .art__next-name {
  text-decoration: underline;
}

@media (max-width: 1100px) {
  .art__body {
    grid-column: 1 / span 8;
  }
  .art__aside {
    grid-column: 9 / span 4;
  }
}
@media (max-width: 760px) {
  .art__body,
  .art__aside {
    grid-column: 1 / -1;
  }
  .art__body {
    font-size: 1.0625rem;
  }
  .art__next ul {
    grid-template-columns: 1fr;
  }
}
</style>
