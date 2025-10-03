import { BettingOdds } from "./BettingOdds";
import { PickConfidence } from "./PickConfidence";
import { SelectionModalProps } from "./types";
import { TeamNotesComponent } from "./TeamNotesComponent";
import { TeamSchedule } from "./TeamSchedule";
import { JSX } from "react";


export const instantiateModalSlides = (props: SelectionModalProps) => {
    let ModalSlides: JSX.Element[] = [];

    ModalSlides.push(
        <TeamNotesComponent
            authenticatedUser={props.authenticatedUser}
            team={props.awayTeam}
        />
    );

    ModalSlides.push(
        <TeamSchedule
            allGames={props.allGames}
            allTeams={props.allTeams}
            team={props.awayTeam}
        />
    );

    ModalSlides.push(
        <PickConfidence
            allPicks={props.allPicks}
            awayTeam={props.awayTeam}
            authenticatedUser={props.authenticatedUser}
            game={props.game}
            homeTeam={props.homeTeam}
            pick={props.pick}
            selectedTeam={props.selectedTeam}
            setIsModalOpen={props.setIsModalOpen}
            setPicks={props.setPicks}
        />
    );

    ModalSlides.push(
        <TeamSchedule
            allGames={props.allGames}
            allTeams={props.allTeams}
            team={props.homeTeam}
        />
    );

    ModalSlides.push(
        <TeamNotesComponent
            authenticatedUser={props.authenticatedUser}
            team={props.homeTeam}
        />
    );

    /* ModalSlides.push(
        <BettingOdds
            awayTeam={props.awayTeam}
            game={props.game}
            homeTeam={props.homeTeam}
            selectedTeamID={props.selectedTeam.teamID}
            source="ESPN"
        />
    );

    ModalSlides.push(
        <BettingOdds
            awayTeam={props.awayTeam}
            game={props.game}
            homeTeam={props.homeTeam}
            selectedTeamID={props.selectedTeam.teamID}
            source="CBS"
        />
    );

    ModalSlides.push(
        <BettingOdds
            awayTeam={props.awayTeam}
            game={props.game}
            homeTeam={props.homeTeam}
            selectedTeamID={props.selectedTeam.teamID}
            source="FOX"
        />
    ); */

    return ModalSlides;

}


export const aaModalSlides = (props: SelectionModalProps) => [
        
    <PickConfidence
        allPicks={props.allPicks}
        awayTeam={props.awayTeam}
        authenticatedUser={props.authenticatedUser}
        game={props.game}
        homeTeam={props.homeTeam}
        pick={props.pick}
        selectedTeam={props.selectedTeam}
        setIsModalOpen={props.setIsModalOpen}
        setPicks={props.setPicks}
    />,

    <TeamNotesComponent
        authenticatedUser={props.authenticatedUser}
        team={props.selectedTeam}
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