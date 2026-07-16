const { test } = require("node:test");
const assert = require("node:assert/strict");

function mapPortfolioRow(row) {
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

test("mapPortfolioRow normalizes MySQL portfolio rows", () => {
  const mapped = mapPortfolioRow({
    id: 1,
    name: "Portfólio",
    description: "Site pessoal",
    image: "/assets/images/portfolio.jpg",
    technologies: '["react","javascript"]',
    url_demo: "#",
    url_github: "https://github.com/example",
    demo_user: "",
    demo_password: "",
    roles: "",
    sort_order: 1,
  });

  assert.equal(mapped.name, "Portfólio");
  assert.deepEqual(mapped.technologies, ["react", "javascript"]);
  assert.equal(mapped.urlDemo, "#");
  assert.equal(mapped.urlGithub, "https://github.com/example");
});
