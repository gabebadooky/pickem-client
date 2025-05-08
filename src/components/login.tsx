import { useState } from "react";
import { loginRequest } from "../services/authAPI";
import { LoginBody } from "../types/user";


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


const LoginInputs = () => {
    const [usernamePopulated, setUsernamePopulated] = useState(false);
    const [passwordPopulated, setPasswordPopulated] = useState(false);
    const [loginWarningHidden, setLoginWarningHidden] = useState(true);
    const [loginBody, setLoginBody] = useState<LoginBody>();
    

    const handleTextInputChange = ( e: React.FormEvent<HTMLInputElement> ) => {
        const fieldID: string = e.currentTarget.id;
        const value: string = e.currentTarget.value;
        const inputPopulated: boolean = e.currentTarget.value.trim().length > 1;
        
        switch (fieldID) {
            case "usernameInput":
                setLoginBody({ ...loginBody, [username]: value });
                if (inputPopulated) {
                    setUsernamePopulated(true);
                } else {
                    setUsernamePopulated(false);
                }
                break;
            case "passwordInput":
                setPasswordInputValue(value);
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


    return (
        <div>

            <h1>Pickem</h1>

            <WarningMessage />
            
            <input 
                className="accountInputField"
                id="usernameInput"
                onInput={handleTextInputChange}
                placeholder="Username or Email Address"
                type="text"
            />
            
            <input
                className="accountInputField"
                id="passwordInput"
                onInput={handleTextInputChange}
                placeholder="Password"
                type="password"
            />

            {
                usernamePopulated
                    &&
                passwordPopulated
                    &&
                <button
                    className="submitButton"
                    id="loginButton"
                    onClick={loginRequest(loginBody)}
                    type="submit"                
                >
                    Login
                </button>
            }
            
            <button 
                className="hollowButton"
                id="createAccountButton"
                type="button"
            >
                Create Account
            </button>
            
        </div>
    )
}

export default LoginInputs;