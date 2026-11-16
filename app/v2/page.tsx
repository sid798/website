import { redirect } from "next/navigation";

/** Bookmarks to /v2 resolve to the home layout. */
export default function V2() {
  redirect("/");
}