import { useState } from "react";
import { Link } from "react-router";
import { createPortal } from "react-dom";

import { Team } from "../types/team";
import { NotificationPreferenceInputValue } from "../types/user";
import { registerNewUser } from "../services/authAPI";
import LoadingSpinner from "./LoadingSpinner";


type Props = {
    teams: Team[];
}


const Register = (props: Props) => {
    const [attemptingRegistration, setAttemptingRegistration] = useState<boolean>(false);
    const [usernameTaken, setUsernameTaken] = useState<boolean>(false);

    let usernameInput: string = "";
    let passwordInput: string = "";
    let confirmPasswordInput: string = "";
    let notificationPreferenceInput: NotificationPreferenceInputValue = "n";
    let emailAddressInput: string = "";
    let phoneNumberInput: string = "";
    let favoriteTeamInput: string = "0";

    return (
        <div className="h-dvh m-auto w-dvw">

            { attemptingRegistration && (createPortal(<LoadingSpinner />, document.body)) }

            <div className="align-top mb-20 mt-10" id="register-header">
                <h1 className="text-xl">Register</h1>
            </div>

            {
                usernameTaken &&
                <p className="mb-5 text-red-500" id="loginWarning">
                    Username already exists!
                </p>
            }

            <div className="mb-10" id="username-div">
                <input
                    autoComplete="username"
                    className="bg-[#D9D9D9] h-15 rounded-xl text-black text-center w-[90%]"
                    id="usernameInput"
                    name="username"
                    onInput={(e) => {
                        setUsernameTaken(false);
                        usernameInput = e.currentTarget.value;
                    }}
                    placeholder="Username"
                    type="text"
                />
            </div>

            <div className="mb-10" id="password-div">
                <input
                    autoComplete="new-password"
                    className="bg-[#D9D9D9] h-15 rounded-xl text-black text-center w-[90%]"
                    id="passwordInput"
                    onInput={(e) => passwordInput = e.currentTarget.value}
                    placeholder="Password"
                    type="password"
                />
            </div>

            <div className="mb-15" id="confirm-password-div">
                <input
                    autoComplete="new-password"
                    className="bg-[#D9D9D9] h-8 text-black rounded-xl text-center w-[90%]"
                    id="confirmPasswordInput"
                    onInput={(e) => confirmPasswordInput = e.currentTarget.value}
                    placeholder="Confirm Password"
                    type="password" 
                />
            </div>


            <div className="mb-10" id="notification-preference-div">
                <select
                    className="bg-[#D9D9D9] h-15 rounded-xl text-black text-center w-[90%]"
                    id="notificationPreferenceInput"
                    onChange={(e) => {
                        switch (e.currentTarget.value) {
                            case "e":
                                notificationPreferenceInput = "e";
                                break;
                            case "p":
                                notificationPreferenceInput = "p";
                                break;
                            default:
                                notificationPreferenceInput = "n";
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
                String(notificationPreferenceInput) === "e" &&
                <div className="mb-15" id="email-div">
                    <input
                        className="bg-[#D9D9D9] h-15 rounded-xl text-black text-center w-[90%]"
                        id="emailAddressInputField"
                        onInput={(e) => emailAddressInput = e.currentTarget.value}
                        placeholder="Email Address"
                        type="text"
                    />
                </div>
            }
            {
                String(notificationPreferenceInput) === "p" &&
                <div className="mb-15" id="phone-div">
                    <input 
                        className="bg-[#D9D9D9] h-15 rounded-xl text-black text-center w-[90%]"
                        id="phoneInputField"
                        onInput={(e) => phoneNumberInput = e.currentTarget.value}
                        placeholder="Mobile Number"
                        type="text"
                    />
                </div>
            }

            <div className="mb-20" id="favorite-team-div">
                <select 
                    className="bg-[#D9D9D9] h-15 rounded-xl text-black text-center w-[90%]"
                    id="favoriteTeamInput"
                    onChange={(e) => favoriteTeamInput = e.target.value }
                >
                    <option className="favoriteTeamOption" value="0">Favorite Team</option>
                    {props.teams.map((team: Team) => (
                        <option value={team.teamID}>{team.teamName}</option>
                    ))}
                </select>
            </div>


            {
                usernameInput.length > 0 && 
                passwordInput.length > 0 && 
                confirmPasswordInput.length > 0 && 
                passwordInput === confirmPasswordInput &&
                <button 
                    className="bg-[#17C120] h-15 rounded-xl w-[90%]"
                    id="registerButton"
                    type="submit"
                    onClick={() => {
                        setAttemptingRegistration(true);
                        registerNewUser({
                            username: usernameInput,
                            password: passwordInput,
                            favoriteTeam: favoriteTeamInput,
                            notificationPreference: notificationPreferenceInput,
                            emailAddress: emailAddressInput,
                            phone: phoneNumberInput
                        })
                        .then((response) => {
                            if (response.access_token) {
                                // set JWT Token
                                window.location.reload();
                            } else {
                                setUsernameTaken(true);
                            }
                        })
                        .finally(() => setAttemptingRegistration(false));
                    }} 
                >
                    Register
                </button>
            }

            <div className="" id="login-button-div">
                <Link 
                    className="border-1 border-white px-2 py-1 rounded-lg w-[90%]"
                    to="/"
                >
                    Login
                </Link>
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