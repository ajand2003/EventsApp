import { useContext } from "react"
import UserContext from "./UserContext"
import Event from "./Event";

export interface EventProps {
  act: string,
  host:string,
  title: string,
  time: string,
  location: string,
  desc: string
}
export default function EventsPage() {
    const{username, userType} = useContext(UserContext);
    const handleClick = () => {
      //api call or something idk
    }
  return (
    <div className="events">
      <button className = "add__event" onClick={() => {handleClick}}> Add Event</button>
      <div className = 'event__container'> <Event act = "event__active" host = 'me' title = "yesh" time = "11:20" location = "1234 North Ave NW awoeno" desc = "very cool party very cool party very cool party very cool party very cool party very cool party very cool party very cool party very cool party very cool partyvery cool party very cool party"></Event></div>
    </div>
  )
}
