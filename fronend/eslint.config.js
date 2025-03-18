import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { ESLint } from "eslint"; // Thay đổi import cho TypeScript ESLint

export default [
  {
    ignores: ["dist"], // Thư mục cần bỏ qua
  },
  {
    files: ["**/*.{ts,tsx}"], // Áp dụng cho file .ts, .tsx
    languageOptions: {
      ecmaVersion: 2020, // Phiên bản ECMAScript
      globals: globals.browser, // Định nghĩa các biến toàn cục trình duyệt
      parser: "@typescript-eslint/parser", // Sử dụng parser cho TypeScript
      parserOptions: {
        sourceType: "module",
        project: "./tsconfig.json", // Liên kết với tsconfig
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
    },
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
    ],
    rules: {
      // Cấu hình rules
      ...reactHooks.configs.recommended.rules, // Thêm quy tắc react-hooks
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": ["warn"], // Cảnh báo nếu biến không được sử dụng
      "@typescript-eslint/explicit-function-return-type": ["off"], // Không yêu cầu kiểu trả về hàm
      "react/prop-types": "off", // Tắt kiểm tra prop-types (sử dụng TypeScript)
    },
  },
];
