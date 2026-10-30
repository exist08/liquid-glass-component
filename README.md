<div align="center">

# 💧 LiquidGlass

**Real liquid glass for React & Next.js. One component. Every prop.**

Pure actual refraction, not a blurred rectangle.

[![npm](https://img.shields.io/npm/v/liquid-glass-component.svg?color=a78bfa&label=npm)](https://www.npmjs.com/package/liquid-glass-component)
[![license](https://img.shields.io/npm/l/liquid-glass-component.svg?color=86efac)](LICENSE)
[![types](https://img.shields.io/badge/types-TypeScript-3178c6.svg)](#)
[![bundle](https://img.shields.io/badge/gzipped-~3kB-fbbf24.svg)](#)

**[▶ Live playground](https://exist08.github.io/liquid-glass-component/)** &middot; [Install](#install) &middot; [Next.js](#nextjs-app-router) &middot; [Use cases](#use-cases) &middot; [API](#props) &middot; [Recipes](#recipes) &middot; [FAQ](#faq)

</div>

---

**LiquidGlass** (`liquid-glass-component`) is a lightweight React component for **iOS-style liquid glass** and **glassmorphism** UI. Most glass effects only blur what's behind them. LiquidGlass bends it: a procedural noise texture drives an SVG `feDisplacementMap` through `backdrop-filter`, so photos, gradients and text refract like they're under real curved glass. Use it for **glass navbars, floating action buttons, cards, credit cards, modals and buttons** in React, Next.js, Vite or Remix.

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
npm install liquid-glass-component
# or
pnpm add liquid-glass-component
# or
yarn add liquid-glass-component
```

> Requires **React 18+**. No build step. No CSS file to import.

---

## Quick start

```tsx
import { LiquidGlass } from 'liquid-glass-component'

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

> 💡 Open the [live playground](https://exist08.github.io/liquid-glass-component/) to dial in every prop visually and copy the generated TSX.

---

## Next.js (App Router)

LiquidGlass uses React hooks, so in the App Router render it from a **Client Component**. Add `'use client'` to the file that uses it:

```tsx
// app/components/Navbar.tsx
'use client'
import { LiquidGlass } from 'liquid-glass-component'

export function Navbar() {
  return (
    <LiquidGlass as="nav" variant="pill" padding="10px 12px" scale={28}>
      <LiquidGlass as="a" href="/work" scale={12} hoverScale={72}>Work</LiquidGlass>
      <LiquidGlass as="a" href="/about" scale={12} hoverScale={72}>About</LiquidGlass>
    </LiquidGlass>
  )
}
```

Then import `<Navbar />` from any server component or layout. Nothing else to set up: no CSS import, no config, no plugin. The Pages Router, Vite, Remix and Create React App work the same way, without the directive.

---

## Use cases

Refraction only shows when there's something behind the glass, so place these over images, gradients or scrolling content.

### Glass navbar

```tsx
<nav style={{ position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)', width: '90%' }}>
  <LiquidGlass as="div" variant="pill" fullWidth padding="10px 12px"
    tint="rgba(255,255,255,0.08)" rim="rgba(255,255,255,0.35)" scale={28}>
    <strong style={{ marginRight: 'auto', paddingLeft: 12 }}>Lumina</strong>
    {['Work', 'Studio', 'Journal', 'Contact'].map((l) => (
      <LiquidGlass key={l} as="a" href={`#${l}`} scale={12} hoverScale={72}>
        {l}
      </LiquidGlass>
    ))}
  </LiquidGlass>
</nav>
```

### Floating action buttons

```tsx
<div style={{ position: 'fixed', right: 24, bottom: 24, display: 'grid', gap: 16 }}>
  <LiquidGlass variant="circle" width={64} height={64} padding="0" scale={30}
    shadow="0 10px 30px -8px rgba(0,0,0,.45)" aria-label="Like">♥</LiquidGlass>
  <LiquidGlass variant="circle" width={64} height={64} padding="0" scale={30}
    tint="rgba(124,58,237,0.30)" aria-label="New post">＋</LiquidGlass>
</div>
```

### Glass card

```tsx
<LiquidGlass as="article" variant="squircle" width={420} padding="26px 28px"
  tint="rgba(24,10,48,0.34)" rim="rgba(255,255,255,0.4)" scale={22} hoverScale={58}>
  <div style={{ width: '100%' }}>
    <h3>Mara Ito</h3>
    <p>Product designer · Oslo</p>
    <LiquidGlass scale={14} padding="10px 20px">Follow</LiquidGlass>
  </div>
</LiquidGlass>
```

### Glass credit card

```tsx
<LiquidGlass as="div" variant="rounded" width={390} height={244} padding="26px 30px"
  tint="rgba(255,255,255,0.10)" rim="rgba(255,255,255,0.45)" scale={26} hoverScale={64}
  shadow="0 30px 60px -24px rgba(0,0,0,.6)">
  <div style={{ width: '100%', fontFamily: 'monospace' }}>
    <div>lumina</div>
    <div style={{ fontSize: 24, margin: '40px 0 20px' }}>5281 0442 •••• 3017</div>
    <div>A. RIVERA · 09/29</div>
  </div>
</LiquidGlass>
```

Glass works for **modals, toolbars, tab bars, tooltips, music players and pricing cards** too: any surface that floats above rich content.

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

## How it works

1. **Noise texture:** each instance generates a small seeded noise image (fBm, Perlin, ridged, curl or value noise). Red encodes X offset, green encodes Y offset.
2. **SVG filter:** the texture is loaded with `feImage` and fed to `feDisplacementMap`, which shifts every pixel of the backdrop by the encoded amount.
3. **Backdrop filter:** the glass layer applies that filter with `backdrop-filter: url(#filter)`, so whatever sits behind the element is refracted live as it moves or scrolls.
4. **Surface:** a tint, a rim border and a specular highlight sit on top; your children render above everything, fully interactive.

On hover, `scale` lerps toward `hoverScale` and the glass visibly ripples.

---

## FAQ

**What is liquid glass?**
A UI material that looks like curved glass: content behind it is bent (refracted), not just blurred. LiquidGlass brings this look, popularised by Apple's Liquid Glass design language, to the web as a React component.

**How is LiquidGlass different from glassmorphism?**
Classic glassmorphism is `backdrop-filter: blur()` plus a translucent fill. LiquidGlass adds a noise-driven SVG displacement map, so the backdrop is actually warped. Blur is optional (`blur={0}` by default).

**Does it work with Next.js?**
Yes. Render it from a Client Component (`'use client'`) in the App Router; it works as-is in the Pages Router. See [Next.js (App Router)](#nextjs-app-router).

**Can I use it for a navbar, card or button?**
Yes. Use `as` to render any element (`nav`, `a`, `div`, `article`, `button`, …) and `variant` or `radius` to set the shape. See [Use cases](#use-cases).

**How big is it?**
About 3 KB gzipped, tree-shakable ESM, no runtime dependencies besides React, and no CSS file.

**Is it free?**
Yes, MIT licensed for personal and commercial projects.

---

## License

[MIT](LICENSE) — free for personal and commercial use.

---

<div align="center">
Built with ❤️ for the future of liquid glassmorphism. <strong>Open the <a href="https://exist08.github.io/liquid-glass-component/">live playground</a> →</strong>
</div>
