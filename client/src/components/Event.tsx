import { EventProps } from "./EventsPage";
import UserContext from "./UserContext";
import {useContext} from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EditEvent from "./EditEvent";
export default function Event({setIsEditing, removeEvent, handleActive, index, _id, act,host,title,desc,time,date,location}: EventProps) {
    const{username, userType, setEventId} = useContext(UserContext)
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
