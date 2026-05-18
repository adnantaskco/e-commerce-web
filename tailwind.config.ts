import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#E38B75',
          100: '#dbeafe',
          500: '#E38B75',  // main shade
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
    },
  },
}
  },
  plugins: [],
};

export default config;