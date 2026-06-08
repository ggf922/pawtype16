// Root page is unused — middleware redirects "/" to "/{locale}"
// Kept as a safety fallback in case middleware is bypassed.
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/ko");
}
