import { redirect } from "next/navigation";

// Redirect to /all page by default
export default function Home() {
  redirect("/all");
}
