import { isAuthenticated } from "@/lib/auth";
import {
  listPortfolioItems,
  listServices,
  listTechnologies,
} from "@/lib/db";
import AdminClient from "./AdminClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authenticated = isAuthenticated();
  let portfolio = [];
  let services = [];
  let technologies = [];

  if (authenticated) {
    try {
      [portfolio, services, technologies] = await Promise.all([
        listPortfolioItems(),
        listServices(),
        listTechnologies(),
      ]);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AdminClient
      initialAuthenticated={authenticated}
      initialPortfolio={portfolio}
      initialServices={services}
      initialTechnologies={technologies}
    />
  );
}
