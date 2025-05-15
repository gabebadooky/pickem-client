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
        <p className="mt-5 text-red-500" id="loginWarning">
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
                if (value === newUser.password) {
                    setConfirmPasswordPopulated(inputPopulated);
                }
                
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
            <h1 className="mt-25 text-xl">Register</h1>
            
            <br />
            
            <input
                className="bg-[#D9D9D9] text-black mb-7 w-48 rounded-xl text-center"
                id="usernameInput"
                name="username"
                onInput={(e) => {handleTextInputChange(e)}}
                placeholder="Username"
                type="text"
            />

            <br />

            <select 
                className="bg-[#D9D9D9] text-black mb-3 w-48 rounded-xl text-center"
                id="favoriteTeamInput"
                onChange={(e) => handleSelectInputChange(e)}
            >
                <option className="favoriteTeamOption" value={0}>Favorite Team</option>
                {teams.map((team: Team) => (
                    <TeamOption team={team} />
                ))}
            </select>

            <br />

            <select
                className="bg-[#D9D9D9] text-black mb-7 w-48 rounded-xl text-center"
                id="notificationPreferenceInput"
                onChange={(e) => handleSelectInputChange(e)}
            >
                <option className="notificationPreferenceOption" value="n">Notification Preference</option>
                <option className="notificationPreferenceOption" value="e">Email</option>
                <option className="notificationPreferenceOption" value="p">Phone</option>
            </select>

            <br />

            {
                newUser.notificationPreference === "e"
                    &&
                <>
                    <input
                        className="bg-[#D9D9D9] text-black mb-3 w-48 rounded-xl text-center"
                        id="emailAddressInputField"
                        onInput={(e) => handleTextInputChange(e)}
                        placeholder="Email Address"
                        type="text"
                    />
                    <br />
                </>
            }
            {
                newUser.notificationPreference === "p"
                    &&
                <>
                    <input 
                        className="bg-[#D9D9D9] text-black mb-3 w-48 rounded-xl text-center"
                        id="phoneInputField"
                        onInput={(e) => handleTextInputChange(e)}
                        placeholder="Mobile Number"
                        type="text"
                    />
                    <br />
                </>
            }
            
            <input
                className="bg-[#D9D9D9] text-black mb-3 w-48 rounded-xl text-center"
                id="passwordInput"
                onInput={(e) => handleTextInputChange(e)}
                placeholder="Password"
                type="password"
            />

            <br />
            
            <input
                className="bg-[#D9D9D9] text-black mb-7 w-48 rounded-xl text-center"
                id="confirmPasswordInput"
                onInput={(e) => handleTextInputChange(e)}
                placeholder="Confirm Password"
                type="password" 
            />

            <br />
            
            {
                usernamePopulated
                    &&
                passwordPopulated
                    &&
                confirmPasswordPopulated
                    &&
                <>
                    <button className="bg-[#17C120] w-48 rounded-xl" id="registerButton" type="submit"
                            onClick={() => attemptRegistration(newUser)} 
                    >
                        Register
                    </button>
                    <br />
                </>
            }

            {
                warningMessageVisible
                    &&
                <WarningMessage />
            }
            
        </div>
    )
}

export default RegisterInputs;