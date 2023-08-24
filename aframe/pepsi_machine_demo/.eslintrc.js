module.exports = {
  env: {
    browser: true,
    es2021: true, // Updated to ES2021
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    THREE: 'readonly',
    AFRAME: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2021, // Updated to ES2021
    sourceType: 'module',
  },
  rules: {
    'import/prefer-default-export': 'off',
    'no-void': 'off',
    'no-param-reassign': 'off',
    'no-multi-assign': 'off',
  },
};
