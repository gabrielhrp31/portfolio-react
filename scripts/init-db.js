/* eslint-disable no-console */
const { spawnSync } = require("child_process");
const path = require("path");

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    ...options,
  });
  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

console.log("Starting MySQL via Docker Compose...");
run("docker", ["compose", "up", "-d"], { cwd: process.cwd() });

console.log("Waiting for MySQL to become ready...");
const maxAttempts = 40;
for (let i = 1; i <= maxAttempts; i += 1) {
  const ping = spawnSync(
    "docker",
    [
      "compose",
      "exec",
      "-T",
      "mysql",
      "mysqladmin",
      "ping",
      "-h",
      "localhost",
      "-uroot",
      "-proot",
      "--silent",
    ],
    { cwd: process.cwd(), stdio: "ignore" }
  );
  if (ping.status === 0) break;
  if (i === maxAttempts) {
    console.error("MySQL did not become ready in time.");
    process.exit(1);
  }
  spawnSync("sleep", ["2"]);
}

console.log("Seeding database...");
run("node", [path.join("scripts", "seed.js")], { cwd: process.cwd() });
console.log("Database ready.");
