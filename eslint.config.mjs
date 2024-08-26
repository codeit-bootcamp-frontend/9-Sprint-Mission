import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    extends: ["prettier", "eslint:recommended", "plugin:prettier/recommended"],
    plugins: ["prettier"],
    rules: {
      "prettier/prettier": "error",
    },
  },
];
