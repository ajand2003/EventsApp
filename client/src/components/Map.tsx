import { useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

export default function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBk-lyNX8YTht2lFdbAjvEguL9C1K6l9vE",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <MapLoader />;
}

function MapLoader() {
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);
  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );
  return (
    <GoogleMap zoom={1000} center={center} mapContainerClassName="map__container" options={options}>
      <MarkerF position = {center}/>
    </GoogleMap>
  );
}