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
  const {eventId} = useContext(UserContext);
  const[events, setEvents] = useState<any>([]);
  const [center,setCenter] = useState({ lat: 33.7759456, lng: -84.3965694 })
  const [currEvents, setCurrEvents] = useState<any>(null);
  const {sorting} = useContext(UserContext);
  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );
  const handleClick = (i: number) => {
    const latlng = events[i].latlng
    let temp = []
    for (let i = 0; i < events.length; i++) {
      if(events[i].latlng.lat === latlng.lat && events[i].latlng.lng === latlng.lng) {
        temp.push(events[i])
      }
    }
    setCenter(temp[0].latlng);
    setCurrEvents(temp)
  }
  const ref = useOnclickOutside(() => {
    setCurrEvents(null);
  });
  useEffect(() => {
    const params = {
      sort : sorting
    }
    axios.get('http://localhost:5000/events', {params})
    .then(rs => {
      let temp = rs.data
      setEvents(temp);
    })
    .catch((error) => {
      alert('Cannot apply filter');
    });   
  },[])
  useEffect(() => {
    for (let i = 0; i < events.length; i++) {
      if(eventId == events[i]._id) {
        setCenter(events[i].latlng);
        setCurrEvents(events[i])
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
    {currEvents!=null && <div className = "map__events" ref={ref}>
      {currEvents.map((index: number, i: number) => {
        return <div key = {i} className = "map__event"><Event setIsEditing = {() => {}} removeEvent = {() => {}} handleActive = {() => {}} index = {-1} act = 'map__event__active' _id = {currEvents[i]._id} host = {currEvents[i].host} title = {currEvents[i].title} date = {currEvents[i].date} timeStart = {currEvents[i].timeStart} timeEnd = {currEvents[i].timeEnd} desc = {currEvents[i].desc} location = {currEvents[i].location}></Event></div>
      })}
      </div>}
    </div>
  );
}