<script setup lang="ts">
// The viewfinder around four buttons. The top button is the one always recording.
withDefaults(defineProps<{ tone?: 'ink' | 'paper'; size?: number | string }>(), { tone: 'ink', size: 40 })
</script>

<template>
  <svg
    class="mark"
    :class="`mark--${tone}`"
    viewBox="0 0 100 100"
    :width="size"
    :height="size"
    aria-hidden="true"
    focusable="false"
  >
    <g fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round">
      <path d="M8 30V18a10 10 0 0 1 10-10h12" />
      <path d="M70 8h12a10 10 0 0 1 10 10v12" />
      <path d="M92 70v12a10 10 0 0 1-10 10H70" />
      <path d="M30 92H18a10 10 0 0 1-10-10V70" />
    </g>
    <circle class="mark__rec" cx="50" cy="30" r="10" />
    <circle cx="30" cy="50" r="10" fill="currentColor" />
    <circle cx="70" cy="50" r="10" fill="currentColor" />
    <circle cx="50" cy="70" r="10" fill="currentColor" />
  </svg>
</template>

<style scoped>
.mark {
  display: block;
  flex: none;
}
.mark--ink {
  color: var(--ink);
}
.mark--paper {
  color: var(--paper);
}
.mark__rec {
  fill: var(--rec);
}
</style>
