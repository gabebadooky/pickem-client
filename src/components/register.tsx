import { useState } from "react";

const hostURL = "http://127.0.0.1:5000/register";

interface NewUser {
    username: string;
    password: string;
    favoriteTeam: string;
    notificationPreference: string;
    emailAddress: string;
    phone: string;
}

const RegisterInputs = () => {
    const [usernamePopulated, setUsernamePopulated] = useState(false);
    const [passwordPopulated, setPasswordPopulated] = useState(false);
    const [confirmPasswordPopulated, setConfirmPasswordPopulated] = useState(false);
    const [registerButtonVisible, setRegisterButtonVisible] = useState(false);
    let usernameInputValue: string;
    let passwordInputValue: string;
    let confirmPasswordInputValue: string;

    const registerRequest = async () => {
        const newUser: NewUser = {
            username: usernameInputValue,
            password: passwordInputValue//,
            //favoriteTeam: favoriteTeamInputValue,
            //notificationPreference: notificationPreferenceInputValue,
            //emailAddress: emailAddressInputValue,
            //phone: phoneInputValue
        };
        const response = await fetch(hostURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" }//,
            //body: JSON.stringify({{newUser}})
        });
        
        if (!response.ok) {
            console.log(`Request error! ${response.status}`);
        }
        const registerResponse = await response.json()
        return registerResponse;
    };

    return (
        <div>
            <input
                className="accountInputField"
                id="usernameInput"
                onChange={(e) => {
                    usernameInputValue = e.target.value;
                    if (e.target.value.length > 0) {
                        setUsernamePopulated(true);
                        // remove red border styling
                    } else {
                        setUsernamePopulated(false);
                        // apply red border styling
                    }

                    if (usernamePopulated && passwordPopulated && confirmPasswordPopulated) {
                        setRegisterButtonVisible(true);
                    } else {
                        setRegisterButtonVisible(false);
                    }
                }}
                placeholder="Username"
                type="text"
            />
            
            <input
                className="accountInputField"
                id="passwordInput"
                onChange={(e) => {
                    passwordInputValue = e.target.value;
                    if (e.target.value.length > 0) {
                        setPasswordPopulated(true);
                        // remove red border styling
                    } else {
                        setPasswordPopulated(false);
                        // apply red border styling
                    }

                    if (usernamePopulated && passwordPopulated && confirmPasswordPopulated) {
                        setRegisterButtonVisible(true);
                    } else {
                        setRegisterButtonVisible(false);
                    }
                }}
                placeholder="Password"
                type="password"
            />
            
            <input
                className="accountInputField"
                id="confirmPasswordInput"
                onChange={(e) => {
                    confirmPasswordInputValue = e.target.value;

                    if (e.target.value.length > 0) {
                        setConfirmPasswordPopulated(true);
                        if (e.target.value === passwordInputValue) {
                            // remove red border styling
                        } else {
                            // apply red border styling
                        }
                    } else {
                        setConfirmPasswordPopulated(false);
                        // apply red border styling
                    }

                    if (usernamePopulated && passwordPopulated && confirmPasswordPopulated) {
                        setRegisterButtonVisible(true);
                    } else {
                        setRegisterButtonVisible(false);
                    }
                }}
                placeholder="Confirm Password"
                type="text" 
            />
            
            <button 
                className="submitButton"
                hidden={registerButtonVisible}
                id="registerButton"
                onClick={() => {
                    if (registerButtonVisible && (passwordInputValue === confirmPasswordInputValue)) {
                        let registerResponse = registerRequest();
                        // check if response contains error message
                    } else {
                        // Display red border around missing input value
                    }
                }}
                type="submit"
            />
            
        </div>
    )
}

export default RegisterInputs;