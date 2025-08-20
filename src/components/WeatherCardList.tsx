// src/components/WeatherCardList.tsx
import styled from "styled-components";
import WeatherCard from "./WeatherCard";
import type { Loc } from "../types/location";
import { useForecast } from "../hooks/useForeCast";

const CardListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
  gap: 16px;
`;

type Props = { location: Loc | null };

export default function WeatherCardList({ location }: Props) {
  const { daily, loading, error } = useForecast(location);

  if (!location)
    return <CardListWrapper>위치 정보를 가져오는 중…</CardListWrapper>;
  if (loading) return <CardListWrapper>날씨 불러오는 중…</CardListWrapper>;
  if (error) return <CardListWrapper>오류: {error}</CardListWrapper>;

  return (
    <CardListWrapper>
      {daily?.map((d) => (
        <WeatherCard
          key={d.date}
          date={d.date}
          min={Math.round(d.min)}
          max={Math.round(d.max)}
          icon={`https://openweathermap.org/img/wn/${d.icon}@2x.png`}
          desc={d.description}
          items={d.items}
        />
      ))}
    </CardListWrapper>
  );
}
