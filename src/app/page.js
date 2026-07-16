import HomeView from "@/views/home";
import { listPortfolioItems } from "@/lib/db";

export const dynamic = "force-dynamic";

async function getPortfolio() {
  try {
    return await listPortfolioItems();
  } catch (error) {
    console.error("Failed to load portfolio from MySQL:", error.message);
    return [];
  }
}

export default async function HomePage() {
  const portfolio = await getPortfolio();
  return <HomeView portfolio={portfolio} />;
}
