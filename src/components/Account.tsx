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
import { Link } from "react-router";

const Account = () => {
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
                    console.log(`myUserProps?.emailAddress: ${myUserProps?.emailAddress}`);
                    console.log(`newEmailAddress: ${newEmailAddress}`);
                }

                if (myUserProps?.phone) {
                    setNewPhone(myUserProps.phone);
                    console.log(`myUserProps?.phone: ${myUserProps?.phone}`);
                    console.log(`newPhone: ${newPhone}`);
                }
            });
    }, []);

    return (
        <div>
            <span>
                <Link to="/">
                    <i className="fa-solid fa-arrow-left mt-5 pr-3"></i>
                </Link>
                Update My Account
            </span>

            <h2 className="mt-5">{myUserProps?.userID}</h2>

            <input
                disabled={true}
                id="usernameInput"
                name="username"
                type="text"
            />

            <h3>Notification Preference</h3>
            <select
                className="bg-[#D9D9D9] text-black mb-6 w-48 rounded-xl text-center"
                id="notificationPreferenceInput"
                value={myUserProps?.notificationPreference || "n"}
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

            <h3>Email Address</h3>
            <input
                className="bg-[#D9D9D9] text-black mb-6 w-48 rounded-xl text-center"
                id="emailAddressInputField"
                onInput={(e) => setNewEmailAddress(e.currentTarget.value)}
                placeholder={myUserProps?.emailAddress || ""}
                type="text"
            />

            {
                newEmailAddress
                    &&
                <button
                    className="bg-[#17C120] ml-2 rounded-xl px-3"
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
                    <i className="fa-solid fa-check"></i>
                </button>
                
            }

            <br />

            <h3>Phone</h3>
            <input 
                className="bg-[#D9D9D9] text-black mb-6 w-48 rounded-xl text-center"
                id="phoneInputField"
                onInput={(e) => setNewPhone(e.currentTarget.value)}
                placeholder={myUserProps?.phone || ""}
                type="text"
            />

            {
                newPhone
                    &&
                <button
                    className="bg-[#17C120] ml-2 rounded-xl px-3"
                    id="submitPhoneChangeButton"
                    type="submit"
                    onClick={() => {
                        console.log(`myUserProps.phone: ${myUserProps?.phone}`);
                        console.log(`newPhone: ${newPhone}`);
                        updatePhone({
                            token: currentToken,
                            userID: currentUserID,
                            phone: newPhone
                        });
                    }}
                >
                    <i className="fa-solid fa-check"></i>
                </button>
            }

            <br />

            <h3>Favorite Team</h3>
            <select
                className="bg-[#D9D9D9] text-black mb-8 w-48 rounded-xl text-center"
                id="favoriteTeamInput"
                value={myUserProps?.favoriteTeam || "0"}
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
                    <option key={team.teamID} value={team.teamID}>{team.teamName}</option>
                ))}
            </select>

        </div>
    )
}

export default Account;