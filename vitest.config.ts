/// <reference types="vitest" />
import { getViteConfig } from "astro/config";
import { coverageConfigDefaults } from "vitest/config";

export default getViteConfig({
  test: {
    reporters: process.env.CI ? "github-actions" : "verbose",
    coverage: {
      reportOnFailure: process.env.CI === "true", // If on CI, always report even if failure.
      exclude: ["./src/pages/**", "./src/assets/**", ...coverageConfigDefaults.exclude],
      enabled: true,
      provider: "istanbul",
      reporter: process.env.CI ? "lcovonly" : "text",
      reportsDirectory: "./test-results"
    },
    setupFiles: ["./tests/setup.ts"],
    environment: "jsdom",
  }
});
