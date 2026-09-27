<script setup lang="ts">
import Words from '@/components/Words.vue'
import { computed, watchEffect } from 'vue'
import { allWorks, findWork, longDate } from '@/content'
import { WORK_KIND_LABEL } from '@/content/site'
import CoverArt from '@/components/CoverArt.vue'
import Viewfinder from '@/components/Viewfinder.vue'
import WorkCard from '@/components/WorkCard.vue'
import NotFoundView from './NotFoundView.vue'

const props = defineProps<{ slug: string }>()
const work = computed(() => findWork(props.slug))
const more = computed(() => allWorks().filter((w) => w.slug !== props.slug).slice(0, 4))

watchEffect(() => {
  if (work.value) document.title = `${work.value.title} · 成員作品 · The Game Test Space`
})
</script>

<template>
  <NotFoundView v-if="!work" />
  <div v-else class="page wv">
    <p class="wv__back"><RouterLink to="/showcase">成員作品</RouterLink> / {{ WORK_KIND_LABEL[work.kind] }}</p>
    <div class="wv__grid">
      <Viewfinder class="wv__art" :live="work.status === 'live'">
        <CoverArt :cover="work.cover" :ratio="3 / 4" :grain="120" />
      </Viewfinder>
      <div class="wv__text">
        <h1 class="wv__title"><Words :text="work.title" /></h1>
        <p v-if="work.subtitle" class="wv__sub" lang="en">{{ work.subtitle }}</p>
        <p v-if="work.status" class="wv__status">
          <b aria-hidden="true" />{{ work.status === 'live' ? '正在直播' : '本週新作' }}
        </p>
        <p class="wv__blurb">{{ work.blurb }}</p>

        <dl class="wv__facts">
          <div><dt>作者</dt><dd class="mono">{{ work.creator.handle }}</dd></div>
          <div><dt>類型</dt><dd>{{ WORK_KIND_LABEL[work.kind] }}</dd></div>
          <div v-if="work.meta"><dt>版本 / 長度</dt><dd class="mono">{{ work.meta }}</dd></div>
          <div><dt>刊出</dt><dd class="mono">{{ longDate(work.publishedAt) }}</dd></div>
        </dl>

        <div class="wv__desc">
          <p v-for="(p, i) in work.description" :key="i">{{ p }}</p>
        </div>

        <ul class="wv__tags" aria-label="標籤">
          <li v-for="t in work.tags" :key="t">{{ t }}</li>
        </ul>

        <div class="wv__links">
          <a v-for="l in work.links" :key="l.url" :href="l.url" target="_blank" rel="noopener" class="wv__link">
            {{ l.label }}
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 12 12 4M6 4h6v6" /></svg>
            <span class="visually-hidden">（在新分頁開啟）</span>
          </a>
        </div>
      </div>
    </div>

    <section class="wv__more" aria-labelledby="more-title">
      <h2 id="more-title" class="wv__more-title">更多成員作品</h2>
      <div class="wv__more-grid">
        <WorkCard v-for="w in more" :key="w.id" :work="w" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.wv {
  padding-top: clamp(24px, 4vw, 48px);
  font-family: var(--font-cjk);
}
.wv__back {
  font-size: 14px;
  font-weight: 700;
  color: var(--ink-mute);
}
.wv__back a {
  color: var(--ink);
}
.wv__grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--col-gap);
  margin-top: 20px;
  align-items: start;
}
.wv__art {
  grid-column: 1 / span 5;
}
.wv__text {
  grid-column: 7 / span 6;
}
.wv__status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 2px 12px 2px 10px;
  background: var(--rec);
  color: var(--ink);
  font-weight: 900;
  letter-spacing: 0.08em;
  margin-top: 14px;
}
.wv__status b {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--ink);
}
.wv__title {
  font-family: var(--font-cjk);
  font-size: clamp(2.75rem, 6vw, 5.5rem);
  line-height: 1.05;
}
.wv__sub {
  margin-top: 8px;
  font-family: var(--font-latin);
  font-stretch: 75%;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-soft);
}
.wv__blurb {
  margin-top: 20px;
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  font-weight: 700;
  line-height: 1.6;
}
.wv__facts {
  display: grid;
  grid-template-columns: repeat(4, auto);
  justify-content: start;
  margin: 28px 0 0;
  border-block: 4px solid var(--ink);
}
.wv__facts > div {
  padding: 10px 24px 12px 0;
}
.wv__facts > div + div {
  padding-left: 20px;
  border-left: 1px solid var(--ink);
}
.wv__facts dt {
  font-size: 12px;
  font-weight: 700;
  color: var(--ink-mute);
}
.wv__facts dd {
  margin: 2px 0 0;
  font-weight: 700;
}
.wv__desc {
  margin-top: 24px;
  font-size: 1.0625rem;
  line-height: 1.9;
  max-width: 34em;
}
.wv__desc p + p {
  margin-top: 0.9em;
}
.wv__tags {
  list-style: none;
  margin: 20px 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.wv__tags li {
  padding: 1px 10px;
  border: 1.5px solid var(--ink);
  font-size: 13px;
  font-weight: 700;
}
.wv__links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}
.wv__link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 52px;
  padding: 0 22px;
  background: var(--ink);
  color: var(--paper);
  border: 3px solid var(--ink);
  border-radius: 999px;
  font-weight: 900;
  text-decoration: none;
  transition:
    background-color 140ms linear,
    color 140ms linear;
}
.wv__link + .wv__link {
  background: transparent;
  color: var(--ink);
}
.wv__link:hover {
  background: var(--paper);
  color: var(--ink);
}
.wv__link svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.4;
  stroke-linecap: round;
}
.wv__more {
  margin-top: clamp(64px, 8vw, 120px);
}
.wv__more-title {
  font-family: var(--font-cjk);
  font-size: 1.5rem;
  letter-spacing: 0.16em;
  padding-bottom: 10px;
  border-bottom: 4px solid var(--ink);
}
.wv__more-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px var(--col-gap);
  margin-top: 24px;
}
@media (max-width: 900px) {
  .wv__art {
    grid-column: 2 / span 10;
  }
  .wv__text {
    grid-column: 1 / -1;
  }
  .wv__more-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 560px) {
  .wv__art {
    grid-column: 1 / -1;
  }
  .wv__facts {
    grid-template-columns: 1fr 1fr;
  }
  .wv__facts > div:nth-child(3) {
    border-left: 0;
    padding-left: 0;
  }
  .wv__facts > div:nth-child(n + 3) {
    border-top: 1px solid var(--ink);
  }
}
</style>
