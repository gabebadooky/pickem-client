import { Link, useLoaderData, useNavigate } from "react-router";
import { AccountTextInput } from "../../components/AccountTextInput";
import { useState } from "react";
import { FavoriteTeamDropdown } from "../../components/FavoriteTeamDropdown";
import { SubmitButton } from "../../components/SubmitButton";
import { Team } from "../../types/team";
import { attemptRegistration } from "./page";
import { NewUserProperties } from "./types";
import LoadingSpinner from "../../components/LoadingSpinner/component";


const Register = () => {
    const { allTeams }: { allTeams: Team[] } = useLoaderData();
    const navigate = useNavigate();
    
    const [confirmPassword, setConfirmPassword] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [usernameTaken, setUsernameTaken] = useState<boolean>(false);
    const [newUser, setNewUser] = useState<NewUserProperties>({
        username: undefined,
        password: undefined,
        displayName: undefined,
        favoriteTeam: "0",
        notificationPreference: "",
        emailAddress: "",
        phone: "",
    });

    const componentID: string = "register-page";

    
    if (isLoading) return <LoadingSpinner />;

    return (
        <div
            className="h-full a-auto w-full"
        >

            <div className="flex justify-between p-5 top-0 w-full">
                <span 
                    className="bg-[#ADACAC] px-3 py-1 rounded-xl text-black text-lg"
                    onClick={() => {
                        setIsLoading(true);
                        navigate("/login");
                    }}
                >
                    Login
                </span>
                <Link to="/" onClick={() => setIsLoading(true)}>
                    <i className="align-middle fa-2xl fa-solid fa-house my-auto"></i>
                </Link>
            </div>

            {
                usernameTaken
                    &&
                <p 
                    className="m-auto text-red-600"
                    id={`${componentID}-username-taken-warning`}
                >
                    Username is taken! Please use another one.
                </p>
            }

            <div
                className="m-auto my-[10%] text-l w-[90%]"
                id={`${componentID}-account-properties-section`}
            >

                <h1 className="my-[5%] text-3xl" id={`${componentID}-login-header`}>Register</h1>

                <div className="bg-[#D9D9D9] h-13 m-auto mb-5 rounded-xl w-[90%]" id={`${componentID}-username-div`}>
                    <AccountTextInput
                        componentID={`${componentID}-username-input`}
                        componentName={`${componentID}-username-input`}
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

                <div className="bg-[#D9D9D9] h-13 m-auto mb-10 rounded-xl w-[90%]" id={`${componentID}-display-name-div`}>
                    <AccountTextInput
                        componentID={`${componentID}-display-name-input`}
                        componentName={`${componentID}-display-name-input`}
                        onChange={(e) => setNewUser(prev => ({
                            ...prev,
                            displayName: e.target.value
                        }))}
                        placeholder="Display Name"
                        type="text"
                    />
                </div>

                <div className="bg-[#D9D9D9] h-13 m-auto mb-5 mt-10 rounded-xl w-[90%]" id={`${componentID}-password-div`}>
                    <AccountTextInput
                        componentID={`${componentID}-password-input`}
                        componentName={`${componentID}-password-input`}
                        onChange={(e) => setNewUser(prev => ({
                            ...prev,
                            password: e.target.value
                        }))}
                        placeholder="Password"
                        type="password"
                    />
                </div>

                <div className="bg-[#D9D9D9] h-13 m-auto mb-10 rounded-xl w-[90%]" id={`${componentID}-username-div`}>
                    <AccountTextInput
                        componentID={`${componentID}-confirm-password-input`}
                        componentName={`${componentID}-confirm-password-input`}
                        onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                        placeholder="Confirm Password"
                        type="password"
                    />
                </div>

                <div className="bg-[#D9D9D9] h-13 m-auto mb-10 rounded-xl text-black text-xl w-[90%]" id={`${componentID}-favorite-team-div`}>
                    <FavoriteTeamDropdown
                        allTeams={allTeams}
                        componentID={`${componentID}-favorite-team-input`}
                        componentName={`${componentID}-favorite-team-input`}
                        defaultValue="0"
                        onChange={(e) => setNewUser(prev => ({
                            ...prev,
                            favoriteTeam: e.currentTarget.value
                        }))}
                    />
                </div>

                {
                    newUser.username && newUser.password && confirmPassword && newUser.password === confirmPassword
                        &&
                    <div className="h-13 m-auto mb-[20%] w-[90%]" id={`${componentID}-submit-button-div`}>
                        <SubmitButton
                            buttonInnerText="Create Account!"
                            componentID={`${componentID}-submit-button`}
                            submitMethod={() => attemptRegistration(newUser, setIsLoading, setUsernameTaken)}
                        />
                    </div>
                }

            </div>

        </div>
    );
}


export default Register;