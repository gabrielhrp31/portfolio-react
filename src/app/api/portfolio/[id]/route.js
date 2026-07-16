import { NextResponse } from "next/server";
import {
  deletePortfolioItem,
  getPortfolioItem,
  updatePortfolioItem,
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

export async function GET(_request, { params }) {
  try {
    const item = await getPortfolioItem(Number(params.id));
    if (!item) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to load portfolio item" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const id = Number(params.id);
    const existing = await getPortfolioItem(id);
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const data = parseBody(await request.json());
    if (!data.name || !data.description) {
      return NextResponse.json(
        { error: "name and description are required" },
        { status: 400 }
      );
    }

    const item = await updatePortfolioItem(id, data);
    return NextResponse.json(item);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update portfolio item" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request, { params }) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const deleted = await deletePortfolioItem(Number(params.id));
    if (!deleted) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete portfolio item" },
      { status: 500 }
    );
  }
}
