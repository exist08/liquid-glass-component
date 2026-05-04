import type { CSSProperties, ElementType } from "react";
import type { NoiseType } from "./noise";
export type { NoiseType };
export type GlassVariant = "pill" | "rounded" | "circle" | "squircle" | "sharp";
export interface LiquidGlassProps {
    /**
     * Border-radius preset.
     * pill=9999px  rounded=16px  circle=50%  squircle=28px  sharp=4px
     * @default "pill"
     */
    variant?: GlassVariant;
    /**
     * Override border-radius directly (overrides variant).
     */
    radius?: string | number;
    /**
     * Fill tint of the glass surface.
     * @default "rgba(255,255,255,0.10)"
     */
    tint?: string;
    /**
     * backdrop-filter blur amount in px. 0 = pure liquid displacement, no blur.
     * @default 0
     */
    blur?: number;
    /**
     * Saturation boost via backdrop-filter saturate(). 1 = no change.
     * @default 1.2
     */
    saturate?: number;
    /**
     * Displacement scale at rest — controls warp intensity.
     * @default 20
     */
    scale?: number;
    /**
     * Displacement scale on hover. Animates smoothly via rAF lerp.
     * @default scale * 1.9
     */
    hoverScale?: number;
    /**
     * Noise frequency. Lower = bigger waves. Higher = fine grain.
     * @default 4
     */
    frequency?: number;
    /**
     * fBm octave count. More = finer detail.
     * @default 4
     */
    octaves?: number;
    /**
     * fBm persistence. Controls amplitude decay per octave.
     * @default 0.5
     */
    persistence?: number;
    /**
     * fBm lacunarity. Controls frequency growth per octave.
     * @default 2
     */
    lacunarity?: number;
    /**
     * Noise seed. Change to get a completely different pattern.
     * @default 42
     */
    seed?: number;
    /**
     * Noise algorithm used to generate the displacement texture.
     * fbm=layered(default), perlin=smooth, ridged=sharp, curl=swirly, value=blocky
     * @default "fbm"
     */
    noiseType?: NoiseType;
    /**
     * Texture resolution in px (power of 2 recommended: 64, 128, 256).
     * @default 128
     */
    textureSize?: number;
    /**
     * Rim border color.
     * @default "rgba(255,255,255,0.20)"
     */
    rim?: string;
    /**
     * Rim border width in px.
     * @default 1
     */
    rimWidth?: number;
    /**
     * Show top-edge specular highlight.
     * @default true
     */
    specular?: boolean;
    /**
     * Color of the specular highlight.
     * @default "rgba(255,255,255,0.22)"
     */
    specularColor?: string;
    /**
     * Box shadow.
     * @default undefined
     */
    shadow?: string;
    /**
     * Smoothly lerp displacement scale on hover.
     * @default true
     */
    animate?: boolean;
    /**
     * Add a CSS scale-wobble loop animation (organic blob feel).
     * @default false
     */
    wobble?: boolean;
    /**
     * Wobble animation duration in seconds.
     * @default 4
     */
    wobbleDuration?: number;
    /**
     * Padding shorthand (CSS value).
     * @default "14px 32px"
     */
    padding?: string;
    /** Fixed width (CSS value). */
    width?: string | number;
    /** Fixed height (CSS value). */
    height?: string | number;
    /** Stretch to fill container width. */
    fullWidth?: boolean;
    /**
     * Render as any HTML element.
     * @default "button"
     */
    as?: ElementType;
    children?: React.ReactNode;
    className?: string;
    style?: CSSProperties;
    [key: string]: unknown;
}
//# sourceMappingURL=types.d.ts.map