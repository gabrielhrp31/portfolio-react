import { isAuthenticated } from "@/lib/auth";
import {
  listCourses,
  listExperiences,
  listPortfolioItems,
  listQuoteRequests,
  listServices,
  listSiteMedia,
  listSiteSettings,
  listTechnologies,
} from "@/lib/db";
import { buildMediaMap } from "@/lib/media";
import { buildSettingsMap } from "@/lib/settings";
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
  let quotes = [];
  let settings = [];

  if (authenticated) {
    try {
      [
        portfolio,
        services,
        technologies,
        experiences,
        courses,
        media,
        quotes,
        settings,
      ] = await Promise.all([
        listPortfolioItems(),
        listServices(),
        listTechnologies(),
        listExperiences(),
        listCourses(),
        listSiteMedia(),
        listQuoteRequests(),
        listSiteSettings(),
      ]);
      media = Object.values(buildMediaMap(media)).sort(
        (a, b) => a.sortOrder - b.sortOrder
      );
      settings = Object.values(buildSettingsMap(settings)).sort(
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
      initialQuotes={quotes}
      initialSettings={settings}
    />
  );
}
