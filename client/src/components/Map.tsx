import { useMemo, useState, useEffect, useContext} from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import useOnclickOutside from "react-cool-onclickoutside";
import axios from "axios";
import Event from "./Event"
import UserContext from "./UserContext";

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
  const {eventId} = useContext(UserContext);
  const[events, setEvents] = useState<any>([]);
  const [center,setCenter] = useState({ lat: 33.7759456, lng: -84.3965694 })
  const [currEvent, setCurrEvent] = useState<any>(null);
  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );
  const handleClick = (i: number) => {
    setCenter(events[i].latlng);
    setCurrEvent(events[i])
  }
  const ref = useOnclickOutside(() => {
    setCurrEvent(null);
  });
  useEffect(() => {
    axios.get('http://localhost:5000/events/')
    .then(rs => {
      let temp = rs.data
      setEvents(temp);
    });
  },[])
  useEffect(() => {
    console.log(eventId)
    for (let i = 0; i < events.length; i++) {
      if(eventId == events[i]._id) {
        setCenter(events[i].latlng);
        setCurrEvent(events[i])
      }
    }
  },[events])
  return (
    <div className="map">
    <GoogleMap zoom={14} center={center} mapContainerClassName="map__container" options={options}>
      {events.map((index: number, i: number) => {
        const loc = new google.maps.LatLng(events[i].latlng);
        return <MarkerF key = {i} onClick = {() => {handleClick(i)}} position = {loc}/>
      })}
    </GoogleMap>
    {currEvent!=null && <div className = "map__event" ref={ref}><Event setIsEditing = {() => {}} removeEvent = {() => {}} handleActive = {() => {}} index = {-1} act = 'map__event__active' _id = {currEvent._id} host = {currEvent.host} title = {currEvent.title} date = {currEvent.date} time = {currEvent.time} desc = {currEvent.desc} location = {currEvent.location}></Event></div>}
    </div>
  );
}