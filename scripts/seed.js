/* eslint-disable no-console */
const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

async function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;
  const content = fs.readFileSync(envPath, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx);
    const value = trimmed.slice(idx + 1);
    if (!process.env[key]) process.env[key] = value;
  }
}

const seedItems = [
  {
    name: "Portfólio",
    description: "Este próprio site...",
    image: "/assets/images/portfolio.jpg",
    technologies: ["react", "javascript", "css3"],
    url_demo: "#",
    url_github: "https://github.com/gabrielhrp31/portfolio-react",
    demo_user: "",
    demo_password: "",
    roles: "",
    sort_order: 1,
  },
  {
    name: "Proxy",
    description:
      "Em breve o portfolio da PROXY idealizada pelo meu grande amigo @yan_maximiano",
    image: "/assets/images/proxy.jpg",
    technologies: ["php", "wordpress", "html5", "javascript", "css3"],
    url_demo: "https://proxy.gabrielhrp.com",
    url_github: "https://github.com/gabrielhrp31/portfolio-react",
    demo_user: "",
    demo_password: "",
    roles: "",
    sort_order: 2,
  },
];

async function main() {
  await loadEnvLocal();

  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST || "127.0.0.1",
    port: Number(process.env.DATABASE_PORT || 3306),
    user: process.env.DATABASE_USER || "portfolio",
    password: process.env.DATABASE_PASSWORD || "portfolio",
    database: process.env.DATABASE_NAME || "portfolio",
    multipleStatements: true,
  });

  const schema = fs.readFileSync(
    path.join(__dirname, "schema.sql"),
    "utf8"
  );
  await connection.query(schema);

  const [rows] = await connection.query(
    "SELECT COUNT(*) AS total FROM portfolio_items"
  );
  if (rows[0].total > 0) {
    console.log(`Seed skipped: ${rows[0].total} item(s) already exist.`);
    await connection.end();
    return;
  }

  for (const item of seedItems) {
    await connection.query(
      `INSERT INTO portfolio_items
        (name, description, image, technologies, url_demo, url_github, demo_user, demo_password, roles, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        item.name,
        item.description,
        item.image,
        JSON.stringify(item.technologies),
        item.url_demo,
        item.url_github,
        item.demo_user,
        item.demo_password,
        item.roles,
        item.sort_order,
      ]
    );
  }

  console.log(`Seeded ${seedItems.length} portfolio items.`);
  await connection.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
