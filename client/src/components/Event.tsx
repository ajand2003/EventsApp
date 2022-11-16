import { EventProps } from "./EventsPage";
import UserContext from "./UserContext";
import {useContext, useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Event({setIsEditing, removeEvent, handleActive, index, _id, act,host,title,desc,time,date,location}: EventProps) {
    const{username, userType, setEventId} = useContext(UserContext);
    const [status,setStatus] = useState("Attending");
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
        const config = {
            _id: _id,
            username: username,
            status: status
        }
        axios.post('http://localhost:5000/events/addRSVPUser', config)    
    }
    const handleRSVPChange = (e: React.ChangeEvent<any>) => {
        const value = e.target.value;
        setStatus(value);
      };
    return (
        <div>
            {act !== "event__active" && <div className={act} onClick = {() => {handleActive(index)}}>
                <div className = "event__body">
                    <div className='event__title'>{title}</div>
                </div>
            </div>}
            {act === "event__active" && <div className={act}>
                <div className = "event__body">
                    <div className='event__title'>{title}</div>
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
                        <button className="view__list">View List</button>
                    </div>
                </div>
                <ul><li className = "event__tags">{host}</li><li className = 'event__tags'>{date}</li><li className = 'event__tags'>{time}</li><li className = 'event__tags'>{location}</li></ul>
            </div>}
            {(host==username || userType!="student") && <div className= "edit__delete">
                <button className = "edit__button" onClick = {() => {handleEdit()}}>EDIT</button>
                <button className = "delete__button" onClick = {() => {deleteEvent()}}>DELETE</button>
            </div>}
        </div>
    )
}
