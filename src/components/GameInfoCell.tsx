import { useState } from "react";
import GameInfoModal from "./GameInfoModal";
import { Game } from "../types/game";
import { Team } from "../types/team";


type Props = {
    awayTeam: Team;
    game: Game;
    homeTeam: Team;
    isModalCurrentlyRendered: boolean;
    setIsModalCurrentlyRendered: React.Dispatch<React.SetStateAction<boolean>>;
};


const GameInfoCell = (props: Props) => {
    const [showModal, setShowModal] = useState(false);
    const gameInfoCellID: string = `${props.game.gameID}-info-cell`;

    return (
        <div id={gameInfoCellID}>
            <i 
                className="fa-solid fa-circle-info"
                onClick={() => {
                    if (!props.isModalCurrentlyRendered) {
                        props.setIsModalCurrentlyRendered(true);
                        setShowModal(true);
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
        </div>
    )
}

export default GameInfoCell;