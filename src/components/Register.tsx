import { FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Team } from "../types/team";
import { User } from "../types/user";
import { registerNewUser } from "../services/authAPI";


type Props = {
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
    //const [teams, setTeams] = useState(Array<Team>);
    const [usernamePopulated, setUsernamePopulated] = useState(false);
    const [passwordPopulated, setPasswordPopulated] = useState(false);
    const [confirmPasswordPopulated, setConfirmPasswordPopulated] = useState(false);
    const [warningMessageVisible, setWarningMessageVisible] = useState<boolean>(false);
    const [newUser, setNewUser] = useState<User>({
        username: "",
        password: ""
    });
    const location = useLocation();
    const navigate = useNavigate();
    location.state;
    console.log(`teams: ${location.state.teams}`);


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
                navigate("/");
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
                className="bg-[#D9D9D9] h-8 mb-7 rounded-xl text-black text-center w-[90%]"
                id="usernameInput"
                name="username"
                onInput={(e) => {handleTextInputChange(e)}}
                placeholder="Username"
                type="text"
            />

            <br />

            <select 
                className="bg-[#D9D9D9] h-8 mb-3 rounded-xl text-black text-center w-[90%]"
                id="favoriteTeamInput"
                onChange={(e) => handleSelectInputChange(e)}
            >
                <option className="favoriteTeamOption" value={0}>Favorite Team</option>
                {location.state.teams.map((team: Team) => (
                    <TeamOption key={team.teamID} team={team} />
                ))}
            </select>

            <br />

            <select
                className="bg-[#D9D9D9] h-8 mb-7 rounded-xl text-black text-center w-[90%]"
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
                        className="bg-[#D9D9D9] h-8 mb-3 rounded-xl text-black text-center w-[90%]"
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
                        className="bg-[#D9D9D9] h-8 mb-3 rounded-xl text-black text-center w-[90%]"
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
                className="bg-[#D9D9D9] h-8 mb-3 rounded-xl text-black text-center w-[90%]"
                id="passwordInput"
                onInput={(e) => handleTextInputChange(e)}
                placeholder="Password"
                type="password"
            />

            <br />
            
            <input
                autoComplete="new-password"
                className="bg-[#D9D9D9] h-8 mb-7 text-black rounded-xl text-center w-[90%]"
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
                    <button className="bg-[#17C120] h-8 rounded-xl w-[90%]" id="registerButton" type="submit"
                            onClick={(e) => attemptRegistration(e)} 
                    >
                        Register
                    </button>
                    <br />
                    <br />
                </>
            }

            {
                warningMessageVisible
                    &&
                <WarningMessage />
            }

            <button className="border-1 border-white mb-5 px-2 py-1 rounded-lg w-[90%]"
                onClick={() => {
                    navigate("/");
                }}
            >
                Login
            </button>
        </div>
    )
}

export default Register;
