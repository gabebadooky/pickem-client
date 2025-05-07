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

const RegisterButton = ({ onClick }: { onClick: Function}) => {
    return (
        <button 
            className="submitButton"
            id="registerButton"
            onClick={() => onClick}
            type="submit"
        >
            Register
        </button>
    );
}


const RegisterInputs = () => {
    const [teams, setTeams] = useState(Array<Team>);
    const [usernamePopulated, setUsernamePopulated] = useState(false);
    const [passwordPopulated, setPasswordPopulated] = useState(false);
    const [confirmPasswordPopulated, setConfirmPasswordPopulated] = useState(false);
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
        setNewUser({ ...newUser, [field]: value });

        switch (field) {
            case "usernameInput":
                setUsernamePopulated(inputPopulated);
                break;
            case "passwordInput":
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
        const field: string = e.currentTarget.className;
        const value: string = e.currentTarget.value;
        setNewUser({ ...newUser, [field]: value });
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
                <option className="notificationPreferenceOption" value="n">None</option>
                <option className="notificationPreferenceOption" value="e">Email</option>
                <option className="notificationPreferenceOption" value="p">Phone</option>
            </select>

            <input
                className="accountInputField"
                id="emailAddressInputField"
                onInput={(e) => handleTextInputChange(e)}
                placeholder="Email Address"
                type="text"
            />

            <input 
                className="accountInputField"
                id="phoneInputField"
                onInput={(e) => handleTextInputChange(e)}
                placeholder="Mobile Number"
                type="text"
            />
            
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
                type="text" 
            />
            
            {
                usernamePopulated
                    &&
                passwordPopulated
                    &&
                confirmPasswordPopulated
                    &&
                <RegisterButton onClick={registerNewUser} />   
            }
            
        </div>
    )
}

export default RegisterInputs;