import { useState } from "react";

import { updateTeamNotes } from "../services/teamNotes";

import { espnCfbTeamURL, cbsCfbTeamURL } from "../types/baseURLs";
import { Team } from "../types/team";
import { TeamNotes } from "../types/teamNotes";
import { Token } from "../types/token";


type Props = {
    jwtToken: Token
    team: Team;
    teamNotes: TeamNotes;
    onClose: Function;
};


const TeamInfoModal = (props: Props) => {
    const [notesEdited, setNotesEdited] = useState<boolean>(false);
    const [newNotes, setNewNotes] = useState<string>("");

    const espnURL: string = `${espnCfbTeamURL}/${props.team.espnCode}`;
    const cbsURL: string = `${cbsCfbTeamURL}/${props.team.cbsCode}`;
    const teamNotesInputId: string = `${props.team.teamID}-notes`;
    console.log(`props.teamNotes.notes: ${String(props.teamNotes.notes)}`);
    return (
        <div className="fixed flex h-[100vh] items-center justify-center left-0 rounded-sm top-0 w-[100vw] z-1000">
            <div className="bg-[#D9D9D9] p-10 relative text-black text-center" id={props.team.teamID}>
                
                <i className="fa-solid fa-rectangle-xmark absolute top-1 right-1" onClick={() => props.onClose()}></i>
                <h1>{props.team.teamName} {props.team.teamMascot}</h1>

                <div>
                    {props.team.overallWins}-{props.team.overallLosses} ({props.team.conferenceWins}-{props.team.conferenceLosses})
                </div>

                <div>
                    <p>More Details:</p>
                    <p><a className="text-[#1a8cff]" href={espnURL}>ESPN</a></p>
                    <p><a className="text-[#1a8cff]" href={cbsURL}>CBS</a></p>
                </div>

                <div>
                    <textarea
                        className="bg-[#ffffff]"
                        id={teamNotesInputId}
                        name="team-notes"
                        onChange={(e) => {
                            setNotesEdited(true);
                            setNewNotes(e.currentTarget.value);
                            console.log(`newNotes: ${newNotes}`);
                        }}
                        defaultValue={String(props.teamNotes.notes)}
                    />
                    {
                        notesEdited &&
                        <button
                            className="bg-[#17C120] h-12 rounded-xl w-[50%]"
                            id="update-notes-button"
                            onClick={() => {
                                    updateTeamNotes(props.jwtToken.value, {
                                        userID: props.teamNotes.userID,
                                        teamID: props.teamNotes.teamID,
                                        notes: newNotes
                                    })
                                    .then(props.onClose())
                                }
                            }
                        >
                            Update My Notes
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default TeamInfoModal;
