import { createPortal } from "react-dom";
import { SelectionModal } from "../SelectionModal";
import { setLogoImageStyling, setOuterBorderColor } from "./utils";
import { TeamTileProps } from "./types";


const TeamTile = (props: TeamTileProps) => {
    const componentID: string = `${props.pick.userID}-${props.game.gameID}-${props.tileTeam.teamID}`;
    
    const handleChangeEvent = (): void => {
        props.setIsModalOpen(true);
        if (props.isModalOpen) {
            createPortal(
                <SelectionModal
                    allGames={props.allGames}
                    allPicks={props.allPicks}
                    allTeams={props.allTeams}
                    allTeamsNotes={props.allTeamsNotes}
                    authenticatedUser={props.authenticatedUser}
                    awayTeam={props.awayTeam}
                    game={props.game}
                    homeTeam={props.homeTeam}
                    isModalOpen={props.isModalOpen}
                    pick={props.pick}
                    selectedTeam={props.tileTeam}
                    setIsModalOpen={props.setIsModalOpen}
                    setPicks={props.setPicks}
                    setTeamNotes={props.setTeamNotes}
                />,
                document.body
            );
        }
    }
    

    return(
        <div
            className={setOuterBorderColor(props)}
            id={`${componentID}-div`}
            key={`${componentID}-div`}
        >
            <img
                alt={props.tileTeam.teamLogoUrl}
                className={setLogoImageStyling(props)}
                onClick={handleChangeEvent}
                src={props.tileTeam.teamLogoUrl}
            />
        </div>
    );
}


export default TeamTile;