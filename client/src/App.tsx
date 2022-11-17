import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './components/LoginPage';
import {useState} from 'react'
import EventsPage from './components/EventsPage';
import UserContext from './components/UserContext';
import { BrowserRouter } from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import CreateEvent from './components/CreateEvent';
import EditEvent from './components/EditEvent';

export interface LoginProps {
  handleLogIn: () => void
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [eventId, setEventId] = useState('')
  const handleLogIn = () => {
    setIsLoggedIn(true);
  }
  return (
    <UserContext.Provider value = {{eventId, setEventId, username,setUsername,password,setPassword,userType,setUserType}}>
      <div className="App">
        {!isLoggedIn &&<LoginPage handleLogIn={handleLogIn}></LoginPage>}
        {isLoggedIn && 
        <BrowserRouter>
          <Routes>
            <Route path = "/" element = {<div><Navbar /><EventsPage /></div>}> </Route>
            <Route path = "/calendar" element = {<div><Navbar /></div>}></Route>
            <Route path = "/map" element = {<div><Navbar /></div>}> </Route>
            <Route path = "/create" element = {<div><Navbar /><CreateEvent /></div>}> </Route>
          </Routes>
        </BrowserRouter>
          }
      </div>
    </UserContext.Provider>
  );
}

export default App;
