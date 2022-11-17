import { useState, useContext } from "react"
import axios from "axios";
import UserContext from "./UserContext";
import { InviteProps } from "./Event";


export default function Invite({setInviting}:InviteProps) {
    const [desc, setDesc] = useState('')
    const [add, setAdd] = useState(true);
    const {username, eventId} = useContext(UserContext)
    const handleSubmit = () => {
        if(add){
            let names = desc.split(" ")
            for (let i = 0; i < names.length; i++) {
                if(names[i].replace(/\s+/g, '') == ""){
                    continue;
                }
                const config = {
                    _id: eventId,
                    username: names[i]
                }
                axios.post("http://localhost:5000/events/addInvite",config)
            }
        } else {
            let names = desc.split(" ")
            for (let i = 0; i < names.length; i++) {
                if(names[i].replace(/\s+/g, '') == ""){
                    continue;
                }
                const config = {
                    _id: eventId,
                    username: names[i]
                }
                axios.post("http://localhost:5000/events/removeInvite",config)
            }
        }
        setInviting(false);
    }
    const handleDescChange = (e: React.ChangeEvent<any>) => {
        const value = e.target.value
        setDesc(value)
    }
  return (
    <div>
        <form className = "submit__create" onSubmit = {handleSubmit}>
            <div className="event__description">
                <label onChange={handleDescChange}>
                    <textarea cols={50} rows = {10} name = "desc" placeholder="List invitees seperated by spaces"/>
                </label>
            </div>     
            <button className = "create__button" type = 'submit'>Add</button>
            <button className = "create__button" type = 'submit' onClick = {() => setAdd(false)}>Remove</button>
      </form>
    </div>
  )
}