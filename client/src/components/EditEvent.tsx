import { useState, useContext, useEffect } from "react"
import EventsPage, { EditProps, EventProps } from "./EventsPage"
import { useNavigate } from "react-router-dom"
import axios from "axios";
import UserContext from "./UserContext";
import useOnclickOutside from "react-cool-onclickoutside";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  export default function EditEvent({setUpdate, removeEvent, index, setIsEditing}:EditProps){    
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
      } = usePlacesAutocomplete();
    const [title, setTitle] = useState('')
    const [loaded, setLoaded] = useState(false)
    const [date, setDate] = useState('')
    const [timeStart, setTimeStart] = useState('')
    const [timeEnd, setTimeEnd] = useState('')
    const [latlng, setLatLng] = useState<google.maps.LatLngLiteral>()
    const [desc, setDesc] = useState('')
    const [capacity, setCapacity] = useState(0);
    const [invite, setInvite] = useState(false);
    const {username, eventId} = useContext(UserContext)
    const navigate = useNavigate()
  
    let oldCapacity = 0;
    const url = "http://localhost:5000/events/" + eventId;
    const handleSubmit = () => {
        getGeocode({ address: value}).then((results) => {
            console.log(results)
            const { lat, lng } = getLatLng(results[0]);
            setLatLng({lat, lng});
          });
        const latlngtemp = {
            lat: latlng?.lat,
            lng: latlng?.lng
        }
        console.log(latlngtemp)
        const event = {
            title: title,
            date: date,
            timeStart: timeStart,
            timeEnd: timeEnd,
            location: value,
            latlng: latlngtemp,
            desc: desc,
            host: username,
            capacity: capacity,
            invite: invite
        }
        const config = {
            data: {
              _id: eventId
            }
          }
        
        axios.delete('http://localhost:5000/events/delete', config)
        removeEvent(index);

        console.log(event);
        axios.post('http://localhost:5000/events/add', event)
        .then(rs => {
            console.log("Event Added");
        })

        setIsEditing(false);
        setUpdate(true);
    }
    const handleTitleChange = (e: React.ChangeEvent<any>) => {
        const value = e.target.value
        console.log(value)
        setTitle(value)    
    }
    const handleDateChange = (e: React.ChangeEvent<any>) => {
        const value = e.target.value
        setDate(value)
    }
    const handleTimeStartChange = (e: React.ChangeEvent<any>) => {
        const value = e.target.value
        setTimeStart(value)
    }
    const handleTimeEndChange = (e: React.ChangeEvent<any>) => {
        const value = e.target.value
        setTimeEnd(value)
    }
    const handleLocationChange = (e: React.ChangeEvent<any>) => {
        setValue(e.target.value)
    }
    const handleDescChange = (e: React.ChangeEvent<any>) => {
        const value = e.target.value
        setDesc(value)
    }
    const handleCapacityChange = (e: React.ChangeEvent<any>) => {
        const value = e.target.value
        setCapacity(value)
    }
    const handleInvite = (e: React.ChangeEvent<any>) => {
        const value = e.target.value
        if (value == "Invite") {
            setInvite(true);
        } else {
            setInvite(false);
        }
    }
    const handleSelect =
    (description: any) =>
    () => {
      setValue(description.description, false);
      clearSuggestions();
      getGeocode({ address: description.description}).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        setLatLng({lat, lng});
      });
    };
  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });
  const renderSuggestions = () =>
  data.map((suggestion) => {
    const {
      place_id,
      structured_formatting: { main_text, secondary_text },
    } = suggestion;

    return (
      <li key={place_id} onClick={handleSelect(suggestion)}>
        <strong>{main_text}</strong> <small>{secondary_text}</small>
      </li>
    );
  });

  useEffect(() => {
    if (!loaded) {
        axios.get(url)
        .then(rs => {         
            let temp = rs.data;
            setDesc(temp.desc)
            setTitle(temp.title)
            setDate(temp.date)
            setTimeStart(temp.timeStart)
            setTimeEnd(temp.timeEnd)
            setCapacity(temp.capacity)
            setValue(temp.location)
            setLoaded(true)
      });
    }
  })
  return (
    <div className = 'create__event'>
        <form className = "submit__create" onSubmit = {handleSubmit}>
            <div>
            <label onChange={handleTitleChange}>
            <input type="title" name="title" value = {title} />
            </label>
            </div>
            <div>
                <label onChange={handleDateChange}>
                <input type="date" name="date" value={date} />
                </label>
            </div>
            <div className="time__inputs">
                <label onChange={handleTimeStartChange}>
                    <input type="time" value = {timeStart} name="timeStart"/>
                </label>
                -to-
                <label onChange={handleTimeEndChange}>
                    <input type="time" value = {timeEnd} name="timeEnd"/>
                </label>
            </div>
            <div ref={ref}>
                <input
                    value={value}
                    onChange={handleLocationChange}
                    disabled={!ready}
                    
                />
                {/* We can use the "status" to decide whether we should display the dropdown or not */}
                {status === "OK" && <ul className="suggestions">{renderSuggestions()}</ul>}
            </div> 
            <div>
                <label onChange = {handleCapacityChange}>
                    <input type = "number" name = "capacity" value = {capacity} min = "1" max = "100000"></input>
                </label>
            </div>
            <div>
                <label onChange = {handleInvite}>
                    <select defaultValue = "Open">
                        <option value = "Open">Open</option>
                        <option value = "Invite">Invite Only</option>
                    </select>
                </label>
            </div>
            <div className="event__description">
                <label onChange={handleDescChange}>
                    <textarea cols={50} rows = {10} name = "desc" value={desc}/>
                </label>
            </div>     
            <button className = "create__button" type = 'submit'>Edit Event</button>
      </form>
    </div>
  )
}