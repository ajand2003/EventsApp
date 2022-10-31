import { useContext } from "react"
import UserContext from "./UserContext"
import Event from "./Event";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();
  return (
    <div className="events">
      <button className = "add__event"  onClick = {() => {navigate("/create")}}>Add Event</button>
      <div className = 'event__container'> <Event act = "event__active" host = 'me' title = "yesh" date = "11/20/22" time = "11:20" location = "1234 North Ave NW awoeno" desc = "very cool party very cool party very cool party very cool party very cool party very cool party very cool party very cool party very cool party very cool partyvery cool party very cool party"></Event></div>
    </div>
  )
}
