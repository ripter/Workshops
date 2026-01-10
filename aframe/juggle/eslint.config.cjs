const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  js.configs.recommended,

  {
    files: ["**/*.{js,mjs,cjs}"],

    languageOptions: {
      ecmaVersion: 2018,
      sourceType: "module",

      // replaces env: { browser: true, es6: true }
      globals: {
        ...globals.browser,
        ...globals.es2021, // slightly newer than 2018, usually fine

        // Your custom globals
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
        THREE: "readonly",
        AFRAME: "readonly",
      },
    },

    rules: {
      "no-void": "off",
      "no-param-reassign": "off",
      "no-multi-assign": "off",
      "no-bitwise": "off",
      "no-case-declarations": "off"
    },
  },
];
