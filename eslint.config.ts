import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

const { defineFlatConfig } = require ('eslint-define-config')
const js = require('@eslint/js');
const customConfig = require('./custom-config.js')

export default defineFlatConfig([
    js.configs.recomended,
    customConfig,
  { 
      parser: "@babel/eslint-parser",
       parserOptions:{
         ecmaVersion: "latest",
         sourceType: "module",
       },
       env: {
         es6: true,
         browser: true,
         node: true,
         "cypress/globals": true,
       },
       extends: [
         "standard-with-typescript",
         "eslint:recommended",
         "plugin:@typescript-eslint/recommended",
         "plugin:react/recommended",
         "plugin:chai-friendly/recommended",
         "plugin:cypress/recommended",
         "plugin:prettier/recommended",
       ],
       plugins: ["js", "react", "prettier", "@typescript-eslint", "cypress", "chai-friendly", "no-only-tests"],
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    overrides: [],
    settings: {
      react: {
        version: "detect",
      },
    },
    ignorePatterns: ["node_modules/", ],
    rules: {
      "no-console": ["error" , {allow: ["warn", "error"]}],
      "react/no-unknown-property" : ['error', { ignore: ['jsx', 'global']}],
      "no-unused-expressions": 0,
      "chai-friendly/no-unused-expressions": 2,
      "no-only-tests/no-only-tests": "error",
    },
}
]);
