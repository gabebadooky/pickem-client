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


const Login = ({ setAuthenticateUser }: { setAuthenticateUser: Function }) => {
    const [usernamePopulated, setUsernamePopulated] = useState<boolean>(false);
    const [passwordPopulated, setPasswordPopulated] = useState<boolean>(false);
    const [loginBody, setLoginBody] = useState<LoginBody>(NullLoginBody);
    const [warningMessageVisible, setWarningMessageVisible] = useState<boolean>(false);


    const TextInput = ({ id, placeholder, value }: { id: string, placeholder: string, value: string }) => {
        return (
            <input 
                className="accountInputField"
                id={id}
                onChange={handleTextInputChange}
                placeholder={placeholder}
                type="text"
                value={value}
            />
        )
    }
    

    const handleTextInputChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        const fieldID: string = e.currentTarget.id;
        const value: string = e.currentTarget.value;
        const inputPopulated: boolean = e.currentTarget.value.trim() !== "";
        
        setWarningMessageVisible(false);
        switch (fieldID) {
            case "usernameInput":
                setLoginBody(loginBody => ({ ...loginBody, username: value }));
                if (inputPopulated) {
                    setUsernamePopulated(true);
                } else {
                    setUsernamePopulated(false);
                }
                break;
            case "passwordInput":
                setLoginBody(loginBody => ({ ...loginBody, password: value }));
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
            if (response !== "") {
                setAuthenticateUser(response);
            } else {
                setWarningMessageVisible(true);
            }
        });
    }


    return (
        <div>
            <h1>Pickem</h1>

            {warningMessageVisible && <WarningMessage />}

            <TextInput id="usernameInput" placeholder="Username or Email Address" value={loginBody.username} />
            <TextInput id="passwordInput" placeholder="Password" value={loginBody.password} />
            
            {
                usernamePopulated && passwordPopulated
                    &&
                <button className="submitButton" id="loginButton" type="submit"
                    onClick={() => attemptLogin(loginBody)}
                >
                    Login
                </button>
            }
            
            <button className="hollowButton" id="createAccountButton" type="button">
                Create Account
            </button>
            
        </div>
    )
}

export default Login;