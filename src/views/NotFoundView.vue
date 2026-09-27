<script setup lang="ts">
import BrandMark from '@/components/BrandMark.vue'
</script>

<template>
  <div class="page nf">
    <BrandMark class="nf__mark" size="96" />
    <p class="nf__code mono">404 · NO SIGNAL</p>
    <h1 class="nf__title">這一頁還沒錄到。</h1>
    <p class="nf__p">連結可能打錯了，或是這篇內容已經下架。</p>
    <div class="nf__links">
      <RouterLink to="/">回到封面</RouterLink>
      <RouterLink to="/showcase">看成員作品</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.nf {
  padding-top: clamp(48px, 8vw, 120px);
  font-family: var(--font-cjk);
}
.nf__code {
  margin-top: 28px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: var(--ink-mute);
}
.nf__title {
  margin-top: 8px;
  font-family: var(--font-cjk);
  font-size: clamp(2.5rem, 7vw, 6rem);
  line-height: 1.1;
}
.nf__p {
  margin-top: 16px;
  font-size: 1.125rem;
  color: var(--ink-soft);
}
.nf__links {
  display: flex;
  gap: 24px;
  margin-top: 28px;
  font-weight: 900;
}
</style>
