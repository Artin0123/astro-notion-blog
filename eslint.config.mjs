import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import astroPlugin from "eslint-plugin-astro";

export default defineConfig([
  js.configs.recommended,
  {
    files: ["**/*.ts"],
    plugins: { "@typescript-eslint": tsPlugin },
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaVersion: "latest", sourceType: "module" },
      globals: { ...globals.node, NodeJS: "readonly" },
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
  ...astroPlugin.configs.recommended,
  {
    files: ["**/*.astro"],
    languageOptions: {
      globals: {
        ...globals.browser,
        dataLayer: "writable",
        EventListener: "readonly",
        addEventListener: "readonly",
      },
    },
  },
  {
    files: ["**/*.ts", "**/*.astro"],
    plugins: { "@typescript-eslint": tsPlugin },
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
  { ignores: ["dist/**", "node_modules/**", "scripts/**", "public/**"] },
]);
