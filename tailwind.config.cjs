/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px"
      }
    },
    extend: {
      fontFamily: {
        sans: ["Geist", "system-ui", "sans-serif"]
      },
      colors: {
        background: "hsl(0 0% 100%)",
        foreground: "hsl(222.2 47.4% 11.2%)",
        muted: "hsl(210 40% 96.1%)",
        border: "hsl(214.3 31.8% 91.4%)",
        card: {
          DEFAULT: "hsl(0 0% 100%)",
          foreground: "hsl(222.2 47.4% 11.2%)"
        },
        primary: {
          DEFAULT: "hsl(222.2 47.4% 11.2%)",
          foreground: "hsl(210 40% 98%)"
        }
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem"
      },
      boxShadow: {
        card: "0 4px 16px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
};

