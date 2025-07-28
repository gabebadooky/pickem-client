import { useState } from "react";
import { createPortal } from "react-dom";

import { registerNewUser } from "../services/authAPI";
import { validateToken } from "../services/validateToken";

import { Team } from "../types/team";
import { Token } from "../types/token";
import { User } from "../types/user";
import LoadingSpinner from "./LoadingSpinner";


type Props = {
    setIsRegistering: React.Dispatch<React.SetStateAction<boolean>>;
    setTokenStatus: React.Dispatch<React.SetStateAction<Token>>;
    teams: Team[];
}

const Register = (props: Props) => {
    const [attemptingRegistration, setAttemptingRegistration] = useState<boolean>(false);
    const [usernameTaken, setUsernameTaken] = useState<boolean>(false);
    const [confirmPasswordString, setConfirmPasswordString] = useState<string>("");
    const [newUser, setNewUser] = useState<User>({
        username: "",
        password: ""
    });
    

    return (
        <div className="h-dvh m-auto mb-20 w-dvw">

            { attemptingRegistration && (createPortal(<LoadingSpinner />, document.body)) }

            <div className="align-top mb-15 mt-5" id="register-header">
                <h1 className="text-xl">Register</h1>
            </div>

            {
                usernameTaken &&
                <p className="mb-5 text-red-500" id="loginWarning">
                    Username already exists!
                </p>
            }

            <form>

                <div className="mb-5" id="username-div">
                    <input
                        autoComplete="username"
                        className="bg-[#D9D9D9] h-12 rounded-xl text-black text-center w-[90%]"
                        id="usernameInput"
                        name="username"
                        onChange={(e) => {
                            setUsernameTaken(false);
                            setNewUser(prev => ({
                                ...prev,
                                username: e.target.value
                            }));
                        }}
                        placeholder="Username"
                        type="text"
                    />
                </div>

                <div className="mb-5" id="password-div">
                    <input
                        autoComplete="new-password"
                        className="bg-[#D9D9D9] h-12 rounded-xl text-black text-center w-[90%]"
                        id="passwordInput"
                        onChange={(e) => {
                            setNewUser(prev => ({
                                ...prev,
                                password: e.target.value
                            }));
                        }}
                        placeholder="Password"
                        type="password"
                    />
                </div>

                <div className="mb-15" id="confirm-password-div">
                    <input
                        autoComplete="new-password"
                        className="bg-[#D9D9D9] h-12 text-black rounded-xl text-center w-[90%]"
                        id="confirmPasswordInput"
                        onChange={(e) => {
                            setConfirmPasswordString(e.target.value);
                        }}
                        placeholder="Confirm Password"
                        type="password" 
                    />
                </div>


                <div className="h-12" id="notification-preference-div">
                    <select
                        className="bg-[#D9D9D9] h-full rounded-xl text-black text-center w-[90%]"
                        id="notificationPreferenceInput"
                        onChange={(e) => {
                            switch (e.target.value) {
                                case "e":
                                    setNewUser(prev => ({
                                        ...prev,
                                        notificationPreference: "e"
                                    }));
                                    break;
                                case "p":
                                    setNewUser(prev => ({
                                        ...prev,
                                        notificationPreference: "p"
                                    }));
                                    break;
                                default:
                                    setNewUser(prev => ({
                                        ...prev,
                                        notificationPreference: "n"
                                    }));
                                    break;
                            }
                        }}
                    >
                        <option key="notificationPreferenceOption-none" value="n">Notification Preference</option>
                        <option key="notificationPreferenceOption-email" value="e">Email</option>
                        <option key="notificationPreferenceOption-phone" value="p">Phone</option>
                    </select>
                </div>

                {
                    String(newUser.notificationPreference) === "e" &&
                    <div className="h-12 mt-5" id="email-div">
                        <input
                            className="bg-[#D9D9D9] h-full rounded-xl text-black text-center w-[90%]"
                            id="emailAddressInputField"
                            onChange={(e) => {
                                setNewUser(prev => ({
                                    ...prev,
                                    emailAddress: e.target.value
                                }));
                            }}
                            placeholder="Email Address"
                            type="text"
                        />
                    </div>
                }
                {
                    String(newUser.notificationPreference) === "p" &&
                    <div className="h-12 mt-5" id="phone-div">
                        <input 
                            className="bg-[#D9D9D9] h-full rounded-xl text-black text-center w-[90%]"
                            id="phoneInputField"
                            onChange={(e) => {
                                setNewUser(prev => ({
                                    ...prev,
                                    phone: e.target.value
                                }));
                            }}
                            placeholder="Mobile Number"
                            type="text"
                        />
                    </div>
                }

                <div className="h-12 mb-20 mt-15" id="favorite-team-div">
                    <select 
                        className="bg-[#D9D9D9] h-full rounded-xl text-black text-center w-[90%]"
                        id="favoriteTeamInput"
                        onChange={(e) => {
                            setNewUser(prev => ({
                                ...prev,
                                favoriteTeam: e.target.value
                            }));
                        }}
                    >
                        <option className="favoriteTeamOption" value="0">Favorite Team</option>
                        {props.teams.map((team: Team) => (
                            <option value={team.teamID}>{team.teamName}</option>
                        ))}
                    </select>
                </div>


                {
                    newUser.username.length > 0 && 
                    newUser.password.length > 0 && 
                    confirmPasswordString.length > 0 && 
                    newUser.password === confirmPasswordString &&
                    <button 
                        className="bg-[#17C120] h-12 mb-5 rounded-xl w-[90%]"
                        id="registerButton"
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            setAttemptingRegistration(true);
                            registerNewUser(newUser)
                            .then((response) => {
                                if (response.access_token) {
                                    localStorage.setItem("jwt", response.access_token);
                                    props.setTokenStatus(validateToken());
                                    props.setIsRegistering(false);
                                } else {
                                    setUsernameTaken(true);
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                            .finally(() => setAttemptingRegistration(false));
                        }} 
                    >
                        Register
                    </button>
                }

            </form>

            <div className="h-12 m-auto mb-15 w-[90%]" id="register-button-div">
                <button 
                    className="border-1 border-white flex h-full items-center justify-center px-2 py-1 rounded-lg w-full"
                    id="register-button"
                    onClick={() => props.setIsRegistering(false)}
                >
                    Login
                </button>
            </div>

        </div>
    );
}

export default Register;























/*
const oldTeamOption = ({ team }: { team: Team }) => {
    return (
        <option value={team.teamID}>{team.teamName}</option>
    );
}

const oldWarningMessage = () => {
    return (
        <p className="mt-5 text-red-500" id="loginWarning">
            Username already exists!
        </p>
    );
}


const oldRegister = (props: Props) => {
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
*/