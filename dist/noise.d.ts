export type NoiseType = "fbm" | "perlin" | "ridged" | "curl" | "value";
export declare function gradNoise(x: number, y: number, s: number): number;
export declare function valueNoise(x: number, y: number, s: number): number;
export declare function fbm(nfn: (x: number, y: number, s: number) => number, x: number, y: number, octaves: number, persistence: number, lacunarity: number, seed: number): number;
export declare function ridgedNoise(x: number, y: number, octaves: number, persistence: number, lacunarity: number, seed: number): number;
export declare function curlNoise(x: number, y: number, seed: number): [number, number];
export interface TextureOptions {
    size?: number;
    frequency?: number;
    octaves?: number;
    persistence?: number;
    lacunarity?: number;
    seed?: number;
    noiseType?: NoiseType;
}
export declare function generateTexture(opts?: TextureOptions): string;
//# sourceMappingURL=noise.d.ts.map