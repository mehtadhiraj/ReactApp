import React from 'react';
import { Provider } from "react-redux";
import { StoreConfiguration } from "../store";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Navbar";
import Main from "./Main";
import { setAuthorization, setUser } from "../store/actions/auth";
import jwtDecode from "jwt-decode";

// Include store configuration from store/index
const storeConfig = StoreConfiguration();


if(localStorage.jwtToken){
  setAuthorization(localStorage.jwtToken);
  try {
    storeConfig.dispatch(setUser(jwtDecode(localStorage.jwtToken)))
  } catch (error) {
    storeConfig.dispatch(setUser(jwtDecode({})));
  }
}

function App() {
  return (
    // Provide store to the application
    <Provider store={storeConfig}>
      <Router> 
        <Navbar /> 
        <Main />
      </Router>
    </Provider>
    );
}

export default App;
