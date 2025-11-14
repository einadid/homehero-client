module.exports = {
content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
theme: {
extend: {
fontFamily: {
sans: ["Inter", "ui-sans-serif", "system-ui"],
display: ["Poppins", "Inter", "sans-serif"],
},
container: { center: true, padding: "1rem", screens: { "2xl": "1200px" } },
boxShadow: { soft: "0 8px 30px rgba(0,0,0,0.06)" },
},
},
plugins: [require("daisyui")],
daisyui: { themes: ["light", "dark"] },
};