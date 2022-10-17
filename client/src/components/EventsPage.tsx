import { useContext } from "react"
import UserContext from "./UserContext"

export default function EventsPage() {
    const{username, userType} = useContext(UserContext);
  return (
    <div className={"hello__" + userType}> Hello {userType} {username} </div>
  )
}
