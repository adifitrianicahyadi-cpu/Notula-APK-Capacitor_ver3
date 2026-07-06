# Notula — APK Android (Capacitor)

## ⚡ Cara tercepat mendapatkan APK (3 langkah, tanpa instal apa pun)

1. **Unggah** seluruh **ISI** folder ini ke repo GitHub Anda (folder `.github`,
   `www`, `scripts` + berkas lainnya harus terlihat di tingkat atas repo).
2. Buka tab **Actions** → tunggu proses **"Build Notula APK"** sampai ✅ hijau
   (±5 menit). *(Bila tidak jalan otomatis: klik workflow → "Run workflow".)*
3. Di halaman proses yang hijau, gulir ke bawah ke **Artifacts** → unduh
   **`notula-debug-apk`** → ekstrak → pasang **`app-debug.apk`** di HP.

Workflow-nya sudah "anti-gagal": otomatis menemukan folder proyek walaupun
Anda tidak sengaja mengunggahnya di dalam subfolder.

---

Aplikasi notulensi rapat **Notula** dibungkus dengan [Capacitor](https://capacitorjs.com)
agar bisa dipasang sebagai aplikasi Android (.apk) dan **berjalan offline**.

Aset web sudah jadi di folder `www/` (satu berkas `index.html` mandiri + manifest + ikon).
Anda tinggal membangun APK-nya.

---

## Yang sudah berfungsi penuh

- ✅ **Offline penuh** — seluruh aplikasi (UI, perekaman, transkrip, penyusunan
  notulen **Mode Offline**) berjalan tanpa internet karena aset dimuat lokal.
- ✅ **Pasang sebagai aplikasi** Android (ikon di home screen, layar penuh).
- ✅ **Rekam + wake lock** — layar dijaga menyala selama merekam sehingga
  rekaman tidak terputus saat sesi berjalan.
- ✅ **Mode AI (online)** tetap tersedia bila ada internet (hasil lebih tajam).

## Yang perlu diuji di perangkat (jujur)

- ⚠️ **Rekam saat layar BENAR-BENAR terkunci.** Ini memerlukan perekaman *native*
  + *foreground service*. Proyek ini sudah menambahkan **izin** yang diperlukan
  (`RECORD_AUDIO`, `FOREGROUND_SERVICE`, `FOREGROUND_SERVICE_MICROPHONE`,
  `WAKE_LOCK`, `POST_NOTIFICATIONS`) dan memakai perekam native
  (`capacitor-voice-recorder`). Pada banyak HP ini sudah cukup, **tetapi**
  sebagian OEM (Xiaomi, Oppo, Vivo, dsb.) mematikan proses latar belakang secara
  agresif. Agar andal: matikan *Battery optimization* untuk Notula
  (Setelan → Aplikasi → Notula → Baterai → Tidak dibatasi).
- ℹ️ **Transkrip langsung saat terkunci** akan jeda (WebView tidak aktif), tetapi
  **audio tetap terekam** secara native. Setelah layar dibuka, hasil rekaman bisa
  ditranskrip ulang (impor) atau diproses Mode AI.

---

## Cara 1 — Build otomatis lewat GitHub Actions (paling mudah)

1. Buat repo baru di GitHub, unggah seluruh isi folder ini.
2. Buka tab **Actions** → workflow **"Build Notula APK"** berjalan otomatis
   (atau klik *Run workflow*).
3. Setelah selesai, unduh artefak **`notula-debug-apk`** → di dalamnya ada
   `app-debug.apk`. Pasang di HP (aktifkan "Instal dari sumber tak dikenal").

Workflow ada di `.github/workflows/build-apk.yml`.

## Cara 2 — Build lokal (Android Studio)

Prasyarat: Node.js 18+, JDK 17, Android Studio + Android SDK.

```bash
npm install
npx cap add android          # membuat folder android/
node scripts/patch-android.mjs   # menyuntik izin ke AndroidManifest
npx cap sync android
npm run build:apk            # -> android/app/build/outputs/apk/debug/app-debug.apk
# atau buka di Android Studio:
npx cap open android
```

## Memperbarui aplikasi web

Bila Anda membangun ulang aplikasi web (bundle.html baru), cukup salin ke
`www/index.html` lalu jalankan `npx cap sync android` dan build ulang.

---

## Catatan teknis

- `appId`: `id.go.tabalong.inspektorat.notula` — ubah di `capacitor.config.ts`
  bila perlu.
- **Mode AI** memanggil API Claude; di dalam APK Anda perlu menyediakan kredensial
  sendiri (mis. lewat proxy backend instansi). **Mode Offline tidak memerlukan ini.**
- Untuk APK rilis bertanda tangan (Play Store / distribusi resmi), buat keystore
  dan jalankan `npm run release:apk` (lihat dokumentasi Android signing).
- Pengenalan suara offline native memakai paket bahasa Indonesia perangkat
  (Setelan → Sistem → Bahasa & masukan → Pengenalan suara luring → unduh Indonesia).
