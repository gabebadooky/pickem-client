import { useContext, useState } from "react";
import TeamInfoModal from "./teamInfoModal";
import { Team } from "../types/team";

const TeamInfoIconCell = ({ team }: { team: Team }) => {
    const [isModalCurrentlyRendered, setIsModalCurrentlyRendered] = useContext(ModalContext);
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <i 
                className="fa-solid fa-circle-info"
                onClick={() => {
                    if (!isModalCurrentlyRendered) {
                        setIsModalCurrentlyRendered(true);
                        setShowModal(true)
                    }
                }}
            ></i>
            {
                showModal
                    &&
                <TeamInfoModal 
                    team={team}
                    onClose={() => {
                        setShowModal(false);
                        setIsModalCurrentlyRendered(false);
                    }}
                />
            }
        </div>
    )
}

export default TeamInfoIconCell;