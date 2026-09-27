<script setup lang="ts">
import { computed } from 'vue'

// Chinese has no spaces, so a heading can break inside a word ("捷／運").
// Segment the text into words and keep each word on one line; lines still
// break between words, and punctuation stays attached to the word before it.
const props = defineProps<{ text: string }>()

const segmenter =
  typeof Intl !== 'undefined' && 'Segmenter' in Intl ? new Intl.Segmenter('zh-Hant', { granularity: 'word' }) : null

// Terms the dictionary splits but this community reads as one word.
const KEEP = ['試玩', '社群', '一局', '測試夜', '同人']

/** Join two neighbouring segments when their boundary cuts through a kept term. */
function cutsTerm(left: string, right: string) {
  return KEEP.some((t) => {
    for (let k = 1; k < t.length; k++) if (left.endsWith(t.slice(0, k)) && right.startsWith(t.slice(k))) return true
    return false
  })
}

const words = computed(() => {
  if (!segmenter) return [props.text]
  const out: string[] = []
  for (const { segment, isWordLike } of segmenter.segment(props.text)) {
    if (!isWordLike && out.length && !/^[「《（(]/.test(segment)) out[out.length - 1] += segment
    else if (out.length && /[「《（(]$/.test(out[out.length - 1]!)) out[out.length - 1] += segment
    else if (out.length && cutsTerm(out[out.length - 1]!, segment)) out[out.length - 1] += segment
    else out.push(segment)
  }
  return out
})
</script>

<template>
  <span v-for="(w, i) in words" :key="i" class="w">{{ w }}</span>
</template>

<style scoped>
.w {
  white-space: nowrap;
}
</style>
