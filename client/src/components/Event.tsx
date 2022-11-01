import EventsPage, { EventProps } from "./EventsPage"
import axios from "axios"
import {useContext, useEffect, useState } from "react"
import UserContext from "./UserContext"
import { useNavigate } from "react-router-dom";


export default function Event({act,host,title,desc,time,date,location,_id}: EventProps) {

    const navigate = useNavigate();
    const{username, userType, setEventId} = useContext(UserContext);
    const handleEdit = () => {
        setEventId(_id)
        navigate('/edit')
    }

    const handleDelete = () => {
        
    }

    return (
        <div>
        <div className={act}>
            <div className = "event__body">
                <div className='event__title'>{title}</div>
                <p className='event__desc'>{desc}</p>
            </div>
            <ul><li className = "event__tags">{host}</li><li className = 'event__tags'>{date}</li><li className = 'event__tags'>{time}</li><li className = 'event__tags'>{location}</li></ul>
        </div>
        <div className= "edit__delete">
            <button className = "edit__button" onClick = {() => {handleEdit()}}> EDIT</button>
            <button className = "delete__button">DELETE</button>
        </div>
        </div>
    )
}