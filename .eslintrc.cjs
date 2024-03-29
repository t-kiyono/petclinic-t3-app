/** @type {import("eslint").Linter.Config} */
const config = {
  overrides: [
    {
      extends: [
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: "tsconfig.json",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:storybook/recommended"
  ],
  rules: {
    "@typescript-eslint/no-misused-promises": ["off",
      {
        "checksVoidReturn": {
          "attributes": false
        }
      }
    ],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "indent": ["warn", 2],
    "linebreak-style": ["error", "unix"],
    "semi": ["error", "always"],
    "eol-last": ["error", "always"],
    "quotes": ["error", "double", {
      "avoidEscape": true,
      "allowTemplateLiterals": true
    }],
    "jsx-quotes": ["error", "prefer-double"],
  },
  "ignorePatterns": [
    "tailwind.config.cjs"
  ],
};

module.exports = config;
