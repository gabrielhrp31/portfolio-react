import { NextResponse } from "next/server";
import { createExperience, listExperiences } from "@/lib/db";
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

export async function GET() {
  try {
    return NextResponse.json(await listExperiences());
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to load experiences" },
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
    if (!data.company || !data.position) {
      return NextResponse.json(
        { error: "company and position are required" },
        { status: 400 }
      );
    }
    return NextResponse.json(await createExperience(data), { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create experience" },
      { status: 500 }
    );
  }
}
