import { useEffect, useState } from "react";
import { Team } from "../types/team";
import { Pick } from "../types/pick";
import { SelectedTeam } from "../types/selectedTeam";

import ConfidenceModal from "./ConfidenceModal";

type Props = {
    team: Team;
    pick: Pick;
    picks: Pick[];
    setPicks: React.Dispatch<React.SetStateAction<Pick[]>>;
    selectedTeam: SelectedTeam;
    setSelectedTeam: React.Dispatch<React.SetStateAction<SelectedTeam>>;
    isModalCurrentlyRendered: boolean;
    setIsModalCurrentlyRendered: React.Dispatch<React.SetStateAction<boolean>>;
}

const TeamCell = (props: Props) => {
    const [showModal, setShowModal] = useState(false);
    const [style, setStyle] = useState<string>();

    useEffect(() => {
        if (props.team.teamID === props.pick.teamPicked) {
            setStyle(`justify-center border-2 rounded-2xl border-[#${props.team.alternateColor}]`);
            console.log(`bg: ${props.team.alternateColor}`);
        } else {
            setStyle("justify-center");
        }
    }, []);
    

    return (
        <td className="size-16">
            <img 
                src={props.team.teamLogoUrl}
                alt={props.team.teamName}
                className={style}
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
                <ConfidenceModal 
                    pick={props.pick}
                    teamID={props.team.teamID}
                    picks={props.picks}
                    setPicks={props.setPicks}
                    selectedTeam={props.selectedTeam}
                    setSelectedTeam={props.setSelectedTeam}
                    onClose={() => {
                        props.setIsModalCurrentlyRendered(false);
                        setShowModal(false);
                        setStyle(`justify-center border-2 rounded-2xl border-[#${props.team.alternateColor}]`);
                    }}
                />
            }
        </td>
    )
}

export default TeamCell;