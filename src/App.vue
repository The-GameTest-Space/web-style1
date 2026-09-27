<script setup lang="ts">
import SiteHeader from '@/components/SiteHeader.vue'
import ThumbIndex from '@/components/ThumbIndex.vue'
import SiteFooter from '@/components/SiteFooter.vue'
</script>

<template>
  <a href="#main" class="skip-link">跳到主要內容</a>
  <SiteHeader />
  <ThumbIndex />
  <main id="main" tabindex="-1">
    <RouterView />
  </main>
  <SiteFooter />
</template>

<style>
main:focus {
  outline: none;
}
</style>
