import type { OWMForecast, OWMItem, Daily } from "../types/weather";

const toLocalYMD = (dt: number, tz: number) => {
  const d = new Date((dt + tz) * 1000);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const pickMidday = (items: OWMItem[], tz: number) => {
  let rep = items[0],
    best = Infinity;
  for (const it of items) {
    const h = new Date((it.dt + tz) * 1000).getUTCHours();
    const diff = Math.abs(h - 12);
    if (diff < best) {
      rep = it;
      best = diff;
    }
  }
  return rep;
};

export const groupByDate = (data: OWMForecast): Daily[] => {
  const tz = data.city.timezone ?? 0;
  const buckets: Record<string, OWMItem[]> = {};
  for (const it of data.list) {
    const key = toLocalYMD(it.dt, tz);
    (buckets[key] ??= []).push(it);
  }

  return Object.entries(buckets)
    .map(([date, items]) => {
      const min = Math.min(...items.map((i) => i.main.temp_min));
      const max = Math.max(...items.map((i) => i.main.temp_max));
      const rep = pickMidday(items, tz);
      return {
        date,
        min,
        max,
        icon: rep.weather[0].icon,
        description: rep.weather[0].description,
        items,
      };
    })
    .sort((a, b) => a.date.localeCompare(b.date));
};
