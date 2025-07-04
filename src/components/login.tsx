import React, { FormEvent, useState } from "react";
import { loginRequest } from "../services/authAPI";
import { LoginBody, NullLoginBody } from "../types/user";
import { useNavigate } from "react-router";


const Login = () => {
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
                navigate("/picks");
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
                className="bg-[#D9D9D9] text-black mb-3 w-48 rounded-xl text-center"
                id="usernameInput"
                onChange={handleTextInputChange}
                placeholder="Username"
                type="text"
                value={loginBody.username}
            />

            <br />

            <input
                autoComplete="current-password"
                className="bg-[#D9D9D9] text-black mb-7 w-48 rounded-xl text-center"
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
                <button className="mt-2 mb-2 bg-[#17C120] w-48 rounded-xl" id="loginButton" type="submit"
                        onClick={(e) => attemptLogin(e)}
                >
                    Login
                </button>
            }

            <br />

            <button className="mb-5 w-48 px-2 py-1 rounded-lg border-1 border-white"
                onClick={() => {
                    navigate("/register");
                }}
            >
                Create Account
            </button>

        </div>
    )
}

export default Login;