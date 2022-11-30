import { useContext, useEffect, useState } from "react";
import EventsPage from "./EventsPage";
import UserContext from "./UserContext";
import axios from "axios";
import { setFlagsFromString } from "v8";

export default function MyEvents() {
    const [create, setCreate] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const {sorting, setSorting} = useContext(UserContext) 
    useEffect(() => {
        setSorting('created');
    },[])
    useEffect(() => {
        setLoaded(false);
    },[create])
    useEffect(() => {
        if(create){
            setSorting('created')
        } else {
            setSorting('rsvp')
        }
    },[loaded])
    useEffect(() => {
        setLoaded(true);
    },[sorting])
  return (
    <div>
    <div className="my__events__selector__container">
        <ul className="event__selector__menu">
            <li className={create ? "my__events__active" : "my_events__item"} onClick={() => {setCreate(true)}}>
                Created Events
            </li>
            <li className={create ? "my_events__item" : "my__events__active"} onClick={() => {setCreate(false)}}>
                Events Attending
            </li>
        </ul>
    </div> 
    {loaded && <EventsPage personal = {true}/>}
    </div>
  )
}
