module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [
    "plugin:react/recommended",
    "eslint-config-standard-with-typescript"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module",
    "project": "tsconfig.json"
  },
  "plugins": [
    "react",
    "@typescript-eslint"
  ],
  "rules": {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/strict-boolean-expressions": ["warn", { "allowNullable": true, "allowSafe": true }],
    "no-return-await": "off",
    "@typescript-eslint/return-await": "error"
  },
  "globals": {
    "describe": "readonly",
    "test": "readonly",
    "expect": "readonly"
  }
};
