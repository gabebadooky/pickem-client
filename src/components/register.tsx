import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Game } from "../types/game";
import { Team } from "../types/team";
import { User } from "../types/user";
import { registerNewUser } from "../services/authAPI";
import { getTeams } from "../services/picksAPI";


type Props = {
    validateToken: Function;
    games: Game[];
    teams: Team[];
}


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


const Register = (props: Props) => {
    const [teams, setTeams] = useState(Array<Team>);
    const [usernamePopulated, setUsernamePopulated] = useState(false);
    const [passwordPopulated, setPasswordPopulated] = useState(false);
    const [confirmPasswordPopulated, setConfirmPasswordPopulated] = useState(false);
    const [warningMessageVisible, setWarningMessageVisible] = useState<boolean>(false);
    const [newUser, setNewUser] = useState<User>({
        username: "",
        password: ""
    });
    const navigate = useNavigate();


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


    const attemptRegistration = (e: FormEvent) => {
        e.preventDefault;

        registerNewUser(newUser)
        .then((response) => {
            if (response?.access_token) {
                localStorage.setItem("jwt", response["access_token"]);
                navigate("/picks", { state: {props} });
            } else {
                setWarningMessageVisible(true);
            }
        })
        .catch((err) => {
            console.log(err);
            setWarningMessageVisible(true);
        });
    }


    return (
        <div>
            <h1 className="mt-25 text-xl">Register</h1>
            
            <br />
            
            <input
                autoComplete="username"
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
                    <TeamOption key={team.teamID} team={team} />
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
                autoComplete="new-password"
                className="bg-[#D9D9D9] text-black mb-3 w-48 rounded-xl text-center"
                id="passwordInput"
                onInput={(e) => handleTextInputChange(e)}
                placeholder="Password"
                type="password"
            />

            <br />
            
            <input
                autoComplete="new-password"
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
                            onClick={(e) => attemptRegistration(e)} 
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

            <button className="mb-5 w-48 px-2 py-1 rounded-lg border-1 border-white"
                onClick={() => {
                    navigate("/login", { state: {props} });
                }}
            >
                Login
            </button>
        </div>
    )
}

export default Register;