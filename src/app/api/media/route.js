import { NextResponse } from "next/server";
import { listSiteMedia, upsertSiteMediaByKey } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import { DEFAULT_MEDIA, buildMediaMap } from "@/lib/media";

export async function GET() {
  try {
    const rows = await listSiteMedia();
    const map = buildMediaMap(rows);
    return NextResponse.json(Object.values(map).sort((a, b) => a.sortOrder - b.sortOrder));
  } catch (error) {
    console.error(error);
    // Fallback so the site still renders with defaults if MySQL is down.
    const map = buildMediaMap([]);
    return NextResponse.json(Object.values(map).sort((a, b) => a.sortOrder - b.sortOrder));
  }
}

export async function POST(request) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const key = String(body.key || "").trim();
    if (!key || !DEFAULT_MEDIA[key]) {
      return NextResponse.json(
        { error: "Invalid media key" },
        { status: 400 }
      );
    }
    const defaults = DEFAULT_MEDIA[key];
    const item = await upsertSiteMediaByKey({
      key,
      label: String(body.label || defaults.label).trim(),
      url: String(body.url || defaults.url).trim(),
      altText: String(body.altText ?? defaults.altText).trim(),
      sortOrder: Number(body.sortOrder ?? defaults.sortOrder),
    });
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to upsert media" },
      { status: 500 }
    );
  }
}
