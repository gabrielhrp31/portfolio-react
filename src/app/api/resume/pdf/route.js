import { NextResponse } from "next/server";
import { listCourses, listExperiences, listSiteSettings } from "@/lib/db";
import { buildSettingsMap } from "@/lib/settings";
import { buildResumePdf } from "@/lib/buildResumePdf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function slugifyFilename(name) {
  return (
    String(name || "curriculo")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w.\-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .toLowerCase() || "curriculo"
  );
}

export async function GET() {
  try {
    const [experiences, courses, settingRows] = await Promise.all([
      listExperiences(),
      listCourses(),
      listSiteSettings(),
    ]);
    const settings = buildSettingsMap(settingRows);
    const pdf = await buildResumePdf({ settings, experiences, courses });
    const fullName =
      settings.about_name?.value ||
      settings.hero_name?.value ||
      "curriculo";
    const filename = `curriculo-${slugifyFilename(fullName)}.pdf`;

    return new NextResponse(pdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Failed to generate resume PDF:", error);
    return NextResponse.json(
      { error: "Falha ao gerar currículo em PDF" },
      { status: 500 }
    );
  }
}
