import React, {useState, useRef} from "react";
import "./App.css";
import { Auth } from "./components/Auth";
import Cookies from "universal-cookie";
import { Chat } from "./components/Chat"
import { MenuRoom } from "./components/MenuRoom"

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(!!cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

 
  
  if(!isAuth){
    return (
    <div className="App">
          <Auth setIsAuth={setIsAuth}/>
    </div>
    )
  }
  if (!room) {
    return (
      <div className="menu">
        <MenuRoom setRoom = { setRoom }/>
        <div className="menu-img"></div>
      </div>
    )
  }


  return (
    <div className="menu">
        <MenuRoom setRoom = { setRoom }/>
        <Chat key={room} room = { room } />
    </div>
  )
 
}

export default App;
