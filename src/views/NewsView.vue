<script setup lang="ts">
import { computed } from 'vue'
import { allNews } from '@/content'
import SectionHead from '@/components/SectionHead.vue'
import NewsEntry from '@/components/NewsEntry.vue'

const news = allNews()
const live = computed(() => news.filter((n) => n.live))
const rest = computed(() => news.filter((n) => !n.live))
</script>

<template>
  <div class="page nv">
    <SectionHead title="新聞快報" latin="News" page="04" level="h1">
      <p class="nv__intro">社群動態、成員作品上架與活動消息。</p>
    </SectionHead>
    <div class="nv__grid">
      <div v-if="live.length" class="nv__live">
        <NewsEntry v-for="n in live" :key="n.id" :item="n" lead />
      </div>
      <div class="nv__cols">
        <NewsEntry v-for="(n, i) in rest" :key="n.id" :item="n" :lead="i === 0" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.nv {
  padding-top: clamp(32px, 5vw, 64px);
}
.nv__intro {
  margin-top: 6px;
  font-family: var(--font-cjk);
  color: var(--ink-soft);
  font-size: 1.0625rem;
}
.nv__grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--col-gap);
  margin-top: 28px;
}
.nv__live {
  grid-column: 1 / span 4;
  align-self: start;
  position: sticky;
  top: 24px;
}
.nv__cols {
  grid-column: 5 / span 8;
  columns: 2;
  column-gap: calc(var(--col-gap) * 2);
  column-rule: 1px solid var(--rule);
}
.nv__cols > * {
  break-inside: avoid;
  padding-bottom: 22px;
  margin-bottom: 22px;
  border-bottom: 1px solid var(--rule-soft);
}
.nv__cols > :first-child {
  column-span: all;
  border-bottom: 4px solid var(--ink);
}
@media (max-width: 900px) {
  .nv__live,
  .nv__cols {
    grid-column: 1 / -1;
    position: static;
  }
}
@media (max-width: 640px) {
  .nv__cols {
    columns: 1;
  }
}
</style>
