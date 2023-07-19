import React from "react";

const authData = {
  signedIn: false,
  user: null,
  token: '',
};

export default React.createContext({authData: {...authData}, setAuthData: (val) => {}});