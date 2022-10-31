import { EventProps } from "./EventsPage"
export default function Event({act,host,title,desc,time,location}: EventProps) {
    const handleClick = ()=> {
        return 0;
    }
    return (
        <div className={act}>
            <div className = "event__body" onClick = {() => {handleClick()}}>
                <div className='event__title'>{title}</div>
                <p className='event__desc'>{desc}</p>
            </div>
            <ul><li className = "event__tags">{host}</li><li className = 'event__tags'>{time}</li><li className = 'event__tags'>{location}</li></ul>
        </div>
    )
}
