import { useState } from "react";
import { loginRequest } from "../services/authAPI";
import { LoginBody, NullLoginBody } from "../types/user";


const WarningMessage = () => {
    return (
        <p
            className="warningMessage"
            id="loginWarning"
        >
            Username or Password is incorrect. Please try again.
        </p>
    );
}


const Login = ({ authenticateUser, setIsRegistering }: { authenticateUser: Function, setIsRegistering: Function }) => {
    const [usernamePopulated, setUsernamePopulated] = useState<boolean>(false);
    const [passwordPopulated, setPasswordPopulated] = useState<boolean>(false);
    const [loginBody, setLoginBody] = useState<LoginBody>(NullLoginBody);
    const [warningMessageVisible, setWarningMessageVisible] = useState<boolean>(false);
    

    const handleTextInputChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        const fieldID: string = e.currentTarget.id;
        const value: string = e.currentTarget.value;
        const inputPopulated: boolean = e.currentTarget.value.trim() !== "";
        
        setWarningMessageVisible(false);
        switch (fieldID) {
            case "usernameInput":
                setLoginBody(loginBody => ({ ...loginBody, username: value }));
                //setUsernameValue(value);
                if (inputPopulated) {
                    setUsernamePopulated(true);
                } else {
                    setUsernamePopulated(false);
                }
                break;
            case "passwordInput":
                setLoginBody(loginBody => ({ ...loginBody, password: value }));
                //setPasswordValue(value);
                if (inputPopulated) {
                    setPasswordPopulated(true);
                } else {
                    setPasswordPopulated(false);
                }
                break;
            default:
                break;
        }
    }

    const attemptLogin = (loginBody: LoginBody) => {
        loginRequest(loginBody)
        .then((response) => {
            if (response["access_token"] === "" || response["access_token"] === undefined) {
                setWarningMessageVisible(true);
            } else {
                authenticateUser(response["access_token"]);
            }
        });
    }


    return (
        <div>
            <h1>Pickem</h1>

            {warningMessageVisible && <WarningMessage />}

            <input 
                className="accountInputField"
                id="usernameInput"
                onChange={handleTextInputChange}
                placeholder="Username or Email Address"
                type="text"
                value={loginBody.username}
            />

            <input 
                className="accountInputField"
                id="passwordInput"
                onChange={handleTextInputChange}
                placeholder="Password"
                type="password"
                value={loginBody.password}
            />
            
            {
                usernamePopulated && passwordPopulated
                    &&
                <button className="submitButton" id="loginButton" type="submit"
                    onClick={() => attemptLogin(loginBody)}
                >
                    Login
                </button>
            }
            
            <button className="hollowButton" id="createAccountButton" type="button"
                onClick={() => setIsRegistering(true)}    
            >
                Create Account
            </button>
            
        </div>
    )
}

export default Login;