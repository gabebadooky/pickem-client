import { useState } from "react";
import { Team } from "../types/team";
import { Pick } from "../types/pick";

import ConfidenceModal from "./confidenceModal";


const TeamCell = ({ team, pick, isModalCurrentlyRendered, setIsModalCurrentlyRendered }: { team: Team, pick: Pick, isModalCurrentlyRendered: boolean, setIsModalCurrentlyRendered: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <td className="size-16 justify-center">
            <img 
                src={team.teamLogoUrl}
                alt={team.teamName}
                onClick={() => {
                    if (!isModalCurrentlyRendered) {
                        setIsModalCurrentlyRendered(true);
                        setShowModal(true)
                    }
                }}
            />
            {
                showModal 
                    && 
                <ConfidenceModal 
                    pick={pick}
                    onClose={() => {
                        setIsModalCurrentlyRendered(false);
                        setShowModal(false);
                    }}
                />
            }
        </td>
    )
}

export default TeamCell;