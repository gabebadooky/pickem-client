import { useState } from "react";
import { Team } from "../types/team";

import TeamInfoModal from "./TeamInfoModal";


type Props = {
    team: Team;
    isModalCurrentlyRendered: boolean;
    setIsModalCurrentlyRendered: React.Dispatch<React.SetStateAction<boolean>>;
};

const TeamInfoIconCell = (props: Props) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <td>
            <i 
                className="fa-solid fa-circle-info"
                onClick={() => {
                    if (!props.isModalCurrentlyRendered) {
                        props.setIsModalCurrentlyRendered(true);
                        setShowModal(true)
                    }
                }}
            ></i>
            {
                showModal
                    &&
                <TeamInfoModal 
                    team={props.team}
                    onClose={() => {
                        setShowModal(false);
                        props.setIsModalCurrentlyRendered(false);
                    }}
                />
            }
        </td>
    )
}

export default TeamInfoIconCell;