import { useState } from "react";
import { createPortal } from "react-dom";
import TeamInfoModal from "./TeamInfoModal";
import { Team } from "../types/team";



type Props = {
    team: Team;
    isModalCurrentlyRendered: boolean;
    setIsModalCurrentlyRendered: React.Dispatch<React.SetStateAction<boolean>>;
};

const TeamInfoIconCell = (props: Props) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <td className="m-auto w-1/5">
            <i 
                className="fa-solid fa-circle-info fa-lg"
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
                (createPortal(
                    <TeamInfoModal 
                        team={props.team}
                        onClose={() => {
                            setShowModal(false);
                            props.setIsModalCurrentlyRendered(false);
                        }}
                    />,
                    document.body
                ))
            }
        </td>
    )
}

export default TeamInfoIconCell;