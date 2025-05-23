import { useState } from "react";
import { Game } from "../types/game";
import { Team } from "../types/team";

import GameInfoModal from "./GameInfoModal";


type Props = {
    game: Game;
    awayTeam: Team;
    homeTeam: Team;
    isModalCurrentlyRendered: boolean;
    setIsModalCurrentlyRendered: React.Dispatch<React.SetStateAction<boolean>>;
};

const GameInfoCell = (props: Props) => {
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
            >
            </i>
            {
                showModal
                    &&
                <GameInfoModal 
                    game={props.game}
                    awayTeam={props.awayTeam}
                    homeTeam={props.homeTeam}
                    onClose={() => {
                        setShowModal(false);
                        props.setIsModalCurrentlyRendered(false);
                    }}
                />
            }
        </td>
    )
}

export default GameInfoCell;