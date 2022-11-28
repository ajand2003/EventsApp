import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export default function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBk-lyNX8YTht2lFdbAjvEguL9C1K6l9vE",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <MapLoader />;
}

function MapLoader() {
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName="map__container">
      <Marker position={center} />
    </GoogleMap>
  );
}