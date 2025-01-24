
import {auth, provider} from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";

const cookies = new Cookies();
export const Auth = (props) => {
    const {setIsAuth} = props;
    const SignInWithGoogle = async () => {
        const results = await signInWithPopup(auth, provider);
        //console.log(results);
        cookies.set("auth-token", results.user.stsTokenManager.refreshToken);
        cookies.set("user-info", JSON.stringify({
            email: results.user.email,
            photoURL: results.user.photoURL,
            displayName: results.user.displayName
        }));
        //console.log(cookies);
        setIsAuth(true);
        // console.log("Results User:", results.user);
        // console.log("Results User:", results.user.email);
    };
    
    return <div className="auth">
        <p className="welcome">Welcome to myChatApp</p>
        <p>Sign in with Google</p>
        <button onClick={SignInWithGoogle}>Sign In</button>
    </div>
}