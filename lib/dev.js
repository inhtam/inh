const path = require("path");
const { execFileSync } = require("child_process");
const fssync = require("fs");
const axios = require("axios");

const PKG_DIR = path.join(process.env.HOME || process.env.USERPROFILE, ".inh", "packages");
const PKG_LIST_URL = "https://raw.githubusercontent.com/inhtam/packages/main/data.json";

module.exports = async function dev(target) {
  try {
    if (!target) {
      console.error("❌ Paket adı veya yol belirtmelisin. Örn: inh dev sayidisi veya inh dev ./localpaket");
      return;
    }

    let packagePath;
    let mainFile = "index.js";

    if (fssync.existsSync(target)) {
      // Local path olarak verilmiş
      packagePath = path.resolve(target);

      // package.json varsa main dosyasını al
      const pkgJsonPath = path.join(packagePath, "package.json");
      if (fssync.existsSync(pkgJsonPath)) {
        const pkgJson = require(pkgJsonPath);
        mainFile = pkgJson.main || mainFile;
      }
    } else {
      // Daha önce kurulu .inh/packages içinden çalıştır
      packagePath = path.join(PKG_DIR, target);

      if (!fssync.existsSync(packagePath)) {
        console.error(`❌ Paket bulunamadı: "${target}". Local path veya kurulu paket olmalı.`);
        return;
      }

      // data.json’dan main dosyayı al
      const res = await axios.get(PKG_LIST_URL);
      const allPkgs = res.data;
      const pkg = allPkgs.find(p => p.name === target);
      if (!pkg) {
        console.error(`❌ Paket metadata bulunamadı: "${target}".`);
        return;
      }
      mainFile = pkg.main || mainFile;
    }

    const mainPath = path.join(packagePath, mainFile);
    if (!fssync.existsSync(mainPath)) {
      console.error(`❌ Main file bulunamadı: ${mainFile}`);
      return;
    }

    console.log(`[+] Starting "${target}" in dev mode...`);
    execFileSync('node', [mainFile], { cwd: packagePath, stdio: "inherit" });

  } catch (err) {
    console.error("❌ Dev failed:", err.message || err);
  }
};
