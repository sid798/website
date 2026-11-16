import { defaultFont, visibleFonts } from "@/lib/draft-ui";

/** Fonts under test; each id needs a matching `html[data-font]` block in globals.css. */
export const fonts = visibleFonts();
export const fontKey = "font:v1";
export { defaultFont };
