const fs = require("fs");
const path = require("path");

const PKG_DIR = path.join(process.env.HOME || process.env.USERPROFILE, ".inh", "packages");

module.exports = function uninstall(name) {
  const target = path.join(PKG_DIR, name);

  if (fs.existsSync(target)) {
    try {
      fs.rmSync(target, { recursive: true, force: true });
      console.log(`[✓] Package "${name}" removed.`);
    } catch (err) {
      console.error(`❌ Failed to remove package "${name}":`, err.message);
    }
  } else {
    console.log(`[!] Package "${name}" is not installed.`);
  }
};
