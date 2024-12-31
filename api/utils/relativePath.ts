import { dirname, fromFileUrl, join } from "https://deno.land/std/path/mod.ts";

/**
 * @example `relativePath("../myfile.ts")`
 */
export const relativePath = (currentUrl: string, relPath: string): string => {
  const currentDir = dirname(fromFileUrl(currentUrl));
  return join(currentDir, relPath);
};
