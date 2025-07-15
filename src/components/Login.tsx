import React, { FormEvent, useState } from "react";
import { loginRequest } from "../services/authAPI";
import { LoginBody, NullLoginBody } from "../types/user";
import { Link, useNavigate } from "react-router";
import { Team } from "../types/team";


type Props = {
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    teams: Team[];
}


const Login = (props: Props) => {
    const [usernamePopulated, setUsernamePopulated] = useState<boolean>(false);
    const [passwordPopulated, setPasswordPopulated] = useState<boolean>(false);
    const [loginBody, setLoginBody] = useState<LoginBody>(NullLoginBody);
    const [warningMessageVisible, setWarningMessageVisible] = useState<boolean>(false);
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

    const attemptLogin = (e: FormEvent) => {
        e.preventDefault;

        loginRequest(loginBody)
        .then((response) => {
            if (response?.access_token) {
                console.log(`response.access_token: ${response.access_token}`);
                console.log(`response["access_token"]: ${response["access_token"]}`);
                localStorage.setItem("jwt", response["access_token"]);
                props.setIsAuthenticated(true);
                navigate("/");
                window.location.reload();
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
            <h1 className="mt-35 mb-7 text-xl">Pickem</h1>

            {
                warningMessageVisible
                    &&
                <p className="mb-8 text-red-500" id="loginWarning">
                    Username or Password is incorrect. Please try again.
                </p>
            }

            <input
                autoComplete="username"
                className="bg-[#D9D9D9] h-6 mb-3 rounded-xl text-black text-center w-[90%]"
                id="usernameInput"
                onChange={handleTextInputChange}
                placeholder="Username"
                type="text"
                value={loginBody.username}
            />

            <br />

            <input
                autoComplete="current-password"
                className="bg-[#D9D9D9] h-6 mb-7 rounded-xl text-black text-center w-[90%]"
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
                <button className="bg-[#17C120] h-6 mt-2 mb-2 rounded-xl w-[90%]" id="loginButton" type="submit"
                        onClick={(e) => attemptLogin(e)}
                >
                    Login
                </button>
            }

            <br />

            <Link to="/register" state={{teams: props.teams}}>
            <button className="border-1 border-white mb-5 px-2 py-1 rounded-lg w-[90%]">
                Create Account
            </button>
            </Link>

        </div>
    )
}

export default Login;
