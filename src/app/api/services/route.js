import { NextResponse } from "next/server";
import { createService, listServices } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

function parseBody(body) {
  return {
    name: String(body.name || "").trim(),
    description: String(body.description || "").trim(),
    iconKey: String(body.iconKey || "code").trim() || "code",
    sortOrder: Number(body.sortOrder || 0),
  };
}

export async function GET() {
  try {
    return NextResponse.json(await listServices());
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to load services" },
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
    return NextResponse.json(await createService(data), { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}
