import { NextResponse } from "next/server";
import {
  deleteTechnology,
  getTechnology,
  updateTechnology,
} from "@/lib/db";
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

export async function GET(_request, { params }) {
  try {
    const item = await getTechnology(Number(params.id));
    if (!item) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to load technology" },
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
    if (!(await getTechnology(id))) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const data = parseBody(await request.json());
    if (!data.slug) {
      return NextResponse.json({ error: "slug is required" }, { status: 400 });
    }
    return NextResponse.json(await updateTechnology(id, data));
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update technology" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request, { params }) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const deleted = await deleteTechnology(Number(params.id));
    if (!deleted) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete technology" },
      { status: 500 }
    );
  }
}
