import { isAuthenticated } from "@/lib/auth";
import { listPortfolioItems } from "@/lib/db";
import AdminClient from "./AdminClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authenticated = isAuthenticated();
  let items = [];

  if (authenticated) {
    try {
      items = await listPortfolioItems();
    } catch (error) {
      console.error(error);
    }
  }

  return <AdminClient initialAuthenticated={authenticated} initialItems={items} />;
}
