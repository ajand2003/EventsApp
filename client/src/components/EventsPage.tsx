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
  timeStart: string,
  timeEnd: string,
  location: string,
  desc: string,
  _id: string
}
export interface EditProps {
  removeEvent: (i: number) => void,
  setIsEditing: (t:boolean) => void,
  setUpdate: (t:boolean) => void,
  index: number,
}
interface EventsPageProps {
  personal?: Boolean
}
export default function EventsPage({personal = false}: EventsPageProps) {
    const[events, setEvents] = useState<any>([]);
    const [eventClicked, setEventClicked] = useState(0);
    const[isEditing, setIsEditing] = useState(false)
    const [active, setActive] = useState(-1);
    const [update,setUpdate] = useState(false);
    const [pageNumbers, setPageNumbers] = useState<any>([]);
    const [currPage, setCurrPage] = useState(0);
    const [currPages, setCurrPages] = useState<any>([]);
    const navigate = useNavigate();
    const {sorting, setSorting, username} = useContext(UserContext);
    // Function to handle the filter
    const handleFilter = (option: React.ChangeEvent<HTMLSelectElement>) => {
      // const handleOptionChange = (e) => console.log((selectedOption[e.target.value]));
      // query parameters: can either be open, name or date
      setSorting(option.target.value);
      let ids = [];
      const params = {
        sort : option.target.value,
        username: username,
      }
      axios.get('http://localhost:5000/events', {params})
      .then(rs => {
        let temp = rs.data
        setEvents(temp);
      })
      .catch((error) => {
        alert('Cannot apply filter');
      });   
    }


    const removeEvent = (i: number) => {
      let temp = events
      temp.splice(i,1)
      setEvents(temp);
      setUpdate(true);
    }
    const handleActive = (i:number) => {
      if (i == active) {
        setActive(-1)
      } else {
        setActive(i);
      }
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
      setCurrPages(pages);
    }
    useEffect(() => {
      let params;
      if(!personal && (sorting == 'created' || sorting == 'rsvp')) {
        setSorting("None")
        params = {
          sort : "None",
          username: username
        }
      } else {
        let ids = Array<String>();
        if (sorting == "rsvp") {
          const params = {
            username: username
          }
          axios.get('http://localhost:5000/users', {params})
          .then(rs => {
            ids = rs.data.userEventList
          })
          .catch(error => console.log(error))
        }
        params = {
          sort : sorting,
          username: username,
          ids: ids,
        }
      }
      axios.get('http://localhost:5000/events', {params})
      .then(rs => {
        let temp = rs.data
        setEvents(temp);
      })
    },[])
    useEffect (() => {
      let params;
      if(!personal && (sorting == 'created' || sorting == 'rsvp')) {
        setSorting("None")
        params = {
          sort : "None",
          username: username
        }
      } else {
        let ids = Array<String>();
        if (sorting == "rsvp") {
          const params = {
            username: username
          }
          axios.get('http://localhost:5000/users', {params})
          .then(rs => {
            ids = rs.data.userEventList
            const params = {
              sort : sorting,
              username: username,
              ids: ids,
            }
            axios.get('http://localhost:5000/events', {params})
            .then(rs => {
              let temp = rs.data
              setEvents(temp);
            })
          })
          .catch(error => console.log(error))
        } else {
        params = {
          sort : sorting,
          username: username,
          ids: ids,
        }
      }
      axios.get('http://localhost:5000/events', {params})
      .then(rs => {
        let temp = rs.data
        setEvents(temp);
      })
    }
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

      {personal && <button className = "add__event"  onClick = {() => {navigate("/create")}}>Add Event</button>}

      {/* If we want to convert the fitlers to buttons it would look like the following */}
      {/* <button className = "add__event"  onClick = {() => handleFilter("open")}>Filter for open events</button> */}
      {!personal && <div><label>Filter:</label>
      <select className = "add__event" onChange={handleFilter} defaultValue = {sorting}>
        <option value ="None">None</option>
        <option value="open">Open</option>
        <option value="name">Name</option>
        <option value="date">Date</option>
      </select>
      </div>}

      <div className = 'event__container'>{events.map((index: number, i: number) => {
        if (Math.floor(i / 10) == currPage) {
            return (
              <div onClick = {() => setEventClicked(i)}>
                <Event setIsEditing = {setIsEditing} removeEvent = {removeEvent} handleActive = {handleActive} index = {i} act = {active == i ? "event__active" : "not__active"} _id = {events[i]._id} host = {events[i].host} title = {events[i].title} date = {events[i].date} timeStart = {events[i].timeStart} timeEnd = {events[i].timeEnd} desc = {events[i].desc} location = {events[i].location}></Event></div>
            );}
          })}</div>
          <div className="pages">{currPages.map((index: number, i: number) => {
            return <div className={(currPages[i] === currPage) ? "page__num__active":"page__num"} onClick={()=>setCurrPage(currPages[i])}>{currPages[i]+1}</div>
          })}</div>
    </div>
    }
    {isEditing && <EditEvent  setUpdate = {setUpdate} index = {eventClicked} setIsEditing = {setIsEditing} removeEvent = {removeEvent}/>}
    </div>
  )
}