import { Link, useLoaderData } from "react-router";
import { AccountLoaderProps } from "./types";
import { useEffect, useState } from "react";
import { FavoriteTeamDropdown } from "../../components/FavoriteTeamDropdown";
import { updateAccountDefaultGameMode, updateAccountDisplayName, updateAccountFavoriteTeam } from "./page";
import LoadingSpinner from "../../components/LoadingSpinner/component";
import { AccountTextInput } from "../../components/AccountTextInput";
import { SubmitButton } from "../../components/SubmitButton";
import { LeagueDropdown } from "../../components/LeagueNavBar/LeagueDropdown";
import { League } from "../../types/league";


const Account = () => {
    const accountLoaderProps: AccountLoaderProps = useLoaderData();
    const [newDisplayName, setNewDisplayName] = useState<string>("");
    const [newDefaultGameMode, setNewDefaultGameMode] = useState<League>(accountLoaderProps.authenticatedUser.defaultGameMode || "NFLCFB");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const componentID: string = "account-page";
    const jwtToken: string | undefined = localStorage.getItem("jwt") || undefined;


    useEffect(() => {
        if (newDefaultGameMode !== accountLoaderProps.authenticatedUser.defaultGameMode) {
            updateAccountDefaultGameMode(jwtToken, accountLoaderProps.authenticatedUser.userID, newDefaultGameMode, setIsLoading);
        }
    }, [newDefaultGameMode]);


    return (
        <div className="h-full m-auto w-full">

            <div className="flex justify-end p-5 top-0 w-full" id={`${componentID}-nav-bar`}>
                <Link to="/" onClick={() => setIsLoading(true)}>
                    <i className="align-middle fa-2xl fa-solid fa-house my-auto"></i>
                </Link>
            </div>

            <div
                className="m-auto my-[10%] text-l w-[90%]"
                id={`${componentID}-account-properties-section`}
            >

                <h1 
                    className="text-3xl"
                    id={`${componentID}-login-header`}
                >
                    Me ({accountLoaderProps.authenticatedUser.displayName})
                </h1>

                { isLoading && <LoadingSpinner /> }

                <div className="my-[5%]" id={`${componentID}-display-name-label-input-div`}>
                    <label className="m-auto text-center text-xl" htmlFor={`${componentID}-display-name-input`}>Display Name</label>
                    <div className="flex justify-between m-auto w-[90%]">
                        <div className="bg-[#D9D9D9] h-13 my-1 rounded-xl text-black text-xl w-[75%]" id={`${componentID}-display-name-input-div`}>
                            <AccountTextInput
                                componentID={`${componentID}-display-name-input`}
                                componentName={`${componentID}-display-name-input`}
                                onChange={(e) => setNewDisplayName(e.currentTarget.value)}
                                placeholder={accountLoaderProps.authenticatedUser.displayName || "Display Name"}
                                type="text"
                            />
                        </div>
                        
                        <div className="h-13 my-auto w-[15%]">
                            {
                                newDisplayName &&
                                <SubmitButton
                                    buttonInnerText="✔️"
                                    componentID={`${componentID}-update-display-name-button`}
                                    submitMethod={() => updateAccountDisplayName(jwtToken, accountLoaderProps.authenticatedUser.userID, newDisplayName, setIsLoading)}
                                />
                            }
                        </div>
                    </div>
                </div>


                <div className="my-[5%]" id={`${componentID}-favorite-team-label-input-div`}>
                    <label className="m-auto text-center text-xl" htmlFor={`${componentID}-favorite-team-input`}>Favorite Team</label>
                    <div className="bg-[#D9D9D9] h-13 m-auto my-1 rounded-xl text-black text-xl w-[90%]" id={`${componentID}-favorite-team-div`}>
                        <FavoriteTeamDropdown
                            allTeams={accountLoaderProps.allTeams}
                            componentID={`${componentID}-favorite-team-input`}
                            componentName={`${componentID}-favorite-team-input`}
                            defaultValue={accountLoaderProps.authenticatedUser.favoriteTeam || "0"}
                            onChange={(e) => updateAccountFavoriteTeam(jwtToken, accountLoaderProps.authenticatedUser.userID, e.currentTarget.value, setIsLoading)}
                        />
                    </div>
                </div>


                <div className="my-[5%]" id={`${componentID}-preferred-game-mode-label-input-div`}>
                    <label className="m-auto text-center text-xl" htmlFor={`${componentID}-preferred-game-mode-input`}>Preferred Game Mode</label>
                    <div className="bg-[#D9D9D9] h-13 m-auto my-1 rounded-xl text-black text-xl w-[90%]" id={`${componentID}-preferred-game-mode-div`}>
                        <LeagueDropdown
                            defaultValue={newDefaultGameMode}
                            setLeagueFilter={setNewDefaultGameMode}
                        />
                    </div>
                </div>
                

            </div>

        </div>
    );
}


export default Account;