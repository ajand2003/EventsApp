import { useContext, useEffect, useState } from "react";
import EventsPage from "./EventsPage";
import UserContext from "./UserContext";
import axios from "axios";

export default function MyEvents() {
    const {username} = useContext(UserContext);
    const[events,setEvents] = useState<any>([])
    const [overlap, setOverlap] = useState<any>([])
    const [create, setCreate] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const {sorting, setSorting} = useContext(UserContext) 
    useEffect(() => {
        setSorting('created');
        let ids = Array<String>();
          const params = {
            username: username
          }
          axios.get('http://localhost:5000/users', {params})
          .then(rs => {
            ids = rs.data.userEventList
            const params = {
              sort : "rsvp",
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
    },[])
    useEffect(() => {
        let temp = []
        let added = new Set()
        for (let i = 0; i < events.length; i++) {
            for (let j = i+1; j < events.length; j++) {
                if (events[i].date !== events[j].date) {
                    continue;
                }
                const t1Start = events[i].timeStart
                const t2Start = events[j].timeStart
                const t2End = events[j].timeEnd
                const t1End = events[i].timeEnd
                console.log(events[i])
                if (t1Start <= t2End && t1Start >= t2Start) {
                    if(!added.has(events[i])) {
                        temp.push(events[i])
                        added.add(events[i])
                    }
                    if (!added.has(events[j])) {
                        temp.push(events[j])
                        added.add(events[j])
                    }
                    continue;
                }
                if (t1Start <= t2End && t1Start <= t2Start && t1End >= t2Start) {
                    if(!added.has(events[i])) {
                        temp.push(events[i])
                        added.add(events[i])
                    }
                    if (!added.has(events[j])) {
                        temp.push(events[j])
                        added.add(events[j])
                    }
                    continue;
                }
                if (t2Start <= t1End && t2Start >= t1Start) {
                    if(!added.has(events[i])) {
                        temp.push(events[i])
                        added.add(events[i])
                    }
                    if (!added.has(events[j])) {
                        temp.push(events[j])
                        added.add(events[j])
                    }
                    continue;

                }
                if (t2Start <= t1End && t2Start <= t1Start && t2End >= t1Start) {
                    if(!added.has(events[i])) {
                        temp.push(events[i])
                        added.add(events[i])
                    }
                    if (!added.has(events[j])) {
                        temp.push(events[j])
                        added.add(events[j])
                    }
                    continue;
                }
            }
        }
        console.log(temp)
        setOverlap(temp)
    },[events])
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
    useEffect (() => {
        console.log(overlap)
    },[overlap])
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
    <div className="time__conflicts">
        Potential Time Conflicts: 
        <ul className="conflict__list">
            {overlap.map((index:number, i: number)=>
            {   
                console.log(overlap)
                return <li className="conflict__item">{overlap[i].title}</li>
            })}
        </ul>
    </div>
    </div>
  )
}
