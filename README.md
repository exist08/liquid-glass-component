# 💧 LiquidGlass

One React component. All props. Real liquid glass via SVG `feDisplacementMap` applied through `backdrop-filter: url()`.

---

## The key insight (why most implementations fail)

Most "liquid glass" tutorials apply the SVG filter **to the element itself**:
```css
/* ❌ WRONG — this distorts the element, not the background */
filter: url(#liquidGlass);
```

The correct approach uses `backdrop-filter` with a URL reference. This applies the displacement **to the content behind the element** — exactly how real glass refracts:
```css
/* ✅ CORRECT — this warps the backdrop content */
backdrop-filter: url(#liquidGlass);
-webkit-backdrop-filter: url(#liquidGlass);
```

The SVG filter lives in the document (not inside the element) so the `url()` reference resolves correctly.

---

## Install

```bash
npm install liquidglass
```

## Usage

```tsx
import { LiquidGlass } from 'liquidglass'

// Minimal
<LiquidGlass>Click me</LiquidGlass>

// Customized
<LiquidGlass
  variant="pill"
  tint="rgba(88,28,135,0.25)"
  scale={24}
  hoverScale={46}
  noiseType="fbm"
  seed={88}
  rim="rgba(167,139,250,0.30)"
  animate
  wobble={false}
  onClick={handleClick}
>
  Nebula
</LiquidGlass>
```

---

## Props

### Shape
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"pill" \| "rounded" \| "circle" \| "squircle" \| "sharp"` | `"pill"` | Border-radius preset |
| `radius` | `string \| number` | — | Override border-radius directly |

### Glass Surface
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tint` | `string` | `"rgba(255,255,255,0.10)"` | Fill color over the displaced backdrop |
| `blur` | `number` | `0` | backdrop-filter blur (px). 0 = pure displacement |
| `saturate` | `number` | `1.2` | backdrop-filter saturate multiplier |

### Displacement (the liquid part)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `scale` | `number` | `20` | Warp intensity at rest |
| `hoverScale` | `number` | `scale * 1.9` | Warp on hover |
| `frequency` | `number` | `4` | Noise frequency. Lower = bigger waves |
| `octaves` | `number` | `4` | fBm octave count (detail layers) |
| `persistence` | `number` | `0.5` | Amplitude decay per octave |
| `lacunarity` | `number` | `2` | Frequency growth per octave |
| `seed` | `number` | `42` | Noise seed — change for different patterns |
| `noiseType` | `"fbm" \| "perlin" \| "ridged" \| "curl" \| "value"` | `"fbm"` | Noise algorithm |
| `textureSize` | `number` | `128` | Texture resolution in px |

### Surface Details
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rim` | `string` | `"rgba(255,255,255,0.20)"` | Border color |
| `rimWidth` | `number` | `1` | Border width in px |
| `specular` | `boolean` | `true` | Top-edge highlight |
| `specularColor` | `string` | `"rgba(255,255,255,0.22)"` | Highlight color |
| `shadow` | `string` | — | box-shadow value |

### Animation
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `animate` | `boolean` | `true` | Lerp scale on hover |
| `wobble` | `boolean` | `false` | CSS scale wobble loop |
| `wobbleDuration` | `number` | `4` | Wobble duration in seconds |

### Sizing & Element
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `padding` | `string` | `"14px 32px"` | CSS padding |
| `width` | `string \| number` | — | Fixed width |
| `height` | `string \| number` | — | Fixed height |
| `fullWidth` | `boolean` | `false` | Stretch to container width |
| `as` | `ElementType` | `"button"` | Render as any element |

All standard HTML attributes (`onClick`, `disabled`, `href`, `className`, `style`, etc.) are passed through.

---

## Noise types

| Type | Personality |
|------|------------|
| `fbm` | Layered fractal — the most natural liquid feel (default) |
| `perlin` | Smooth gradient noise — gentle waves |
| `ridged` | Sharp ridges — volcanic, aggressive |
| `curl` | Swirling vortex — soap bubble, organic |
| `value` | Blocky — coarse frosted glass |

---

## Browser support

`backdrop-filter: url()` with SVG filter functions is supported in:
- Chrome/Edge 85+
- Safari 14+
- Firefox 103+

---

## License

MIT
