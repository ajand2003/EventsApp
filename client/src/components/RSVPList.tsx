import { useState, useEffect, useContext} from "react"
import axios from "axios";
import { RSVPListProps } from "./Event";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import UserContext from "./UserContext";
export default function RSVPList({event,invite,setEvent,setViewList}:RSVPListProps) {
    const {username, userType} = useContext(UserContext);
    const [pages, setPages] = useState<any>([0,1,2,3]);
    const [currPageName, setCurrPageName] = useState('Attending');
    const [currPage, setCurrPage] = useState(0);
    const [canDelete, setCanDelete] = useState((event.host == username) || userType != "student")
    const [currList, setCurrList] = useState<any>(event.willAttendList);
    const [update, setUpdate] = useState(false);
    const forward = () => {
        const pageNames = ["Attending", "Won't be Attending", "Not Sure", "Nemesis", "Invite"];
        let page = currPage
        if(invite){
            page = (page + 1) % 5
        } else {
            page = (page + 1) % 4
        }
        setCurrPage(page)
        setCurrPageName(pageNames[page])
        if(page == 0) {
            setCurrList(event.willAttendList)
        } else if (page == 1) {
            setCurrList(event.wontAttendList)
        } else if (page == 2) {
            setCurrList(event.maybeAttendList)
        } else if (page == 3) {
            setCurrList(event.nemesisAttendList)
        } else if (page == 4) {
            setCurrList(event.inviteList)
        }
    }
    const backward = () => {
        const pageNames = ["Attending", "Won't be Attending", "Not Sure", "Nemesis", "Invite"];
        let page = currPage
        page -= 1
        if(page < 0) {
            if(invite){
                page = 4;
            } else {
                page = 3;
            }
        }
        setCurrPage(page)
        setCurrPageName(pageNames[page])
        if(page == 0) {
            setCurrList(event.willAttendList)
        } else if (page == 1) {
            setCurrList(event.wontAttendList)
        } else if (page == 2) {
            setCurrList(event.maybeAttendList)
        } else if (page == 3) {
            setCurrList(event.nemesisAttendList)
        }
    }
    const removeUser = (name: string) => {
        if (event.host != username && userType == "student") {
            return;
        }
        const config = {
                username: name,
                _id: event._id,
                status: currPageName
        }
        axios.post("http://localhost:5000/events/deleteRSVPUser", config)
        setUpdate(true);
    }
    useEffect(() => {
        const url = "http://localhost:5000/events/" + event._id;
        axios.get(url)
        .then(rs => {
            let temp = rs.data;
            setEvent(temp);
            if(currPage == 0) {
                setCurrList(temp.willAttendList)
            } else if (currPage == 1) {
                setCurrList(temp.wontAttendList)
            } else if (currPage == 2) {
                setCurrList(temp.maybeAttendList)
            } else if (currPage == 3) {
                setCurrList(temp.nemesisAttendList)
            } else if (currPage == 4) {
                setCurrList(temp.inviteList)
            }
        });
        setUpdate(false);
    },[update])
  return (
    <div className="rsvp__body">
    <button className="view__event" onClick = {() =>  {setViewList(false)}}>View Event</button>
        <div className="rsvp__title">{currPageName}</div>
        <ul className="names__list">
        {currList.map((index: number, i: number) => {
            if (canDelete) {
                return <li className="list__name__deletable" onClick = {() => removeUser(currList[i])}>{currList[i]}</li>
            } else {
                return <li className="list__name">{currList[i]}</li>
            }
        })}
        </ul>
        <div className="rsvp__arrows">
            <div className="rsvp__left__arrow" onClick = {() => {backward()}}><FontAwesomeIcon icon={faArrowLeft} /></div>
            <div className="rsvp__right__arrow" onClick={() => {forward()}}><FontAwesomeIcon icon={faArrowRight} /></div>
        </div>
    </div>
  )
}
