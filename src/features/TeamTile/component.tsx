import { createPortal } from "react-dom";

import { setLogoImageStyling, setOuterBorderColor } from "./utils";
import SelectionModal from "../SelectionModal/component";
import { TeamTileProps } from "./types";


const TeamTile = (props: TeamTileProps) => {
    const componentID: string = `${props.game.gameID}-${props.tileTeam.teamID}`;
    

    return(
        <div
            className={setOuterBorderColor(props)}
            id={`${componentID}-div`}
            key={`${componentID}-div`}
        >
            <img
                alt={props.tileTeam.teamLogoUrl}
                className={setLogoImageStyling(props)}
                onClick={() => {
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
                }}
                src={props.tileTeam.teamLogoUrl}
            />
        </div>
    );
}


export default TeamTile;