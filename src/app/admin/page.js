import { isAuthenticated } from "@/lib/auth";
import {
  listCourses,
  listExperiences,
  listPortfolioItems,
  listServices,
  listSiteMedia,
  listTechnologies,
} from "@/lib/db";
import { buildMediaMap } from "@/lib/media";
import AdminClient from "./AdminClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authenticated = isAuthenticated();
  let portfolio = [];
  let services = [];
  let technologies = [];
  let experiences = [];
  let courses = [];
  let media = [];

  if (authenticated) {
    try {
      [portfolio, services, technologies, experiences, courses, media] =
        await Promise.all([
          listPortfolioItems(),
          listServices(),
          listTechnologies(),
          listExperiences(),
          listCourses(),
          listSiteMedia(),
        ]);
      media = Object.values(buildMediaMap(media)).sort(
        (a, b) => a.sortOrder - b.sortOrder
      );
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
      initialExperiences={experiences}
      initialCourses={courses}
      initialMedia={media}
    />
  );
}
