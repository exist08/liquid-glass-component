<div align="center">

# 💧 LiquidGlass

**Real liquid glass for React. One component. Every prop.**

Pure actual refraction, not a blurred rectangle.

[![npm](https://img.shields.io/npm/v/liquidglass.svg?color=a78bfa&label=npm)](https://www.npmjs.com/package/liquidglass)
[![license](https://img.shields.io/npm/l/liquidglass.svg?color=86efac)](LICENSE)
[![types](https://img.shields.io/badge/types-TypeScript-3178c6.svg)](#)
[![bundle](https://img.shields.io/badge/gzipped-~3kB-fbbf24.svg)](#)

**[▶ Live playground](./demo.html)** &middot; [Install](#install) &middot; [API](#props) &middot; [Recipes](#recipes)

</div>

---

## Why LiquidGlass?

- 🌊 **Real refraction**, not a frosted rectangle.
- 🎛️ **One component, every prop** — shape, tint, blur, noise type, scale, hover scale, wobble, drag, …
- 🪶 **~3 KB gzipped** with zero runtime dependencies beyond React.
- 🧬 **Polymorphic** — render as `button`, `a`, `div`, or any element via `as`.
- 🎯 **Typed** — full TypeScript definitions, props are inferred.
- ♿ **Accessible** — preserves native focus, keyboard, and ARIA behaviour of the underlying element.

---

## Install

```bash
npm install liquidglass
# or
pnpm add liquidglass
# or
yarn add liquidglass
```

> Requires **React 18+**. No build step. No CSS file to import.

---

## Quick start

```tsx
import { LiquidGlass } from 'liquidglass'

export default function App() {
  return (
    <LiquidGlass onClick={() => console.log('clicked')}>
      Click me
    </LiquidGlass>
  )
}
```

That's it — defaults give you a frosted pill button with subtle warp on hover.

### Customized

```tsx
<LiquidGlass
  variant="pill"
  tint="rgba(88,28,135,0.25)"
  rim="rgba(167,139,250,0.30)"
  noiseType="fbm"
  scale={24}
  hoverScale={46}
  seed={88}
  animate
  onClick={handleClick}
>
  Nebula
</LiquidGlass>
```

> 💡 Open the [live playground](./demo.html) to dial in every prop visually and copy the generated TSX.

---

## Recipes

Drop-in presets that match the swatches in the playground.

```tsx
// ⚪ White — neutral glass
<LiquidGlass tint="rgba(255,255,255,0.10)" rim="rgba(255,255,255,0.22)">
  White
</LiquidGlass>

// ⚫ Black — dark glass
<LiquidGlass tint="rgba(0,0,0,0.35)" rim="rgba(255,255,255,0.10)">
  Black
</LiquidGlass>

// 🟠 Ember — warm amber
<LiquidGlass
  tint="rgba(180,83,9,0.22)"
  rim="rgba(251,146,60,0.30)"
  shadow="0 0 22px rgba(251,146,60,0.20)"
>
  Ember
</LiquidGlass>

// 🟣 Nebula — deep purple
<LiquidGlass
  tint="rgba(88,28,135,0.25)"
  rim="rgba(167,139,250,0.30)"
  shadow="0 0 26px rgba(88,28,135,0.30)"
>
  Nebula
</LiquidGlass>

// 🟢 Venom — toxic green, ridged noise
<LiquidGlass
  tint="rgba(20,83,45,0.30)"
  rim="rgba(74,222,128,0.24)"
  noiseType="ridged"
  scale={38}
>
  Venom
</LiquidGlass>

// 🔮 Crystal — high-displacement, thin rim
<LiquidGlass
  tint="rgba(255,255,255,0.06)"
  rim="rgba(255,255,255,0.42)"
  scale={55}
>
  Crystal
</LiquidGlass>

// 🔥 Wobble — circle that breathes
<LiquidGlass variant="circle" width={120} height={120} wobble>
  🔥
</LiquidGlass>

// 🔗 As a nav link
<LiquidGlass as="a" href="/about" variant="pill" scale={12}>
  About
</LiquidGlass>
```

---

## Props

### Shape

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"pill" \| "rounded" \| "circle" \| "squircle" \| "sharp"` | `"pill"` | Border-radius preset |
| `radius` | `string \| number` | — | Override `border-radius` directly |

### Glass surface

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tint` | `string` | `"rgba(255,255,255,0.10)"` | Fill color over the displaced backdrop |
| `blur` | `number` | `0` | `backdrop-filter` blur in px. `0` = pure displacement |
| `saturate` | `number` | `1.2` | `backdrop-filter` saturate multiplier |

### Displacement (the liquid part)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `scale` | `number` | `20` | Warp intensity at rest |
| `hoverScale` | `number` | `scale * 1.9` | Warp on hover |
| `noiseType` | `"fbm" \| "perlin" \| "ridged" \| "curl" \| "value"` | `"fbm"` | Noise algorithm |
| `frequency` | `number` | `4` | Noise frequency — lower = bigger waves |
| `octaves` | `number` | `4` | fBm octave count (detail layers) |
| `persistence` | `number` | `0.5` | Amplitude decay per octave |
| `lacunarity` | `number` | `2` | Frequency growth per octave |
| `seed` | `number` | `42` | Noise seed — change for different patterns |
| `textureSize` | `number` | `128` | Texture resolution in px |

### Surface details

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rim` | `string` | `"rgba(255,255,255,0.20)"` | Border color |
| `rimWidth` | `number` | `1` | Border width in px |
| `specular` | `boolean` | `true` | Top-edge highlight |
| `specularColor` | `string` | `"rgba(255,255,255,0.22)"` | Highlight color |
| `shadow` | `string` | — | `box-shadow` value |

### Animation

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `animate` | `boolean` | `true` | Lerp `scale` on hover |
| `wobble` | `boolean` | `false` | CSS scale wobble loop |
| `wobbleDuration` | `number` | `4` | Wobble period in seconds |

### Sizing & element

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `padding` | `string` | `"14px 32px"` | CSS padding |
| `width` | `string \| number` | — | Fixed width |
| `height` | `string \| number` | — | Fixed height |
| `fullWidth` | `boolean` | `false` | Stretch to container width |
| `as` | `ElementType` | `"button"` | Render as any element |

> All standard HTML attributes (`onClick`, `disabled`, `href`, `className`, `style`, `aria-*`, …) are forwarded to the underlying element.

---

## Noise types

Each noise generates a different displacement texture. The R channel drives X-displacement, G drives Y.

| Type | Personality | Best for |
|------|-------------|----------|
| `fbm` | Layered fractal — natural liquid feel | Default, almost everything |
| `perlin` | Smooth gradient noise | Gentle, ambient waves |
| `ridged` | Sharp ridges | Volcanic, aggressive, "venom" looks |
| `curl` | Swirling vortex | Soap bubbles, holographic |
| `value` | Blocky | Coarse frosted glass |

---

## Performance

- The SVG filter is generated **once per instance** and reused — no per-frame canvas work.
- Hover/wobble animations are CSS-driven or use a single `requestAnimationFrame` lerp loop.
- Texture size defaults to **128 px** — large enough for high-DPI screens, small enough for GPU upload to be free.
- The whole package is **tree-shakable ESM**.

---

## Browser support

`backdrop-filter: url(#svg-filter)` requires a modern engine:

| Browser | Min version |
|---------|-------------|
| Chrome / Edge | 85+ |
| Safari (macOS / iOS) | Not Yet |
| Firefox | 103+ |

On older browsers, the glass gracefully degrades to a tinted rectangle (no warp).

---

## License

[MIT](LICENSE) — free for personal and commercial use.

---

<div align="center">
Built with ❤️ for the future of liquid glassmorphism. <strong>Open the <a href="./demo.html">live playground</a> →</strong>
</div>
