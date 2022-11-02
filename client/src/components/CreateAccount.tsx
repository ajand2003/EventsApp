import { useContext } from "react"
import { CreateAccountProps } from "./LoginPage"
import UserContext from "./UserContext";
import axios from "axios";

export default function CreateEvent({setNewAccount}: CreateAccountProps) {
    const {username,setUsername,password, setPassword,userType, setUserType} = useContext(UserContext)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();  
        const strippedUsername = username.replace(/\s+/g, '') //removes all whitespace from username
        const strippedPassword = password.replace(/\s + /g, '');
        if(strippedUsername === '' || userType === ''|| strippedPassword === '') {
            alert("Please Fill In All Fields");
        } else {
            const user = {
                username: username,
                password: password,
                userType: userType
            }
            axios.post('http://localhost:5000/users/add', user)
            .then(rs => {
                setNewAccount(false);
              })
              .catch((error) => {
                alert('Username already exists');
              })
        }
        setNewAccount(false);
    }
    const handleUserChange = (e: React.ChangeEvent<any>) => {
        const value = e.target.value
        setUsername(value)
    }
    const handlePasswordChange = (e: React.ChangeEvent<any>) => {
        const value = e.target.value
        setPassword(value)
    }
    const handleUserTypeChange = (e: React.ChangeEvent<any>) => {
        const value = e.target.value;
        setUserType(value);
      };
  return (
    <div className = 'create__event'>
        <form className = "submit__create" onSubmit = {handleSubmit}>
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
            <button className = "create__account" type = 'submit'>Create Account</button>
      </form>
    </div>
  )
}
