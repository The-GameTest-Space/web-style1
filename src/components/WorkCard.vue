<script setup lang="ts">
import Words from '@/components/Words.vue'
import type { Work } from '@/content/types'
import { WORK_KIND_LABEL } from '@/content/site'
import { shortDate } from '@/content'
import CoverArt from './CoverArt.vue'
import Viewfinder from './Viewfinder.vue'

withDefaults(defineProps<{ work: Work; headingLevel?: 'h3' | 'h2' }>(), { headingLevel: 'h3' })
</script>

<template>
  <article class="work">
    <RouterLink :to="`/showcase/${work.slug}`" class="work__link">
      <Viewfinder :live="work.status === 'live'">
        <CoverArt :cover="work.cover" :ratio="3 / 4" :grain="96" />
        <span class="work__chip mono">
          <b v-if="work.status" class="work__status" :class="`work__status--${work.status}`">
            {{ work.status === 'live' ? '直播中' : 'NEW' }}
          </b>
          {{ work.meta }}
        </span>
      </Viewfinder>
      <div class="work__text">
        <component :is="headingLevel" class="work__title">
          <Words :text="work.title" />
          <span v-if="work.subtitle" class="work__sub" lang="en">{{ work.subtitle }}</span>
        </component>
        <p class="work__blurb">{{ work.blurb }}</p>
        <p class="work__by">{{ WORK_KIND_LABEL[work.kind] }} · <span class="mono">{{ work.creator.handle }} · {{ shortDate(work.publishedAt) }}</span></p>
      </div>
    </RouterLink>
  </article>
</template>

<style scoped>
.work__link {
  display: block;
  text-decoration: none;
}
.work__chip {
  position: absolute;
  left: 10px;
  bottom: 10px;
  z-index: 3;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 3px 8px;
  background: var(--ink);
  color: var(--paper);
  font-size: 11px;
  font-weight: 700;
}
.work__status {
  padding: 0 5px;
  margin-left: -4px;
  font-family: var(--font-cjk);
  font-weight: 900;
}
.work__status--new,
.work__status--live {
  background: var(--rec);
  color: var(--ink);
}
.work__text {
  padding-top: 12px;
  border-top: 0;
}
.work__title {
  font-family: var(--font-cjk);
  font-weight: 900;
  font-size: clamp(1.375rem, 2vw, 1.75rem);
  line-height: 1.2;
}
.work__sub {
  display: block;
  font-family: var(--font-latin);
  font-stretch: 75%;
  font-weight: 700;
  font-size: 0.5em;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-soft);
  margin-top: 2px;
}
.work__blurb {
  margin-top: 8px;
  font-family: var(--font-cjk);
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--ink-soft);
}
.work__by {
  margin-top: 8px;
  font-family: var(--font-cjk);
  font-weight: 700;
  font-size: 12px;
  color: var(--ink-mute);
}
.work__link:hover .work__title {
  text-decoration: underline;
  text-decoration-thickness: 3px;
  text-underline-offset: 0.16em;
}
</style>
