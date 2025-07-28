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
        <td className="m-auto w-1/5" id={gameInfoCellID}>
            <i 
                className="fa-solid fa-circle-info fa-lg"
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
        </td>
    )
}

export default GameInfoCell;