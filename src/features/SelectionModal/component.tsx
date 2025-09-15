import { JSX, useState } from "react";
import { PickConfidence } from "./PickConfidence";
import { SelectionModalProps } from "./types";
import { BettingOdds } from "./BettingOdds";
import { TeamNotesComponent } from "./TeamNotesComponent";
import { TeamSchedule } from "./TeamSchedule";
import { instantiateTeamNotes } from "./utils";



const SelectionModal = (props: SelectionModalProps) => {
    const [modalIndex, setModalIndex] = useState<number>(0);
    const componentID: string = `${props.pick.userID}-${props.pick.gameID}`;
    

    return (
        <div 
            className="fixed flex h-[100vh] items-center justify-center left-0 top-0 w-[100vw] z-1000"
            id={`${componentID}-portal-container`}
            key={`${componentID}-portal-container`}
        >

            <div 
                className="bg-[#FFFFFF] p-5 relative rounded-xl text-black text-center w-full"
                id={`${componentID}-portal-div`}
                key={`${componentID}-portal-div`}
            >
                
                <i
                    className="fa-solid fa-2xl fa-rectangle-xmark absolute top-3 right-3"
                    id={`${componentID}-close-portal-icon`}
                    key={`${componentID}-close-portal-icon`}
                    onClick={() => {}}
                >
                </i>

                <div
                    className="flex justify-center m-auto mt-5 w-full"
                    id={`${componentID}-close-portal-content`}
                    key={`${componentID}-close-portal-content`}
                >

                    <div
                        className="l-0 my-auto py-5 w-[10%]"
                        id={`${componentID}-portal-left-arrow`}
                        key={`${componentID}-portal-left-arrow`}
                        onClick={() => setModalIndex(modalIndex - 1)}
                    >
                        { modalIndex > 0 && <i className="fa-solid fa-caret-left"></i> }
                    </div>

                    <div
                        className="w-[80%]"
                        id={`${componentID}-portal-slide-container`}
                        key={`${componentID}-portal-slide-container`}
                    >
                        {modalSlides(props)[modalIndex]}
                    </div>

                    <div
                        className="my-auto py-5 r-0 w-[10%]"
                        id={`${componentID}-portal-right-arrow`}
                        key={`${componentID}-portal-right-arrow`}
                        onClick={() => setModalIndex(modalIndex + 1)}
                    >
                        { modalIndex < modalSlides.length - 1 && <i className="fa-solid fa-caret-right"></i> }
                    </div>

                </div>      

            </div>

        </div>
    );    
}


const modalSlides = (props: SelectionModalProps): JSX.Element[] => [
        
    <PickConfidence
        allPicks={props.allPicks}
        awayTeam={props.awayTeam}
        authenticatedUser={props.authenticatedUser}
        game={props.game}
        homeTeam={props.homeTeam}
        pick={props.pick}
        selectedTeam={props.selectedTeam}
        setPicks={props.setPicks}
    />,

    <TeamNotesComponent
        allTeamNotes={props.allTeamsNotes}
        authenticatedUser={props.authenticatedUser}
        setTeamNotes={props.setTeamNotes}
        team={props.selectedTeam}
        teamNotes={instantiateTeamNotes(props.allTeamsNotes, props.authenticatedUser.userID, props.selectedTeam.teamID)}
    />,

    <BettingOdds
        awayTeam={props.awayTeam}
        game={props.game}
        homeTeam={props.homeTeam}
        selectedTeamID={props.selectedTeam.teamID}
        source="ESPN"
    />,

    <BettingOdds
        awayTeam={props.awayTeam}
        game={props.game}
        homeTeam={props.homeTeam}
        selectedTeamID={props.selectedTeam.teamID}
        source="CBS"
    />,

    <BettingOdds
        awayTeam={props.awayTeam}
        game={props.game}
        homeTeam={props.homeTeam}
        selectedTeamID={props.selectedTeam.teamID}
        source="FOX"
    />,

    <TeamSchedule
        allGames={props.allGames}
        allTeams={props.allTeams}
        team={props.awayTeam}
    />,

    <TeamSchedule
        allGames={props.allGames}
        allTeams={props.allTeams}
        team={props.homeTeam}
    />

];


export default SelectionModal;