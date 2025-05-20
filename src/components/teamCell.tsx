import { useContext, useState } from "react";
import ConfidenceModal from "./confidenceModal";
import { Team } from "../types/team";
import { Pick } from "../types/pick";

const teamCell = ({ team, pick }: { team: Team, pick: Pick }) => {
    const [isModalCurrentlyRendered, setIsModalCurrentlyRendered] = useContext(ModalContext);
    const [showModal, setShowModal] = useState(false);

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
}

export default teamCell;