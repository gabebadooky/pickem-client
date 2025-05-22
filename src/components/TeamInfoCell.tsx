import { useState } from "react";
import { Team } from "../types/team";

import TeamInfoModal from "./teamInfoModal";


const TeamInfoIconCell = ({ team, isModalCurrentlyRendered, setIsModalCurrentlyRendered }: { team: Team, isModalCurrentlyRendered: boolean, setIsModalCurrentlyRendered: React.Dispatch<React.SetStateAction<boolean>> }) => {
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