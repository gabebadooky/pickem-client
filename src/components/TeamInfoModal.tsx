import { useState } from "react";

import { updateTeamNotes } from "../services/teamNotes";

import { espnCfbTeamURL, espnNflTeamURL, cbsCfbTeamURL, cbsNflTeamURL } from "../types/baseURLs";
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
    const [loginWarningMessage, setLoginWarningMessage] = useState<boolean>(false);
    const [notesEdited, setNotesEdited] = useState<boolean>(false);
    const [newNotes, setNewNotes] = useState<string>("");
    const teamNotesInputId: string = `${props.team.teamID}-notes`;

    const espnURL = (): string => {
        if (props.team.league === "CFB") {
            return `${espnCfbTeamURL}/${props.team.espnCode}`;    
        } else {
            return `${espnNflTeamURL}/${props.team.espnCode}`;
        }
    }

    const cbsURL = (): string => {
        if (props.team.league === "CFB") {
            return `${cbsCfbTeamURL}/${props.team.cbsCode}`;
        } else {
            return `${cbsNflTeamURL}/${props.team.cbsCode}`;
        }
    }
    
    return (
        <div className="fixed flex h-[100vh] items-center justify-center left-0 rounded-sm top-0 w-[100vw] z-1000">
            <div className="bg-[#D9D9D9] p-5 relative rounded-xl text-black text-center w-[80%]" id={props.team.teamID}>
                
                <i className="absolute fa-solid fa-2xl fa-rectangle-xmark top-4 right-2" onClick={() => props.onClose()}></i>
                <h1 className="font-extrabold mt-3 text-lg">{props.team.teamName} {props.team.teamMascot}</h1>

                <div className="mb-4 text-xs">
                    {props.team.overallWins}-{props.team.overallLosses} ({props.team.conferenceWins}-{props.team.conferenceLosses})
                </div>

                <div className="pb-2 text-base">
                    <p>More Details:</p>
                    <p><a className="pb-1 text-[#1a8cff]" href={espnURL()}>ESPN</a></p>
                    <p><a className="text-[#1a8cff]" href={cbsURL()}>CBS</a></p>
                </div>

                <div>
                    {loginWarningMessage && <p className="m-auto text-red-500">Login or register to play!</p>}
                </div>

                <div className="">
                    <textarea
                        className="bg-[#FFFFFF] h-25 rounded-sm text-xs w-full"
                        disabled={props.jwtToken.userID !== props.teamNotes.userID}
                        id={teamNotesInputId}
                        name="team-notes"
                        onChange={(e) => {
                            setLoginWarningMessage(false);
                            setNotesEdited(true);
                            setNewNotes(e.currentTarget.value);
                            console.log(`newNotes: ${newNotes}`);
                        }}
                        placeholder="Keep your own notes on this team..."
                        defaultValue={String(props.teamNotes.notes)}
                    />
                    {
                        notesEdited &&
                        <button
                            className="bg-[#17C120] h-12 rounded-xl w-[50%]"
                            id="update-notes-button"
                            onClick={() => {
                                    if (props.jwtToken.value === "guest") {
                                        setLoginWarningMessage(true);
                                    } else {
                                        updateTeamNotes(props.jwtToken.value, {
                                            userID: props.teamNotes.userID,
                                            teamID: props.teamNotes.teamID,
                                            notes: newNotes
                                        })
                                        .then(props.onClose());
                                    }
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
