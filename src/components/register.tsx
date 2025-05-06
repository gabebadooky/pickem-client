import { useEffect, useState } from "react";
import { getTeams } from "../services/picksAPI";
import { Team } from "./team";

import { registerNewUser } from "../services/authAPI";

import { User } from "../types/user";


const TeamOption = ({ team }: { team: Team}) => {
    return (
        <option value={team.teamID}>{team.teamName}</option>
    );
}


const RegisterInputs = () => {
    const [teams, setTeams] = useState(Array<Team>);
    const [usernamePopulated, setUsernamePopulated] = useState(false);
    const [passwordPopulated, setPasswordPopulated] = useState(false);
    const [confirmPasswordPopulated, setConfirmPasswordPopulated] = useState(false);
    const [registerButtonHidden, setRegisterButtonHidden] = useState(true);  
    const [loggedIn, setLoggedIn] = useState(false);
    const [newUser, setNewUser] = useState<User>({
        username: "",
        password: ""
    });
    let confirmPasswordInputValue: string;


    useEffect(() => {
        getTeams()
            .then(setTeams);
    }, []);


    return (
        <div>
            <input
                className="accountInputField"
                id="usernameInput"
                onInput={(e) => {
                    setNewUser({ ...newUser, username: e.currentTarget.value});
                    if (e.currentTarget.value.trim() === '') {
                        setUsernamePopulated(false);
                        // remove red border styling
                    } else {
                        setUsernamePopulated(true);
                        // apply red border styling
                    }

                    if (usernamePopulated && passwordPopulated && confirmPasswordPopulated) {
                        setRegisterButtonHidden(false);
                    } else {
                        setRegisterButtonHidden(true);
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
                <option value={0}>Favorite Team</option>
                {teams.map((team: Team) => (
                    <TeamOption team={team} />
                ))}
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
                    if (e.currentTarget.value.trim() === '') {
                        setPasswordPopulated(false);
                        // remove red border styling
                    } else {
                        setPasswordPopulated(true);
                        // apply red border styling
                    }

                    if (usernamePopulated && passwordPopulated && confirmPasswordPopulated) {
                        setRegisterButtonHidden(false);
                    } else {
                        setRegisterButtonHidden(true);
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
                    if (e.currentTarget.value.trim() === '') {
                        setConfirmPasswordPopulated(false);
                        if (newUser.password === e.currentTarget.value) {
                            // remove red border styling
                        } else {
                            // apply red border styling
                        }
                    } else {
                        setConfirmPasswordPopulated(true);
                        // apply red border styling
                    }

                    if (usernamePopulated && passwordPopulated && confirmPasswordPopulated) {
                        setRegisterButtonHidden(false);
                    } else {
                        setRegisterButtonHidden(true);
                    }
                }}
                placeholder="Confirm Password"
                type="text" 
            />
            
            <button 
                className="submitButton"
                hidden={registerButtonHidden}
                id="registerButton"
                onClick={() => {
                    if (!registerButtonHidden && (newUser.password === confirmPasswordInputValue)) {
                        registerNewUser(newUser)
                            .then(() => (setLoggedIn(true)));
                    } else {
                        // Display red border around invalid input value
                    }
                }}
                type="submit"
            >
                Register
            </button>
            
        </div>
    )
}

export default RegisterInputs;