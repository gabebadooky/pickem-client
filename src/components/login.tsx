import { useEffect, useState } from "react";

const hostURL = 'http://127.0.0.1:5000/login';

interface UserLogin {
    username: string;
    password: string;
}

const LoginInputs = () => {
    const [usernamePopulated, setUsernamePopulated] = useState(false);
    const [passwordPopulated, setPasswordPopulated] = useState(false);

    const loginRequest = async (user: UserLogin) => {
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
                placeholder="Username or Email Address"
                type="text"
            />
            
            <input
                className="accountInputField"
                id="passwordInput"
                placeholder="Password"
                type="password"
            />
            
            <button
                className="submitButton"
                id="loginButton"
                //onClick={loginRequest({usernameInputValue, passwordInputValue})}
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