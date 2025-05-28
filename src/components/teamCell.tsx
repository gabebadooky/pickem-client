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
    const [opacity, setOpacity] = useState<string>();

    useEffect(() => {
        if (props.team.teamID === props.pick.teamPicked) {
            setOpacity("opacity-100");
        } else {
            setOpacity("opacity-35");
        }
    }, []);
    

    return (
        <td className="size-16 justify-center">
            <img 
                src={props.team.teamLogoUrl}
                alt={props.team.teamName}
                className={opacity}
                onClick={() => {
                    if (!props.isModalCurrentlyRendered) {
                        setOpacity("opacity-100");
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
                    onClose={() => {
                        props.setIsModalCurrentlyRendered(false);
                        setShowModal(false);
                        if (props.team.teamID === props.pick.teamPicked) {
                            setOpacity("opacity-100");
                        } else {
                            setOpacity("opacity-35");
                        }
                    }}
                />
            }
        </td>
    )
}

export default TeamCell;