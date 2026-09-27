<script setup lang="ts">
import { useRoute } from 'vue-router'

// Magazine thumb-index tabs: on the right page edge on desktop,
// a sticky strip on small screens.
const tabs = [
  { to: '/', label: '封面', page: '01', match: (p: string) => p === '/' },
  { to: '/news', label: '新聞', page: '04', match: (p: string) => p.startsWith('/news') },
  { to: '/articles', label: '專題', page: '08', match: (p: string) => p.startsWith('/articles') },
  { to: '/showcase', label: '作品', page: '16', match: (p: string) => p.startsWith('/showcase') },
  { to: '/about', label: '加入', page: '24', match: (p: string) => p.startsWith('/about') },
]
const route = useRoute()
</script>

<template>
  <nav class="thumbs" aria-label="主要分類">
    <ul>
      <li v-for="(t, i) in tabs" :key="t.to" :style="{ '--i': i }">
        <RouterLink :to="t.to" class="thumb" :aria-current="t.match(route.path) ? 'page' : undefined">
          <span class="thumb__label">{{ t.label }}</span>
          <span class="thumb__page mono" aria-hidden="true">P.{{ t.page }}</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.thumbs ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.thumb {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-decoration: none;
  font-family: var(--font-cjk);
  font-weight: 900;
  color: var(--ink);
  background: var(--paper-deep);
  transition:
    background-color 140ms linear,
    color 140ms linear,
    transform var(--t-snap) var(--ease-snap);
}
.thumb__page {
  font-size: 10px;
  font-weight: 700;
  color: var(--ink-mute);
}
.thumb[aria-current='page'] {
  background: var(--ink);
  color: var(--paper);
}
.thumb[aria-current='page'] .thumb__page {
  color: var(--on-ink-mute);
}

/* Desktop: tabs cut into the right edge of the page */
@media (min-width: 1024px) {
  .thumbs {
    position: fixed;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 30;
  }
  .thumbs li + li {
    margin-top: 6px;
  }
  .thumb {
    flex-direction: column;
    width: var(--tab-rail);
    padding: 14px 0 12px;
    border: 2px solid var(--ink);
    border-right: 0;
    border-radius: 10px 0 0 10px;
  }
  .thumb__label {
    writing-mode: vertical-rl;
    font-size: 17px;
    letter-spacing: 0.24em;
    line-height: 1;
  }
  .thumb:hover {
    transform: translateX(-6px);
  }
  .thumb[aria-current='page'] {
    transform: translateX(-10px);
    padding-right: 10px;
    width: calc(var(--tab-rail) + 10px);
  }
}

/* Small screens: a sticky strip under the masthead */
@media (max-width: 1023px) {
  .thumbs {
    position: sticky;
    top: 0;
    z-index: 30;
    background: var(--paper);
    border-bottom: 2px solid var(--ink);
  }
  .thumbs ul {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  }
  .thumbs li + li {
    border-left: 1px solid var(--ink);
  }
  .thumb {
    min-height: 48px;
    background: var(--paper);
    font-size: 15px;
  }
}
@media (max-width: 420px) {
  .thumb__page {
    display: none;
  }
}
</style>
