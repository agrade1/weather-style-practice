export type OWMWeather = { description: string; icon: string };
export type OWMItem = {
  dt: number;
  main: { temp_min: number; temp_max: number; temp: number };
  weather: OWMWeather[];
};
export type OWMForecast = { list: OWMItem[]; city: { timezone: number } };

export type Daily = {
  date: string;
  min: number;
  max: number;
  icon: string;
  description: string;
  items: OWMItem[];
};
