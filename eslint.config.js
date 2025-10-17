import cypressPlugin from 'eslint-plugin-cypress';

export default [{
    parser: "@babel/eslint-parser",
    parserOptions:{
      ecmaVersion: latest,
      sourceType: "module",
    },
    env: {
      es6: true,
      browser: true,
      node: true,
      "cypress/globals": true,
    },
    plugins: ["react", "prettier", "@typescript-eslint", "cypress", "chai-friendly", "no-only-tests"],
    extends: [
      "standard-with-typescript",
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "plugin:chai-friendly/recommended",
      "plugin:cypress/recommended",
      "plugin:prettier/recommended",
    ],
    overrides: [],
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
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
    
}]

