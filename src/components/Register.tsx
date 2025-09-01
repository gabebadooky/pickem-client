import { useState } from "react";

import { registerNewUser } from "../services/authAPI";
import { validateToken } from "../services/validateToken";

import { Team } from "../types/team";
import { Token } from "../types/token";
import { User } from "../types/user";


type Props = {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setIsRegistering: React.Dispatch<React.SetStateAction<boolean>>;
    setTokenStatus: React.Dispatch<React.SetStateAction<Token>>;
    teams: Team[];
}

const Register = (props: Props) => {
    const [usernameTaken, setUsernameTaken] = useState<boolean>(false);
    const [confirmPasswordString, setConfirmPasswordString] = useState<string>("");
    const [newUser, setNewUser] = useState<User>({
        username: "",
        password: ""
    });
    

    return (
        <div className="h-full m-auto mb-20 w-full">

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
                                username: e.target.value,
                                displayName: e.target.value
                            }));
                        }}
                        placeholder="Username"
                        type="text"
                    />
                </div>

                <div className="mb-5" id="display-name-div">
                    <input
                        autoComplete="name"
                        className="bg-[#D9D9D9] h-12 rounded-xl text-black text-center w-[90%]"
                        id="displayNameInput"
                        onChange={(e) => {
                            setUsernameTaken(false);
                            setNewUser(prev => ({
                                ...prev,
                                displayName: e.target.value
                            }));
                        }}
                        placeholder="Display Name"
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
                        {/*<option key="notificationPreferenceOption-phone" value="p">Phone</option>*/}
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
                        {props.teams.map((team: Team) => {
                            if (team.league === "NFL") {
                                return <option value={team.teamID}>{team.teamName} {team.teamMascot}</option>
                            } else {
                                return <option value={team.teamID}>{team.teamName}</option>
                            }
                        })}
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
                            props.setIsLoading(true);
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
                            .finally(() => props.setIsLoading(false));
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

