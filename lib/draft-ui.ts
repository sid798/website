/**
 * Draft-only UI toggles. Flip these to bring back layout/font comparisons
 * without digging through components.
 */
export const draftUi = {
  /** Centre-column layout switcher (route stays at /v1). */
  showV1InSwitcher: false,
  /** Geist (f1) in the font switcher. */
  showF1: false,
} as const;

/** Fonts shown in the bottom switcher. */
export function visibleFonts(): ("f1" | "f2")[] {
  const all: ("f1" | "f2")[] = ["f1", "f2"];
  return all.filter((f) => f !== "f1" || draftUi.showF1);
}

export const defaultFont = draftUi.showF1 ? "f1" : "f2";

export function showDraftSwitcher(): boolean {
  const fonts = visibleFonts();
  return draftUi.showV1InSwitcher || fonts.length > 1;
}