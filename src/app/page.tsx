// Root page — next-intl middleware redirects to default locale (/fr)
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/fr");
}
