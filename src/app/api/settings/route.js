import { NextResponse } from "next/server";
import { listSiteSettings, upsertSiteSettingByKey } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import { DEFAULT_SETTINGS, buildSettingsMap } from "@/lib/settings";

export async function GET() {
  try {
    const rows = await listSiteSettings();
    const map = buildSettingsMap(rows);
    return NextResponse.json(
      Object.values(map).sort((a, b) => a.sortOrder - b.sortOrder)
    );
  } catch (error) {
    console.error(error);
    const map = buildSettingsMap([]);
    return NextResponse.json(
      Object.values(map).sort((a, b) => a.sortOrder - b.sortOrder)
    );
  }
}

export async function POST(request) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const key = String(body.key || "").trim();
    if (!key || !DEFAULT_SETTINGS[key]) {
      return NextResponse.json(
        { error: "Invalid setting key" },
        { status: 400 }
      );
    }
    const defaults = DEFAULT_SETTINGS[key];
    const item = await upsertSiteSettingByKey({
      key,
      label: String(body.label || defaults.label).trim(),
      group: String(body.group || defaults.group).trim(),
      value: String(body.value ?? defaults.value),
      sortOrder: Number(body.sortOrder ?? defaults.sortOrder),
    });
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to upsert setting" },
      { status: 500 }
    );
  }
}
