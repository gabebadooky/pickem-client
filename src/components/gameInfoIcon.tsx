import { useState } from "react";
import { GameInfoProps } from "../types/gameInfoProps";

import GameInfoModal from "./gameInfoModal";


const GameInfoIcon = ({ gameInfo, isModalCurrentlyRendered, setIsModalCurrentlyRendered }: { gameInfo: GameInfoProps, isModalCurrentlyRendered: boolean, setIsModalCurrentlyRendered: React.Dispatch<React.SetStateAction<boolean>> }) => {
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
                <GameInfoModal 
                    gameInfo={gameInfo}
                    onClose={() => {
                        setShowModal(false);
                        setIsModalCurrentlyRendered(false);
                    }}
                />
            }
        </div>
    )
}

export default GameInfoIcon;