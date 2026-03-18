import { useEffect, useState } from "react";

export default function useUserData() {
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");

  useEffect(() => {
    setName(localStorage.getItem("userName") || "");
    setIndustry(localStorage.getItem("industry") || "");
  }, []);

  return { name, industry };
}