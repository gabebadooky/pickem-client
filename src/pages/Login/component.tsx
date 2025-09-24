import { useState } from "react";
import { AccountTextInput } from "../../components/AccountTextInput";
import { LoginProps } from "./types";
import { SubmitButton } from "../../components/SubmitButton";
import { attemptLogin } from "./component";
import { Link, useNavigate } from "react-router";
import LoadingSpinner from "../../components/LoadingSpinner/component";



const Login = () => {
    const navigate = useNavigate();
    const [loginProps, setLoginProps] = useState<LoginProps>({ username: "", password: "" });
    const [incorrectUsernameOrPassword, setIncorrectUsernameOrPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const componentID: string = "register-page";


    return (
        <div className="h-full m-auto w-full">

            <div
                className="m-auto"
                id={`${componentID}-inputs-container`}
            >

                <div
                    className="mr-5 py-5 relative top-0 w-full"
                    id={`${componentID}-home-button`}
                >
                    <Link to="/">
                        <i className="fa-2xl fa-solid fa-house"></i>
                    </Link>
                </div>

                <h1 className="my-[10%] text-3xl">Login</h1>

                {
                    incorrectUsernameOrPassword
                        &&
                    <p 
                        className="m-auto mb-5 text-xl text-red-600 w-[90%]"
                        id={`${componentID}-incorrect-username-or-password-warning`}
                    >
                        Username or password is incorrect! Please try again.
                    </p>
                }

                <div
                    className="bg-[#D9D9D9] h-13 m-auto mb-5 rounded-xl w-[90%]"
                    id={`${componentID}-username-div`}
                    key={`${componentID}-username-div`}
                >
                    <AccountTextInput
                        componentID={`${componentID}-username-input`}
                        componentName={`${componentID}-username-input`}
                        onChange={(e) => {
                            setIncorrectUsernameOrPassword(false);
                            setLoginProps(prev => ({
                                ...prev,
                                username: e.target.value
                            }));
                        }}
                        placeholder="Username"
                        type="text"
                    />
                </div>

                <div
                    className="bg-[#D9D9D9] h-13 m-auto mb-10 rounded-xl  w-[90%]"
                    id={`${componentID}-password-div`}
                    key={`${componentID}-password-div`}
                >
                    <AccountTextInput
                        componentID={`${componentID}-password-input`}
                        componentName={`${componentID}-password-input`}
                        onChange={(e) => {
                            setIncorrectUsernameOrPassword(false);
                            setLoginProps(prev => ({
                                ...prev,
                                password: e.target.value
                            }));
                        }}
                        placeholder="Password"
                        type="password"
                    />
                </div>

                {
                    loginProps.username !== "" && loginProps.password !== ""
                        &&
                    <div
                        className="h-13 m-auto rounded-xl text-xl w-[90%]"
                        id={`${componentID}-login-button-div`}
                        key={`${componentID}-login-button-div`}
                    >
                        <SubmitButton
                            buttonInnerText="Login"
                            componentID={`${componentID}-login-button`}
                            submitMethod={() => attemptLogin(loginProps, setIncorrectUsernameOrPassword, navigate, setIsLoading)}
                        />
                    </div>
                }

                <div className="flex my-[10%]">
                    <hr className="m-auto w-[40%]" />Or<hr className="m-auto w-[40%]" />
                </div>

                <div
                    className="bg-[#0057e7] h-13 m-auto rounded-xl text-xl w-[90%]"
                    id={`${componentID}-google-oauth-div`}
                    key={`${componentID}-google-oauth-div`}
                >
                    <button
                        className="h-full m-auto  w-full"
                        id={`${componentID}-google-oauth-button`}
                    >
                        Continue with <i className="fa-brands fa-google"></i>
                    </button>
                </div>

            </div>

            { isLoading && <LoadingSpinner /> }

        </div>
    );
}


export default Login;