import { useState } from "react";
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

    return (
        <td className="size-16 justify-center">
            <img 
                src={props.team.teamLogoUrl}
                alt={props.team.teamName}
                onClick={() => {
                    if (!props.isModalCurrentlyRendered) {
                        props.setIsModalCurrentlyRendered(true);
                        setShowModal(true)
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
                    }}
                />
            }
        </td>
    )
}

export default TeamCell;