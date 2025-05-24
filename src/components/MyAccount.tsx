import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import { Team } from "../types/team";
import { CurrentUser } from "../types/account";
import { getTeams } from "../services/picksAPI";
import {
    updateFavoriteTeam,
    updateNotificationPreference,
    updateEmailAddress,
    updatePhone,
    getUser
} from "../services/accountAPI";

const MyAccount = () => {
    const [teams, setTeams] = useState(Array<Team>);
    const [myUserProps, setMyUserProps] = useState<CurrentUser>();
    const [newEmailAddress, setNewEmailAddress] = useState(String || undefined);
    const [newPhone, setNewPhone] = useState(String || undefined);

    const currentToken: string = localStorage.getItem("jwt") || "";
    const currentUserID: string = jwtDecode(localStorage.getItem("jwt") || "").sub?.toString() || "0";

    useEffect(() => {
        getTeams().then(setTeams);
        getUser(currentUserID)
            .then(setMyUserProps)
            .then(() => {
                if (myUserProps?.emailAddress) {
                    setNewEmailAddress(myUserProps?.emailAddress);
                }

                if (myUserProps?.phone) {
                    setNewPhone(myUserProps.phone);
                }
            });
    }, []);

    return (
        <div>
            <form action="">
                <h1>Update My Account</h1>

                <br />

                <input
                    disabled={true}
                    id="usernameInput"
                    name="username"
                    type="text"
                />

                <br />

                <select 
                    className="bg-[#D9D9D9] text-black mb-3 w-48 rounded-xl text-center"
                    id="favoriteTeamInput"
                    onChange={(e) => {
                        updateFavoriteTeam({
                            token: currentToken,
                            userID: currentUserID,
                            favoriteTeam: e.currentTarget.value
                        });
                    }}
                >
                    <option className="favoriteTeamOption" value={0}>Favorite Team</option>
                    {teams.map((team: Team) => (
                        <option value={team.teamID}>{team.teamName}</option>
                    ))}
                </select>

                <br />

                <select
                    className="bg-[#D9D9D9] text-black mb-7 w-48 rounded-xl text-center"
                    id="notificationPreferenceInput"
                    onChange={(e) => {
                        updateNotificationPreference({
                            token: currentToken,
                            userID: currentUserID,
                            notificationPreference: e.currentTarget.value
                        });
                    }}
                >
                    <option className="notificationPreferenceOption" value="n">Notification Preference</option>
                    <option className="notificationPreferenceOption" value="e">Email</option>
                    <option className="notificationPreferenceOption" value="p">Phone</option>
                </select>

                <br />

                <input
                    className="bg-[#D9D9D9] text-black mb-3 w-48 rounded-xl text-center"
                    id="emailAddressInputField"
                    onInput={(e) => setNewEmailAddress(e.currentTarget.value)}
                    placeholder="Email Address"
                    type="text"
                />

                {
                    myUserProps?.emailAddress !== newEmailAddress
                        &&
                    <button 
                        id="submitEmailChangeButton"
                        type="submit"
                        onClick={() => {
                            updateEmailAddress({
                                token: currentToken,
                                userID: currentUserID,
                                emailAddress: newEmailAddress
                            });
                        }}
                    >
                        Update
                    </button>
                }

                <br />

                <input 
                    className="bg-[#D9D9D9] text-black mb-3 w-48 rounded-xl text-center"
                    id="phoneInputField"
                    onInput={(e) => setNewPhone(e.currentTarget.value)}
                    placeholder="Mobile Number"
                    type="text"
                />

                {
                    myUserProps?.phone !== newPhone
                        &&
                    <button 
                        id="submitPhoneChangeButton"
                        type="submit"
                        onClick={() => {
                            updatePhone({
                                token: currentToken,
                                userID: currentUserID,
                                phone: newPhone
                            });
                        }}
                    >
                        Update
                    </button>
                }

            </form>
        </div>
    )
}

export default MyAccount;