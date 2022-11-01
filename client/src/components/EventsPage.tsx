import {useContext, useEffect, useState } from "react"
import UserContext from "./UserContext"
import Event from "./Event";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export interface EventProps {
  act: string,
  host:string,
  title: string,
  date: string, 
  time: string,
  location: string,
  desc: string
}
export default function EventsPage() {
    const{username, userType} = useContext(UserContext);
    const[events, setEvents] = useState<any>([]);
    const navigate = useNavigate();
    useEffect(() => {
      axios.get('http://localhost:5000/events/')
      .then(rs => {
        let temp = rs.data
        setEvents(temp);
      });
    },[])
  return (
    <div className="events">
      <button className = "add__event"  onClick = {() => {navigate("/create")}}>Add Event</button>
      <div className = 'event__container'>{events.map((index: number, i: number) => {
            return (
              <Event act = "event__active" host = {events[i].host} title = {events[i].title} date = {events[i].date} time = {events[i].time} desc = {events[i].desc} location = {events[i].location}></Event>
            );
          })}</div>
    </div>
  )
}
