/**
 * Draft-only UI toggles. Flip these to bring back layout comparisons
 * without digging through components.
 */
export const draftUi = {
  /** Centre-column layout switcher (route stays at /v1). */
  showV1InSwitcher: false,
} as const;

export function showDraftSwitcher(): boolean {
  return draftUi.showV1InSwitcher;
}