import styled from "styled-components";
import WeatherCardList from "./components/WeatherCardList";
import { useEffect, useState } from "react";
import type { Loc } from "./types/location";

function App() {
  const Header = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    border-bottom: 1px solid #fff;
    font-size: 1.4em;
  `;

  const [location, setLocation] = useState<Loc | null>(null);
  const [err, setErr] = useState<Error | GeolocationPositionError | null>(null);
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setErr(new Error("Geolocation not supported"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({ x: pos.coords.latitude, y: pos.coords.longitude }),
      (error) => setErr(error),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  }, []);
  return (
    <>
      <Header>내 지역 - 5days weather</Header>
      <WeatherCardList location={location} />
    </>
  );
}

export default App;
