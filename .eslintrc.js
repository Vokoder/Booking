module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "prettier",
  ],
  rules: {

  },
  settings: {
    react: {
      version: "detect",
    },
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['@pages', './src/pages'],
          ['@api', './src/api'],
          ['@app', './src/app'],
          ['@components', './src/components'],
          ['@assets', './src/assets'],
          ['@constants', 'src/constants'],
          ['@firebaseApi', 'src/api/firebase'],
          ['@layouts', 'src/layouts']
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
};