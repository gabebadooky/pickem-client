import { useEffect, useState } from "react";

const hostURL = "http://127.0.0.1:5000/register";
const teamsURL = "http://127.0.0.1:5000/teams";

type NotificationPreferenceInputValue = "n" | "e" | "p";

interface NewUser {
    username: string;
    password: string;
    favoriteTeam?: string;
    notificationPreference?: NotificationPreferenceInputValue;
    emailAddress?: string;
    phone?: string;
}


const RegisterInputs = () => {
    useEffect(() => {
        fetch(teamsURL)
        .then(res => res.json())
        .then(data => setTeams(data));
    }, []);
    const [teams, setTeams] = useState([]);
    const [usernamePopulated, setUsernamePopulated] = useState(false);
    const [passwordPopulated, setPasswordPopulated] = useState(false);
    const [confirmPasswordPopulated, setConfirmPasswordPopulated] = useState(false);
    const [registerButtonVisible, setRegisterButtonVisible] = useState(false);    
    const [newUser, setNewUser] = useState<NewUser>({
        username: "",
        password: ""
    });
    let confirmPasswordInputValue: string;


    async function registerRequest() {
        const response = await fetch(hostURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "username": newUser.username,
                "password": newUser.password,
                "favoriteTeam": newUser.favoriteTeam,
                "notificationPreference": newUser.notificationPreference,
                "emailAddress": newUser.emailAddress,
                "phone": newUser.phone
            })
        });

        if (!response.ok) {
            console.log(`Request error! ${response.status}`);
        }
        const registerResponse = await response.json();
        return registerResponse;
    }

    const generateTeamsOptions = () => {
        let options: string;
        teams.forEach(team => {
            let option = `<option value=${team.teamID}>${team.teamName}</option>`;
            options += option;
        });
    }

    return (
        <div>
            <input
                className="accountInputField"
                id="usernameInput"
                onInput={(e) => {
                    setNewUser({ ...newUser, username: e.currentTarget.value});
                    if (e.currentTarget.value.length > 0) {
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

            <select 
                className="accountDropdownField"
                id="favoriteTeamInput"
                onChange={(e) => { setNewUser({ ...newUser, favoriteTeam: e.currentTarget.value }) }}
            >
                
            </select>

            <select
                className="accountDropdownField"
                id="notificationPreferenceInput"
                onChange={(e) => {
                    switch (e.currentTarget.value) {
                        case "n": 
                            setNewUser({ ...newUser, notificationPreference: "n"});
                            break;
                        case "e":
                            setNewUser({ ...newUser, notificationPreference: "e"});
                            break;
                        case "p":
                            setNewUser({ ...newUser, notificationPreference: "n"});
                            break;
                        default:
                            console.log(`Invalid notification preference provided: ${e.currentTarget.value}`);
                            break;
                    }
                }}
            >
                <option value="n">None</option>
                <option value="e">Email</option>
                <option value="p">Phone</option>
            </select>

            <input
                className="accountInputField"
                id="emailAddressInputField"
                onInput={(e) => { setNewUser({ ...newUser, emailAddress: e.currentTarget.value}); }}
                placeholder="Email Address"
                type="text"
            />

            <input 
                className="accountInputField"
                id="phoneInputField"
                onInput={(e) => { setNewUser({ ...newUser, phone: e.currentTarget.value }); }}
                placeholder="Mobile Number"
                type="text"
            />
            
            <input
                className="accountInputField"
                id="passwordInput"
                onInput={(e) => {
                    setNewUser({ ...newUser, password: e.currentTarget.value });
                    if (e.currentTarget.value.length > 0) {
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
                onInput={(e) => {
                    confirmPasswordInputValue = e.currentTarget.value;
                    if (e.currentTarget.value.length > 0) {
                        setConfirmPasswordPopulated(true);
                        if (newUser.password === e.currentTarget.value) {
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
                    if (registerButtonVisible && (newUser.password === confirmPasswordInputValue)) {
                        registerRequest();
                    } else {
                        // Display red border around invalid input value
                    }
                }}
                type="submit"
            />
            
        </div>
    )
}

export default RegisterInputs;