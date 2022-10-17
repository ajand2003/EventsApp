import { useState, useContext } from "react"
import { LoginProps } from "../App";
import UserContext from "./UserContext";
export default function LoginPage({handleLogIn}: LoginProps) {
    const [isStarted, setIsStarted] = useState(false);
    const {username,setUsername,password, setPassword,userType, setUserType} = useContext(UserContext)
    const handleSubmit = async (e: React.FormEvent) => {
        const strippedUsername = username.replace(/\s+/g, '') //removes all whitespace from username
        const strippedPassword = password.replace(/\s + /g, '');
        e.preventDefault();  
        if(strippedUsername === '' || userType === ''|| strippedPassword === '') {
            alert("Please Fill In All Fields");
        } else {
            handleLogIn();
        }
        
        
    };
    const handleUserChange = (e: React.ChangeEvent<any>) => {
        const value = e.target.value;
        setUsername(value);
      };
    const handlePasswordChange = (e: React.ChangeEvent<any>) => {
        const value = e.target.value;
        setPassword(value);
      };
      const handleUserTypeChange = (e: React.ChangeEvent<any>) => {
        const value = e.target.value;
        setUserType(value);
      };
  return (
    <div className = 'login__page'>
        {!isStarted && <button className="start__button" onClick = {() => {setIsStarted(true)}}>Start</button> }
        {isStarted &&
        <form className = "submit__form" onSubmit = {handleSubmit}>
            <div>
            <label onChange={handleUserChange}>
            <input type="username" name="username" placeholder="username" />
            </label>
            </div>
            <div>
                <label onChange={handlePasswordChange}>
                <input type="password" name="password" placeholder="password" />
                </label>
            </div>
            <div>
            <label>
                <select onChange = {handleUserTypeChange} id="user" name="user">
                    <option selected disabled>--Who Are You?--</option>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="organizer">Organizer</option>
                </select>
            </label>
            </div>
            <button type = 'submit'>Log In</button>
      </form>
        }
    </div>
  )
}
