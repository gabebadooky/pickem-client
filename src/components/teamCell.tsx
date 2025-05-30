import { useEffect, useState } from "react";
import { Team } from "../types/team";
import { Pick } from "../types/pick";

import ConfidenceModal from "./ConfidenceModal";


type Props = {
    team: Team;
    pick: Pick;
    isModalCurrentlyRendered: boolean;
    setIsModalCurrentlyRendered: React.Dispatch<React.SetStateAction<boolean>>;
}

const TeamCell = (props: Props) => {
    const [showModal, setShowModal] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState<string>();
    const [opacity, setOpacity] = useState<string>();

    useEffect(() => {
        if (props.team.teamID === props.pick.teamPicked) {
            setBackgroundColor(`size-16 justify-center border-2 rounded-2xl border-[#${props.team.alternateColor}]`);
            setOpacity("opacity-100");
            console.log(`bg: ${props.team.alternateColor}`);
        } else {
            setBackgroundColor(`bg-[#1E1E1E]`);
            setOpacity("opacity-35");
        }
    }, []);
    

    return (
        <td className={backgroundColor}>
            <img 
                src={props.team.teamLogoUrl}
                alt={props.team.teamName}
                className={opacity}
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
                    onClose={() => {
                        props.setIsModalCurrentlyRendered(false);
                        setShowModal(false);
                        setOpacity("opacity-100");
                        setBackgroundColor(props.team.alternateColor);
                    }}
                />
            }
        </td>
    )
}

export default TeamCell;