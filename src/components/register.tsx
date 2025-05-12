import { useEffect, useState } from "react";
import { getTeams } from "../services/picksAPI";
import { Team } from "../types/team";

import { registerNewUser } from "../services/authAPI";
import { User } from "../types/user";


const TeamOption = ({ team }: { team: Team }) => {
    return (
        <option value={team.teamID}>{team.teamName}</option>
    );
}

const WarningMessage = () => {
    return (
        <p className="warningMessage" id="loginWarning">
            Username already exists!
        </p>
    );
}


const RegisterInputs = ({ authenticateUser }: { authenticateUser: Function}) => {
    const [teams, setTeams] = useState(Array<Team>);
    const [usernamePopulated, setUsernamePopulated] = useState(false);
    const [passwordPopulated, setPasswordPopulated] = useState(false);
    const [confirmPasswordPopulated, setConfirmPasswordPopulated] = useState(false);
    const [warningMessageVisible, setWarningMessageVisible] = useState<boolean>(false);
    const [newUser, setNewUser] = useState<User>({
        username: "",
        password: ""
    });


    useEffect(() => {
        getTeams()
            .then(setTeams);
    }, []);


    const handleTextInputChange = ( e: React.FormEvent<HTMLInputElement> ) => {
        const field: string = e.currentTarget.id;
        const value: string = e.currentTarget.value;
        const inputPopulated: boolean = value.trim().length > 1;
        
        setWarningMessageVisible(false);

        switch (field) {
            case "usernameInput":
                setNewUser({ ...newUser, username: value });
                setUsernamePopulated(inputPopulated);
                break;
            case "passwordInput":
                setNewUser({ ...newUser, password: value });
                setPasswordPopulated(inputPopulated);
                break;
            case "confirmPasswordInput":
                setConfirmPasswordPopulated(inputPopulated);
                break;
            default:
                break;
        }
    }

    const handleSelectInputChange = ( e: React.ChangeEvent<HTMLSelectElement> ) => {
        const field: string = e.currentTarget.id;
        const value: string = e.currentTarget.value;

        setWarningMessageVisible(false);

        switch (field) {
            case "favoriteTeamInput":
                setNewUser({ ...newUser, favoriteTeam: value });
                break;
            case "notificationPreferenceInput":
                if (value === "e") {
                    setNewUser({ ...newUser, notificationPreference: "e"});
                } else if (value === "p") {
                    setNewUser({ ...newUser, notificationPreference: "p"});
                } else {
                    setNewUser({ ...newUser, notificationPreference: "n"});
                }
                break;
            default:
                break;

        }
        
    }


    const attemptRegistration = (newUser: User) => {
        registerNewUser(newUser)
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
            <input
                className="accountInputField"
                id="usernameInput"
                name="username"
                onInput={(e) => {handleTextInputChange(e)}}
                placeholder="Username"
                type="text"
            />

            <select 
                className="accountDropdownField"
                id="favoriteTeamInput"
                onChange={(e) => handleSelectInputChange(e)}
            >
                <option className="favoriteTeamOption" value={0}>Favorite Team</option>
                {teams.map((team: Team) => (
                    <TeamOption team={team} />
                ))}
            </select>

            <select
                className="accountDropdownField"
                id="notificationPreferenceInput"
                onChange={(e) => handleSelectInputChange(e)}
            >
                <option className="notificationPreferenceOption" value="e">Notification Preference</option>
                <option className="notificationPreferenceOption" value="e">Email</option>
                <option className="notificationPreferenceOption" value="p">Phone</option>
            </select>

            {
                newUser.notificationPreference === "e"
                    &&
                <input
                    className="accountInputField"
                    id="emailAddressInputField"
                    onInput={(e) => handleTextInputChange(e)}
                    placeholder="Email Address"
                    type="text"
                />

            }
            {
                newUser.notificationPreference === "p"
                    &&
                <input 
                    className="accountInputField"
                    id="phoneInputField"
                    onInput={(e) => handleTextInputChange(e)}
                    placeholder="Mobile Number"
                    type="text"
                />
            }
            
            <input
                className="accountInputField"
                id="passwordInput"
                onInput={(e) => handleTextInputChange(e)}
                placeholder="Password"
                type="password"
            />
            
            <input
                className="accountInputField"
                id="confirmPasswordInput"
                onInput={(e) => handleTextInputChange(e)}
                placeholder="Confirm Password"
                type="password" 
            />
            
            {
                usernamePopulated
                    &&
                passwordPopulated
                    &&
                confirmPasswordPopulated
                    &&
                <button className="submitButton" id="registerButton" type="submit"
                        onClick={() => attemptRegistration(newUser)} 
                >
                    Register
                </button>
            }
            
        </div>
    )
}

export default RegisterInputs;