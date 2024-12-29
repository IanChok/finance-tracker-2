import { dirname, fromFileUrl, resolve } from "https://deno.land/std/path/mod.ts";

// Get the project root directory (assuming this file is at the root level)
export const PROJECT_ROOT = resolve(dirname(fromFileUrl(import.meta.url)), "../..");
