<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { Cover } from '@/content/types'
import { paintScene } from '@/plates/scenes'

const props = withDefaults(
  defineProps<{
    cover: Cover
    /** Width / height of the frame. */
    ratio?: number
    /** Pixels on the short edge of a drawn scene. */
    grain?: number
    variant?: number
    halftone?: boolean
  }>(),
  { ratio: 4 / 3, grain: 104, variant: 0, halftone: true },
)

const canvas = ref<HTMLCanvasElement>()

function paint() {
  if (!canvas.value || !('scene' in props.cover)) return
  const short = props.grain
  const [w, h] = props.ratio >= 1 ? [Math.round(short * props.ratio), short] : [short, Math.round(short / props.ratio)]
  paintScene(canvas.value, props.cover.scene, w, h, props.variant)
}

onMounted(paint)
watch(() => [props.cover, props.ratio, props.grain], paint)
</script>

<template>
  <div class="art" :class="{ 'art--halftone': halftone }" :style="{ aspectRatio: String(ratio) }">
    <img v-if="'src' in cover" :src="cover.src" :alt="cover.alt" loading="lazy" />
    <canvas v-else ref="canvas" role="img" :aria-label="cover.alt" />
  </div>
</template>

<style scoped>
.art {
  position: relative;
  overflow: hidden;
  background: var(--ink);
  width: 100%;
}
.art canvas,
.art img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.art canvas {
  image-rendering: pixelated;
}
/* Printed on newsprint: a fine ink dot screen over every screenshot */
.art--halftone::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: radial-gradient(rgb(24 23 28 / 0.3) 0.9px, transparent 1.6px);
  background-size: 4px 4px;
  mix-blend-mode: multiply;
}
</style>
