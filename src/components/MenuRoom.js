
import { useRef } from "react";


export const MenuRoom = (props) => {
    const { setRoom } = props;
    const roomInputRef = useRef(null);
    return (
        <div className="menu-room">
          <label>Enter room's name: </label>
          <input ref={roomInputRef}/>
          <button onClick={() =>
            setRoom(roomInputRef.current.value)}>Enter chat</button>
        </div>
    )
}