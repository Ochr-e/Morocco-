/**
 * basePath must be prefixed manually to all static asset paths when using
 * next/image with output: "export" — Next.js does NOT apply it automatically.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
