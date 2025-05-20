import { useContext, useState } from "react";
import { teamCellProp } from "../types/teamCell";
import ConfidenceModal from "./confidenceModal";

const teamCell = (prop: teamCellProp) => {
    const [isModalCurrentlyRendered, setIsModalCurrentlyRendered] = useContext(ModalContext);
    const [showModal, setShowModal] = useState(false);

    <td className="size-16 justify-center">
        <img 
            src={prop.team.teamLogoUrl}
            alt={prop.team.teamName}
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
                pick={prop.pick}
                onClose={() => {
                    setIsModalCurrentlyRendered(false);
                    setShowModal(false);
                }}
            />
        }
    </td>
}

export default teamCell;