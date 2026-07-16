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

const seedPortfolio = [
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

const seedServices = [
  {
    name: "Web",
    description:
      "Desenvolvimento de sistemas em nuvem e sites ambos responsivos",
    icon_key: "code",
    sort_order: 1,
  },
  {
    name: "Mobile",
    description: "Desenvolvimento de aplicações android",
    icon_key: "mobile",
    sort_order: 2,
  },
  {
    name: "API's",
    description: "Desenvolvimentos de serviços para aplicações através de API’s",
    icon_key: "server",
    sort_order: 3,
  },
];

const seedTechnologies = [
  { slug: "react", label: "React", sort_order: 1 },
  { slug: "vuejs", label: "Vue.js", sort_order: 2 },
  { slug: "spring", label: "Spring", sort_order: 3 },
  { slug: "laravel", label: "Laravel", sort_order: 4 },
  { slug: "django", label: "Django", sort_order: 5 },
  { slug: "html5", label: "HTML5", sort_order: 6 },
  { slug: "css3", label: "CSS3", sort_order: 7 },
  { slug: "javascript", label: "JavaScript", sort_order: 8 },
];

async function seedTable(connection, table, countSql, insertFn, items, label) {
  const [rows] = await connection.query(countSql);
  if (rows[0].total > 0) {
    console.log(`Seed skipped for ${label}: ${rows[0].total} row(s) already exist.`);
    return;
  }
  for (const item of items) {
    await insertFn(item);
  }
  console.log(`Seeded ${items.length} ${label}.`);
}

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

  const schema = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8");
  await connection.query(schema);

  await seedTable(
    connection,
    "portfolio_items",
    "SELECT COUNT(*) AS total FROM portfolio_items",
    async (item) => {
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
    },
    seedPortfolio,
    "portfolio items"
  );

  await seedTable(
    connection,
    "services",
    "SELECT COUNT(*) AS total FROM services",
    async (item) => {
      await connection.query(
        `INSERT INTO services (name, description, icon_key, sort_order)
         VALUES (?, ?, ?, ?)`,
        [item.name, item.description, item.icon_key, item.sort_order]
      );
    },
    seedServices,
    "services"
  );

  await seedTable(
    connection,
    "technologies",
    "SELECT COUNT(*) AS total FROM technologies",
    async (item) => {
      await connection.query(
        `INSERT INTO technologies (slug, label, sort_order)
         VALUES (?, ?, ?)`,
        [item.slug, item.label, item.sort_order]
      );
    },
    seedTechnologies,
    "technologies"
  );

  await connection.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
