<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

// Signature interaction: hover, focus the surrounding link, or scroll a picture
// into view on a touch screen, and the brand's viewfinder snaps around it,
// the REC dot lights, and a timecode starts running.
const props = withDefaults(defineProps<{ tone?: 'ink' | 'paper'; live?: boolean; recAt?: 'tr' | 'bl'; focusFrom?: string }>(), {
  tone: 'paper',
  live: false,
  recAt: 'tr',
})

const root = ref<HTMLElement>()
const on = ref(false)
const frames = ref(0)
let timer: number | undefined
let io: IntersectionObserver | undefined
const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function start() {
  on.value = true
  if (timer !== undefined) return
  frames.value = 0
  if (reduced) return
  const t0 = performance.now()
  const tick = () => {
    frames.value = Math.floor(((performance.now() - t0) / 1000) * 30)
    timer = requestAnimationFrame(tick)
  }
  timer = requestAnimationFrame(tick)
}

function stop() {
  if (props.live) return
  on.value = false
  if (timer !== undefined) cancelAnimationFrame(timer)
  timer = undefined
}

// The focusable element is usually the link around the picture, not the picture itself.
let link: HTMLElement | null = null
const onFocus = (e: FocusEvent) => (e.target as HTMLElement).matches(':focus-visible') && start()

onMounted(() => {
  if (props.live) start()
  // A decorative image link can be tabindex=-1; then focus comes from the named title link.
  link = (props.focusFrom ? document.querySelector<HTMLElement>(props.focusFrom) : root.value?.closest('a')) ?? null
  link?.addEventListener('focus', onFocus)
  link?.addEventListener('blur', stop)
  if (root.value && window.matchMedia('(hover: none)').matches && 'IntersectionObserver' in window) {
    io = new IntersectionObserver(([entry]) => (entry?.isIntersecting ? start() : stop()), { threshold: 0.75 })
    io.observe(root.value)
  }
})

onBeforeUnmount(() => {
  if (timer !== undefined) cancelAnimationFrame(timer)
  link?.removeEventListener('focus', onFocus)
  link?.removeEventListener('blur', stop)
  io?.disconnect()
})

const pad = (n: number) => String(n).padStart(2, '0')
const code = () => {
  const f = frames.value
  return `${pad(Math.floor(f / 1800))}:${pad(Math.floor(f / 30) % 60)}:${pad(f % 30)}`
}
</script>

<template>
  <div
    ref="root"
    class="vf"
    :class="[`vf--${tone}`, `vf--rec-${recAt}`, { 'vf--live': live, 'vf--on': on }]"
    @pointerenter="start"
    @pointerleave="stop"
  >
    <slot />
    <div class="vf__frame" aria-hidden="true">
      <i class="vf__c vf__c--tl" /><i class="vf__c vf__c--tr" /><i class="vf__c vf__c--bl" /><i class="vf__c vf__c--br" />
      <span class="vf__rec mono"><b class="vf__dot" />REC {{ code() }}</span>
    </div>
  </div>
</template>

<style scoped>
.vf {
  position: relative;
  isolation: isolate;
}
.vf__frame {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
  --c: var(--paper);
  --len: clamp(14px, 12%, 34px);
  --w: 3px;
  --in: 10px;
}
.vf--ink .vf__frame {
  --c: var(--ink);
}
.vf__c {
  position: absolute;
  width: var(--len);
  height: var(--len);
  border: var(--w) solid var(--c);
  opacity: 0;
  transition:
    transform var(--t-snap) var(--ease-snap),
    opacity 120ms linear;
}
.vf__c--tl {
  top: var(--in);
  left: var(--in);
  border-width: var(--w) 0 0 var(--w);
  border-top-left-radius: 6px;
  transform: translate(-14px, -14px);
}
.vf__c--tr {
  top: var(--in);
  right: var(--in);
  border-width: var(--w) var(--w) 0 0;
  border-top-right-radius: 6px;
  transform: translate(14px, -14px);
}
.vf__c--bl {
  bottom: var(--in);
  left: var(--in);
  border-width: 0 0 var(--w) var(--w);
  border-bottom-left-radius: 6px;
  transform: translate(-14px, 14px);
}
.vf__c--br {
  bottom: var(--in);
  right: var(--in);
  border-width: 0 var(--w) var(--w) 0;
  border-bottom-right-radius: 6px;
  transform: translate(14px, 14px);
}
.vf__rec {
  position: absolute;
  top: calc(var(--in) + 8px);
  right: calc(var(--in) + 12px);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 2px 7px;
  background: rgb(24 23 28 / 0.82);
  color: var(--paper);
  font-size: 11px;
  font-weight: 700;
  line-height: 1.6;
  opacity: 0;
  transform: translateY(-4px);
  transition:
    opacity 120ms linear,
    transform var(--t-snap) var(--ease-snap);
}
.vf--rec-bl .vf__rec {
  top: auto;
  right: auto;
  bottom: calc(var(--in) + 8px);
  left: calc(var(--in) + 12px);
}
.vf__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--rec);
}
.vf--on .vf__c,
.vf--on .vf__rec,
.vf--live .vf__rec {
  opacity: 1;
  transform: none;
}
@media (prefers-reduced-motion: no-preference) {
  .vf__dot {
    animation: blink 1s steps(1) infinite;
  }
}
@keyframes blink {
  50% {
    opacity: 0.2;
  }
}
</style>
