import { useState } from "react";

import { CurrentUser } from "../types/account";
import { Team } from "../types/team";
import { Token } from "../types/token";

import { userLogout } from "../services/logout";
import {
    updateFavoriteTeam,
    updateNotificationPreference,
    updateEmailAddress//,
    //updatePhone
} from "../services/accountAPI";


type Props = {
    currentUser: CurrentUser;
    setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser>>;
    setIsAccountComponentOpen: React.Dispatch<React.SetStateAction<boolean>>;
    jwtToken: Token;
    teams: Team[];
}


const Account = (props: Props) => {
    const [newEmailAddress, setNewEmailAddress] = useState<string>("");
    //const [newPhone, setNewPhone] = useState<string>("");
    
    
    return (
        <div className="h-full m-auto w-full">

            <div id="account-navbar" className="grid grid-cols-3 grid-rows-1 m-auto mb-5 mt-6">
                <button
                    id="account-back-to-picks-button"
                    onClick={() => props.setIsAccountComponentOpen(false)}
                ><i className="fa-solid fa-arrow-left fa-xl m-auto"></i></button>
                
                <h1 id="update-my-account-header">Update My Account</h1>

                <button
                    className="bg-red-600 h-8 mx-[20%] rounded-lg"
                    id="logout-from-account-component" 
                    onClick={userLogout}
                >
                    Logout
                </button>
            </div>

            <div className="mt-10 mb-10"><h2>{props.currentUser.username}</h2></div>

            <div className="my-8" id="notification-preference-div">
                <h2>Notification Preference</h2>
                <select
                    className="bg-[#D9D9D9] h-12 rounded-xl text-black text-center w-[90%]"
                    id="notificationPreferenceInput"
                    value={props.currentUser.notificationPreference || "n"}
                    onChange={(e) => {
                        props.setCurrentUser(prev => ({
                            ...prev,
                            notificationPreference: e.target.value
                        }));
                        updateNotificationPreference({
                            token: props.jwtToken.value,
                            userID: props.currentUser.userID,
                            notificationPreference: e.currentTarget.value
                        });
                    }}
                >
                    <option key="notificationPreferenceOption-none" value="n">Notification Preference</option>
                    <option key="notificationPreferenceOption-email" value="e">Email</option>
                    {/*<option key="notificationPreferenceOption-phone" value="p">Phone</option>*/}
                </select>
            </div>

            <div className="my-3" id="email-address-div">
                <h2>Email Address</h2>
                <input
                    className="bg-[#D9D9D9] h-12 m-auto rounded-xl text-black text-center w-[75%]"
                    id="emailAddressInputField"
                    onInput={(e) => setNewEmailAddress(e.currentTarget.value)}
                    type="text"
                    placeholder={props.currentUser.emailAddress}
                />
                {
                    newEmailAddress !== props.currentUser.emailAddress &&
                    newEmailAddress.length > 0 &&
                    <button
                        className="bg-[#17C120] h-12 m-auto ml-[3%] rounded-xl w-[12%]"
                        id="submitEmailChangeButton"
                        onClick={() => {
                            props.setCurrentUser(prev => ({
                                ...prev,
                                emailAddress: newEmailAddress
                            }));
                            updateEmailAddress({
                                token: props.jwtToken.value,
                                userID: props.currentUser.userID,
                                emailAddress: newEmailAddress
                            });
                        }}
                    >
                        <i className="fa-solid fa-check m-auto"></i>
                    </button>
                    
                }
            </div>

            {/*
                <div className="" id="phone-div">
                    <h2>Phone</h2>
                    <input 
                        className="bg-[#D9D9D9] h-12 rounded-xl text-black text-center w-[75%]"
                        id="phoneInputField"
                        onInput={(e) => setNewPhone(e.currentTarget.value)}
                        type="text"
                        placeholder={props.currentUser.phone || ""}
                    />
                    {
                        newPhone !== props.currentUser.phone &&
                        newPhone.length > 0 &&
                        <button
                            className="bg-[#17C120] h-12 m-auto ml-[3%] rounded-xl w-[12%]"
                            id="submitPhoneChangeButton"
                            onClick={() => {
                                props.setCurrentUser(prev => ({
                                    ...prev,
                                    phone: newPhone
                                }));
                                updatePhone({
                                    token: props.jwtToken.value,
                                    userID: props.currentUser.userID,
                                    phone: newPhone
                                });
                            }}
                        >
                            <i className="fa-solid fa-check"></i>
                        </button>
                    }
                </div>
            */}

            <div className="my-10">
                <h2>Favorite Team</h2>
                <select
                    className="bg-[#D9D9D9] h-12 rounded-xl text-black text-center w-[90%]"
                    id="favoriteTeamInput"
                    value={props.currentUser?.favoriteTeam || "0"}
                    onChange={(e) => {
                        props.setCurrentUser(prev => ({
                            ...prev,
                            favoriteTeam: e.target.value
                        }));
                        updateFavoriteTeam({
                            token: props.jwtToken.value,
                            userID: props.currentUser.userID,
                            favoriteTeam: e.currentTarget.value
                        })
                    }}
                >
                    <option key="favoriteTeamOption" value="0">Favorite Team</option>
                    {props.teams.map((team: Team) => (
                        <option key={team.teamID} value={team.teamID}>{team.teamName}</option>
                    ))}
                </select>
            </div>

        </div>
    );

}

export default Account;
