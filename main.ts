// News Image 21 November 2026 — entry program.
//
// The front page (entry.png) is drawn in advance: a newspaper front page
// summing up the world's news of Saturday 21 November 2026. This program
// copies it to /output/entry.png, byte for byte, so two runs always
// produce identical output. No network, no randomness, no input.
// After copying it verifies the output: the byte size must match the
// source, and the PNG header must declare 1024x1024, so a truncated or
// corrupt copy fails loudly instead of passing silently.

import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const target = "/output/entry.png";

mkdirSync("/output", { recursive: true });
copyFileSync(source, target);

// Verify: same byte size as the source, and a 1024x1024 PNG header.
const sourceSize = statSync(source).size;
const targetSize = statSync(target).size;
if (targetSize !== sourceSize) {
  throw new Error(`size mismatch: copied ${targetSize} bytes, source is ${sourceSize}`);
}
const header = readFileSync(target).subarray(0, 24);
const width = header.readUInt32BE(16);
const height = header.readUInt32BE(20);
if (width !== 1024 || height !== 1024) {
  throw new Error(`bad dimensions: ${width}x${height}, expected 1024x1024`);
}
console.log(`wrote ${target} (${targetSize} bytes, ${width}x${height})`);
