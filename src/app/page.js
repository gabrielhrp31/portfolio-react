import HomeView from "@/views/home";
import {
  listCourses,
  listExperiences,
  listPortfolioItems,
  listServices,
  listTechnologies,
} from "@/lib/db";

export const dynamic = "force-dynamic";

async function safeList(loader, label) {
  try {
    return await loader();
  } catch (error) {
    console.error(`Failed to load ${label} from MySQL:`, error.message);
    return [];
  }
}

export default async function HomePage() {
  const [portfolio, services, technologies, experiences, courses] =
    await Promise.all([
      safeList(listPortfolioItems, "portfolio"),
      safeList(listServices, "services"),
      safeList(listTechnologies, "technologies"),
      safeList(listExperiences, "experiences"),
      safeList(listCourses, "courses"),
    ]);

  return (
    <HomeView
      portfolio={portfolio}
      services={services}
      technologies={technologies}
      experiences={experiences}
      courses={courses}
    />
  );
}
