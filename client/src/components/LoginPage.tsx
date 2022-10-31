import { useState, useContext } from "react"
import { LoginProps } from "../App";
import UserContext from "./UserContext";
import CreateAccount from "./CreateAccount"
import axios from "axios";

export interface CreateAccountProps {
    setNewAccount: (t: boolean) => void
}

export default function LoginPage({handleLogIn}: LoginProps) {
    const [isStarted, setIsStarted] = useState(false);
    const [newAccount, setNewAccount] = useState(false);
    const {username,setUsername,password, setPassword,userType, setUserType} = useContext(UserContext)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const user = {
            username: username,
            password: password
        }
        axios.post('http://localhost:5000/users/login', user)
        .then(rs => {
          handleLogIn();
        })
        .catch((error) => {
          console.log(error);
        })
  

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
    <div>
    {!newAccount && <div className = 'login__page'>
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
            <button className = 'login__button' type = 'submit'>Log In</button>
            <button className = "create__account" onClick={() => {setNewAccount(true)}}>Create Account</button>
      </form>
        }
    </div>}
    {newAccount && <CreateAccount setNewAccount={setNewAccount}/>}
    </div>
  )
}
