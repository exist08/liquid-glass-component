// src/LiquidGlass.tsx
"use client";

import React, {
  useRef, useEffect, useState, useCallback, useId,
  type CSSProperties, type ElementType,
} from "react";
import { generateTexture } from "./noise";
import type { LiquidGlassProps, GlassVariant } from "./types";

// ── Border radius map ────────────────────────────────────────────────────────

function resolveRadius(variant: GlassVariant, radius?: string | number): string {
  if (radius !== undefined) return typeof radius === "number" ? `${radius}px` : radius;
  const map: Record<GlassVariant, string> = {
    pill:     "9999px",
    rounded:  "16px",
    circle:   "50%",
    squircle: "28px",
    sharp:    "4px",
  };
  return map[variant];
}

// ── Keyframe injection (once per document) ───────────────────────────────────

const WOBBLE_KEYFRAMES = `
@keyframes lg-wobble {
  0%,100% { transform: scale(1,1); }
  25%     { transform: scale(1.035,0.968); }
  75%     { transform: scale(0.968,1.035); }
}`;

function ensureWobbleKeyframes() {
  if (typeof document === "undefined") return;
  if (document.getElementById("lg-wobble-kf")) return;
  const s = document.createElement("style");
  s.id = "lg-wobble-kf";
  s.textContent = WOBBLE_KEYFRAMES;
  document.head.appendChild(s);
}

// ── Component ────────────────────────────────────────────────────────────────

export function LiquidGlass(props: LiquidGlassProps) {
  const {
    // shape
    variant = "pill",
    radius,
    // glass
    tint = "rgba(255,255,255,0.10)",
    blur = 0,
    saturate = 1.2,
    // displacement
    scale = 20,
    hoverScale,
    frequency = 4,
    octaves = 4,
    persistence = 0.5,
    lacunarity = 2,
    seed = 42,
    noiseType = "fbm",
    textureSize = 128,
    // surface
    rim = "rgba(255,255,255,0.20)",
    rimWidth = 1,
    specular = true,
    specularColor = "rgba(255,255,255,0.22)",
    shadow,
    // animation
    animate = true,
    wobble = false,
    wobbleDuration = 4,
    // sizing
    padding = "14px 32px",
    width,
    height,
    fullWidth = false,
    // element
    as: Tag = "button" as ElementType,
    // content
    children,
    className,
    style,
    // rest → native element
    ...rest
  } = props;

  const resolvedHoverScale = hoverScale ?? scale * 1.9;
  const borderRadius = resolveRadius(variant, radius);

  // ── Unique filter ID ─────────────────────────────────────────────────────
  const uid = useId().replace(/:/g, "");
  const filterId = `lg-${uid}`;

  // ── Texture state ────────────────────────────────────────────────────────
  const [textureUrl, setTextureUrl] = useState<string | null>(null);

  useEffect(() => {
    // Canvas API is client-only
    const url = generateTexture({ size: textureSize, frequency, octaves, persistence, lacunarity, seed, noiseType });
    setTextureUrl(url);
  }, [textureSize, frequency, octaves, persistence, lacunarity, seed, noiseType]);

  // ── Hover animation ──────────────────────────────────────────────────────
  const dispMapRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const currentScaleRef = useRef(scale);
  const targetScaleRef  = useRef(scale);
  const rafRef = useRef<number>(0);

  const startLerp = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    const tick = () => {
      const cur = currentScaleRef.current;
      const tar = targetScaleRef.current;
      const next = cur + (tar - cur) * 0.12;
      currentScaleRef.current = next;
      dispMapRef.current?.setAttribute("scale", next.toFixed(2));
      if (Math.abs(next - tar) > 0.05) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const handleMouseEnter = useCallback(() => {
    targetScaleRef.current = resolvedHoverScale;
    if (animate) startLerp();
    else dispMapRef.current?.setAttribute("scale", String(resolvedHoverScale));
  }, [resolvedHoverScale, animate, startLerp]);

  const handleMouseLeave = useCallback(() => {
    targetScaleRef.current = scale;
    if (animate) startLerp();
    else dispMapRef.current?.setAttribute("scale", String(scale));
  }, [scale, animate, startLerp]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  // ── Wobble keyframes ─────────────────────────────────────────────────────
  useEffect(() => { if (wobble) ensureWobbleKeyframes(); }, [wobble]);

  // ── Backdrop filter string ────────────────────────────────────────────────
  const backdropFilter = [
    blur > 0     ? `blur(${blur}px)` : "",
    saturate !== 1 ? `saturate(${saturate})` : "",
    `url(#${filterId})`,     // ← THIS is the key: SVG filter as backdrop-filter url()
  ].filter(Boolean).join(" ");

  // ── Outer wrapper styles ─────────────────────────────────────────────────
  const wrapperStyle: CSSProperties = {
    position: "relative",
    display: fullWidth ? "flex" : "inline-flex",
    width: fullWidth ? "100%" : (width !== undefined ? (typeof width === "number" ? `${width}px` : width) : undefined),
    height: height !== undefined ? (typeof height === "number" ? `${height}px` : height) : undefined,
    alignItems: "center",
    justifyContent: "center",
    padding,
    borderRadius,
    cursor: Tag === "button" ? "pointer" : undefined,
    border: "none",
    background: "transparent",
    color: "inherit",
    fontFamily: "inherit",
    fontSize: "inherit",
    fontWeight: "inherit",
    letterSpacing: "inherit",
    overflow: "hidden",
    boxShadow: shadow,
    // wobble animation
    ...(wobble ? {
      animation: `lg-wobble ${wobbleDuration}s ease-in-out infinite`,
    } : {}),
    ...style,
  };

  // ── Glass layer (backdrop-filter applied here) ────────────────────────────
  // The SVG filter definition lives in a hidden <svg>.
  // The backdrop-filter: url(#filterId) reads from the SAME document SVG.
  // This is the correct approach — feDisplacementMap via backdrop-filter.
  const glassLayerStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    borderRadius,
    // Core: backdrop-filter applies SVG displacement to everything BEHIND this element
    backdropFilter,
    WebkitBackdropFilter: backdropFilter,
    // Tint fill on top of the displaced backdrop
    backgroundColor: tint,
    // Rim border
    border: `${rimWidth}px solid ${rim}`,
    // Prevent interaction
    pointerEvents: "none",
    zIndex: 0,
  };

  // ── Specular highlight ────────────────────────────────────────────────────
  const specularStyle: CSSProperties = {
    position: "absolute",
    top: rimWidth,
    left: "15%",
    right: "15%",
    height: "35%",
    borderRadius: "0 0 50% 50% / 0 0 100% 100%",
    background: `linear-gradient(to bottom, ${specularColor}, transparent)`,
    pointerEvents: "none",
    zIndex: 1,
  };

  // ── Content layer ─────────────────────────────────────────────────────────
  const contentStyle: CSSProperties = {
    position: "relative",
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    width: "100%",
  };

  return (
    <>
      {/* SVG filter definition — MUST be in the same document */}
      {textureUrl && (
        <svg
          style={{ position: "absolute", width: 0, height: 0, overflow: "hidden", pointerEvents: "none" }}
          aria-hidden="true"
        >
          <defs>
            <filter
              id={filterId}
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
              colorInterpolationFilters="sRGB"
            >
              {/* feImage loads our procedurally generated noise texture */}
              <feImage
                href={textureUrl}
                preserveAspectRatio="none"
                result="tex"
              />
              {/*
                feDisplacementMap warps the BACKDROP content using:
                  R channel → horizontal (x) shift
                  G channel → vertical   (y) shift
                scale controls warp intensity — animated on hover via ref
              */}
              <feDisplacementMap
                ref={dispMapRef}
                in="SourceGraphic"
                in2="tex"
                scale={scale}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      )}

      {/* The element itself */}
      <Tag
        {...rest}
        className={className}
        style={wrapperStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Glass backdrop layer */}
        <span style={glassLayerStyle} />

        {/* Specular highlight */}
        {specular && <span style={specularStyle} aria-hidden="true" />}

        {/* Content */}
        <span style={contentStyle}>{children}</span>
      </Tag>
    </>
  );
}
