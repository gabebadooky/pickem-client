import GameInfoModal from "./gameInfoModal";
import { GameInfoProp } from "../types/gameInfoProp";

const InfoIcon = ({ gameInfo }: {gameInfo: GameInfoProp}) => {

    return (
        <div onClick={() => {
            <GameInfoModal gameInfo={gameInfo} />
        }}>
            <i className="fa-solid fa-circle-info"></i>
        </div>
    )
}

export default InfoIcon;