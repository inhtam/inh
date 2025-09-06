# 📦 INH (I'm Not Hacker) – Terminal App Manager

![npm](https://img.shields.io/npm/v/inhtam?color=blue\&label=npm%20version) ![npm downloads](https://img.shields.io/npm/dt/inhtam?color=green\&label=npm%20downloads) ![License](https://img.shields.io/npm/l/inhtam) ![GitHub last commit](https://img.shields.io/github/last-commit/inhtam/inh)

**INH** (I'm Not Hacker) modern, modüler bir **terminal uygulama yöneticisi**dir.
Amaç: terminal tabanlı JavaScript uygulamalarını kolayca **yüklemek, güncellemek, kaldırmak ve çalıştırmak**.

---

## 🚀 Özellikler

* ▶️ **run** → Kurulu uygulamayı çalıştır
* 🛠 **install** → Registry’den uygulama indir ve yükle
* ❌ **uninstall** → Kurulu uygulamayı kaldır
* 🔄 **update** → INH veya uygulamaları güncelle
* 🧪 **dev** → Kendi yazdığın paketi test et

---

## 📥 Kurulum

### NPM ile global yükleme

```bash
npm install -g inhtam
```

Yükledikten sonra terminalden `inh` komutunu kullanabilirsin.

---

## 💻 Kullanım

### Yardım almak

```bash
inh --help
```

### Paket yüklemek

```bash
inh install <paket-adı>
```

### Paket kaldırmak

```bash
inh uninstall <paket-adı>
```

### INH'yi veya Paketi güncelle

```bash
inh update [paket-adı]
```

### Kurulu paketleri listelemek

```bash
inh list
```

### Kendi paketini test etmek (yakında)

```bash
inh dev ./benim-paketim
```

---

## 📦 Örnek

```bash
# Örnek paket yükleme
inh install sayidisi

# Çalıştırma
inh sayidisi

# Kaldırma
inh uninstall sayidisi
```

---

## 🛠 Kendi Paketini Hazırlamak

Bir `package.json` dosyası oluştur:

```json
{
  "name": "benim-uygulamam",
  "version": "1.0.0",
  "main": "index.js",
  "inh": true
}
```

> 🔑 `inh: true` alanı zorunludur.

Ardından kodunu `index.js` içinde yaz.

---

## 🤝 Katkıda Bulunma

1. Bu repoyu forkla: [https://github.com/inhtam/inh](https://github.com/inhtam/inh)
2. Yeni bir branch aç (`git checkout -b feature/yeni-ozellik`)
3. Kodunu yaz ve commit et
4. Pull request aç

---

## 📄 Lisans

Bu proje [GNU GPL v3 License](https://www.gnu.org/licenses/gpl-3.0.en.html) ile lisanslanmıştır.