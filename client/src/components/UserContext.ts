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
  sorting: string;
  setSorting: (newString: string) => void;
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
  sorting: '',
  setSorting: () => {}
};

export default React.createContext(defaultState);