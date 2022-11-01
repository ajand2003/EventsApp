import { EventProps } from "./EventsPage"
export default function Event({act,host,title,desc,time,date,location}: EventProps) {
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
            <button className = "edit__button">EDIT</button>
            <button className = "delete__button">DELETE</button>
        </div>
        </div>
    )
}
