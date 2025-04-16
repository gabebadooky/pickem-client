import { useEffect, useState } from "react";

const hostURL = "http://127.0.0.1:5000/login";

interface UserLogin {
    username: string;
    password: string;
}

const LoginInputs = () => {
    const [usernamePopulated, setUsernamePopulated] = useState(false);
    const [passwordPopulated, setPasswordPopulated] = useState(false);
    const [loginButtonHidden, setLoginButtonHidden] = useState(true);
    const [loginWarningHidden, setLoginWarningHidden] = useState(true);
    let usernameInputValue: string;
    let passwordInputValue: string;

    const loginRequest = async () => {
        const user: UserLogin = {
            username: usernameInputValue,
            password: passwordInputValue
        };
        const response = await fetch(hostURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({"username": user.username, "password": user.password})
        });
        
        if (!response.ok) {
            console.log(`Request error! ${response.status}`);
            setLoginWarningHidden(true);
        } else {
            // render picks component
        }
        
    };

    return (
        <div>

            <h1>Pickem</h1>

            <p
                className="warningMessage"
                hidden={loginWarningHidden}
                id="loginWarning"
            >
                Username or Password is incorrect. Please try again.
            </p>
            
            <input 
                className="accountInputField"
                id="usernameInput"
                onChange={(e) => {
                    usernameInputValue = e.currentTarget.value;
                    if (e.currentTarget.value.trim() === '') {
                        setUsernamePopulated(false);
                        setLoginButtonHidden(true);
                    } else{
                        setUsernamePopulated(true);
                        if (usernamePopulated && passwordPopulated) {
                            setLoginButtonHidden(false);
                        }
                    }
                }}
                placeholder="Username or Email Address"
                type="text"
            />
            
            <input
                className="accountInputField"
                id="passwordInput"
                onChange={(e) => {
                    passwordInputValue = e.currentTarget.value;
                    if (e.currentTarget.value.trim() === '') {
                        setPasswordPopulated(false);
                        setLoginButtonHidden(true);
                    } else {
                        setPasswordPopulated(true);
                        if (usernamePopulated && passwordPopulated) {
                            setLoginButtonHidden(false);
                        }
                    }
                }}                
                placeholder="Password"
                type="password"
            />
            
            <button
                className="submitButton"
                hidden={loginButtonHidden}
                id="loginButton"
                onClick={(e) => {
                    if (!e.currentTarget.hidden) {
                        loginRequest();
                    }
                }}
                type="submit"                
            >
                Login
            </button>
            
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