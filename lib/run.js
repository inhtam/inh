const fs = require("fs/promises");
const fssync = require("fs"); // existsSync gibi sync fonksiyonlar için
const path = require("path");
const { pathToFileURL } = require("url");

const PKG_DIR = path.join(process.env.HOME || process.env.USERPROFILE, ".inh", "packages");

async function run(name) {
  const pkgPath = path.join(PKG_DIR, name);

  try {
    const pkgJsonPath = path.join(pkgPath, "package.json");

    if (!fssync.existsSync(pkgJsonPath)) {
      throw new Error(`No package.json found for package "${name}"`);
    }

    const content = await fs.readFile(pkgJsonPath, "utf8");
    const meta = JSON.parse(content);

    const entryPath = path.join(pkgPath, meta.main || "index.js");
    if (!fssync.existsSync(entryPath)) {
      throw new Error(`Entry file not found: ${entryPath}`);
    }

    const entryUrl = pathToFileURL(entryPath).href;
    await import(entryUrl);

    console.log(`✅ Package "${name}" executed successfully.`);
  } catch (err) {
    console.error(`❌ Error while running package "${name}":`, err.message);
  }
}

module.exports = run;
