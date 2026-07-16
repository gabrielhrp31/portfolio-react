import { NextResponse } from "next/server";
import { getSiteMedia, updateSiteMedia } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

function parseBody(body) {
  return {
    label: String(body.label || "").trim(),
    url: String(body.url || "").trim(),
    altText: String(body.altText || "").trim(),
    sortOrder: Number(body.sortOrder || 0),
  };
}

export async function GET(_request, { params }) {
  try {
    const item = await getSiteMedia(Number(params.id));
    if (!item) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to load media" },
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
    const existing = await getSiteMedia(id);
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const data = parseBody(await request.json());
    if (!data.url) {
      return NextResponse.json({ error: "url is required" }, { status: 400 });
    }
    return NextResponse.json(
      await updateSiteMedia(id, {
        label: data.label || existing.label,
        url: data.url,
        altText: data.altText,
        sortOrder: data.sortOrder || existing.sortOrder,
      })
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update media" },
      { status: 500 }
    );
  }
}
