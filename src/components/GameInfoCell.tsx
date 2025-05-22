import { useState } from "react";
import { Game } from "../types/game";
import { Team } from "../types/team";

import GameInfoModal from "./gameInfoModal";


type Props = {
    game: Game;
    awayTeam: Team;
    homeTeam: Team;
    isModalCurrentlyRendered: boolean;
    setIsModalCurrentlyRendered: React.Dispatch<React.SetStateAction<boolean>>;
};

const GameInfoIcon = (props: Props) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
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
        </div>
    )
}

export default GameInfoIcon;