import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.example.app",
  appName: "myfood",
  webDir: "dist",
  server: {
    url: "http://localhost:5173",
    cleartext: true,
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },

    //   CapacitorApp: {
    //     deepLinks: [
    //       {
    //         scheme: "com.example.app",
    //         hostname: "auth",
    //         path: "/callback",
    //       },
    //     ],
    //   },
    //   CapacitorBrowser: {
    //     iosScheme: "com.example.app",
    //     androidScheme: "com.example.app",
    //     androidPackage: "com.example.app", // Update with your Android package name
    //   },
  },
};

export default config;
