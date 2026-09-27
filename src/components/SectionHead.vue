<script setup lang="ts">
import { SITE } from '@/content/site'

// A magazine section head: the title and its running folio on one line.
withDefaults(defineProps<{ title: string; id?: string; latin?: string; page?: string; tone?: 'ink' | 'paper'; level?: 'h1' | 'h2' }>(), {
  tone: 'paper',
  level: 'h2',
})
</script>

<template>
  <div class="sh" :class="`sh--${tone}`">
    <component :is="level" :id="id" class="sh__title">
      {{ title }}<span v-if="latin" class="sh__latin" lang="en">{{ latin }}</span>
    </component>
    <p class="sh__folio mono" aria-hidden="true">
      <span v-if="page">P.{{ page }}</span>
      <span>{{ SITE.issue.date }}</span>
    </p>
    <div v-if="$slots.default" class="sh__aside"><slot /></div>
  </div>
</template>

<style scoped>
.sh {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 8px 24px;
  padding-bottom: 12px;
  border-bottom: 4px solid var(--ink);
}
.sh--ink {
  border-color: var(--on-ink);
}
.sh__title {
  font-family: var(--font-cjk);
  font-weight: 900;
  font-size: clamp(2.25rem, 5.6vw, 5rem);
  line-height: 1;
  letter-spacing: 0.01em;
}
.sh__latin {
  margin-left: 0.4em;
  font-family: var(--font-latin);
  font-stretch: 70%;
  font-weight: 800;
  font-size: 0.38em;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  vertical-align: 0.1em;
}
.sh__folio {
  display: flex;
  gap: 16px;
  font-size: 12px;
  font-weight: 700;
  color: var(--ink-mute);
}
.sh--ink .sh__folio {
  color: var(--on-ink-mute);
}
.sh__aside {
  grid-column: 1 / -1;
}
@media (max-width: 560px) {
  .sh__latin {
    display: block;
    margin: 8px 0 0;
    font-size: 0.34em;
  }
}
</style>
