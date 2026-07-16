import { NextResponse } from "next/server";
import {
  createPortfolioItem,
  listPortfolioItems,
} from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

function parseBody(body) {
  const technologies =
    typeof body.technologies === "string"
      ? body.technologies
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : Array.isArray(body.technologies)
        ? body.technologies
        : [];

  return {
    name: String(body.name || "").trim(),
    description: String(body.description || "").trim(),
    image: String(body.image || "").trim(),
    technologies,
    urlDemo: String(body.urlDemo || "").trim(),
    urlGithub: String(body.urlGithub || "").trim(),
    user: String(body.user || "").trim(),
    password: String(body.password || "").trim(),
    roles: String(body.roles || "").trim(),
    sortOrder: Number(body.sortOrder || 0),
  };
}

export async function GET() {
  try {
    const items = await listPortfolioItems();
    return NextResponse.json(items);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to load portfolio items" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = parseBody(await request.json());
    if (!data.name || !data.description) {
      return NextResponse.json(
        { error: "name and description are required" },
        { status: 400 }
      );
    }
    const item = await createPortfolioItem(data);
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create portfolio item" },
      { status: 500 }
    );
  }
}
