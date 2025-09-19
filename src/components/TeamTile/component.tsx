import { createPortal } from "react-dom";
import { SelectionModal } from "../SelectionModal";
import { setLogoImageStyling, setOuterBorderColor } from "./component";
import { TeamTileProps } from "./types";
import { useState } from "react";


const TeamTile = (props: TeamTileProps) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const componentID: string = `${props.pick.userID}-${props.game.gameID}-${props.tileTeam.teamID}`;
    
    const handleChangeEvent = (): void => {
        setShowModal(true);
        /*props.setIsModalOpen(true)
        props.setIsModalOpen(true);
        if (props.isModalOpen) {
            createPortal(
                <SelectionModal
                    allGames={props.allGames}
                    allPicks={props.allPicks}
                    allTeams={props.allTeams}
                    authenticatedUser={props.authenticatedUser}
                    awayTeam={props.awayTeam}
                    game={props.game}
                    homeTeam={props.homeTeam}
                    isModalOpen={true}
                    pick={props.pick}
                    selectedTeam={props.tileTeam}
                    setIsModalOpen={props.setIsModalOpen}
                    setPicks={props.setPicks}
                />,
                document.body
            );
        */
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

            {
                showModal &&
                createPortal(
                    <SelectionModal
                        allGames={props.allGames}
                        allPicks={props.allPicks}
                        allTeams={props.allTeams}
                        authenticatedUser={props.authenticatedUser}
                        awayTeam={props.awayTeam}
                        game={props.game}
                        homeTeam={props.homeTeam}
                        isModalOpen={true}
                        pick={props.pick}
                        selectedTeam={props.tileTeam}
                        setIsModalOpen={setShowModal}
                        setPicks={props.setPicks}
                    />,
                    document.body
                )
            }
        </div>
    );
}


export default TeamTile;