import { useEffect, useState } from "react";

export default function ThemeToggle() {
const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
useEffect(() => {
document.documentElement.setAttribute("data-theme", theme);
localStorage.setItem("theme", theme);
}, [theme]);
return (
<label className="swap swap-rotate">
<input type="checkbox" checked={theme === "dark"} onChange={(e) => setTheme(e.target.checked ? "dark" : "light")} />
<svg className="swap-off fill-current w-6 h-6" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71..." /></svg>
<svg className="swap-on fill-current w-6 h-6" viewBox="0 0 24 24"><path d="M21.64,13..." /></svg>
</label>
);
}