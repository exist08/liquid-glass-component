"use strict";
// src/LiquidGlass.tsx
"use client";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiquidGlass = LiquidGlass;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const noise_1 = require("./noise");
// ── Border radius map ────────────────────────────────────────────────────────
function resolveRadius(variant, radius) {
    if (radius !== undefined)
        return typeof radius === "number" ? `${radius}px` : radius;
    const map = {
        pill: "9999px",
        rounded: "16px",
        circle: "50%",
        squircle: "28px",
        sharp: "4px",
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
    if (typeof document === "undefined")
        return;
    if (document.getElementById("lg-wobble-kf"))
        return;
    const s = document.createElement("style");
    s.id = "lg-wobble-kf";
    s.textContent = WOBBLE_KEYFRAMES;
    document.head.appendChild(s);
}
// ── Component ────────────────────────────────────────────────────────────────
function LiquidGlass(props) {
    const { 
    // shape
    variant = "pill", radius, 
    // glass
    tint = "rgba(255,255,255,0.10)", blur = 0, saturate = 1.2, 
    // displacement
    scale = 20, hoverScale, frequency = 4, octaves = 4, persistence = 0.5, lacunarity = 2, seed = 42, noiseType = "fbm", textureSize = 128, 
    // surface
    rim = "rgba(255,255,255,0.20)", rimWidth = 1, specular = true, specularColor = "rgba(255,255,255,0.22)", shadow, 
    // animation
    animate = true, wobble = false, wobbleDuration = 4, 
    // sizing
    padding = "14px 32px", width, height, fullWidth = false, 
    // element
    as: Tag = "button", 
    // content
    children, className, style } = props, 
    // rest → native element
    rest = __rest(props, ["variant", "radius", "tint", "blur", "saturate", "scale", "hoverScale", "frequency", "octaves", "persistence", "lacunarity", "seed", "noiseType", "textureSize", "rim", "rimWidth", "specular", "specularColor", "shadow", "animate", "wobble", "wobbleDuration", "padding", "width", "height", "fullWidth", "as", "children", "className", "style"]);
    const resolvedHoverScale = hoverScale !== null && hoverScale !== void 0 ? hoverScale : scale * 1.9;
    const borderRadius = resolveRadius(variant, radius);
    // ── Unique filter ID ─────────────────────────────────────────────────────
    const uid = (0, react_1.useId)().replace(/:/g, "");
    const filterId = `lg-${uid}`;
    // ── Texture state ────────────────────────────────────────────────────────
    const [textureUrl, setTextureUrl] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        // Canvas API is client-only
        const url = (0, noise_1.generateTexture)({ size: textureSize, frequency, octaves, persistence, lacunarity, seed, noiseType });
        setTextureUrl(url);
    }, [textureSize, frequency, octaves, persistence, lacunarity, seed, noiseType]);
    // ── Hover animation ──────────────────────────────────────────────────────
    const dispMapRef = (0, react_1.useRef)(null);
    const currentScaleRef = (0, react_1.useRef)(scale);
    const targetScaleRef = (0, react_1.useRef)(scale);
    const rafRef = (0, react_1.useRef)(0);
    const startLerp = (0, react_1.useCallback)(() => {
        cancelAnimationFrame(rafRef.current);
        const tick = () => {
            var _a;
            const cur = currentScaleRef.current;
            const tar = targetScaleRef.current;
            const next = cur + (tar - cur) * 0.12;
            currentScaleRef.current = next;
            (_a = dispMapRef.current) === null || _a === void 0 ? void 0 : _a.setAttribute("scale", next.toFixed(2));
            if (Math.abs(next - tar) > 0.05)
                rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
    }, []);
    const handleMouseEnter = (0, react_1.useCallback)(() => {
        var _a;
        targetScaleRef.current = resolvedHoverScale;
        if (animate)
            startLerp();
        else
            (_a = dispMapRef.current) === null || _a === void 0 ? void 0 : _a.setAttribute("scale", String(resolvedHoverScale));
    }, [resolvedHoverScale, animate, startLerp]);
    const handleMouseLeave = (0, react_1.useCallback)(() => {
        var _a;
        targetScaleRef.current = scale;
        if (animate)
            startLerp();
        else
            (_a = dispMapRef.current) === null || _a === void 0 ? void 0 : _a.setAttribute("scale", String(scale));
    }, [scale, animate, startLerp]);
    (0, react_1.useEffect)(() => () => cancelAnimationFrame(rafRef.current), []);
    // ── Wobble keyframes ─────────────────────────────────────────────────────
    (0, react_1.useEffect)(() => { if (wobble)
        ensureWobbleKeyframes(); }, [wobble]);
    // ── Backdrop filter string ────────────────────────────────────────────────
    const backdropFilter = [
        blur > 0 ? `blur(${blur}px)` : "",
        saturate !== 1 ? `saturate(${saturate})` : "",
        `url(#${filterId})`, // ← THIS is the key: SVG filter as backdrop-filter url()
    ].filter(Boolean).join(" ");
    // ── Outer wrapper styles ─────────────────────────────────────────────────
    const wrapperStyle = Object.assign(Object.assign({ position: "relative", display: fullWidth ? "flex" : "inline-flex", width: fullWidth ? "100%" : (width !== undefined ? (typeof width === "number" ? `${width}px` : width) : undefined), height: height !== undefined ? (typeof height === "number" ? `${height}px` : height) : undefined, alignItems: "center", justifyContent: "center", padding,
        borderRadius, cursor: Tag === "button" ? "pointer" : undefined, border: "none", background: "transparent", color: "inherit", fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit", letterSpacing: "inherit", overflow: "hidden", boxShadow: shadow }, (wobble ? {
        animation: `lg-wobble ${wobbleDuration}s ease-in-out infinite`,
    } : {})), style);
    // ── Glass layer (backdrop-filter applied here) ────────────────────────────
    // The SVG filter definition lives in a hidden <svg>.
    // The backdrop-filter: url(#filterId) reads from the SAME document SVG.
    // This is the correct approach — feDisplacementMap via backdrop-filter.
    const glassLayerStyle = {
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
    const specularStyle = {
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
    const contentStyle = {
        position: "relative",
        zIndex: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        width: "100%",
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [textureUrl && ((0, jsx_runtime_1.jsx)("svg", { style: { position: "absolute", width: 0, height: 0, overflow: "hidden", pointerEvents: "none" }, "aria-hidden": "true", children: (0, jsx_runtime_1.jsx)("defs", { children: (0, jsx_runtime_1.jsxs)("filter", { id: filterId, x: "-20%", y: "-20%", width: "140%", height: "140%", colorInterpolationFilters: "sRGB", children: [(0, jsx_runtime_1.jsx)("feImage", { href: textureUrl, preserveAspectRatio: "none", result: "tex" }), (0, jsx_runtime_1.jsx)("feDisplacementMap", { ref: dispMapRef, in: "SourceGraphic", in2: "tex", scale: scale, xChannelSelector: "R", yChannelSelector: "G" })] }) }) })), (0, jsx_runtime_1.jsxs)(Tag, Object.assign({}, rest, { className: className, style: wrapperStyle, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, children: [(0, jsx_runtime_1.jsx)("span", { style: glassLayerStyle }), specular && (0, jsx_runtime_1.jsx)("span", { style: specularStyle, "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("span", { style: contentStyle, children: children })] }))] }));
}
//# sourceMappingURL=LiquidGlass.js.map