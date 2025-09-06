const fs = require("fs/promises");
const fssync = require("fs"); // existsSync için
const path = require("path");
const { execSync } = require("child_process");
const axios = require("axios");
const unzipper = require("unzipper");

const PKG_DIR = path.join(process.env.HOME || process.env.USERPROFILE, ".inh", "packages");
const PKG_LIST_URL = "https://raw.githubusercontent.com/inhtam/packages/main/data.json";

// Helper: dizini boşalt
async function emptyDir(dirPath) {
    await fs.rm(dirPath, { recursive: true, force: true });
    await fs.mkdir(dirPath, { recursive: true });
}

// Helper: recursive kopyalama
async function copyDir(src, dest) {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src, { withFileTypes: true });
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            await copyDir(srcPath, destPath);
        } else {
            await fs.copyFile(srcPath, destPath);
        }
    }
}

module.exports = async function install(name) {
    try {
        // 1. Paket listesi JSON’unu indir
        const res = await axios.get(PKG_LIST_URL);
        const allPkgs = res.data;

        // 2. İstenen paketi bul
        const pkg = allPkgs.find((p) => p.name === name);
        if (!pkg) throw new Error(`Paket bulunamadı: ${name}`);

        const branch = pkg.branch || "main";
        const subPath = pkg.path ? pkg.path.replace(/^\/|\/$/g, "") : "";
        const repoName = pkg.repo.split("/").pop();
        const zipUrl = `${pkg.repo}/archive/refs/heads/${branch}.zip`;

        const tempExtractPath = path.join(PKG_DIR, "__temp__");
        const finalInstallPath = path.join(PKG_DIR, name);

        console.log(`[+] Downloading "${name}" from ${zipUrl}...`);

        // 3. Repo’yu indir
        const zipRes = await axios({ url: zipUrl, responseType: "stream" });

        // Temp klasörü temizle
        await emptyDir(tempExtractPath);

        // 4. Zip'i aç
        await new Promise((resolve, reject) => {
            zipRes.data
                .pipe(unzipper.Extract({ path: tempExtractPath }))
                .on("close", resolve)
                .on("error", reject);
        });

        const extractedRepoPath = path.join(tempExtractPath, `${repoName}-${branch}`);
        const extractedSubPath = path.join(extractedRepoPath, subPath);

        if (!fssync.existsSync(extractedSubPath)) {
            throw new Error(`Belirtilen path bulunamadı: ${extractedSubPath}`);
        }

        // 5. Final path’e kopyala
        await emptyDir(finalInstallPath);
        await copyDir(extractedSubPath, finalInstallPath);

        // Temp klasörünü sil
        await fs.rm(tempExtractPath, { recursive: true, force: true });

        // 6. package.json varsa npm install
        const pkgJsonPath = path.join(finalInstallPath, "package.json");
        if (fssync.existsSync(pkgJsonPath)) {
            console.log("[+] Installing dependencies...");
            execSync("npm install", { cwd: finalInstallPath, stdio: "inherit" });
        }

        console.log(`[✓] Package "${name}" installed successfully.`);
    } catch (err) {
        console.error("❌ Installation failed:", err.response?.data || err.message || err);
    }
};
