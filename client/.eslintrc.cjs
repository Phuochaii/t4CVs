module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
   
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh','eslint-plugin-prettier'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'quotes': ['error', 'single'],
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto",
        semi: true,
        singleQuote: true,
        trailingComma: 'all',
        tabWidth: 2,
        printWidth: 80,
      },
    ],
  },
}


