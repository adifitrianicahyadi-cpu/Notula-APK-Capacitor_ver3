// Menyuntikkan izin Android yang dibutuhkan ke AndroidManifest.xml yang
// dihasilkan Capacitor setelah `npx cap add android`. Aman dijalankan berulang.
import fs from "node:fs";

const MANIFEST = "android/app/src/main/AndroidManifest.xml";

const PERMISSIONS = [
  "android.permission.RECORD_AUDIO",
  "android.permission.MODIFY_AUDIO_SETTINGS",
  "android.permission.FOREGROUND_SERVICE",
  "android.permission.FOREGROUND_SERVICE_MICROPHONE",
  "android.permission.WAKE_LOCK",
  "android.permission.POST_NOTIFICATIONS",
  "android.permission.INTERNET",
];

if (!fs.existsSync(MANIFEST)) {
  console.error(`\n[patch-android] ${MANIFEST} belum ada.`);
  console.error("Jalankan dulu: npx cap add android\n");
  process.exit(1);
}

let xml = fs.readFileSync(MANIFEST, "utf8");
let added = [];

for (const perm of PERMISSIONS) {
  if (!xml.includes(`android:name="${perm}"`)) {
    const tag = `    <uses-permission android:name="${perm}" />\n`;
    xml = xml.replace(/<manifest[^>]*>\s*/, (m) => m + tag);
    added.push(perm);
  }
}

fs.writeFileSync(MANIFEST, xml);
console.log("[patch-android] Selesai.");
console.log(added.length ? "Izin ditambahkan:\n - " + added.join("\n - ") : "Semua izin sudah ada.");
