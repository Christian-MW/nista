import logo from './LogoMW.svg';
import { useEffect, useState } from 'react';
import React from 'react'
import jwt_decode from "jwt-decode";
import './App.css';


function App() {
  const [ user, setUser ] = useState({});

  function handleCallbackResponse(response){
    var userObject = jwt_decode(response.credential);
    setUser(userObject); 
    document.getElementById("signInID").hidden = true;
  }

  function handleSignOut(event){
    setUser({});
    document.getElementById("signInID").hidden = false;
  }

  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id: "1055165537799-j19roipq5ted53p82ul78rhgoaufutfd.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInID"),
      { theme: "outline", size: "large" }
    );

    //google.accounts.id.prompt();
    
  }, []);


  return (
    <div className="App">
      <div id="signInID"></div>
      { Object.keys(user).length != 0 &&
        <button onClick={ (e) => handleSignOut(e) }> Logout</button>
      }
      { user &&
        <div>
          <img src={user.picture}></img>
          <h3> {user.name} </h3>
        </div>
      }
    </div>
  );
}

export default App;
