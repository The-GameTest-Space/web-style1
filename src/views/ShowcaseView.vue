<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { allWorks } from '@/content'
import { WORK_KIND_LABEL } from '@/content/site'
import type { WorkKind } from '@/content/types'
import SectionHead from '@/components/SectionHead.vue'
import WorkCard from '@/components/WorkCard.vue'
import JoinButton from '@/components/JoinButton.vue'

const route = useRoute()
const router = useRouter()
const works = allWorks()
const kinds = Object.keys(WORK_KIND_LABEL) as WorkKind[]

const active = computed<WorkKind | null>(() => {
  const k = route.query.kind
  return typeof k === 'string' && (kinds as string[]).includes(k) ? (k as WorkKind) : null
})
const shown = computed(() => (active.value ? works.filter((w) => w.kind === active.value) : works))
const count = (k: WorkKind) => works.filter((w) => w.kind === k).length

function pick(k: WorkKind | null) {
  router.replace({ query: k ? { kind: k } : {} })
}
</script>

<template>
  <div class="page sv">
    <SectionHead title="成員作品" latin="Made by members" page="16" level="h1">
      <p class="sv__intro">社群成員自己做的遊戲、影片、MOD 與美術。每一件都跟新聞印得一樣大。</p>
    </SectionHead>

    <div class="filters" role="group" aria-label="依類型篩選">
      <button type="button" class="filter" :aria-pressed="active === null" @click="pick(null)">
        全部 <span class="mono">{{ works.length }}</span>
      </button>
      <button
        v-for="k in kinds"
        :key="k"
        type="button"
        class="filter"
        :aria-pressed="active === k"
        @click="pick(k)"
      >
        {{ WORK_KIND_LABEL[k] }} <span class="mono">{{ count(k) }}</span>
      </button>
    </div>

    <p class="visually-hidden" aria-live="polite">顯示 {{ shown.length }} 件作品</p>

    <div v-if="shown.length" class="grid">
      <WorkCard v-for="w in shown" :key="w.id" :work="w" heading-level="h2" />
    </div>
    <div v-else class="empty">
      <p class="empty__big">這一類還沒有作品。</p>
      <p>第一個投稿的人，就是這一欄的封面。</p>
      <JoinButton />
    </div>
  </div>
</template>

<style scoped>
.sv {
  padding-top: clamp(32px, 5vw, 64px);
}
.sv__intro {
  margin-top: 6px;
  font-family: var(--font-cjk);
  color: var(--ink-soft);
  font-size: 1.0625rem;
}
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 24px;
}
.filter {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 0 16px;
  border: 2px solid var(--ink);
  border-radius: 999px;
  background: transparent;
  font-family: var(--font-cjk);
  font-weight: 700;
  cursor: pointer;
  transition:
    background-color 140ms linear,
    color 140ms linear;
}
.filter .mono {
  font-size: 12px;
  color: var(--ink-mute);
}
.filter:hover {
  background: var(--paper-deep);
}
.filter[aria-pressed='true'] {
  background: var(--ink);
  color: var(--paper);
}
.filter[aria-pressed='true'] .mono {
  color: var(--on-ink-mute);
}
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 48px var(--col-gap);
  margin-top: 32px;
}
.empty {
  margin-top: 32px;
  padding: 48px 24px;
  border: 3px dashed var(--ink);
  display: grid;
  justify-items: start;
  gap: 12px;
  font-family: var(--font-cjk);
}
.empty__big {
  font-weight: 900;
  font-size: 1.75rem;
}
@media (max-width: 1100px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 760px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px 16px;
  }
}
</style>
