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
        <div className="m-auto mt-5 w-[75%]">
            <div className="grid grid-cols-3 grid-rows-1">
                <div>
                    <Link to="/">
                        <i className="fa-solid fa-arrow-left"></i>
                    </Link>
                </div>
                
                <div>Update My Account</div>
                <div></div>
            </div>

            <h2 className="mt-5">{myUserProps?.userID}</h2>

            <input
                disabled={true}
                id="usernameInput"
                name="username"
                type="text"
            />

            <h3>Notification Preference</h3>
            <select
                className="bg-[#D9D9D9] h-6 mb-6 rounded-xl text-black text-center w-[75%]"
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
                className="bg-[#D9D9D9] h-6 mb-6 rounded-xl text-black text-center w-[75%]"
                id="emailAddressInputField"
                onInput={(e) => setNewEmailAddress(e.currentTarget.value)}
                placeholder={myUserProps?.emailAddress || ""}
                type="text"
            />

            {
                newEmailAddress
                    &&
                <button
                    className="bg-[#17C120] h-6 ml-2 rounded-xl px-3 w-[75%]"
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
                className="bg-[#D9D9D9] h-6 mb-6 rounded-xl text-black text-center w-[75%]"
                id="phoneInputField"
                onInput={(e) => setNewPhone(e.currentTarget.value)}
                placeholder={myUserProps?.phone || ""}
                type="text"
            />

            {
                newPhone
                    &&
                <button
                    className="bg-[#17C120] h-6 ml-2 px-3 rounded-xl w-[75%]"
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
                className="bg-[#D9D9D9] h-6 mb-8 rounded-xl text-black text-center w-[75%]"
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