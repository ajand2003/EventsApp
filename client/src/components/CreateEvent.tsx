import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios";
import UserContext from "./UserContext";
import useOnclickOutside from "react-cool-onclickoutside";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";

export default function CreateEvent() {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
      } = usePlacesAutocomplete();
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [timeStart, setTimeStart] = useState('')
    const [timeEnd, setTimeEnd] = useState('')
    const [latlng, setLatLng] = useState<google.maps.LatLngLiteral>()
    const [desc, setDesc] = useState('')
    const [capacity, setCapacity] = useState(0);
    const [invite, setInvite] = useState(false);
    const {username} = useContext(UserContext)
    const navigate = useNavigate()
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
        console.log(event);
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
            <div className="time__inputs">
                <label onChange={handleTimeStartChange}>
                    <input type="time" name="timeStart" placeholder="00:00" />
                </label>
                -to-
                <label onChange={handleTimeEndChange}>
                    <input type="time" name="timeEnd" placeholder="23:59" />
                </label>
            </div>
            <div ref={ref}>
                <input
                    value={value}
                    onChange={handleLocationChange}
                    disabled={!ready}
                    placeholder="Location"
                />
                {/* We can use the "status" to decide whether we should display the dropdown or not */}
                {status === "OK" && <ul className="suggestions">{renderSuggestions()}</ul>}
            </div> 
            <div>
                <label onChange = {handleCapacityChange}>
                    <input type = "number" name = "capacity" placeholder="capacity" min = "1" max = "100000"></input>
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
                    <textarea cols={50} rows = {10} name = "desc" placeholder="description"/>
                </label>
            </div>     
            <button className = "create__button" type = 'submit'>Create Event</button>
      </form>
    </div>
  )
}
