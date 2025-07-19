import { useState } from "react";
import { createPortal } from "react-dom";
import { loginRequest } from "../services/authAPI";
import { Link } from "react-router";
import { Team } from "../types/team";
import LoadingSpinner from "./LoadingSpinner";


type Props = {
    teams: Team[];
}


const Login = (props: Props) => {
    const [fetchingData, setFetchingData] = useState<boolean>(false);
    const [incorrectLoginAttempt, setIncorrectLoginAttempt] = useState<boolean>(false);

    let username: string = "";
    let password: string = "";

    return (
        <div className="h-dvh m-auto w-dvw">

            { fetchingData && (createPortal(<LoadingSpinner />, document.body)) }

            {
                incorrectLoginAttempt &&
                <div className="h-[35%]" id="incorrect-login-warning-div">
                    <p className="text-red-500">
                        Username or Password is incorrect. Please try again.
                    </p>
                </div>
            }

            <div className="align-top mb-10" id="login-header">
                <h1 className="text-xl">Pickem</h1>
            </div>
                    
            <form>
                <div className="mb-5" id="username-div">
                    <input
                        autoComplete="username"
                        className="bg-[#D9D9D9] h-15 rounded-xl text-black text-center w-[90%]"
                        id="usernameInput"
                        onChange={(e) => {
                            setIncorrectLoginAttempt(false);
                            username = e.target.value
                        }}
                        placeholder="Username"
                        type="text"
                    />
                </div>

                <div className="mb-10" id="password-div">
                    <input
                        autoComplete="current-password"
                        className="bg-[#D9D9D9] h-15 rounded-xl text-black text-center w-[90%]"
                        id="passwordInput"
                        onChange={(e) => {
                            setIncorrectLoginAttempt(false);
                            password = e.target.value;
                        }}
                        placeholder="Password"
                        type="password"
                    />
                </div>

                <div id="submit-form-div">
                    {
                        username.length > 0 && password.length > 0 &&
                        <button className="bg-[#17C120] h-15 rounded-xl w-[90%]" id="loginButton" type="submit"
                                onClick={() => {
                                    setFetchingData(true);
                                    loginRequest({
                                        username: username,
                                        password: password
                                    })
                                    .then((response) => {
                                        if (response.access_token) {
                                            // set JWT Token
                                            window.location.reload();
                                        } else {
                                            setIncorrectLoginAttempt(true);
                                        }
                                    })
                                }}
                        >
                            Login
                        </button>
                    }
                </div>
                
            </form>

            <div className="mt-20" id="continue-as-guest-div">
                {
                    username.length === 0 || password.length === 0 &&
                    <Link
                        className="bg-[#3c58ef] h-15 rounded-xl w-[90%]"
                        to="/"
                        onClick={() => {
                            // set JWT token to "guest"
                            window.location.reload();
                        }}
                    >
                        Continue as Guest
                    </Link>
                }
            </div>

            <Link
                className="border-1 border-white mb-5 px-2 py-1 rounded-lg w-[90%]"
                to="/register"
                state={{teams: props.teams}}
            >
                Create Account
            </Link>

        </div>
    );
}


export default Login;













/*


const originalLogin = (props: Props) => {
    const [usernamePopulated, setUsernamePopulated] = useState<boolean>(false);
    const [passwordPopulated, setPasswordPopulated] = useState<boolean>(false);
    const [loginBody, setLoginBody] = useState<LoginBody>(NullLoginBody);
    const [warningMessageVisible, setWarningMessageVisible] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    

    const handleTextInputChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        const fieldID: string = e.currentTarget.id;
        const value: string = e.currentTarget.value;
        const inputPopulated: boolean = e.currentTarget.value.trim() !== "";
        
        setWarningMessageVisible(false);
        switch (fieldID) {
            case "usernameInput":
                setLoginBody(loginBody => ({ ...loginBody, username: value }));
                if (inputPopulated) {
                    setUsernamePopulated(true);
                } else {
                    setUsernamePopulated(false);
                }
                break;
            case "passwordInput":
                setLoginBody(loginBody => ({ ...loginBody, password: value }));
                if (inputPopulated) {
                    setPasswordPopulated(true);
                } else {
                    setPasswordPopulated(false);
                }
                break;
            default:
                break;
        }
    }

    const origAttemptLogin = (e: FormEvent) => {
        e.preventDefault;
        setIsLoading(true);
        loginRequest(loginBody)
        .then((response) => {
            if (response?.access_token) {
                localStorage.setItem("jwt", response["access_token"]);
                props.setIsAuthenticated(true);
                navigate("/");
                window.location.reload();
            } else {
                setWarningMessageVisible(true);
            }
            setIsLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setWarningMessageVisible(true);
        });
    }


    return (
        <div>

            {
                isLoading
                    &&
                (createPortal(
                    <LoadingSpinner />,
                    document.body
                ))
            }

            {
                warningMessageVisible
                    &&
                <p className="mb-8 text-red-500" id="loginWarning">
                    Username or Password is incorrect. Please try again.
                </p>
            }

            {
                !isLoading
                    &&
                <>

                    <h1 className="mt-35 mb-7 text-xl">Pickem</h1>
                    
                    <input
                        autoComplete="username"
                        className="bg-[#D9D9D9] h-8 mb-3 rounded-xl text-black text-center w-[90%]"
                        id="usernameInput"
                        onChange={handleTextInputChange}
                        placeholder="Username"
                        type="text"
                        value={loginBody.username}
                    />

                    <br />

                    <input
                        autoComplete="current-password"
                        className="bg-[#D9D9D9] h-8 mb-7 rounded-xl text-black text-center w-[90%]"
                        id="passwordInput"
                        onChange={handleTextInputChange}
                        placeholder="Password"
                        type="password"
                        value={loginBody.password}
                    />

                    <br />
                    
                    {
                        usernamePopulated && passwordPopulated
                            &&
                        <button className="bg-[#17C120] h-8 mt-2 mb-2 rounded-xl w-[90%]" id="loginButton" type="submit"
                                onClick={(e) => attemptLogin(e)}
                        >
                            Login
                        </button>
                    }

                    <br />

                    <button 
                        className="bg-[#3c58ef] h-8 mt-2 mb-2 rounded-xl w-[90%]" 
                        id="continueAsGuestButton"
                        onClick={() => {
                            localStorage.setItem("jwt", "guest");
                            props.setIsAuthenticated(true);
                            navigate("/");
                            window.location.reload();
                        }}
                    >
                        Continue as Guest
                    </button>

                    <Link to="/register" state={{teams: props.teams}}>
                        <button className="border-1 border-white mb-5 px-2 py-1 rounded-lg w-[90%]">
                            Create Account
                        </button>
                    </Link>

                </>
            }
        </div>
    )
}

export default Login;

*/