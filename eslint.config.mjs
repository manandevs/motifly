import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript"
  ),

  {
    rules: {
      "@next/next/no-img-element": "off",

      // TypeScript
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      // React
      "react/jsx-key": "error",

      // JavaScript
      "no-console": [
        "warn",
        {
          allow: ["warn", "error"],
        },
      ],
    },
  },

  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "build/**",
      "coverage/**",
      "public/**",
      "next-env.d.ts",
    ],
  },
];