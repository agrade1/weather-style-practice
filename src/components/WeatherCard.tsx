// src/components/WeatherCard.tsx
import styled from "styled-components";

export type WeatherCardProps = {
  date: string; // 'YYYY-MM-DD'
  min: number; // 섭씨 최저
  max: number; // 섭씨 최고
  icon: string; // openweather 아이콘 URL
  desc: string; // 날씨 설명
};

const Card = styled.article`
  width: 220px;
  padding: 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(6px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  color: #fff;

  display: grid;
  row-gap: 10px;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.32);
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DateText = styled.h3`
  margin: 0;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.2px;
`;

const Icon = styled.img`
  width: 64px;
  height: 64px;
  image-rendering: -webkit-optimize-contrast;
`;

const Temps = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-weight: 700;
  .max {
    font-size: 1.4rem;
  }
  .min {
    font-size: 1rem;
    opacity: 0.8;
  }
`;

const Badge = styled.span`
  align-self: start;
  display: inline-block;
  font-size: 0.8rem;
  padding: 4px 8px;
  border-radius: 999px;
  border: 1px solid #d7fa00;
  color: #d7fa00;
`;

export default function WeatherCard({
  date,
  min,
  max,
  icon,
  desc,
}: WeatherCardProps) {
  return (
    <Card>
      <Top>
        <DateText>{date}</DateText>
        <Icon src={icon} alt={desc} />
      </Top>

      <Temps>
        <span className="max">{Math.round(max)}°</span>
        <span className="min">{Math.round(min)}°</span>
      </Temps>

      <Badge>{desc}</Badge>
    </Card>
  );
}
