// News Image 21 November 2026 — entry program.
//
// The front page (entry.png) is drawn in advance: a newspaper front page
// summing up the world's news of Saturday 21 November 2026. This program
// copies it to /output/entry.png, byte for byte, so two runs always
// produce identical output. No network, no randomness, no input.

import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

mkdirSync("/output", { recursive: true });
copyFileSync(join(here, "entry.png"), "/output/entry.png");
console.log("wrote /output/entry.png");
