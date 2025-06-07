import { useEffect, useState } from "react";
import { Team } from "../types/team";
import { Pick } from "../types/pick";

import ConfidenceModal from "./ConfidenceModal";

type Props = {
    team: Team;
    away: boolean
    home: boolean;
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
    const [showModal, setShowModal] = useState<boolean>(false);
    const [style, setStyle] = useState<string>("justify-center");
    const [modalPositioning, setModalPositioning] = useState<string>();

    useEffect(() => {
        if (props.away) {
            setModalPositioning("absolute top-5");
        } else {
            setModalPositioning("absolute")
        }
        if (props.team.teamID === props.selectedTeam) {
            setStyle(`justify-center border-2 rounded-2xl border-[#${props.team.alternateColor}]`);
        } else {
            setStyle("justify-center");
        }
    }, [props.selectedTeam]);
    

    return (
        <td className="size-16">
            <img
                key={teamImage}
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
                <div className={modalPositioning}>
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
                    />
                </div>
            }
        </td>
    )
}

export default TeamCell;