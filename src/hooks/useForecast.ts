import { useEffect, useState } from "react";
import type { Loc } from "../types/location";
import type { Daily } from "../types/weather";
import { fetchForecast } from "../utils/openWeathers";
import { groupByDate } from "../utils/foreCast";

export function useForecast(location: Loc | null) {
  const [daily, setDaily] = useState<Daily[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!location) return;
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const raw = await fetchForecast(location, {
          units: "metric",
          lang: "kr",
        });
        const grouped = groupByDate(raw);
        if (!cancelled) setDaily(grouped);
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? String(e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [location]);

  return { daily, loading, error };
}
