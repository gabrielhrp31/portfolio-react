import { NextResponse } from "next/server";
import { deleteCourse, getCourse, updateCourse } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import { revalidateHome } from "@/lib/revalidateHome";

function parseBody(body) {
  return {
    title: String(body.title || "").trim(),
    institution: String(body.institution || "").trim(),
    period: String(body.period || "").trim(),
    location: String(body.location || "").trim(),
    description: String(body.description || "").trim(),
    link: String(body.link || "").trim(),
    kind: String(body.kind || "course").trim() || "course",
    sortOrder: Number(body.sortOrder || 0),
  };
}

export async function PUT(request, { params }) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const id = Number(params.id);
    if (!(await getCourse(id))) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const data = parseBody(await request.json());
    if (!data.title) {
      return NextResponse.json({ error: "title is required" }, { status: 400 });
    }
    const item = await updateCourse(id, data);
    revalidateHome();
    return NextResponse.json(item);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update course" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request, { params }) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const deleted = await deleteCourse(Number(params.id));
    if (!deleted) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    revalidateHome();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete course" },
      { status: 500 }
    );
  }
}
