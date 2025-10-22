import js from '@eslint/js';
import pluginReact from "eslint-plugin-react";
import * as tsEslint from 'typescript-eslint';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import globals from "globals";
import cypressPlugin from "eslint-plugin-cypress";
import chaiFriendly from "eslint-plugin-chai-friendly";
import next from "next";
import noOnlyTests from 'eslint-plugin-no-only-tests/rules/no-only-tests';
import prettier from "eslint-plugin-prettier";


/**
 * @type {import('eslint').Linter.FlatConfig[]}
 */
export default [
    js.configs.recommended,
    ...tsEslint.configs.recommended,

    // React-Specific rules
    {
        files: ["**/*.{jsx,tsx}"],
        plugins:{
            react: pluginReact,
        },
        languageOptions: {
            globals: globals.browser,
            parserOptions: {
                ecmaFeatures: {jsx: true},
            },
        },
        settings: {
            react:{
                version: "detect"
            },
        },
        rules: {
            "react/no-unknown-property" : ["error", { ignore: ["jsx", "global"]}],
        },
    },
    // TS-Specific rules
    {
        files: ["**/*.{ts,tsx}"],
        plugins: {
            "@typescript-eslint": tsPlugin,
        },
        languageOptions: {
            parser: tsEslint.parser,
            parserOptions: {
                project: "./tsconfig.json",
                sourceType: "module",
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": "off",
        },
    },
    {
        files: ["**/*.{js,jsx}"],
        languageOptions: {
            parser: tsEslint.parser,
            parserOptions: {
                sourceType: "module",
            },
        },
    },

    // Cypress, Chai and Prettier integration

    {
        files: ["**/*.{js,ts,jsx,tsx}"],
        plugins: {
            cypress: cypressPlugin,
            "chai-friendly": chaiFriendly,
            "no-only-tests": noOnlyTests,
            prettier,
        },
        languageOptions: {
            globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        ...globals.mocha,
        ...globals.jest,
        cy: true,
        Cypress: true,
        assert : true,
            },
        },
        rules: {
        // "no-console": ["error", { allow: ["warn", "error"] }],
        "no-unused-expressions": "off",
        "chai-friendly/no-unused-expressions": "error",
        "no-only-tests/no-only-tests": "error",
        "no-duplicate-imports": "error",
        "prettier/prettier": "error",
        },
        ignores: [
            "node_modules/",
            "eslint.config.ts",
            "next.config.ts",
            "*.config.*",
            ".next/",
        ],
    },
];
