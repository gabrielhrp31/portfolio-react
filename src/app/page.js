import HomeView from "@/views/home";
import {
  listCourses,
  listExperiences,
  listPortfolioItems,
  listServices,
  listSiteMedia,
  listTechnologies,
} from "@/lib/db";
import { buildMediaMap } from "@/lib/media";

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
  const [portfolio, services, technologies, experiences, courses, mediaRows] =
    await Promise.all([
      safeList(listPortfolioItems, "portfolio"),
      safeList(listServices, "services"),
      safeList(listTechnologies, "technologies"),
      safeList(listExperiences, "experiences"),
      safeList(listCourses, "courses"),
      safeList(listSiteMedia, "media"),
    ]);

  return (
    <HomeView
      portfolio={portfolio}
      services={services}
      technologies={technologies}
      experiences={experiences}
      courses={courses}
      media={buildMediaMap(mediaRows)}
    />
  );
}
