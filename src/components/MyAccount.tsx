import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import { getTeams } from "../services/picksAPI";
import { Team } from "../types/team";
import { User } from "../types/user";

const MyAccount = () => {
    const [teams, setTeams] = useState(Array<Team>);
    const [myUserProps, setMyUserProps] = useState<User>();
    const currentUserID: string = jwtDecode(localStorage.getItem("jwt") || "").sub?.toString() || "0";

    useEffect(() => {
        getTeams().then(setTeams);
        /*getUsers
            .then((response) => {
                setMyUserProps(response.find(u => u.userID === currentUserID));
            })*/
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
                    //onChange={(e) => }
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
                    //onChange={(e) => }
                >
                    <option className="notificationPreferenceOption" value="n">Notification Preference</option>
                    <option className="notificationPreferenceOption" value="e">Email</option>
                    <option className="notificationPreferenceOption" value="p">Phone</option>
                </select>

                <br />

                <input
                    className="bg-[#D9D9D9] text-black mb-3 w-48 rounded-xl text-center"
                    id="emailAddressInputField"
                    //onInput={(e) => }
                    placeholder="Email Address"
                    type="text"
                />

                <br />

                <input 
                    className="bg-[#D9D9D9] text-black mb-3 w-48 rounded-xl text-center"
                    id="phoneInputField"
                    //onInput={(e) => }
                    placeholder="Mobile Number"
                    type="text"
                />

            </form>
        </div>
    )
}

export default MyAccount;