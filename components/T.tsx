import type { ReactNode } from "react";

/**
 * Bilingual text pair. CSS shows exactly one span depending on
 * html[data-lang]; both are always in the DOM so switching is instant
 * and requires no re-render.
 */
export default function T({ uz, ru }: { uz: ReactNode; ru: ReactNode }) {
  return (
    <>
      <span data-uz>{uz}</span>
      <span data-ru>{ru}</span>
    </>
  );
}
