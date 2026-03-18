import { useEffect, useState } from "react";

export default function OnboardingPopup() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");

  useEffect(() => {
    const done = localStorage.getItem("onboarded");
    if (!done) {
      setTimeout(() => setShow(true), 3000);
    }
  }, []);

  const submit = () => {
    localStorage.setItem("userName", name);
    localStorage.setItem("industry", industry);
    localStorage.setItem("onboarded", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 99999
    }}>
      <div style={{
        background: "white",
        padding: "30px",
        borderRadius: "12px",
        width: "320px",
        color: "#111"
      }}>
        <h2 style={{ marginBottom: "15px" }}>
          Personalize your experience
        </h2>

        <input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "15px" }}
        >
          <option value="">Select industry</option>
          <option>AI / Tech</option>
          <option>Ecommerce</option>
          <option>Healthcare</option>
          <option>Finance</option>
          <option>Corporate</option>
        </select>

        <button
          onClick={submit}
          style={{
            width: "100%",
            background: "#f97316",
            border: "none",
            padding: "10px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}