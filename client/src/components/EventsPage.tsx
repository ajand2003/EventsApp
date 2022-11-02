import {useContext, useEffect, useState } from "react"
import UserContext from "./UserContext"
import Event from "./Event";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EditEvent from "./EditEvent";

export interface EventProps {
  removeEvent: (i: number) => void,
  setIsEditing: (t:boolean) => void,
  handleActive: (i:number) => void,
  index: number,
  act: string,
  host:string,
  title: string,
  date: string, 
  time: string,
  location: string,
  desc: string,
  _id: string
}
export interface EditProps {
  removeEvent: (i: number) => void,
  setIsEditing: (t:boolean) => void,
  index: number,
}
export default function EventsPage() {
    const[events, setEvents] = useState<any>([]);
    const [eventClicked, setEventClicked] = useState(0);
    const[isEditing, setIsEditing] = useState(false)
    const [active, setActive] = useState(-1);
    const [update,setUpdate] = useState(false);
    const [pageNumbers, setPageNumbers] = useState<any>([]);
    const [currPage, setCurrPage] = useState(0);
    const [currPages, setCurrPages] = useState<any>([]);
    const navigate = useNavigate();
    const removeEvent = (i: number) => {
      let temp = events
      temp.splice(i,1)
      setEvents(temp);
      setUpdate(true);
    }
    const handleActive = (i:number) => {
      setActive(i);
    }
    const getNumPages = () => {
      const pages = [];
      for (let i = 0; i < Math.ceil(events.length / 10); i++) {
        pages.push(i);
      }
      setPageNumbers(pages);
    }
    const getPageNumbers = () => {
      const pages = []
      let i = currPage-2;
      while(pages.length < 5 && i < pageNumbers.length) {
        if(i >= 0) {
            pages.push(i)
        }
        i++;
      }
      console.log(pages);
      setCurrPages(pages);
    }
    useEffect(() => {
      axios.get('http://localhost:5000/events/')
      .then(rs => {
        let temp = rs.data
        setEvents(temp);
      });
    },[])
    useEffect (() => {
      axios.get('http://localhost:5000/events/')
      .then(rs => {
        let temp = rs.data
        setEvents(temp);
      });
      setUpdate(false);
    },[update])
    useEffect (() => {
      getNumPages();
      getPageNumbers();
    },[events])
    useEffect (() => {
      getPageNumbers();
    },[currPage])
  return (
    <div>
    {!isEditing && <div className="events">
      <button className = "add__event"  onClick = {() => {navigate("/create")}}>Add Event</button>
      <div className = 'event__container'>{events.map((index: number, i: number) => {
        if (Math.floor(i / 10) == currPage) {
            return (
              <div onClick = {() => setEventClicked(i)}><Event setIsEditing = {setIsEditing} removeEvent = {removeEvent} handleActive = {handleActive} index = {i} act = {active == i ? "event__active" : "not__active"} _id = {events[i]._id} host = {events[i].host} title = {events[i].title} date = {events[i].date} time = {events[i].time} desc = {events[i].desc} location = {events[i].location}></Event></div>
            );}
          })}</div>
          <div className="pages">{currPages.map((index: number, i: number) => {
            return <div className={(currPages[i] === currPage) ? "page__num__active":"page__num"} onClick={()=>setCurrPage(currPages[i])}>{currPages[i]+1}</div>
              <Event act = "event__active" host = {events[i].host} title = {events[i].title} date = {events[i].date} time = {events[i].time} desc = {events[i].desc} location = {events[i].location} _id = {events[i].location}></Event>
            );
          })}</div>
    </div>
    }
    {isEditing && <EditEvent  index = {eventClicked} setIsEditing = {setIsEditing} removeEvent = {removeEvent}/>}
    </div>
  )
}