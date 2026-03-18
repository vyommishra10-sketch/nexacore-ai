import { useEffect, useState } from "react";

export default function useCountryTheme() {
  const [theme, setTheme] = useState("default");

  useEffect(() => {
    fetch("https://ipapi.co/json")
      .then((res) => res.json())
      .then((data) => {
        const c = data.country_code;

        const europe = [
          "FR","DE","IT","ES","NL","BE","SE","NO","FI","DK","CH","AT"
        ];

        if (europe.includes(c)) setTheme("europe");
        else if (c === "IN") setTheme("india");
        else setTheme("default");
      })
      .catch(() => setTheme("default"));
  }, []);

  return theme;
}