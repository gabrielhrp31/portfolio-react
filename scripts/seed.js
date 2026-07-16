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

// Conteúdo colado/adaptado dos dados estáticos antigos (src/data/resume/*)
const seedExperiences = [
  {
    company: "R2DA Tecnologia",
    position: "Desenvolvedor Fullstack / Suporte Técnico de Equipe",
    period: "Abril de 2021 — Atualmente",
    location: "Belo Horizonte, Minas Gerais",
    description:
      "Atuação fullstack com foco em evolução de produtos, suporte técnico à equipe e entrega de soluções alinhadas a processos e qualidade. Participação em definição de melhorias, implementação de features e acompanhamento de demandas em produção.",
    sort_order: 1,
  },
  {
    company: "Avante Soluções Digitais",
    position: "Desenvolvedor Web (Java / Laravel / React)",
    period: "Janeiro de 2020 — Maio de 2021 (1 ano e 4 meses)",
    location: "Formiga, Minas Gerais",
    description:
      "Desenvolvimento de aplicações web com Java, Laravel e React. Contribuição em projetos de sistemas internos e sites, com atenção a integrações, usabilidade e manutenção evolutiva.",
    sort_order: 2,
  },
  {
    company: "Desenvolvedor Autônomo",
    position: "Desenvolvedor Full-Stack (Laravel / Vue.js)",
    period: "Julho de 2019 — Janeiro de 2020 (7 meses)",
    location: "Remoto",
    description:
      "Projetos independentes end-to-end: levantamento de necessidades, desenvolvimento fullstack com Laravel e Vue.js, publicação e ajustes pós-entrega para clientes de pequeno e médio porte.",
    sort_order: 3,
  },
  {
    company: "Célula Web",
    position: "Estagiário",
    period: "Agosto de 2018 — Julho de 2019 (1 ano)",
    location: "Formiga, Minas Gerais",
    description:
      "Início da trajetória profissional com suporte a desenvolvimento web, aprendizado de boas práticas de equipe e participação em demandas de sites e sistemas sob orientação da equipe técnica.",
    sort_order: 4,
  },
];

const seedCourses = [
  {
    title: "Bacharelado em Ciência da Computação",
    institution: "IFMG Campus Formiga",
    period: "Desde 2018",
    location: "Formiga/MG",
    description: "Formação superior em Ciência da Computação.",
    link: "",
    kind: "formation",
    sort_order: 1,
  },
  {
    title: "Técnico em Informática",
    institution: "E. E. Dona Berenice de Magalhães Pinto",
    period: "2016 — 2017",
    location: "Arcos/MG",
    description:
      "Desenvolvimento de um app de conclusão de curso semelhante ao iFood.",
    link: "",
    kind: "formation",
    sort_order: 2,
  },
  {
    title: "SPA com Vue.js e API com Laravel",
    institution: "Udemy",
    period: "Emitido em Agosto de 2019",
    location: "",
    description:
      "API e frontend para uma rede social utilizando Laravel e Vue.js.",
    link: "https://www.udemy.com/certificate/UC-U8OI07IB/",
    kind: "certificate",
    sort_order: 3,
  },
  {
    title: "Django 2.x com Deploy no Heroku",
    institution: "Udemy",
    period: "Emitido em Maio de 2019",
    location: "",
    description:
      "Aplicação de gerenciamento de serviços com deploy no Heroku, usada também em disciplina de Engenharia de Software.",
    link: "https://www.udemy.com/certificate/UC-34E554C9/",
    kind: "certificate",
    sort_order: 4,
  },
  {
    title: "Desenvolvedor Android",
    institution: "Udemy",
    period: "Emitido em Maio de 2019",
    location: "",
    description: "Formação em desenvolvimento Android.",
    link: "https://www.udemy.com/certificate/UC-4UF5MYQ8/",
    kind: "certificate",
    sort_order: 5,
  },
  {
    title: "Desenvolvedor Multiplataforma (Android/iOS) com React e Redux",
    institution: "Udemy",
    period: "Emitido em Abril de 2019",
    location: "",
    description: "Apps multiplataforma com React e Redux.",
    link: "http://ude.my/UC-A41BCURF",
    kind: "certificate",
    sort_order: 6,
  },
  {
    title: "JAVA Tutorial Course",
    institution: "SoloLearn",
    period: "Emitido em Junho de 2019",
    location: "",
    description: "Fundamentos de Java.",
    link: "https://www.sololearn.com/Certificate/1068-5716533/pdf",
    kind: "certificate",
    sort_order: 7,
  },
  {
    title: "Flutter e Dart - Curso Completo de Criação de Apps",
    institution: "Udemy",
    period: "Emitido em Fevereiro de 2022",
    location: "",
    description: "Criação de apps com Flutter e Dart.",
    link: "https://www.udemy.com/certificate/UC-f32c3362-d305-46aa-90c6-3a398991e47c/",
    kind: "certificate",
    sort_order: 8,
  },
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

  await seedTable(
    connection,
    "experiences",
    "SELECT COUNT(*) AS total FROM experiences",
    async (item) => {
      await connection.query(
        `INSERT INTO experiences
          (company, position, period, location, description, sort_order)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          item.company,
          item.position,
          item.period,
          item.location,
          item.description,
          item.sort_order,
        ]
      );
    },
    seedExperiences,
    "experiences"
  );

  await seedTable(
    connection,
    "courses",
    "SELECT COUNT(*) AS total FROM courses",
    async (item) => {
      await connection.query(
        `INSERT INTO courses
          (title, institution, period, location, description, link, kind, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          item.title,
          item.institution,
          item.period,
          item.location,
          item.description,
          item.link,
          item.kind,
          item.sort_order,
        ]
      );
    },
    seedCourses,
    "courses"
  );

  await connection.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
