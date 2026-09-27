<script setup lang="ts">
import { SITE } from '@/content/site'

withDefaults(defineProps<{ tone?: 'ink' | 'paper'; size?: 'md' | 'lg' }>(), { tone: 'ink', size: 'md' })
const invite = SITE.discordInvite
</script>

<template>
  <a
    v-if="invite"
    class="join"
    :class="[`join--${tone}`, `join--${size}`]"
    :href="invite"
    target="_blank"
    rel="noopener"
  >
    <b class="join__dot" aria-hidden="true" />
    <span>加入 Discord</span>
    <svg class="join__arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 13 13 3M5 3h8v8" /></svg>
    <span class="visually-hidden">（在新分頁開啟）</span>
  </a>
  <RouterLink v-else class="join" :class="[`join--${tone}`, `join--${size}`]" :to="{ path: '/about', hash: '#join' }">
    <b class="join__dot" aria-hidden="true" />
    <span>加入 Discord</span>
    <svg class="join__arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
  </RouterLink>
</template>

<style scoped>
.join {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  min-height: 48px;
  padding: 0 20px 0 16px;
  font-family: var(--font-cjk);
  font-weight: 900;
  font-size: 1.0625rem;
  letter-spacing: 0.04em;
  text-decoration: none;
  border: 3px solid currentColor;
  border-radius: 999px;
  transition:
    background-color 160ms linear,
    color 160ms linear,
    transform var(--t-snap) var(--ease-snap);
}
.join--lg {
  min-height: 60px;
  padding: 0 28px 0 22px;
  font-size: 1.25rem;
}
.join--ink {
  background: var(--ink);
  border-color: var(--ink);
  color: var(--paper);
}
.join--ink:hover {
  background: var(--paper);
  color: var(--ink);
}
.join--paper {
  background: var(--paper);
  border-color: var(--paper);
  color: var(--ink);
}
.join--paper:hover {
  background: var(--ink);
  color: var(--paper);
}
.join:active {
  transform: translateY(1px) scale(0.98);
}
.join__dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--rec);
}
.join__arrow {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>
