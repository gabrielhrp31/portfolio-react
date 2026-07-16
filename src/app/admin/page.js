import { isAuthenticated } from "@/lib/auth";
import {
  listCourses,
  listExperiences,
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
  let experiences = [];
  let courses = [];

  if (authenticated) {
    try {
      [portfolio, services, technologies, experiences, courses] =
        await Promise.all([
          listPortfolioItems(),
          listServices(),
          listTechnologies(),
          listExperiences(),
          listCourses(),
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
      initialExperiences={experiences}
      initialCourses={courses}
    />
  );
}
