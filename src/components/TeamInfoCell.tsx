import { useState } from "react";
import { createPortal } from "react-dom";
import TeamInfoModal from "./TeamInfoModal";
import { Team } from "../types/team";
import { TeamNotes } from "../types/teamNotes";
import { Token } from "../types/token";



type Props = {
    isModalCurrentlyRendered: boolean;
    jwtToken: Token;
    setIsModalCurrentlyRendered: React.Dispatch<React.SetStateAction<boolean>>;
    setTeamNotes: React.Dispatch<React.SetStateAction<TeamNotes[]>>;
    team: Team;
    teamNotes: TeamNotes[];
};

const TeamInfoIconCell = (props: Props) => {
    const [showModal, setShowModal] = useState(false);
    const teamNotesArray = Array.isArray(props.teamNotes) ? props.teamNotes : [];
    const userTeamNotes: TeamNotes = teamNotesArray.find(note => note.teamID === props.team.teamID) || {userID: props.jwtToken.userID, teamID: props.team.teamID, notes: ""};


    return (
        <td className="m-auto w-1/9">
            <i 
                className="fa-solid fa-circle-info fa-lg"
                onClick={() => {
                    if (!props.isModalCurrentlyRendered) {
                        props.setIsModalCurrentlyRendered(true);
                        setShowModal(true)
                    }
                }}
            ></i>
            {
                showModal
                    &&
                (createPortal(
                    <TeamInfoModal
                        allTeamNotes={props.teamNotes}
                        jwtToken={props.jwtToken}
                        setTeamNotes={props.setTeamNotes}
                        team={props.team}
                        userTeamNotes={userTeamNotes}
                        onClose={() => {
                            setShowModal(false);
                            props.setIsModalCurrentlyRendered(false);
                        }}
                    />,
                    document.body
                ))
            }
        </td>
    )
}

export default TeamInfoIconCell;