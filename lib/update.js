const fs = require("fs/promises");
const fssync = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const install = require("./install");

const PKG_DIR = path.join(process.env.HOME || process.env.USERPROFILE, ".inh", "packages");

module.exports = async function update(target) {
  try {
    if (!target || target.toLowerCase() === "inh") {
      console.log("[+] Updating INH CLI itself...");

      // npm üzerinden güncelleme (senin yayınladığın paket adı)
      try {
        execSync("npm install -g inhtam", { stdio: "inherit" });
        console.log("[✓] INH CLI updated successfully.");
      } catch (err) {
        console.error("❌ Failed to update INH CLI:", err.message);
      }
      return;
    }

    // Paket güncelleme
    const packagePath = path.join(PKG_DIR, target);
    if (!fssync.existsSync(packagePath)) {
      console.log(`[!] Package "${target}" is not installed.`);
      return;
    }

    console.log(`[+] Updating package "${target}"...`);

    // uninstall (dizini temizle)
    await fs.rm(packagePath, { recursive: true, force: true });

    // install ile tekrar yükle
    await install(target);

    console.log(`[✓] Package "${target}" updated successfully.`);
  } catch (err) {
    console.error("❌ Update failed:", err.response?.data || err.message || err);
  }
};
