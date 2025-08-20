import type { Loc } from "../types/location";
import type { OWMForecast } from "../types/weather";

const API = "https://api.openweathermap.org/data/2.5/forecast";

export async function fetchForecast(
  loc: Loc,
  opts?: { units?: "metric" | "imperial"; lang?: string }
): Promise<OWMForecast> {
  const key = "a8006dbcd28bd4327d71cb73c67011f8";
  if (!key) throw new Error("Missing API key");

  const p = new URLSearchParams({
    lat: String(loc.x),
    lon: String(loc.y),
    appid: key,
    units: opts?.units ?? "metric",
    lang: opts?.lang ?? "kr",
  });

  const res = await fetch(`${API}?${p.toString()}`);
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  return res.json();
}
