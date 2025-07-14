import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Team } from "../types/team";
import { Pick } from "../types/pick";

import ConfidenceModal from "./ConfidenceModal";

type Props = {
    team: Team;
    isAwayTeam: boolean;
    isHomeTeam: boolean;
    pick: Pick;
    picks: Pick[];
    setPicks: React.Dispatch<React.SetStateAction<Pick[]>>;
    selectedTeam: string | null;
    setSelectedTeam: React.Dispatch<React.SetStateAction<string | null>>;
    isModalCurrentlyRendered: boolean;
    setIsModalCurrentlyRendered: React.Dispatch<React.SetStateAction<boolean>>;
}

const TeamCell = (props: Props) => {
    const teamImage: string = `${props.team.teamID}-img`;
    const [imageBorder, setImageBorder] = useState<string>("h-[100%]");
    const [showModal, setShowModal] = useState<boolean>(false);
    
    useEffect(() => {
        if (props.team.teamID === props.selectedTeam) {
            setImageBorder(`border-2 border-[#${props.team.alternateColor}] h-[100%] rounded-2xl`);
        } else {
            setImageBorder("h-[100%]");
        }
    }, [props.selectedTeam]);

    console.log(`teamID: ${props.team.teamID}\nselectedTeam: ${props.selectedTeam}`);

    return (
        <td className="m-auto w-1/5">
            <img
                key={teamImage}
                src={props.team.teamLogoUrl}
                alt={props.team.teamName}
                className={imageBorder}
                onClick={() => {
                    if (!props.isModalCurrentlyRendered) {
                        props.setIsModalCurrentlyRendered(true);
                        setShowModal(true);
                    }
                }}
            />
            {
                showModal 
                    && 
                (createPortal(
                    <ConfidenceModal 
                        pick={props.pick}
                        teamID={props.team.teamID}
                        picks={props.picks}
                        setPicks={props.setPicks}
                        setSelectedTeam={props.setSelectedTeam}
                        onClose={() => {
                            props.setIsModalCurrentlyRendered(false);
                            setShowModal(false);
                        }}
                    />,
                    document.body
                ))
            }
        </td>
    )
}

export default TeamCell;
