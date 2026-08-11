import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

const KIND_LABELS = {
  formation: "Formação",
  course: "Cursos",
  certificate: "Certificações",
};

const KIND_ORDER = ["formation", "course", "certificate"];

function fontPaths() {
  const base = path.join(process.cwd(), "public", "fonts");
  return {
    regular: path.join(base, "DejaVuSans.ttf"),
    bold: path.join(base, "DejaVuSans-Bold.ttf"),
  };
}

function ensureFonts() {
  const fonts = fontPaths();
  if (!fs.existsSync(fonts.regular) || !fs.existsSync(fonts.bold)) {
    throw new Error(
      "Fontes DejaVu ausentes em public/fonts (DejaVuSans.ttf / DejaVuSans-Bold.ttf)."
    );
  }
  return fonts;
}

function clean(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim();
}

function metaLine(...parts) {
  return parts.map(clean).filter(Boolean).join(" · ");
}

function groupCourses(courses = []) {
  const groups = {
    formation: [],
    course: [],
    certificate: [],
  };
  for (const item of courses) {
    const kind = KIND_ORDER.includes(item.kind) ? item.kind : "course";
    groups[kind].push(item);
  }
  return groups;
}

function writeSectionTitle(doc, title) {
  doc.moveDown(0.8);
  doc
    .font("Bold")
    .fontSize(13)
    .fillColor("#1a7a3a")
    .text(title, { underline: false });
  doc
    .moveTo(doc.page.margins.left, doc.y + 2)
    .lineTo(doc.page.width - doc.page.margins.right, doc.y + 2)
    .strokeColor("#48c558")
    .lineWidth(1.2)
    .stroke();
  doc.moveDown(0.55);
  doc.fillColor("#1a1a1a");
}

function writeEntry(doc, { title, subtitle, body }) {
  doc.font("Bold").fontSize(11).fillColor("#111111").text(title);
  if (subtitle) {
    doc.font("Regular").fontSize(9.5).fillColor("#555555").text(subtitle);
  }
  if (body) {
    doc
      .moveDown(0.15)
      .font("Regular")
      .fontSize(9.5)
      .fillColor("#222222")
      .text(body, { align: "justify", lineGap: 1.5 });
  }
  doc.moveDown(0.45);
}

/**
 * Build a curriculum PDF buffer from portfolio data.
 * @param {{
 *   settings: Record<string, { value?: string }>,
 *   experiences: Array<object>,
 *   courses: Array<object>,
 * }} data
 * @returns {Promise<Buffer>}
 */
export function buildResumePdf({ settings, experiences = [], courses = [] }) {
  ensureFonts();
  const fonts = fontPaths();

  const get = (key, fallback = "") => {
    const v = settings?.[key]?.value;
    if (v !== undefined && v !== null && String(v).length > 0) return String(v);
    return fallback;
  };

  const name = get("about_name") || get("hero_name") || "Currículo";
  const location = get("about_location");
  const english = get("about_english");
  const email = get("social_email");
  const linkedin = get("social_linkedin");
  const github = get("social_github");
  const phone = get("social_whatsapp_phone").replace(/\D/g, "");
  const about = get("about_topic_me_text");

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margins: { top: 48, bottom: 48, left: 48, right: 48 },
      info: {
        Title: `Currículo — ${name}`,
        Author: name,
        Subject: "Currículo",
      },
    });

    const chunks = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    doc.registerFont("Regular", fonts.regular);
    doc.registerFont("Bold", fonts.bold);

    // Header
    doc.font("Bold").fontSize(20).fillColor("#0f1b12").text(name);

    const contactBits = [
      location,
      email,
      phone ? `+${phone}` : "",
      linkedin,
      github,
      english,
    ].filter(Boolean);

    if (contactBits.length) {
      doc
        .moveDown(0.25)
        .font("Regular")
        .fontSize(9)
        .fillColor("#555555")
        .text(contactBits.join("  ·  "), { lineGap: 2 });
    }

    if (about) {
      writeSectionTitle(doc, "Sobre");
      doc
        .font("Regular")
        .fontSize(9.5)
        .fillColor("#222222")
        .text(about, { align: "justify", lineGap: 1.5 });
    }

    if (experiences.length) {
      writeSectionTitle(doc, "Experiência");
      for (const item of experiences) {
        const title = [clean(item.position), clean(item.company)]
          .filter(Boolean)
          .join(" — ");
        writeEntry(doc, {
          title: title || "Experiência",
          subtitle: metaLine(item.period, item.location),
          body: clean(item.description),
        });
      }
    }

    const grouped = groupCourses(courses);
    for (const kind of KIND_ORDER) {
      const items = grouped[kind];
      if (!items.length) continue;
      writeSectionTitle(doc, KIND_LABELS[kind]);
      for (const item of items) {
        const title = [clean(item.title), clean(item.institution)]
          .filter(Boolean)
          .join(" — ");
        writeEntry(doc, {
          title: title || KIND_LABELS[kind],
          subtitle: metaLine(item.period, item.location),
          body: clean(item.description),
        });
      }
    }

    doc.end();
  });
}
