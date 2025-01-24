import { database, auth } from "../firebase-config"
import { useState, useEffect } from "react"
import { addDoc, collection, serverTimestamp,query, onSnapshot, where, orderBy } from "firebase/firestore";
import { MessageUser } from "./MessageUser";
import Cookies from "universal-cookie";
import { MessageOrther } from "./MessageOrther";

export const Chat = (props) => {
    const cookies = new Cookies()
    //console.log(cookies.get("user-info"));

    const userInfo = cookies.get("user-info"); // không cần parse
    const { room } = props;
    const [NewMessage, setNewMessage] = useState("");
    const [message, setMessage] = useState([]);
    const messageRef = collection(database, "message");
   
    useEffect(() => {
        const queryMessage = query(
            messageRef, 
            where("room", "==", room), 
            orderBy("time", "asc") // Sắp xếp theo thứ tự tăng dần
        ); 
        
        const unsubcrible = onSnapshot(queryMessage, (snapshot) => {
            let A_messages = [];
            snapshot.forEach((doc) => A_messages.push({...doc.data(), id: doc.id}));
            setMessage(A_messages);
        });
        return () => unsubcrible()
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(NewMessage === "" ) return;
        await addDoc(messageRef, 
            {
                uid: auth.currentUser.uid,
                text: NewMessage,
                time: serverTimestamp(),
                user: auth.currentUser.displayName,
                room,
                userImg: userInfo.photoURL,
                email: userInfo.email
            }
        );
        setNewMessage("");
    }
    console.log(auth.currentUser.uid);
    return (
    <div className="chatRoom">
        <div className="messages">
            <div className="message">
                {message.map((message) =>( auth.currentUser.uid === message.uid ? 
                <div className="userMessage"><MessageUser Message ={ message }/></div> : <div className="ortherMessage"><MessageOrther Message={ message }/></div>) )}
            </div>
        </div>
        
        <form onSubmit={handleSubmit} className="message-form">
            <input 
            className="message-input"
            onChange={(e) => setNewMessage(e.target.value)}
            value={NewMessage}/>       
            <button type="submit">
                Send
            </button>
        </form>
    </div>
    )
}