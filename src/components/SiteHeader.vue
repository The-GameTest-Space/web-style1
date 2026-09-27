<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BrandMark from './BrandMark.vue'
import { SITE } from '@/content/site'

const route = useRoute()
const cover = computed(() => route.name === 'home')
</script>

<template>
  <header class="head" :class="{ 'head--cover': cover }">
    <div class="page">
      <div class="head__strip">
        <span class="mono">VOL.{{ SITE.issue.volume }} · {{ SITE.issue.label }}</span>
        <span v-if="SITE.sample" class="head__sample">示範刊：本期文章、新聞與作品皆為虛構範例</span>
        <span class="head__tagline mono" aria-hidden="true">{{ SITE.tagline }}</span>
      </div>
      <component :is="cover ? 'h1' : 'div'" class="head__title">
        <RouterLink to="/" class="head__brand" :aria-label="`${SITE.name} ${SITE.nameZh}，回到封面`">
          <BrandMark class="head__mark" size="1em" />
          <span class="head__word">The Game Test Space</span>
          <span class="head__zh">{{ SITE.nameZh }}</span>
        </RouterLink>
      </component>
    </div>
  </header>
</template>

<style scoped>
.head {
  border-bottom: 4px solid var(--rule);
}
.head__strip {
  display: flex;
  align-items: center;
  gap: 16px;
  min-height: 36px;
  font-size: 12px;
  color: var(--ink-soft);
  border-bottom: 1px solid var(--rule);
}
.head__sample {
  font-family: var(--font-cjk);
  font-weight: 500;
  font-size: 12px;
}
.head__tagline {
  margin-left: auto;
  letter-spacing: 0.32em;
  font-weight: 700;
  white-space: nowrap;
}
.head__title {
  font-size: clamp(26px, 3vw, 36px);
  line-height: 1;
  padding-block: 14px;
}
.head__brand {
  display: flex;
  align-items: center;
  gap: 0.36em;
  width: fit-content;
  text-decoration: none;
}
.head__word {
  font-family: var(--font-latin);
  font-weight: 900;
  letter-spacing: -0.035em;
  white-space: nowrap;
}
.head__zh {
  align-self: flex-end;
  margin-left: 0.3em;
  font-family: var(--font-cjk);
  font-weight: 700;
  font-size: 0.42em;
  letter-spacing: 0.18em;
  padding-bottom: 0.18em;
  color: var(--ink-soft);
}

/* On the cover the masthead is the biggest thing in the room */
.head--cover .head__title {
  font-size: clamp(40px, 6.5vw, 100px);
  padding-block: 0.14em 0.12em;
}
.head--cover .head__brand {
  width: 100%;
  gap: 0.24em;
}
.head--cover .head__mark {
  width: 0.86em;
  height: 0.86em;
}
.head--cover .head__zh {
  margin-left: auto;
  font-size: 0.24em;
  writing-mode: vertical-rl;
  align-self: center;
  letter-spacing: 0.24em;
  padding: 0;
  color: var(--ink);
}

@media (max-width: 760px) {
  .head__tagline,
  .head__zh {
    display: none;
  }
  .head__strip {
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 2px 12px;
    padding-block: 6px;
  }
  .head__title {
    font-size: clamp(20px, 5.8vw, 30px);
  }
  .head--cover .head__title {
    font-size: clamp(22px, 7.8vw, 56px);
  }
}
</style>
