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
        secound: {
          50: '#1E1E1E',
          100: '#1E1E1E',
          500: '#1E1E1E',
        }
      },
    },
  },
}
  },
  plugins: [],
};

export default config;