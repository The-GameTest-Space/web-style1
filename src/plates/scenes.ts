// Sample "screenshots" for the demo issue, drawn as low-resolution pixel art.
// Each scene is a pure function of its size and seed, so the same work always
// prints the same picture. Real submissions replace them with an image `src`.

export type SceneId =
  | 'nightMarket'
  | 'subway'
  | 'desk'
  | 'cards'
  | 'farm'
  | 'hillTown'
  | 'sushi'
  | 'platformer'
  | 'portrait'
  | 'puzzle'

type Pt = [number, number]

export class Painter {
  constructor(
    readonly ctx: CanvasRenderingContext2D,
    readonly w: number,
    readonly h: number,
    readonly rand: () => number,
  ) {}

  rect(x: number, y: number, w: number, h: number, c: string) {
    this.ctx.fillStyle = c
    this.ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h))
  }

  px(x: number, y: number, c: string) {
    this.rect(x, y, 1, 1, c)
  }

  /** Vertical bands with a checkerboard dither row between each pair. */
  bands(y0: number, y1: number, colors: string[], x0 = 0, x1 = this.w) {
    const step = (y1 - y0) / colors.length
    colors.forEach((c, i) => {
      const top = Math.round(y0 + i * step)
      const bottom = i === colors.length - 1 ? Math.round(y1) : Math.round(y0 + (i + 1) * step) + 1
      this.rect(x0, top, x1 - x0, bottom - top, c)
      const next = colors[i + 1]
      if (!next) return
      const edge = Math.round(y0 + (i + 1) * step)
      for (let x = Math.round(x0); x < x1; x++) {
        if (x % 2 === 0) this.px(x, edge - 1, next)
        if (x % 2 === 1) this.px(x, edge, c)
      }
    })
  }

  disc(cx: number, cy: number, r: number, c: string) {
    for (let y = -r; y <= r; y++)
      for (let x = -r; x <= r; x++) if (x * x + y * y <= r * r + r * 0.6) this.px(cx + x, cy + y, c)
  }

  /** Convex polygon, filled by scanline so edges stay on the pixel grid. */
  poly(points: Pt[], c: string) {
    const ys = points.map((p) => p[1])
    const minY = Math.floor(Math.min(...ys))
    const maxY = Math.ceil(Math.max(...ys))
    for (let y = minY; y < maxY; y++) {
      const sy = y + 0.5
      const xs: number[] = []
      for (let i = 0; i < points.length; i++) {
        const [ax, ay] = points[i]!
        const [bx, by] = points[(i + 1) % points.length]!
        if ((ay <= sy && by > sy) || (by <= sy && ay > sy)) xs.push(ax + ((sy - ay) / (by - ay)) * (bx - ax))
      }
      if (xs.length < 2) continue
      const l = Math.round(Math.min(...xs))
      const r = Math.round(Math.max(...xs))
      this.rect(l, y, r - l, 1, c)
    }
  }

  line(x0: number, y0: number, x1: number, y1: number, c: string) {
    x0 = Math.round(x0); y0 = Math.round(y0); x1 = Math.round(x1); y1 = Math.round(y1)
    const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0)
    const sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1
    let err = dx + dy
    for (;;) {
      this.px(x0, y0, c)
      if (x0 === x1 && y0 === y1) break
      const e2 = 2 * err
      if (e2 >= dy) { err += dy; x0 += sx }
      if (e2 <= dx) { err += dx; y0 += sy }
    }
  }

  /** Rows of characters; '.' is transparent. */
  sprite(x: number, y: number, rows: string[], pal: Record<string, string>, scale = 1) {
    rows.forEach((row, j) =>
      [...row].forEach((ch, i) => {
        const c = pal[ch]
        if (c) this.rect(x + i * scale, y + j * scale, scale, scale, c)
      }),
    )
  }

  glow(cx: number, cy: number, r: number, rgb: string, strength = 0.22) {
    for (let k = r; k > 0; k -= 1) this.disc(cx, cy, k, `rgba(${rgb},${(strength * (1 - k / (r + 1))).toFixed(3)})`)
  }

  between(a: number, b: number) {
    return a + this.rand() * (b - a)
  }
}

export function seeded(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const HERO = [
  '..hhh..',
  '.hhhhh.',
  '.hsess.',
  '..sss..',
  '.bbbbb.',
  'bbbbbbl',
  's.bbb.L',
  '..bbb..',
  '..p.p..',
  '..p.p..',
]

const scenes: Record<SceneId, (p: Painter) => void> = {
  nightMarket(p) {
    const { w, h } = p
    const ground = Math.round(h * 0.8)
    p.bands(0, ground, ['#0d0f2b', '#15163a', '#221a47', '#35204f', '#4b2552'])
    for (let i = 0; i < w * 0.25; i++) p.px(p.between(0, w), p.between(0, h * 0.35), p.rand() > 0.7 ? '#fff6d8' : '#8d86c9')
    // Skyline
    let x = 0
    while (x < w) {
      const bw = Math.round(p.between(8, 18))
      const bh = Math.round(p.between(h * 0.22, h * 0.48))
      p.rect(x, ground - bh, bw, bh, '#1a1430')
      for (let wy = ground - bh + 3; wy < ground - 20; wy += 5)
        for (let wx = x + 2; wx < x + bw - 2; wx += 4) if (p.rand() > 0.55) p.rect(wx, wy, 2, 2, p.rand() > 0.3 ? '#f6c35a' : '#6fd3c1')
      x += bw + 1
    }
    // Stalls
    const awnings = [
      ['#e8452c', '#f3e9d8'],
      ['#2f8f83', '#f3e9d8'],
      ['#f2b134', '#2a1d18'],
      ['#6c5ce7', '#f3e9d8'],
    ]
    x = -4
    let s = 0
    while (x < w) {
      const sw = Math.round(p.between(24, 32))
      const top = ground - 24
      const [a, b] = awnings[s++ % awnings.length] as [string, string]
      p.rect(x + 1, top + 5, sw - 2, 19, '#ffcf7a')
      p.rect(x + 1, top + 5, sw - 2, 3, '#ffe2a8')
      for (let i = 0; i < sw; i++) p.rect(x + i, top, 1, 5, Math.floor(i / 3) % 2 ? a : b)
      for (let i = 0; i < sw; i += 3) p.px(x + i + 1, top + 5, a)
      p.rect(x + 1, ground - 8, sw - 2, 8, '#5a3526')
      p.rect(x + 1, ground - 8, sw - 2, 1, '#7a4a33')
      // Vendor and wares
      p.sprite(x + Math.round(sw / 2) - 2, top + 9, ['.oo.', 'oooo', '.oo.', 'oooo', 'oooo'], { o: '#2a1a1e' })
      for (let i = x + 3; i < x + sw - 3; i += 3) p.rect(i, ground - 10, 2, 2, ['#e8452c', '#fff1c1', '#8bc34a', '#ff9f43'][Math.floor(p.rand() * 4)]!)
      p.rect(x + sw - 1, top, 1, 24, '#2a1d18')
      x += sw
    }
    p.rect(0, ground, w, h - ground, '#211827')
    for (let gx = 0; gx < w; gx += 6) p.rect(gx, ground + 3 + (gx % 12 ? 0 : 4), 3, 1, '#2f2236')
    // Lantern strings
    for (const [base, sag, gap, off] of [[h * 0.14, h * 0.12, 9, 2], [h * 0.3, h * 0.08, 11, 6]] as const) {
      for (let lx = 0; lx < w; lx++) {
        const t = (lx / w) * 2 - 1
        p.px(lx, base + sag * (1 - t * t), '#3a2b3c')
      }
      for (let lx = off; lx < w; lx += gap) {
        const t = (lx / w) * 2 - 1
        const ly = Math.round(base + sag * (1 - t * t))
        p.glow(lx + 1, ly + 3, 5, '255,140,60', 0.12)
        p.rect(lx, ly + 1, 3, 4, '#e8452c')
        p.px(lx + 1, ly + 2, '#ffb35a')
        p.px(lx + 1, ly + 5, '#f2b134')
      }
    }
    // The player with a lantern
    const hx = Math.round(w * 0.44)
    p.glow(hx + 7, ground - 5, 9, '255,107,44', 0.2)
    p.sprite(hx, ground - 10, HERO, { h: '#1b1b2a', s: '#f1c7a1', e: '#1b1b2a', b: '#2f6fbd', p: '#1b1b2a', l: '#8a6a4a', L: '#FF6B2C' })
  },

  subway(p) {
    const { w, h } = p
    const vx = w / 2, vy = h * 0.46
    const far = { l: w * 0.4, r: w * 0.6, t: h * 0.3, b: h * 0.62 }
    p.rect(0, 0, w, h, '#16211f')
    // Ceiling, floor, walls
    p.poly([[0, 0], [w, 0], [far.r, far.t], [far.l, far.t]], '#c9d6cf')
    p.poly([[0, h], [w, h], [far.r, far.b], [far.l, far.b]], '#3b4a45')
    p.poly([[0, 0], [far.l, far.t], [far.l, far.b], [0, h]], '#8fa59c')
    p.poly([[w, 0], [far.r, far.t], [far.r, far.b], [w, h]], '#8fa59c')
    // Ceiling light strip
    p.poly([[w * 0.42, 0], [w * 0.58, 0], [vx + 2, far.t], [vx - 2, far.t]], '#effff6')
    // Windows (dark, with passing tunnel lights)
    for (const side of [-1, 1]) {
      for (let k = 0; k < 3; k++) {
        const t0 = k / 3 + 0.03, t1 = (k + 1) / 3 - 0.05
        const ex = (t: number) => (side < 0 ? t * far.l : w - t * (w - far.r))
        const top = (t: number) => h * 0.12 * (1 - t) + far.t * t + 2 * t
        const bot = (t: number) => h * 0.5 * (1 - t) + (far.t + (far.b - far.t) * 0.55) * t
        p.poly([[ex(t0), top(t0)], [ex(t1), top(t1)], [ex(t1), bot(t1)], [ex(t0), bot(t0)]], '#07100e')
        const mid = (t0 + t1) / 2
        p.rect(ex(mid) - 1, top(mid) + 3, 2, 1, '#6fd3a9')
      }
      // Seats
      const sx = (t: number) => (side < 0 ? t * far.l : w - t * (w - far.r))
      p.poly([[sx(0), h * 0.62], [sx(0.92), far.b - 6], [sx(0.92), far.b - 1], [sx(0), h * 0.82]], '#2f6f5f')
      p.poly([[sx(0), h * 0.62], [sx(0.92), far.b - 6], [sx(0.92), far.b - 5], [sx(0), h * 0.66]], '#4c9a84')
    }
    // Poles
    for (const t of [0.25, 0.6]) {
      for (const side of [-1, 1]) {
        const px = vx + side * (w * 0.32) * (1 - t)
        p.rect(px, far.t * t, 1 + (1 - t) * 1.5, h - (h - far.b) * t - far.t * t, '#d7dedb')
      }
    }
    // Far door and the passenger
    p.rect(far.l + 3, far.t + 2, far.r - far.l - 6, far.b - far.t - 2, '#6f857c')
    p.rect(vx - 5, far.t + 5, 10, 8, '#07100e')
    p.sprite(Math.round(vx) - 2, Math.round(far.b) - 14, ['.oo.', '.oo.', 'oooo', 'oooo', 'oooo', 'oooo', 'oooo', '.oo.', '.oo.', '.oo.', '.oo.', '.o.o', '.o.o', '.o.o'], { o: '#050706' })
    // Route map strip
    p.rect(w * 0.08, h * 0.07, w * 0.22, 2, '#e8452c')
    for (let i = 0; i < 6; i++) p.px(w * 0.08 + i * (w * 0.22 / 5), h * 0.07 - 1, '#f3f6f4')
  },

  desk(p) {
    const { w, h } = p
    p.rect(0, 0, w, h, '#1c1a2b')
    for (let y = 0; y < h * 0.7; y += 8) p.rect(0, y, w, 1, '#211f33')
    // Window with moon
    p.rect(w * 0.06, h * 0.08, w * 0.26, h * 0.36, '#2d3566')
    p.disc(Math.round(w * 0.14), Math.round(h * 0.18), 4, '#f5efd0')
    p.rect(w * 0.06, h * 0.26, w * 0.26, 1, '#141325')
    p.rect(w * 0.19, h * 0.08, 1, h * 0.36, '#141325')
    // Desk
    const top = Math.round(h * 0.72)
    p.rect(0, top, w, h - top, '#5b3b2b')
    p.rect(0, top, w, 2, '#7a523c')
    // Lamp glow
    p.glow(Math.round(w * 0.86), top - 20, 22, '255,190,110', 0.09)
    p.rect(w * 0.84, top - 26, 1, 26, '#2b2b2b')
    p.poly([[w * 0.8, top - 26], [w * 0.9, top - 26], [w * 0.88, top - 32], [w * 0.82, top - 32]], '#e0b04a')
    // Monitor showing a game
    const mx = Math.round(w * 0.36), my = Math.round(h * 0.16), mw = Math.round(w * 0.42), mh = Math.round(h * 0.42)
    p.rect(mx - 2, my - 2, mw + 4, mh + 4, '#0b0b10')
    p.bands(my, my + mh, ['#2a2f7a', '#503a8c', '#b35a7a', '#f08a5d'], mx, mx + mw)
    for (let gx = mx; gx < mx + mw; gx += 6) p.rect(gx, my + mh - 6, 5, 6, '#3b2a4a')
    p.sprite(mx + Math.round(mw * 0.4), my + mh - 16, HERO, { h: '#1b1b2a', s: '#f1c7a1', e: '#1b1b2a', b: '#2f6fbd', p: '#1b1b2a', l: '#8a6a4a', L: '#FF6B2C' })
    p.rect(mx + mw / 2 - 2, my + mh + 2, 4, top - my - mh - 2, '#0b0b10')
    p.rect(mx + mw / 2 - 8, top - 2, 16, 2, '#0b0b10')
    // Sticky notes on the monitor bezel
    p.rect(mx + mw - 6, my - 4, 7, 7, '#f2d46b'); p.rect(mx + mw - 5, my - 2, 5, 1, '#8a7a3a')
    p.rect(mx - 4, my + 6, 6, 6, '#8fd3c0')
    // Keyboard and mug
    p.rect(w * 0.38, top + 5, w * 0.3, 5, '#2b2b36')
    for (let kx = w * 0.39; kx < w * 0.67; kx += 3) p.px(kx, top + 7, '#555468')
    p.rect(w * 0.14, top - 8, 8, 9, '#e9e4d6'); p.rect(w * 0.14 + 8, top - 6, 2, 4, '#e9e4d6')
    p.px(w * 0.14 + 3, top - 11, '#8a8799'); p.px(w * 0.14 + 4, top - 13, '#8a8799'); p.px(w * 0.14 + 3, top - 15, '#8a8799')
  },

  cards(p) {
    const { w, h } = p
    p.rect(0, 0, w, h, '#1f4d3a')
    for (let i = 0; i < w * h * 0.03; i++) p.px(p.between(0, w), p.between(0, h), '#245842')
    p.rect(0, 0, w, 3, '#143326'); p.rect(0, h - 3, w, 3, '#143326')
    // Enemy
    const ex = Math.round(w / 2), ey = Math.round(h * 0.3)
    p.glow(ex, ey, 20, '160,90,200', 0.1)
    p.disc(ex, ey + 2, Math.round(h * 0.17), '#5a2f6e')
    p.disc(ex, ey, Math.round(h * 0.15), '#7a3f8e')
    p.rect(ex - 7, ey - 3, 4, 4, '#ffde59'); p.rect(ex + 3, ey - 3, 4, 4, '#ffde59')
    p.rect(ex - 6, ey - 2, 2, 2, '#1a1020'); p.rect(ex + 4, ey - 2, 2, 2, '#1a1020')
    p.rect(ex - 5, ey + 5, 10, 2, '#1a1020')
    // HP bar
    p.rect(ex - 16, ey - h * 0.2, 32, 3, '#1a1020'); p.rect(ex - 15, ey - h * 0.2 + 1, 22, 1, '#e8452c')
    // Hand of five
    const cw = Math.round(w * 0.13), ch = Math.round(cw * 1.4)
    const arts = ['#3d7be0', '#e8452c', '#8bc34a', '#f2b134', '#9c6ade']
    for (let i = 0; i < 5; i++) {
      const cx = Math.round(w / 2 + (i - 2) * (cw + 3) - cw / 2)
      const lift = [6, 2, 0, 2, 6][i]!
      const cy = Math.round(h - ch - 4 + lift - (i === 2 ? 6 : 0))
      p.rect(cx, cy, cw, ch, '#18171c')
      p.rect(cx + 1, cy + 1, cw - 2, ch - 2, '#eeeae0')
      p.rect(cx + 2, cy + 4, cw - 4, Math.round(ch * 0.42), arts[i]!)
      p.rect(cx + 2, cy + Math.round(ch * 0.6), cw - 4, 1, '#8a8578')
      p.rect(cx + 2, cy + Math.round(ch * 0.7), cw - 6, 1, '#8a8578')
      p.disc(cx + 2, cy + 2, 2, '#18171c'); p.px(cx + 2, cy + 2, '#f2b134')
    }
  },

  farm(p) {
    const { w, h } = p
    const horizon = Math.round(h * 0.42)
    p.bands(0, horizon, ['#48525e', '#5d6b78', '#72818c', '#8796a0'])
    // Hills
    for (let x = 0; x < w; x++) {
      const y1 = horizon - 6 - Math.round(6 * Math.sin(x / 13) + 4 * Math.sin(x / 5.3))
      p.rect(x, y1, 1, horizon - y1 + 1, '#3f6546')
    }
    p.rect(0, horizon, w, h - horizon, '#557f4c')
    // Plots
    const rows = 3
    for (let r = 0; r < rows; r++) {
      const py = horizon + 8 + r * Math.round((h - horizon - 12) / rows)
      for (let c = 0; c < 3; c++) {
        const px0 = Math.round(w * 0.08 + c * w * 0.2)
        p.rect(px0, py, Math.round(w * 0.17), Math.round((h - horizon) / rows) - 6, '#6b4a2f')
        for (let k = px0 + 2; k < px0 + w * 0.17 - 1; k += 3)
          p.sprite(k, py + 2, ['.g.', 'ggg', '.d.'], { g: r === 1 && c === 1 ? '#c7d86b' : '#7fc15a', d: '#3f6546' })
      }
    }
    // House
    const hx = Math.round(w * 0.72), hy = horizon - 4
    p.rect(hx, hy, 24, 18, '#c9b28a')
    p.poly([[hx - 3, hy], [hx + 27, hy], [hx + 12, hy - 12]], '#9b3b2e')
    p.rect(hx + 4, hy + 6, 5, 5, '#ffd97a'); p.rect(hx + 15, hy + 8, 6, 10, '#5a3a2a')
    // Wind-bent tree
    const tx = Math.round(w * 0.64)
    p.line(tx, horizon + 12, tx - 4, horizon - 12, '#4a3526'); p.line(tx + 1, horizon + 12, tx - 3, horizon - 12, '#4a3526')
    p.disc(tx - 9, horizon - 16, 7, '#35593c'); p.disc(tx - 14, horizon - 13, 5, '#35593c')
    // Rain
    for (let i = 0; i < w * h * 0.018; i++) {
      const x = p.between(0, w), y = p.between(0, h)
      p.line(x, y, x - 2, y + 4, 'rgba(210,225,235,0.75)')
    }
    // Puddles
    p.rect(w * 0.3, h - 6, 14, 2, '#8fb0c2'); p.rect(w * 0.55, h - 10, 10, 2, '#8fb0c2')
  },

  hillTown(p) {
    const { w, h } = p
    p.bands(0, h * 0.6, ['#2a2d4a', '#5b3b63', '#b3566a', '#ef8b5f', '#f7b872'])
    p.disc(Math.round(w * 0.82), Math.round(h * 0.42), 6, '#ffe2a0')
    // Sea
    p.rect(0, h * 0.58, w, h * 0.42, '#2d4d6b')
    for (let i = 0; i < 30; i++) p.rect(p.between(w * 0.4, w), p.between(h * 0.6, h), 3, 1, '#f7b872')
    // Hill slope
    p.poly([[0, h * 0.28], [w * 0.62, h], [0, h]], '#2b3a2e')
    p.poly([[0, h * 0.32], [w * 0.55, h], [0, h]], '#34473a')
    // Houses stacked along the slope
    for (let row = 0; row < 7; row++) {
      const y = Math.round(h * 0.32 + row * h * 0.1)
      const maxX = (y - h * 0.3) / (h * 0.7) * w * 0.58
      for (let x = 2 + (row % 2) * 5; x < maxX - 8; x += 11) {
        const hw = 9, hh = 7
        p.rect(x, y - hh, hw, hh, row % 3 ? '#d8c9a8' : '#c8a98a')
        p.rect(x - 1, y - hh - 2, hw + 2, 2, row % 2 ? '#3a3a3a' : '#7a3b2b')
        if (p.rand() > 0.35) p.rect(x + 2, y - hh + 2, 2, 2, '#ffd97a')
        if (p.rand() > 0.5) p.rect(x + 5, y - hh + 2, 2, 2, '#ffd97a')
      }
      // Lantern line
      for (let x = 3; x < maxX - 6; x += 6) p.rect(x, y - 11, 2, 2, '#e8452c')
    }
    // Stairs
    for (let k = 0; k < 10; k++) p.rect(w * 0.08 + k * 3, h * 0.55 + k * 4, 5, 1, '#8a8a7a')
  },

  sushi(p) {
    const { w, h } = p
    p.rect(0, 0, w, h, '#c89b6a')
    for (let y = 0; y < h; y += 4) p.rect(0, y, w, 1, '#bd8f5f')
    const inset = Math.round(Math.min(w, h) * 0.14)
    const bw = Math.round(Math.min(w, h) * 0.16)
    // Belt loop
    p.rect(inset, inset, w - inset * 2, h - inset * 2, '#6e7b84')
    p.rect(inset + bw, inset + bw, w - (inset + bw) * 2, h - (inset + bw) * 2, '#e9dcc3')
    for (let x = inset; x < w - inset; x += 4) { p.px(x, inset, '#56626a'); p.px(x, h - inset - 1, '#56626a') }
    for (let y = inset; y < h - inset; y += 4) { p.px(inset, y, '#56626a'); p.px(w - inset - 1, y, '#56626a') }
    // Plates
    const plates = ['#e8452c', '#3d7be0', '#f2b134', '#f5f1e6', '#8bc34a']
    const track: Pt[] = []
    const mid = inset + bw / 2
    for (let x = mid; x < w - mid; x += 12) track.push([x, mid], [x, h - mid])
    for (let y = mid + 12; y < h - mid - 6; y += 12) track.push([mid, y], [w - mid, y])
    track.forEach(([x, y], i) => {
      if (i % 5 === 3) {
        // Crab enemy
        p.sprite(Math.round(x) - 3, Math.round(y) - 2, ['c.c.c.c', '.ccccc.', 'ce.c.ec', '.c...c.'], { c: '#d84a3a', e: '#18171c' })
        return
      }
      p.disc(Math.round(x), Math.round(y), 3, plates[i % plates.length]!)
      p.rect(Math.round(x) - 2, Math.round(y) - 1, 4, 2, '#fbf7ec')
      p.rect(Math.round(x) - 2, Math.round(y) - 1, 4, 1, i % 2 ? '#ff8a65' : '#e8452c')
    })
    // Towers in the middle
    const cx = w / 2, cy = h / 2
    p.disc(Math.round(cx - 12), Math.round(cy), 5, '#3c7a5a'); p.disc(Math.round(cx - 12), Math.round(cy), 3, '#a4c8a0')
    p.rect(cx + 4, cy - 7, 6, 12, '#2a1d18'); p.rect(cx + 5, cy - 10, 4, 3, '#e8452c')
    p.disc(Math.round(cx + 20), Math.round(cy + 2), 3, '#8bc34a')
    p.line(cx - 12, cy, cx - 12 - 16, cy - 16, 'rgba(255,255,255,0.7)')
  },

  platformer(p) {
    const { w, h } = p
    p.bands(0, h, ['#4aa8e8', '#6ec0f2', '#93d3f7', '#b8e4fb'])
    for (const [cx, cy] of [[w * 0.15, h * 0.18], [w * 0.6, h * 0.12], [w * 0.85, h * 0.3]] as Pt[]) {
      p.disc(Math.round(cx), Math.round(cy), 4, '#ffffff'); p.disc(Math.round(cx + 6), Math.round(cy + 1), 5, '#ffffff'); p.disc(Math.round(cx + 12), Math.round(cy), 3, '#ffffff')
    }
    const tile = 8
    const ground = h - tile * 2
    const block = (x: number, y: number) => {
      p.rect(x, y, tile, tile, '#b0643c'); p.rect(x, y, tile, 1, '#d9894f'); p.rect(x, y + tile - 1, tile, 1, '#7a3f22')
      p.rect(x + tile / 2, y + 1, 1, tile / 2 - 1, '#7a3f22')
    }
    for (let x = 0; x < w; x += tile) {
      if (x > w * 0.46 && x < w * 0.58) continue
      block(x, ground); block(x, ground + tile)
      p.rect(x, ground, tile, 2, '#5cb85c')
    }
    for (let x = Math.round(w * 0.3); x < w * 0.45; x += tile) block(x, ground - tile * 4)
    for (let x = Math.round(w * 0.66); x < w * 0.8; x += tile) block(x, ground - tile * 6)
    for (let i = 0; i < 4; i++) { p.disc(Math.round(w * 0.32 + i * 6), ground - tile * 6, 2, '#ffd23f'); p.px(w * 0.32 + i * 6, ground - tile * 6 - 1, '#fff3b0') }
    // Flag
    p.rect(w * 0.92, ground - 34, 1, 34, '#eeeae0'); p.poly([[w * 0.92 + 1, ground - 34], [w * 0.92 + 9, ground - 30], [w * 0.92 + 1, ground - 26]], '#FF6B2C')
    // Hero mid-jump with a motion trail
    const hx = Math.round(w * 0.5), hy = Math.round(ground - tile * 5)
    for (let k = 1; k <= 3; k++) p.rect(hx - k * 5, hy + k * 4 + 4, 3, 3, `rgba(255,255,255,${0.5 - k * 0.12})`)
    p.sprite(hx, hy, HERO, { h: '#3a2415', s: '#f1c7a1', e: '#1b1b2a', b: '#e8452c', p: '#1b3a7a', l: '#e8452c', L: '#e8452c' })
  },

  portrait(p) {
    const { w, h } = p
    p.bands(0, h, ['#2b1d4a', '#4a2356', '#6a2c5a', '#b4475a', '#d9634f', '#f4a261', '#ffd97a'])
    p.disc(Math.round(w / 2), Math.round(h * 0.62), Math.round(w * 0.28), '#ffe7a8')
    p.disc(Math.round(w / 2), Math.round(h * 0.62), Math.round(w * 0.24), '#fff2c8')
    // Knight silhouette, scaled
    const s = Math.max(2, Math.floor(w / 26))
    const knight = [
      '.....kkkk.....',
      '....kkkkkk....',
      '....krrrrk....',
      '....kkkkkk....',
      '.....kkkk.....',
      '..ccckkkkccc..',
      '.cccckkkkcccc.',
      '.ccckkkkkkccc.',
      'cccckkkkkkcccc',
      'ccc.kkkkkk.ccc',
      'ccc.kkkkkk.ccc',
      'cc..kkkkkk..cc',
      'cc..kk..kk...c',
      'c...kk..kk....',
      '....kk..kk....',
      '...kkk..kkk...',
    ]
    const kw = knight[0]!.length * s
    const kh = knight.length * s
    p.sprite(Math.round(w / 2 - kw / 2), h - kh - Math.round(h * 0.06), knight, { k: '#1a1426', c: '#2a1b3a', r: '#ffd97a' }, s)
    // Sword
    p.rect(Math.round(w / 2 + kw / 2) - s, h - kh * 0.7, Math.max(1, s / 2), kh * 0.6, '#1a1426')
    p.rect(0, h - Math.round(h * 0.06), w, Math.round(h * 0.06), '#1a1426')
    for (let x = 0; x < w; x += 3) p.rect(x, h - Math.round(h * 0.06) - 2 - (x % 2), 1, 3, '#1a1426')
  },

  puzzle(p) {
    const { w, h } = p
    p.rect(0, 0, w, h, '#4c6b43')
    for (let i = 0; i < w * h * 0.04; i++) p.px(p.between(0, w), p.between(0, h), p.rand() > 0.5 ? '#e05d8a' : '#5a7d50')
    const t = Math.floor(Math.min(w, h) / 9)
    const cols = Math.floor(w / t) - 2, rows = Math.floor(h / t) - 2
    const ox = Math.round((w - cols * t) / 2), oy = Math.round((h - rows * t) / 2)
    const map = [
      '##########',
      '#..#...#.#',
      '#.B..G...#',
      '#..#B##..#',
      '#G...@.B.#',
      '##.#...G.#',
      '#....#...#',
      '##########',
    ]
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++) {
        const ch = map[r % map.length]![c % map[0]!.length]!
        const x = ox + c * t, y = oy + r * t
        const wall = ch === '#' || r === 0 || c === 0 || r === rows - 1 || c === cols - 1
        if (wall) { p.rect(x, y, t, t, '#5a4a3a'); p.rect(x, y, t, 2, '#7a6a55'); continue }
        p.rect(x, y, t, t, (r + c) % 2 ? '#d9cfb8' : '#cfc3a8')
        if (ch === 'G') p.disc(x + t / 2, y + t / 2, Math.max(1, t / 5), '#e8452c')
        if (ch === 'B') { p.rect(x + 1, y + 1, t - 2, t - 2, '#b5793b'); p.line(x + 1, y + 1, x + t - 2, y + t - 2, '#7a4f25'); p.line(x + t - 2, y + 1, x + 1, y + t - 2, '#7a4f25') }
        if (ch === '@') p.sprite(x + Math.round(t / 2) - 3, y + Math.round(t / 2) - 5, HERO, { h: '#1b1b2a', s: '#f1c7a1', e: '#1b1b2a', b: '#2f6fbd', p: '#1b1b2a', l: '#2f6fbd', L: '#2f6fbd' })
      }
  },
}

const SEEDS: Record<SceneId, number> = {
  nightMarket: 47, subway: 11, desk: 5, cards: 30, farm: 9, hillTown: 16, sushi: 8, platformer: 1247, portrait: 64, puzzle: 30,
}

export function paintScene(canvas: HTMLCanvasElement, id: SceneId, w: number, h: number, seedOffset = 0) {
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.imageSmoothingEnabled = false
  scenes[id](new Painter(ctx, w, h, seeded(SEEDS[id] + seedOffset)))
}
