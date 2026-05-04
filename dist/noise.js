"use strict";
// src/noise.ts
// All noise math used for displacement texture generation.
Object.defineProperty(exports, "__esModule", { value: true });
exports.gradNoise = gradNoise;
exports.valueNoise = valueNoise;
exports.fbm = fbm;
exports.ridgedNoise = ridgedNoise;
exports.curlNoise = curlNoise;
exports.generateTexture = generateTexture;
// ── Math helpers ────────────────────────────────────────────────────────────
function hash(x, y, s) {
    let h = (x * 374761393 + y * 668265263 + s * 2654435789) | 0;
    h ^= h >>> 13;
    h = Math.imul(h, 1540483477);
    h ^= h >>> 15;
    return (h >>> 0) / 4294967296;
}
function smooth(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
}
function lerp(a, b, t) {
    return a + (b - a) * t;
}
// ── Noise primitives ─────────────────────────────────────────────────────────
function gradNoise(x, y, s) {
    const ix = Math.floor(x), iy = Math.floor(y);
    const fx = x - ix, fy = y - iy;
    const g = (gx, gy, dx, dy) => {
        const a = hash(gx, gy, s) * Math.PI * 2;
        return Math.cos(a) * dx + Math.sin(a) * dy;
    };
    const a = g(ix, iy, fx, fy), b = g(ix + 1, iy, fx - 1, fy);
    const c = g(ix, iy + 1, fx, fy - 1), d = g(ix + 1, iy + 1, fx - 1, fy - 1);
    return lerp(lerp(a, b, smooth(fx)), lerp(c, d, smooth(fx)), smooth(fy)) * 0.5 + 0.5;
}
function valueNoise(x, y, s) {
    const ix = Math.floor(x), iy = Math.floor(y);
    const fx = x - ix, fy = y - iy;
    const a = hash(ix, iy, s), b = hash(ix + 1, iy, s);
    const c = hash(ix, iy + 1, s), d = hash(ix + 1, iy + 1, s);
    return lerp(lerp(a, b, smooth(fx)), lerp(c, d, smooth(fx)), smooth(fy));
}
function fbm(nfn, x, y, octaves, persistence, lacunarity, seed) {
    let val = 0, amp = 1, freq = 1, max = 0;
    for (let o = 0; o < octaves; o++) {
        val += nfn(x * freq, y * freq, seed + o * 127) * amp;
        max += amp;
        amp *= persistence;
        freq *= lacunarity;
    }
    return val / max;
}
function ridgedNoise(x, y, octaves, persistence, lacunarity, seed) {
    let val = 0, amp = 1, freq = 1, max = 0;
    for (let o = 0; o < octaves; o++) {
        let n = gradNoise(x * freq, y * freq, seed + o * 127);
        n = 1 - Math.abs(n * 2 - 1);
        val += n * amp;
        max += amp;
        amp *= persistence;
        freq *= lacunarity;
    }
    return val / max;
}
// curl returns [r, g] directly
function curlNoise(x, y, seed) {
    const e = 0.01;
    const r = 0.5 + (gradNoise(x, y + e, seed) - gradNoise(x, y - e, seed)) / (2 * e) * 0.5;
    const g = 0.5 - (gradNoise(x + e, y, seed) - gradNoise(x - e, y, seed)) / (2 * e) * 0.5;
    return [r, g];
}
function generateTexture(opts = {}) {
    const { size = 128, frequency = 4, octaves = 4, persistence = 0.5, lacunarity = 2, seed = 42, noiseType = "fbm", } = opts;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    const img = ctx.createImageData(size, size);
    const nfn = noiseType === "value" ? valueNoise : gradNoise;
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const i = (y * size + x) * 4;
            const nx = (x / size) * frequency;
            const ny = (y / size) * frequency;
            let r, g, b;
            if (noiseType === "curl") {
                const [cr, cg] = curlNoise(nx, ny, seed);
                r = cr;
                g = cg;
                b = valueNoise(nx, ny, seed + 500);
            }
            else if (noiseType === "ridged") {
                r = ridgedNoise(nx, ny, octaves, persistence, lacunarity, seed);
                g = ridgedNoise(nx + 31.4, ny + 17.9, octaves, persistence, lacunarity, seed + 999);
                b = ridgedNoise(nx + 7, ny + 3, octaves, persistence, lacunarity, seed + 200);
            }
            else {
                r = fbm(nfn, nx, ny, octaves, persistence, lacunarity, seed);
                g = fbm(nfn, nx + 31.4, ny + 17.9, octaves, persistence, lacunarity, seed + 999);
                b = fbm(nfn, nx + 7, ny + 13, octaves, persistence, lacunarity, seed + 500);
            }
            img.data[i] = Math.max(0, Math.min(255, r * 255));
            img.data[i + 1] = Math.max(0, Math.min(255, g * 255));
            img.data[i + 2] = Math.max(0, Math.min(255, b * 255));
            img.data[i + 3] = 255;
        }
    }
    ctx.putImageData(img, 0, 0);
    return canvas.toDataURL("image/png");
}
//# sourceMappingURL=noise.js.map