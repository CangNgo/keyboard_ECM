/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/lib/**/*.{js,ts,jsx,tsx}", // Thêm dòng này vì bạn đang dùng flowbite
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
      },
      width: {
        default: "960px",
      },
    },
  },
  plugins: [
    require("flowbite/plugin"), // Thêm plugin flowbite
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".no-spinner": {
          /* Chrome, Safari, Edge */
          "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button": {
            "-webkit-appearance": "none",
            margin: "0",
          },
          /* Firefox */
          "&": {
            "-moz-appearance": "textfield",
          },
        },
      });
    }),
  ],
};
