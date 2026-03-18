import { useEffect, useState } from "react";

export default function ResumeBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("scrollY");

    if (saved && Number(saved) > 200) {
      setShow(true);
    }

    const saveScroll = () => {
      localStorage.setItem("scrollY", window.scrollY);
    };

    window.addEventListener("scroll", saveScroll);

    return () => window.removeEventListener("scroll", saveScroll);
  }, []);

  const resume = () => {
    const y = Number(localStorage.getItem("scrollY") || 0);
    window.scrollTo({ top: y, behavior: "smooth" });
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      style={{
        position: "sticky",   // ✅ NOT fixed anymore
        top: 0,
        background: "#06b6d4",
        color: "black",
        padding: "12px",
        textAlign: "center",
        fontWeight: "bold",
        zIndex: 1000,
        cursor: "pointer",
      }}
      onClick={resume}
    >
      Welcome back! Click to continue where you left off ↑
    </div>
  );
}