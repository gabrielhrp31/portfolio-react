import { NextResponse } from "next/server";
import {
  deleteService,
  getService,
  updateService,
} from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

function parseBody(body) {
  return {
    name: String(body.name || "").trim(),
    description: String(body.description || "").trim(),
    iconKey: String(body.iconKey || "code").trim() || "code",
    sortOrder: Number(body.sortOrder || 0),
  };
}

export async function GET(_request, { params }) {
  try {
    const item = await getService(Number(params.id));
    if (!item) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to load service" },
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
    if (!(await getService(id))) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const data = parseBody(await request.json());
    if (!data.name || !data.description) {
      return NextResponse.json(
        { error: "name and description are required" },
        { status: 400 }
      );
    }
    return NextResponse.json(await updateService(id, data));
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request, { params }) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const deleted = await deleteService(Number(params.id));
    if (!deleted) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    );
  }
}
