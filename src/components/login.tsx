import { useState } from "react";

const hostURL = 'http://127.0.0.1:5000/login';

interface UserLogin {
    username: string;
    password: string;
}

const LoginInputs = () => {
    const [usernamePopulated, setUsernamePopulated] = useState(false);
    const [passwordPopulated, setPasswordPopulated] = useState(false);
    const [loginButtonVisible, setLoginButtonVisible] = useState(false);
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
            body: JSON.stringify({username: user.username, password: user.password})
        });
        
        if (!response.ok) {
            console.log(`Request error! ${response.status}`);
        }
        const loginResponse = await response.json()
        return loginResponse;
    };

    return (
        <div>

            <h1>Pickem</h1>
            
            <input 
                className="accountInputField"
                id="usernameInput"
                onChange={(e) => {
                    usernameInputValue = e.target.value;
                    if (e.target.value.length > 0) {
                        setUsernamePopulated(true);
                    } else {
                        setUsernamePopulated(false);
                    }

                    if (usernamePopulated && passwordPopulated) {
                        setLoginButtonVisible(true);
                    }
                }}
                placeholder="Username or Email Address"
                type="text"
            />
            
            <input
                className="accountInputField"
                id="passwordInput"
                onChange={(e) => {
                    passwordInputValue = e.target.value;
                    if (e.target.value.length > 0) {
                        setPasswordPopulated(true);
                    } else {
                        setPasswordPopulated(false);
                    }

                    if (usernamePopulated && passwordPopulated) {
                        setLoginButtonVisible(true);
                    }
                }}
                placeholder="Password"
                type="password"
            />
            
            <button
                className="submitButton"
                hidden={loginButtonVisible}
                id="loginButton"
                onClick={(e) => {
                    if (!e.currentTarget.hidden) {
                        // Todo: Render Register component 
                    }
                }}
                type="submit"                
            />
            
            <button 
                className="hollowButton"
                id="createAccountButton"
                type="button"
            />
            
        </div>
    )
}

export default LoginInputs;