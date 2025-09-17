import React, { useState } from "react";

import { loginRequest } from "../original-services/authAPI";
import { BASE_URL } from "../original-services/baseURL";
import { Token } from "../types/token";
import { validateToken } from "../original-services/validateToken";


type Props = {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setIsRegistering: React.Dispatch<React.SetStateAction<boolean>>;
    setTokenStatus: React.Dispatch<React.SetStateAction<Token>>;
}


const Login = (props: Props) => {
    const [incorrectLoginAttempt, setIncorrectLoginAttempt] = useState<boolean>(false);
    const [incorrectGoogleOAuthAttempt, setIncorrectGoogleOAuthAttempt] = useState<boolean>(false);
    const [usernameInputString, setUsernameInputString] = useState<string>("");
    const [passwordInputString, setpasswordInputString] = useState<string>("");

    return (
        <div className="h-dvh m-auto w-dvw">

            <div className="align-top mb-10 mt-25" id="login-header">
                <h1 className="text-xl">Have a Nice Pickem '25</h1>
            </div>
                    
            <form>
                <div className="mb-5" id="username-div">
                    <input
                        autoComplete="username"
                        className="bg-[#D9D9D9] h-12 rounded-xl text-black text-center w-[90%]"
                        id="usernameInput"
                        onInput={(e) => {
                            setIncorrectLoginAttempt(false);
                            setIncorrectGoogleOAuthAttempt(false);
                            setUsernameInputString(e.currentTarget.value);
                        }}
                        placeholder="Username"
                        type="text"
                    />
                </div>

                <div className="mb-10" id="password-div">
                    <input
                        autoComplete="current-password"
                        className="bg-[#D9D9D9] h-12 rounded-xl text-black text-center w-[90%]"
                        id="passwordInput"
                        onInput={(e) => {
                            setIncorrectLoginAttempt(false);
                            setIncorrectGoogleOAuthAttempt(false);
                            setpasswordInputString(e.currentTarget.value);
                        }}
                        placeholder="Password"
                        type="password"
                    />
                </div>

                <div className="m-auto text-red-500 w-[90%]" id="login-warning-div">
                    {
                        incorrectLoginAttempt &&
                        <p>
                            Username or Password is incorrect. Please try again.
                        </p>
                    }
                    {
                        incorrectGoogleOAuthAttempt &&
                        <p>Google Authentication Failed. Tell the developer he sucks and try again later.</p>
                    }
                </div>
                
                {
                    (usernameInputString.length > 0 && passwordInputString.length > 0) 
                        &&
                    <div className="mt-15" id="submit-form-div">
                        <button 
                            className="bg-[#17C120] h-12 rounded-xl w-[90%]" 
                            id="loginButton" 
                            type="submit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    props.setIsLoading(true);
                                    loginRequest({
                                        username: usernameInputString,
                                        password: passwordInputString
                                    })
                                    .then((response) => {
                                        if (response?.access_token) {
                                            localStorage.setItem("jwt", response.access_token);
                                            props.setTokenStatus(validateToken());
                                        } else {
                                            setIncorrectLoginAttempt(true);
                                        }
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                        setIncorrectLoginAttempt(true);
                                    })
                                    .finally(() => props.setIsLoading(false));
                                }}
                        >
                            Login
                        </button>
                    </div>
                }
                
            </form>

            {
                (usernameInputString.length === 0 || passwordInputString.length === 0) 
                    &&
                <div className="h-12 m-auto mt-15 w-[90%]" id="continue-as-guest-div">
                    <button
                        className="border-1 border-white h-12 items-center flex justify-center rounded-xl w-full"
                        id="continue-as-guest-button"
                        onClick={() => {
                            props.setTokenStatus(prev => ({
                                ...prev,
                                active: true,
                                value: "guest"
                            }));
                        }}
                    >
                        Continue as Guest
                    </button>
                </div>
            }

            <div className="h-12 m-auto mt-5 w-[90%]" id="create-account-button-div">
                <button 
                    className="bg-[#787b7b] flex h-full items-center justify-center px-2 py-1 rounded-xl w-full"
                    id="create-account-button"
                    onClick={() => props.setIsRegistering(true)}
                >
                    Create Account
                </button>
            </div>

            <div className="h-12 m-auto mt-15 w-[90%]" id="create-account-button-div">
                <button 
                    className="bg-[#0057e7] flex h-full items-center justify-center px-2 py-1 rounded-xl w-full"
                    id="create-account-button"
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `${BASE_URL}/auth/google/login`;
                    }}
                >
                    <span>Login with <i className="fa-brands fa-google"></i></span>
                </button>
            </div>

        </div>
    );
}


export default Login;
