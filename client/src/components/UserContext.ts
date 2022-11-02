import React from "react";

export interface UserContext {
  username: string;
  setUsername: (newString: string) => void;
  password: string;
  setPassword: (newPassword: string) => void;
  userType: string;
  setUserType: (newUserType: string) => void;
  eventId: string;
  setEventId: (newUserType: string) => void;
}

const defaultState: UserContext = {
  username: '',
  setUsername: () => {},
  password: '',
  setPassword: () => {},
  userType: '',
  setUserType: () => {},
  eventId: '',
  setEventId: () => {},
};

export default React.createContext(defaultState);