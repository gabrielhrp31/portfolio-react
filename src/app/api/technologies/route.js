import { NextResponse } from "next/server";
import { createTechnology, listTechnologies } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

function parseBody(body) {
  const slug = String(body.slug || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9+-]/g, "");
  return {
    slug,
    label: String(body.label || slug).trim(),
    sortOrder: Number(body.sortOrder || 0),
  };
}

export async function GET() {
  try {
    return NextResponse.json(await listTechnologies());
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to load technologies" },
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
    if (!data.slug) {
      return NextResponse.json({ error: "slug is required" }, { status: 400 });
    }
    return NextResponse.json(await createTechnology(data), { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create technology" },
      { status: 500 }
    );
  }
}
