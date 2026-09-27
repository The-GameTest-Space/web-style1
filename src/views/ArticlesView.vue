<script setup lang="ts">
import Words from '@/components/Words.vue'
import { allArticles, shortDate } from '@/content'
import { KIND_LABEL } from '@/content/site'
import CoverArt from '@/components/CoverArt.vue'
import Viewfinder from '@/components/Viewfinder.vue'
import SectionHead from '@/components/SectionHead.vue'

const [lead, ...rest] = allArticles()
</script>

<template>
  <div class="page list">
    <SectionHead title="專題" latin="Features" page="08" level="h1">
      <p class="list__intro">訪談、評測、專欄與特集。由社群成員執筆。</p>
    </SectionHead>

    <RouterLink v-if="lead" :to="`/articles/${lead.slug}`" class="lead">
      <Viewfinder class="lead__art">
        <CoverArt :cover="lead.cover" :ratio="16 / 10" :grain="100" />
      </Viewfinder>
      <div class="lead__text">
        <h2 class="lead__title"><Words :text="lead.title" /></h2>
        <p class="lead__dek">{{ lead.dek }}</p>
        <p class="kind">{{ KIND_LABEL[lead.kind] }} · <span class="mono">文 {{ lead.author.handle }} · {{ shortDate(lead.publishedAt) }} · {{ lead.readMinutes }} 分鐘</span></p>
      </div>
    </RouterLink>

    <ol class="rows">
      <li v-for="a in rest" :key="a.id">
        <RouterLink :to="`/articles/${a.slug}`" class="row">
          <time class="row__date mono" :datetime="a.publishedAt">{{ shortDate(a.publishedAt) }}</time>
          <div class="row__text">
            <h2 class="row__title"><Words :text="a.title" /></h2>
            <p class="row__dek">{{ a.dek }}</p>
            <p class="kind row__kind">{{ KIND_LABEL[a.kind] }} · <span class="mono">文 {{ a.author.handle }} · {{ a.readMinutes }} 分鐘</span></p>
          </div>
          <CoverArt class="row__art" :cover="a.cover" :ratio="4 / 3" :grain="72" />
        </RouterLink>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.list {
  padding-top: clamp(32px, 5vw, 64px);
  font-family: var(--font-cjk);
}
.list__intro {
  margin-top: 6px;
  color: var(--ink-soft);
  font-size: 1.0625rem;
}
.kind {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--ink-mute);
}
.by {
  font-size: 12px;
  color: var(--ink-mute);
}
.lead {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--col-gap);
  margin-top: 32px;
  padding-bottom: 32px;
  border-bottom: 4px solid var(--ink);
  text-decoration: none;
}
.lead__art {
  grid-column: 1 / span 7;
}
.lead__text {
  grid-column: 8 / span 5;
  display: grid;
  align-content: start;
  gap: 14px;
}
.lead__title {
  font-family: var(--font-cjk);
  font-size: clamp(1.75rem, 3.4vw, 3rem);
  line-height: 1.25;
}
.lead:hover .lead__title,
.row:hover .row__title {
  text-decoration: underline;
  text-decoration-thickness: 3px;
  text-underline-offset: 0.16em;
}
.lead__dek {
  font-size: 1.0625rem;
  line-height: 1.8;
  color: var(--ink-soft);
}
.rows {
  list-style: none;
  margin: 0;
  padding: 0;
}
.row {
  display: grid;
  grid-template-columns: 6rem 1fr 14rem;
  gap: var(--col-gap);
  align-items: start;
  padding: 24px 0;
  border-bottom: 1px solid var(--rule);
  text-decoration: none;
}
.row__date {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.2;
}
.row__kind {
  margin-top: 10px;
}
.row__title {
  font-family: var(--font-cjk);
  font-size: clamp(1.25rem, 2vw, 1.625rem);
  line-height: 1.35;
}
.row__dek {
  margin-top: 8px;
  color: var(--ink-soft);
  line-height: 1.8;
  max-width: 40em;
}
@media (max-width: 900px) {
  .lead__art,
  .lead__text {
    grid-column: 1 / -1;
  }
  .row {
    grid-template-columns: 1fr 7.5rem;
  }
  .row__date {
    grid-column: 1 / -1;
    font-size: 1rem;
  }
}
</style>
