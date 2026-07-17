import { NextResponse } from "next/server";
import { getSiteSetting, updateSiteSetting } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

function parseBody(body) {
  return {
    label: String(body.label || "").trim(),
    group: String(body.group || "geral").trim(),
    value: String(body.value ?? ""),
    sortOrder: Number(body.sortOrder || 0),
  };
}

export async function GET(_request, { params }) {
  try {
    const item = await getSiteSetting(Number(params.id));
    if (!item) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to load setting" },
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
    const existing = await getSiteSetting(id);
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const data = parseBody(await request.json());
    return NextResponse.json(
      await updateSiteSetting(id, {
        label: data.label || existing.label,
        group: data.group || existing.group,
        value: data.value,
        sortOrder: data.sortOrder || existing.sortOrder,
      })
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update setting" },
      { status: 500 }
    );
  }
}
