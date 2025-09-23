import { Link, useLoaderData } from "react-router";
import { LeftArrow } from "../../components/NavArrows/LeftArrow";
import { AccountTextInput } from "../../components/AccountTextInput";
import { useState } from "react";
import { FavoriteTeamDropdown } from "../../components/FavoriteTeamDropdown";
import { SubmitButton } from "../../components/SubmitButton";
import { Team } from "../../types/team";
import { attemptRegistration } from "./component";
import { RegisterProps } from "./types";


const Register = () => {
    const { allTeams }: { allTeams: Team[] } = useLoaderData();
    
    const [confirmPassword, setConfirmPassword] = useState<string | undefined>();
    const [newUser, setNewUser] = useState<RegisterProps>({
        username: undefined,
        password: undefined,
        displayName: undefined,
        favoriteTeam: "0",
        notificationPreference: "",
        emailAddress: "",
        phone: "",
    });

    const componentID: string = "register-page";
    

    return (
        <div
            className="h-full a-auto w-full"
        >
            <div
                className="flex justify-between m-auto text-2xl text-center w-full"
                id={`${componentID}-header-div`}
            >
                <Link id={`${componentID}-back-link`} to="/">
                    <LeftArrow onClick={null} />
                </Link>
                <h1 id={`${componentID}-header`}>Register</h1>
                <div></div>
            </div>

            <div
                className="my-[20%] text-l w-[90%]"
                id={`${componentID}-account-properties-section`}
            >
                <div id={`${componentID}-username-div`}>
                    <AccountTextInput
                        componentID={`${componentID}-username-input`}
                        componentName={`${componentID}-username-input`}
                        onInput={(e) => setNewUser(prev => ({
                            ...prev,
                            username: e.currentTarget.value
                        }))}
                        placeholder="Username"
                        type="text"
                    />
                </div>

                <div id={`${componentID}-display-name-div`}>
                    <AccountTextInput
                        componentID={`${componentID}-display-name-input`}
                        componentName={`${componentID}-display-name-input`}
                        onInput={(e) => setNewUser(prev => ({
                            ...prev,
                            displayName: e.currentTarget.value
                        }))}
                        placeholder="Display Name"
                        type="text"
                    />
                </div>

                <div className="mt-[20%]" id={`${componentID}-password-div`}>
                    <AccountTextInput
                        componentID={`${componentID}-password-input`}
                        componentName={`${componentID}-password-input`}
                        onInput={(e) => setNewUser(prev => ({
                            ...prev,
                            password: e.currentTarget.value
                        }))}
                        placeholder="Password"
                        type="password"
                    />
                </div>

                <div className="mb-[20%]" id={`${componentID}-username-div`}>
                    <AccountTextInput
                        componentID={`${componentID}-confirm-password-input`}
                        componentName={`${componentID}-confirm-password-input`}
                        onInput={(e) => setConfirmPassword(e.currentTarget.value)}
                        placeholder="Confirm Password"
                        type="password"
                    />
                </div>

                <div className="mb-[20%]" id={`${componentID}-favorite-team-div`}>
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
                    <div className="mb-[20%]" id={`${componentID}-submit-button-div`}>
                        <SubmitButton
                            buttonInnerText="Create Account!"
                            componentID={`${componentID}-submit-button`}
                            submitMethod={() => attemptRegistration(newUser)}
                        />
                    </div>
                }

            </div>

        </div>
    );
}


export default Register;