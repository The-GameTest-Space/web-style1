<script setup lang="ts">
import { computed } from 'vue'

// The four-reviewer score box every game monthly prints next to a review.
const props = defineProps<{ reviewers: { handle: string; score: number; line: string }[]; compact?: boolean }>()
const total = computed(() => props.reviewers.reduce((s, r) => s + r.score, 0))
const max = computed(() => props.reviewers.length * 10)
// Magazines stamp a review that clears three quarters of the maximum.
const recommended = computed(() => total.value >= max.value * 0.75)
</script>

<template>
  <figure class="xr" :class="{ 'xr--compact': compact }">
    <figcaption class="xr__head">
      <span class="xr__name">交叉評測<b v-if="recommended" class="xr__seal">試玩推薦</b></span>
      <span class="xr__total mono" :aria-label="`總分 ${total} 分，滿分 ${max} 分`">
        <b>{{ total }}</b>/{{ max }}
      </span>
    </figcaption>
    <ol class="xr__list">
      <li v-for="r in reviewers" :key="r.handle" class="xr__item">
        <span class="xr__score mono" :aria-label="`${r.score} 分`">{{ r.score }}</span>
        <span class="xr__who mono">{{ r.handle }}</span>
        <p v-if="!compact" class="xr__line">{{ r.line }}</p>
      </li>
    </ol>
  </figure>
</template>

<style scoped>
.xr {
  position: relative;
  margin: 0;
  border: 3px solid var(--ink);
  background: var(--paper);
}
.xr__name {
  display: inline-flex;
  align-items: center;
  gap: 12px;
}
.xr__seal {
  display: inline-block;
  padding: 1px 7px;
  border: 2px solid var(--paper);
  border-radius: 4px;
  box-shadow: inset 0 0 0 1px var(--ink), inset 0 0 0 2.5px var(--paper);
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.12em;
  transform: rotate(-6deg);
}
.xr__head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 6px 12px;
  background: var(--ink);
  color: var(--paper);
  font-family: var(--font-cjk);
  font-weight: 900;
  letter-spacing: 0.1em;
}
.xr__total {
  font-size: 13px;
  letter-spacing: 0;
}
.xr__total b {
  font-size: 22px;
}
.xr__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.xr__item {
  padding: 10px 12px 14px;
  border-left: 1px solid var(--ink);
}
.xr__item:first-child {
  border-left: 0;
}
.xr__score {
  display: block;
  font-size: clamp(2.25rem, 4vw, 3.25rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.04em;
}
.xr__who {
  display: block;
  margin-top: 6px;
  font-size: 11px;
  font-weight: 700;
  color: var(--ink-mute);
}
.xr__line {
  margin-top: 8px;
  font-family: var(--font-cjk);
  font-size: 13px;
  line-height: 1.65;
  color: var(--ink-soft);
}
@media (max-width: 560px) {
  .xr:not(.xr--compact) .xr__list {
    grid-template-columns: 1fr 1fr;
  }
  .xr:not(.xr--compact) .xr__item:nth-child(3) {
    border-left: 0;
  }
  .xr:not(.xr--compact) .xr__item:nth-child(n + 3) {
    border-top: 1px solid var(--ink);
  }
}
</style>
