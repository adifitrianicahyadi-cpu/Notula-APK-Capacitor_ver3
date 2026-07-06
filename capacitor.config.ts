import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "id.go.tabalong.inspektorat.notula",
  appName: "Notula",
  webDir: "www",
  // Memuat aset lokal -> aplikasi berjalan OFFLINE penuh (kecuali Mode AI online).
  server: {
    androidScheme: "https",
  },
  plugins: {
    CapacitorHttp: { enabled: true },
  },
};

export default config;
