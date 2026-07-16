import { NextResponse } from "next/server";
import {
  deleteExperience,
  getExperience,
  updateExperience,
} from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

function parseBody(body) {
  return {
    company: String(body.company || "").trim(),
    position: String(body.position || "").trim(),
    period: String(body.period || "").trim(),
    location: String(body.location || "").trim(),
    description: String(body.description || "").trim(),
    sortOrder: Number(body.sortOrder || 0),
  };
}

export async function PUT(request, { params }) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const id = Number(params.id);
    if (!(await getExperience(id))) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const data = parseBody(await request.json());
    if (!data.company || !data.position) {
      return NextResponse.json(
        { error: "company and position are required" },
        { status: 400 }
      );
    }
    return NextResponse.json(await updateExperience(id, data));
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update experience" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request, { params }) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const deleted = await deleteExperience(Number(params.id));
    if (!deleted) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete experience" },
      { status: 500 }
    );
  }
}
