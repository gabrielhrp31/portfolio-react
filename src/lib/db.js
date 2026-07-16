import mysql from "mysql2/promise";

let pool;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DATABASE_HOST || "127.0.0.1",
      port: Number(process.env.DATABASE_PORT || 3306),
      user: process.env.DATABASE_USER || "portfolio",
      password: process.env.DATABASE_PASSWORD || "portfolio",
      database: process.env.DATABASE_NAME || "portfolio",
      waitForConnections: true,
      connectionLimit: 10,
    });
  }
  return pool;
}

export function mapPortfolioRow(row) {
  let technologies = row.technologies;
  if (typeof technologies === "string") {
    try {
      technologies = JSON.parse(technologies);
    } catch {
      technologies = [];
    }
  }

  return {
    id: row.id,
    name: row.name,
    description: row.description,
    image: row.image,
    technologies: Array.isArray(technologies) ? technologies : [],
    urlDemo: row.url_demo || "",
    urlGithub: row.url_github || "",
    user: row.demo_user || "",
    password: row.demo_password || "",
    roles: row.roles || "",
    sortOrder: row.sort_order,
  };
}

export function mapServiceRow(row) {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    iconKey: row.icon_key || "code",
    sortOrder: row.sort_order,
  };
}

export function mapTechnologyRow(row) {
  return {
    id: row.id,
    slug: row.slug,
    label: row.label || row.slug,
    sortOrder: row.sort_order,
  };
}

export async function listPortfolioItems() {
  const [rows] = await getPool().query(
    "SELECT * FROM portfolio_items ORDER BY sort_order ASC, id ASC"
  );
  return rows.map(mapPortfolioRow);
}

export async function getPortfolioItem(id) {
  const [rows] = await getPool().query(
    "SELECT * FROM portfolio_items WHERE id = ?",
    [id]
  );
  return rows[0] ? mapPortfolioRow(rows[0]) : null;
}

export async function createPortfolioItem(data) {
  const [result] = await getPool().query(
    `INSERT INTO portfolio_items
      (name, description, image, technologies, url_demo, url_github, demo_user, demo_password, roles, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.name,
      data.description,
      data.image || "",
      JSON.stringify(data.technologies || []),
      data.urlDemo || "",
      data.urlGithub || "",
      data.user || "",
      data.password || "",
      data.roles || "",
      data.sortOrder ?? 0,
    ]
  );
  return getPortfolioItem(result.insertId);
}

export async function updatePortfolioItem(id, data) {
  await getPool().query(
    `UPDATE portfolio_items SET
      name = ?,
      description = ?,
      image = ?,
      technologies = ?,
      url_demo = ?,
      url_github = ?,
      demo_user = ?,
      demo_password = ?,
      roles = ?,
      sort_order = ?
     WHERE id = ?`,
    [
      data.name,
      data.description,
      data.image || "",
      JSON.stringify(data.technologies || []),
      data.urlDemo || "",
      data.urlGithub || "",
      data.user || "",
      data.password || "",
      data.roles || "",
      data.sortOrder ?? 0,
      id,
    ]
  );
  return getPortfolioItem(id);
}

export async function deletePortfolioItem(id) {
  const [result] = await getPool().query(
    "DELETE FROM portfolio_items WHERE id = ?",
    [id]
  );
  return result.affectedRows > 0;
}

export async function listServices() {
  const [rows] = await getPool().query(
    "SELECT * FROM services ORDER BY sort_order ASC, id ASC"
  );
  return rows.map(mapServiceRow);
}

export async function getService(id) {
  const [rows] = await getPool().query("SELECT * FROM services WHERE id = ?", [
    id,
  ]);
  return rows[0] ? mapServiceRow(rows[0]) : null;
}

export async function createService(data) {
  const [result] = await getPool().query(
    `INSERT INTO services (name, description, icon_key, sort_order)
     VALUES (?, ?, ?, ?)`,
    [
      data.name,
      data.description,
      data.iconKey || "code",
      data.sortOrder ?? 0,
    ]
  );
  return getService(result.insertId);
}

export async function updateService(id, data) {
  await getPool().query(
    `UPDATE services SET
      name = ?,
      description = ?,
      icon_key = ?,
      sort_order = ?
     WHERE id = ?`,
    [
      data.name,
      data.description,
      data.iconKey || "code",
      data.sortOrder ?? 0,
      id,
    ]
  );
  return getService(id);
}

export async function deleteService(id) {
  const [result] = await getPool().query("DELETE FROM services WHERE id = ?", [
    id,
  ]);
  return result.affectedRows > 0;
}

export async function listTechnologies() {
  const [rows] = await getPool().query(
    "SELECT * FROM technologies ORDER BY sort_order ASC, id ASC"
  );
  return rows.map(mapTechnologyRow);
}

export async function getTechnology(id) {
  const [rows] = await getPool().query(
    "SELECT * FROM technologies WHERE id = ?",
    [id]
  );
  return rows[0] ? mapTechnologyRow(rows[0]) : null;
}

export async function createTechnology(data) {
  const [result] = await getPool().query(
    `INSERT INTO technologies (slug, label, sort_order)
     VALUES (?, ?, ?)`,
    [data.slug, data.label || data.slug, data.sortOrder ?? 0]
  );
  return getTechnology(result.insertId);
}

export async function updateTechnology(id, data) {
  await getPool().query(
    `UPDATE technologies SET
      slug = ?,
      label = ?,
      sort_order = ?
     WHERE id = ?`,
    [data.slug, data.label || data.slug, data.sortOrder ?? 0, id]
  );
  return getTechnology(id);
}

export async function deleteTechnology(id) {
  const [result] = await getPool().query(
    "DELETE FROM technologies WHERE id = ?",
    [id]
  );
  return result.affectedRows > 0;
}
