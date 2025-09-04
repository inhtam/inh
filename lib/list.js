const fs = require("fs");
const path = require("path");

const PKG_DIR = path.join(process.env.HOME || process.env.USERPROFILE, ".inh", "packages");

function listPackages() {
  if (!fs.existsSync(PKG_DIR)) {
    return console.log("📂 No packages installed.");
  }

  const dirs = fs.readdirSync(PKG_DIR);
  if (dirs.length === 0) return console.log("📦 No installed packages found.");

  console.log("📦 Installed Packages:");
  dirs.forEach((pkg) => {
    const metaPath = path.join(PKG_DIR, pkg, "package.json");
    if (fs.existsSync(metaPath)) {
      const meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
      if (meta.inh) {
        console.log(`- ${meta.name} (${meta.version})`);
      }
    } else {
      console.log(`- ${pkg} (missing metadata)`);
    }
  });
}

module.exports = listPackages;
