<script setup lang="ts">
import Words from '@/components/Words.vue'
import type { NewsItem } from '@/content/types'
import { NEWS_TAG_LABEL } from '@/content/site'
import { shortDate } from '@/content'

defineProps<{ item: NewsItem; lead?: boolean }>()
</script>

<template>
  <article :id="item.id" class="nw" :class="{ 'nw--live': item.live, 'nw--lead': lead }">
    <h3 class="nw__title"><Words :text="item.title" /></h3>
    <p class="nw__meta">
      <span v-if="item.live" class="nw__live"><b aria-hidden="true" />直播中</span>
      <span class="nw__tag">{{ NEWS_TAG_LABEL[item.tag] }}</span>
      <time class="mono" :datetime="item.publishedAt">{{ shortDate(item.publishedAt) }}</time>
    </p>
    <p class="nw__body">{{ item.body }}</p>
  </article>
</template>

<style scoped>
.nw {
  font-family: var(--font-cjk);
}
.nw__meta {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  font-weight: 700;
  color: var(--ink-mute);
}
.nw__tag {
  padding: 0 6px;
  border: 1.5px solid currentColor;
  line-height: 1.5;
  letter-spacing: 0.08em;
}
.nw__live {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--rec);
  letter-spacing: 0.08em;
}
.nw__live b {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--rec);
}
.nw__meta {
  margin-top: 8px;
}
.nw__title {
  font-family: var(--font-cjk);
  font-weight: 900;
  font-size: 1.1875rem;
  line-height: 1.45;
}
.nw__body {
  margin-top: 6px;
  font-size: 0.9375rem;
  line-height: 1.8;
  color: var(--ink-soft);
}
.nw--lead .nw__title {
  font-size: clamp(1.5rem, 2.6vw, 2.25rem);
  line-height: 1.3;
}
.nw--lead .nw__body {
  font-size: 1.0625rem;
}
/* The live item is printed as an ink block */
.nw--live {
  background: var(--ink);
  color: var(--on-ink);
  padding: 20px 22px 24px;
}
.nw--live .nw__meta,
.nw--live .nw__body {
  color: var(--on-ink-mute);
}
@media (prefers-reduced-motion: no-preference) {
  .nw__live b {
    animation: blink 1s steps(1) infinite;
  }
}
@keyframes blink {
  50% {
    opacity: 0.2;
  }
}
</style>
