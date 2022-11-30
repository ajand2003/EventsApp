import { EventProps } from "./EventsPage";
import UserContext from "./UserContext";
import {useContext, useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RSVPList from "./RSVPList";
import Invite from "./Invite";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
export interface RSVPListProps {
    event: any,
    invite: boolean,
    setEvent: (s: any) => void,
    setViewList: (t: boolean) => void,
}
export interface InviteProps {
    setInviting: (t:boolean) => void
}
export default function Event({setIsEditing, removeEvent, handleActive, index, _id, act,host,title,desc,timeStart,timeEnd, date,location}: EventProps) {
    const{username, userType, setEventId} = useContext(UserContext);
    const [status,setStatus] = useState("Attending");
    const [viewList, setViewList] = useState(false);
    const [event,setEvent] = useState();
    const [numSpots, setNumSpots] = useState(0);
    const [invite, setInvite] = useState(false);
    const [inviting, setInviting] = useState(false);
    const [capacity, setCapacity] = useState(0);
    const [update, setUpdate] = useState(false);
    const navigate = useNavigate()
    const deleteEvent = () => {
        const config = {
            data: {
              _id: _id
            }
          }
        if(username != host && userType === "student") {
            alert('Incorrect Credentials');
        } else {
            axios.delete('http://localhost:5000/events/delete', config)
        }

        removeEvent(index);
    }
    const handleEdit = () => {
        if(username != host && userType === "student") {
            alert('Incorrect Credentials');
        } else {
            setEventId(_id);
            setIsEditing(true);
        }
    }
    const handleRSVP = () => {
        if(capacity == numSpots) {
            alert("This event is full")
            return;
        }
        const config = {
            _id: _id,
            username: username,
            status: status
        }
        axios.post('http://localhost:5000/events/addRSVPUser', config)
        .then(rs => {
            alert("Added to RSVP");
          })
        .catch((error) => {
            alert('You cannot join');
          })    
        setStatus("Attending");
        setUpdate(true);
    }
    const handleRSVPChange = (e: React.ChangeEvent<any>) => {
        const value = e.target.value;
        setStatus(value);
      };
    const handleInvite = () => {
        setEventId(_id);
        setInviting(true);
    }
    useEffect(() => {
        const url = "http://localhost:5000/events/" + _id;
        axios.get(url)
        .then(rs => {
            let temp = rs.data;
            setEvent(temp);
            setNumSpots(temp.willAttendList.length)
            setInvite(temp.invite);
            setCapacity(temp.capacity)
            setUpdate(false);
        });
    },[])
    useEffect(() => {
        const url = "http://localhost:5000/events/" + _id;
        axios.get(url)
        .then(rs => {
            let temp = rs.data;
            setNumSpots(temp.willAttendList.length)
            setCapacity(temp.capacity)
        });
        setUpdate(false);
    },[update])
    return (
        <div>
            {act !== "event__active" && act!== "map__event__active" && <div className={act} onClick = {() => {handleActive(index)}}>
                <div className = "event__body">
                    <div className='event__title'>{title}</div>
                </div>
            </div>}
            {(act === "event__active" || act === "map__event__active") && !viewList && !inviting &&
                <div className={act}>
                    <div className = "event__body">
                        <div className='event__title' onClick = {() => {handleActive(index)}}>{title}</div>
                        <p className='event__desc'>{desc}</p>
                        <div className = 'rsvp__buttons'>
                            <label>
                                <select onChange = {handleRSVPChange} id="user" name="user" defaultValue="Attending">
                                    <option value="Attending">Attending</option>
                                    <option value="Not Sure">Not Sure</option>
                                    <option value="Won't be Attending">Won't be Attending</option>
                                    <option value="Nemesis">I'm your Nemesis</option>
                                </select>
                            </label>
                            <button className="rsvp__button" onClick = {() => {handleRSVP()}}>RSVP</button>
                            <button className="view__list" onClick={() => {setViewList(true)}}>View List</button>
                        </div>
                        <div>AVAILABLE SPOTS: {capacity - numSpots} / {capacity}</div>
                    </div>
                    <ul className="event__tags__container"><li className = "event__tags">{host}</li><li className = 'event__tags'>{date}</li><li className = 'event__tags'>{timeStart} - {timeEnd}</li><li className = 'event__tags'>{location}</li> {act !== "map__event__active" && <li title = "view on map" className="view__on__map" onClick = {() => {setEventId(_id);navigate("/map")}}><FontAwesomeIcon icon={faMapMarkerAlt} /></li>}</ul>
                </div>
            }
            {(act === "event__active" || act === "map__event__active") && viewList && !inviting &&
                <div className='rsvp__list'>
                    <RSVPList setViewList = {setViewList} setEvent = {setEvent} event={event} invite = {invite}></RSVPList>
                </div>
            }
            {act === "event__active" && index != -1 && inviting && <Invite setInviting = {setInviting}></Invite>}
            {(host==username || userType!="student") && index != -1 && <div className= "edit__delete">
                <button className = "edit__button" onClick = {() => {handleEdit()}}>EDIT</button>
                <button className = "delete__button" onClick = {() => {deleteEvent()}}>DELETE</button>
                {invite && <button className = "invite__button" onClick = {() => handleInvite()}>Invite</button>}
            </div>}
        </div>
    )
}
