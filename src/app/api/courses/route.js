import { NextResponse } from "next/server";
import { createCourse, listCourses } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

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

export async function GET() {
  try {
    return NextResponse.json(await listCourses());
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to load courses" },
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
    if (!data.title) {
      return NextResponse.json({ error: "title is required" }, { status: 400 });
    }
    return NextResponse.json(await createCourse(data), { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 }
    );
  }
}
