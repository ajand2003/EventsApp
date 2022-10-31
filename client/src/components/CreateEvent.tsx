import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios";
import UserContext from "./UserContext";

export default function CreateEvent() {
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [location, setLocation] = useState('')
    const [desc, setDesc] = useState('')
    const {username} = useContext(UserContext)
    const navigate = useNavigate()
    const handleSubmit = () => {
        const event = {
            title: title,
            date: date,
            time: time,
            location: location,
            desc: desc,
            host: username
        }
        axios.post('http://localhost:5000/events/add', event)
        .then(rs => {
            console.log("Event Added");
        })
        navigate('/')
    }
    const handleTitleChange = (e: React.ChangeEvent<any>) => {
        const value = e.target.value
        setTitle(value)
    }
    const handleDateChange = (e: React.ChangeEvent<any>) => {
        const value = e.target.value
        Date.parse(value)
        console.log(value)

        setDate("" + Date.parse(value))
    }
    const handleTimeChange = (e: React.ChangeEvent<any>) => {
        const value = e.target.value
        setTime(value)
    }
    const handleLocationChange = (e: React.ChangeEvent<any>) => {
        const value = e.target.value
        setLocation(value)
    }
    const handleDescChange = (e: React.ChangeEvent<any>) => {
        const value = e.target.value
        setDesc(value)
    }
  return (
    <div className = 'create__event'>
        <form className = "submit__create" onSubmit = {handleSubmit}>
            <div>
            <label onChange={handleTitleChange}>
            <input type="title" name="title" placeholder="title" />
            </label>
            </div>
            <div>
                <label onChange={handleDateChange}>
                <input type="date" name="date" placeholder="date" />
                </label>
            </div>
            <div>
                <label onChange={handleTimeChange}>
                    <input type="time" name="time" placeholder="time" />
                </label>
            </div>
            <div>
                <label onChange={handleLocationChange}>
                    <input type="location" name="location" placeholder="location" />
                </label>
            </div>  
            <div className="event__description">
                <label onChange={handleDescChange}>
                    <textarea cols={50} rows = {10} name = "desc" placeholder="description"/>
                </label>
            </div>     
            <button className = "create__button" type = 'submit'>Create Event</button>
      </form>
    </div>
  )
}
